# Implementation Plan: Batch Reorder for Collection Reference Field

## Spec Reference
Link to: `./spec.md`

## Codebase Context

**Current state:** The collection-reference-field is a recently refactored feature with modular hooks (`use-reorder.ts`, `use-collection-reference.ts`, `use-load-more.ts`) and components (`reorderable-table.tsx`, `collection-reference-field.tsx`). The reorder hook currently sends N parallel `PATCH /api/{collection}/{id}` calls via `payloadAPI.updateItem()`, but the `sortOrder` field doesn't exist on any collection — so reordering doesn't persist at all.

**Payload Local API access:** The project has `getPayloadClient()` at `src/shared/lib/payload.ts` which returns a cached Payload instance. This is used in server-side code.

**API route patterns:**
- Payload's own REST routes live under `src/app/(payload)/api/[...slug]/route.ts` (auto-generated)
- Custom app routes live under `src/app/(app)/api/` (e.g., `cron/keep-alive/route.ts`)
- The batch endpoint should go in `src/app/(app)/api/` since it's a custom route

**No `shared/payload/fields/` directory exists** — we need to create it for the `createSortOrderField()` factory.

**Button component** at `src/shared/components/ui-kit/button.tsx` has `admin-ghost` variant (`bg-transparent hover:bg-accent hover:text-accent-foreground rounded-lg`) and `icon` size (`h-[40px] w-[40px]`).

## Implementation Steps

### Step 1: Create `createSortOrderField` field factory

**Action:** Create new file
**File(s):** `src/shared/payload/fields/sort-order.ts` (new)
**Details:**
- Export a `createSortOrderField()` function returning a Payload `Field` config
- Field: `name: 'sortOrder'`, `type: 'number'`, `defaultValue: 0`, `admin.hidden: true`, `index: true`
- Import `Field` type from `payload`

**Rationale:** Reusable factory per spec. Placed in `shared/payload/fields/` following the same pattern as `shared/payload/collections/`, `shared/payload/blocks/`, etc. — keeping Payload schema definitions together. No existing `fields/` directory, but it's the natural location.

### Step 2: Add `sortOrder` field to Doctors collection

**Action:** Modify existing file
**File(s):** `src/shared/payload/collections/doctors.ts` (existing)
**Details:**
- Import `createSortOrderField` from `@/shared/payload/fields/sort-order`
- Add `createSortOrderField()` to the `fields` array (at the end)
- No other changes to the collection config

**Rationale:** Doctors is currently the only collection using `reorderable: true` (via `doctors-block.ts`). The field must exist in the collection schema for Payload to persist `sortOrder` values.

### Step 3: Create batch sort-order API endpoint

**Action:** Create new file
**File(s):** `src/app/(app)/api/batch-sort-order/route.ts` (new)
**Details:**
- Export a `POST` handler using Next.js App Router pattern (`NextRequest` → `NextResponse`)
- Parse JSON body: `{ collectionSlug: string, items: Array<{ id: string, sortOrder: number }> }`
- Validate: `collectionSlug` must be a non-empty string, `items` must be an array
- If `items` is empty, return `{ success: true, updated: 0 }`
- Validate `collectionSlug` against Payload's known collections by importing the config and checking `config.collections`
- Use `getPayloadClient()` from `@/shared/lib/payload` to get the Payload Local API instance
- Iterate over items, calling `payload.update({ collection, id, data: { sortOrder } })` for each
- Use `Promise.allSettled()` to handle partial failures
- Return `{ success, updated, errors? }` per the API contract in the spec
- Only allow updating `sortOrder` — the endpoint ignores any other data
- Return 400 for invalid body, 400 for unknown collection, 500 for server errors

**Rationale:** Custom endpoint is necessary because Payload's bulk PATCH sets the same value for all matched docs — it cannot set different `sortOrder` per document. Placed in `src/app/(app)/api/` following the existing pattern for custom routes (`cron/keep-alive/`). Using Payload Local API avoids N HTTP round-trips from the server.

