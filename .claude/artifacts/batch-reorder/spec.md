# Batch Reorder for Collection Reference Field

## Goal

Replace the N individual PATCH requests on reorder with a single batch request, properly persist sort order by adding a `sortOrder` field to reorderable collections, and restyle the drag handle buttons.

## Context

- The `collection-reference-field` is a generic Payload CMS admin UI component that displays collection items in a reorderable table (drag-and-drop via `@dnd-kit`).
- **Current bug**: after drag-and-drop, `use-reorder.ts` fires N parallel `PATCH /api/{collection}/{id}` requests — one per item — to set `sortOrder`.
- **Critical issue**: `sortOrder` is NOT defined in any Payload collection schema (e.g. `Doctors`). Payload strips unknown fields, so **the current reordering does not persist at all**.
- The field type is `type: 'ui'` (renders custom component, stores no data in the parent document).
- Collections that use `reorderable: true`: currently only `doctors` (via `doctors-block.ts`), but the solution must remain generic.
- Payload CMS REST API bulk PATCH (`PATCH /api/{collection}?where=...`) sets the **same** value for all matched docs — it cannot set different `sortOrder` per document. A custom endpoint is required.

## Requirements

### Schema

- MUST add a `sortOrder` number field to every collection that uses `reorderable: true`
- `sortOrder` field MUST be hidden from admin UI (`admin.hidden: true` or `admin.position: 'sidebar'` + `admin.readOnly: true`)
- `sortOrder` MUST default to `0`
- `sortOrder` field SHOULD be created as a reusable field factory (e.g. `createSortOrderField()`) so any collection can opt-in

### Batch API Endpoint

- MUST create a Next.js API route (e.g. `POST /api/batch-sort-order`) that accepts a batch of sort order updates
- MUST accept request body: `{ collectionSlug: string, items: Array<{ id: string, sortOrder: number }> }`
- MUST update all items server-side using Payload Local API in a single handler (no N HTTP round-trips from client)
- MUST return success/failure result with details of any individual failures
- MUST validate that `collectionSlug` is a known collection
- MUST NOT expose ability to update arbitrary fields — only `sortOrder`

### Client-Side (`use-reorder.ts`)

- MUST replace N parallel `payloadAPI.updateItem()` calls with a single call to the batch endpoint
- MUST send only the items whose `sortOrder` actually changed (optimization: only items between old and new index)
- MUST keep optimistic UI update (immediately reorder local state before the request completes)
- MUST revert to previous order on failure
- MUST show saving indicator during the batch request

### Drag Handle Styling (`reorderable-table.tsx`)

Currently the drag handle is an unstyled raw `<button>` with only text color and cursor styles — no background, no shape:

```tsx
// Current — plain unstyled button
<button className="text-table-text-muted hover:text-table-text cursor-grab ...">
  <GripVertical className="h-4 w-4" />
</button>
```

- MUST replace raw `<button>` with `Button` component (`variant="admin-ghost"`, `size="icon"`)
- MUST make the button circular: `rounded-full` (overriding `rounded-lg` from `admin-ghost` variant)
- MUST show a circular background on hover (comes from `admin-ghost`: `hover:bg-accent`)
- MUST preserve `cursor-grab` / `active:cursor-grabbing` / `disabled:cursor-not-allowed` behavior
- MUST keep the `GripVertical` icon at current size (`h-4 w-4`)
- MUST pass dnd-kit `attributes` and `listeners` props through to the `Button`

### Backward Compatibility

- MUST NOT break non-reorderable collection-reference-fields
- MUST NOT change the public API of `createCollectionReferenceField`
- Existing collections without `sortOrder` field MUST continue to work (items render with default order)

## API Contract

### `POST /api/batch-sort-order`

```
Request:
{
  "collectionSlug": "doctors",
  "items": [
    { "id": "abc123", "sortOrder": 0 },
    { "id": "def456", "sortOrder": 1 },
    { "id": "ghi789", "sortOrder": 2 }
  ]
}

Response (success):
{
  "success": true,
  "updated": 3
}

Response (partial failure):
{
  "success": false,
  "updated": 2,
  "errors": [
    { "id": "ghi789", "message": "Document not found" }
  ]
}

Errors:
  400 — invalid body (missing collectionSlug, empty items)
  400 — unknown collectionSlug
  500 — server error
```

## Data Model

### New field for reorderable collections

```typescript
// Reusable field factory
function createSortOrderField(): Field {
  return {
    name: 'sortOrder',
    type: 'number',
    defaultValue: 0,
    admin: {
      hidden: true,  // invisible in admin UI
    },
    index: true,  // indexed for efficient sorting
  };
}
```

### Doctors collection (example)

```typescript
// src/shared/payload/collections/doctors.ts
export const Doctors: CollectionConfig = {
  slug: 'doctors',
  // ... existing config ...
  fields: [
    // ... existing fields ...
    createSortOrderField(),  // add this
  ],
};
```

## Edge Cases

- **Empty items array**: return success with `updated: 0`, no DB calls
- **Item ID not found**: skip that item, include in `errors` array, still update others
- **Concurrent reorders**: last write wins (acceptable for admin-only UI); optimistic UI + refetch on complete prevents stale state
- **Reorder during page load**: `isSaving` flag disables drag handles, preventing concurrent reorders
- **Collection without `sortOrder` field**: Payload will ignore the field update — the batch endpoint should still work but items won't actually be ordered. This is acceptable since only collections that opt-in with `createSortOrderField()` will have persistent ordering
- **Large collections**: reorder only sends changed items (items between drag source and target), not all N items

## Out of Scope

- Per-block/per-page ordering (current design is global ordering per collection — same order everywhere)
- Authentication/authorization on the batch endpoint (follows same pattern as existing Payload REST API — admin-only context)
- Migration of existing data (existing doctors will all have `sortOrder: 0`, admin reorders them once)
- Undo/redo for reordering
- Multi-page reordering (reorder only works within currently loaded items)

## Acceptance Criteria

- [ ] `sortOrder` number field exists on Doctors collection, hidden from admin UI
- [ ] Reusable `createSortOrderField()` factory exists for other collections to opt-in
- [ ] `POST /api/batch-sort-order` endpoint exists and handles batch updates
- [ ] Dragging a doctor in admin UI sends exactly 1 HTTP request (not N)
- [ ] After reorder + page refresh, doctors appear in the new order
- [ ] Saving indicator displays during the single batch request
- [ ] If the batch request fails, UI reverts to the previous order
- [ ] Non-reorderable collection-reference-fields continue to work unchanged
- [ ] No regressions in load-more and page pagination modes
- [ ] Drag handle uses `Button` with `admin-ghost` variant, `icon` size, and `rounded-full`
- [ ] Drag handle shows circular accent background on hover