### Step 4: Add `batchUpdateSortOrder` method to `payloadAPI`

**Action:** Modify existing file
**File(s):** `src/shared/lib/payload-rest.ts` (existing)
**Details:**
- Add a new method `batchUpdateSortOrder` to the `payloadAPI` object:
  ```
  batchUpdateSortOrder(collectionSlug: string, items: Array<{ id: string, sortOrder: number }>)
  ```
- POST to `/api/batch-sort-order` (note: this is an app-level route, not the Payload REST API, so use the base URL without the `/api` prefix from axiosInstance — need a separate fetch call or a plain `fetch` / dedicated axios call to the app root)
- Actually, since `axiosInstance` has `baseURL: ${CONFIG.SERVER_URL}/api`, and our route is at `/api/batch-sort-order`, the path `/batch-sort-order` on the axiosInstance would resolve to `${CONFIG.SERVER_URL}/api/batch-sort-order` which is **wrong** — our route is at `${CONFIG.SERVER_URL}/api/batch-sort-order` but under the `(app)` group, not Payload's API. Wait — Next.js route groups `(app)` and `(payload)` don't affect the URL. So `/api/batch-sort-order` is correct. But the Payload catch-all `[...slug]` is at `(payload)/api/[...slug]` which catches `/api/*`. We need to ensure our route takes priority.

  **Correction:** The Payload catch-all route at `src/app/(payload)/api/[...slug]/route.ts` will catch `/api/batch-sort-order` before our specific route. We need to place the batch endpoint **outside** the `/api/` prefix, e.g., at `src/app/(app)/batch-sort-order/route.ts` → URL `/batch-sort-order`, OR leverage Payload's custom endpoints mechanism.

  **Better approach:** Use a Next.js API route outside the `/api` path to avoid Payload's catch-all. Place it at `src/app/(app)/api-custom/batch-sort-order/route.ts` → URL `/api-custom/batch-sort-order`. Or simply `src/app/(app)/batch-sort-order/route.ts` → URL `/batch-sort-order`.

  **Simplest approach:** Actually, Next.js resolves more specific routes before catch-all routes. `src/app/(app)/api/batch-sort-order/route.ts` is more specific than `src/app/(payload)/api/[...slug]/route.ts`, so it will take priority. Let's verify this assumption is correct — in Next.js App Router, a static segment like `api/batch-sort-order/route.ts` takes precedence over a catch-all `api/[...slug]/route.ts` regardless of route group. **Yes, this is correct.**

- So the method calls `axiosInstance.post('/batch-sort-order', { collectionSlug, items })` which resolves to `${SERVER_URL}/api/batch-sort-order`
- Return type: `{ success: boolean, updated: number, errors?: Array<{ id: string, message: string }> }`

**Rationale:** Centralizes the API call in `payloadAPI` alongside existing methods. Keeps the HTTP details (URL, error handling) in one place. The `use-reorder` hook becomes cleaner — it just calls one method.

### Step 5: Rewrite `use-reorder.ts` to use batch endpoint

**Action:** Modify existing file
**File(s):** `src/features/payload-admin/components/collection-reference-field/use-reorder.ts` (existing)
**Details:**
- Replace `payloadAPI.updateItem()` loop with `payloadAPI.batchUpdateSortOrder()`
- **Optimization:** Only send items whose `sortOrder` actually changed. After `arrayMove()`, compute the affected range (items between `min(oldIndex, newIndex)` and `max(oldIndex, newIndex)` inclusive) and send only those items with their new index-based `sortOrder`
- Keep optimistic UI update: `setOrderedItems(reordered)` happens before the API call (already done)
- **Add rollback on failure:** Save `previousItems` before reordering. If the batch call fails (i.e., `!result.success` or network error), call `setOrderedItems(previousItems)` to revert
- Keep `isSaving` state and `onReorderComplete()` call
- Remove the `Promise.allSettled` loop — replaced by single batch call

**Rationale:** This is the core change — replacing N HTTP calls with 1. The optimization to only send changed items reduces payload size. Rollback ensures UI consistency on failure (spec requirement). The hook's public API (`orderedItems`, `sensors`, event handlers, `isSaving`, `activeId`) doesn't change, so no impact on consumers.

### Step 6: Restyle drag handle button in `reorderable-table.tsx`

**Action:** Modify existing file
**File(s):** `src/features/payload-admin/components/collection-reference-field/reorderable-table.tsx` (existing)
**Details:**
- In `SortableRow`, replace the raw `<button>` with the `Button` component (already imported)
- Props: `variant="admin-ghost"`, `size="icon"`, `className="rounded-full cursor-grab active:cursor-grabbing disabled:cursor-not-allowed disabled:opacity-50"`
- Pass `disabled={isSaving}`, `{...attributes}`, `{...listeners}` through to `Button`
- Keep `GripVertical` icon at `h-4 w-4`
- `rounded-full` overrides the `rounded-lg` from `admin-ghost` variant (Tailwind specificity: both are single utility classes, but since `rounded-full` comes from `className` prop it will be merged last by `cn()`)
- Remove old text color classes (`text-table-text-muted hover:text-table-text`) — the `admin-ghost` variant handles colors via `hover:text-accent-foreground`

**Rationale:** Spec explicitly requires replacing raw `<button>` with `Button variant="admin-ghost" size="icon"` and making it circular. The `admin-ghost` variant already provides `hover:bg-accent` for the circular background hover effect. The `Button` component uses `cn()` (clsx + tailwind-merge) for className merging, so `rounded-full` in className will properly override `rounded-lg` from the variant.

## Dependencies Between Steps

```
Step 1 (field factory) ──→ Step 2 (add to Doctors) [Step 2 imports from Step 1]

Step 3 (API endpoint)  ──→ Step 4 (client method)  ──→ Step 5 (rewrite hook)
                                                        [Step 5 calls method from Step 4]

Step 6 (drag handle styling) [independent — can be done in parallel with any step]
```

**Parallel tracks:**
- Track A: Steps 1 → 2 (schema changes)
- Track B: Steps 3 → 4 → 5 (batch API + client integration)
- Track C: Step 6 (styling — fully independent)

Steps 1-2 and Step 3 can be done in parallel. Step 4 depends on Step 3 (needs to know the endpoint URL). Step 5 depends on Step 4 (calls the new method).

## Refactoring Notes

- **`payloadAPI.updateItem()` in `payload-rest.ts`**: Keep it — it's a general-purpose method that may be used elsewhere. Don't remove it just because `use-reorder.ts` no longer calls it.
- **No changes to `use-collection-reference.ts`**: It already passes `sort: reorderable ? 'sortOrder' : undefined` to the query — this will work correctly once `sortOrder` exists on the collection.
- **No changes to `collection-reference-field.tsx`**: The `ReorderableContent` wrapper and `useReorder` hook API remain the same.

## Risk Areas

1. **Payload catch-all route priority**: The assumption that `api/batch-sort-order/route.ts` takes precedence over `api/[...slug]/route.ts` in different route groups is based on Next.js App Router behavior (specific routes > catch-all). If this doesn't work, the fallback is to place the route outside `/api/` (e.g., `/batch-sort-order/route.ts`) and adjust the client URL accordingly.

2. **`cn()` / tailwind-merge handling of `rounded-full` vs `rounded-lg`**: tailwind-merge should correctly resolve this conflict (both are `border-radius` utilities), keeping `rounded-full` since it comes last. If not, we can use `!rounded-full` for `!important`.

3. **Database migration**: Adding `sortOrder` field to Doctors requires a Payload migration. Since the project uses `push: false` in the postgres adapter, a migration file may need to be generated/run. The `defaultValue: 0` ensures existing rows get a sensible default.
