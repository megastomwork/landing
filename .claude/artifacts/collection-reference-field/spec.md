# Spec: CollectionReferenceField — Drag-and-Drop Reorder + Pagination Type

## Goal

Extend `CollectionReferenceField` with two new capabilities: (1) drag-and-drop row reordering to control display position, and (2) configurable pagination type (`page` | `load-more`) — while decomposing the component into a proper folder structure.

## Context

- `CollectionReferenceField` is a Payload CMS custom UI field used across multiple blocks (doctors, prices, feedbacks, FAQ, etc.)
- It displays a `DataTable` with collection data fetched via `useCollectionData` hook (Payload REST API)
- The component is growing — it currently mixes filter logic, data fetching, UI rendering, and table configuration in a single file (~150 lines)
- No DnD library exists in the project yet — need to add `@dnd-kit/core` + `@dnd-kit/sortable`
- The reorder feature works **client-side only**: it reorders the already-fetched rows displayed in the table. The new order is persisted by calling `PATCH /api/{collection}/{id}` to update a `sortOrder` field on each item
- Data from API should be fetched with `sort=sortOrder` to respect the persisted order
- The field config is defined in `fields/collection-reference-field.ts` which passes `clientProps` to the component — new props must be added there

## Requirements

### Drag-and-Drop Reorder
- MUST allow reordering rows by dragging them to a new position within the table
- MUST show a drag handle (grip icon) as the first column when reorder is enabled
- MUST visually indicate the dragged item and drop target during drag
- MUST persist the new order by PATCHing `sortOrder` on each affected item to the Payload REST API
- MUST fetch data sorted by `sortOrder` field when reorder is enabled
- MUST show a loading/saving indicator while the order is being persisted
- MUST be opt-in via a `reorderable` prop (default: `false`)
- MUST NOT break existing usage — all current blocks work unchanged
- SHOULD disable pagination controls during reorder save operation

### Pagination Type
- MUST support `paginationType` prop with values `"page"` (default) and `"load-more"`
- MUST keep existing behavior for `"page"` — standard pagination via `DataTable`
- MUST display a "Load more" button below the table for `"load-more"` type
- MUST accumulate loaded items across pages (infinite scroll pattern without auto-trigger)
- MUST show the "Load more" button only when there are more items (`hasNextPage`)
- MUST show a loading state on the "Load more" button while fetching
- MUST NOT show standard pagination controls in `"load-more"` mode
- MUST reset accumulated data when filters change

### Decomposition
- MUST move from single file `components/collection-reference-field.tsx` to folder `components/collection-reference-field/`
- MUST keep the same export path via `index.ts`
- MUST update the Payload field config path in `fields/collection-reference-field.ts` accordingly
- MUST update any imports that reference the old file path

## Design

### New Props (added to `CollectionReferenceFieldProps`)

```typescript
interface CollectionReferenceFieldProps {
  // ... existing props
  reorderable?: boolean;        // Enable drag-and-drop reorder (default: false)
  paginationType?: 'page' | 'load-more'; // Pagination style (default: 'page')
}
```

### New Props (added to `CollectionReferenceFieldOptions`)

```typescript
interface CollectionReferenceFieldOptions {
  // ... existing options
  reorderable?: boolean;
  paginationType?: 'page' | 'load-more';
}
```

### States

| State | Behavior |
|-------|----------|
| Default (page) | Standard DataTable with pagination — current behavior |
| Default (load-more) | Table with "Load more" button instead of pagination |
| Dragging | Row lifted with drag overlay, visual gap at drop position |
| Saving order | Spinner/disabled state on table while PATCH requests complete |
| Load more loading | "Load more" button shows spinner, existing data stays visible |
| All loaded | "Load more" button hidden |
| Empty | Current empty state behavior unchanged |

### Interaction: Drag-and-Drop

1. User grabs the drag handle (grip icon in first column)
2. Row lifts visually (drag overlay)
3. User drags to target position — other rows shift to indicate drop zone
4. User releases — row snaps to new position
5. Component calculates new `sortOrder` values for affected rows
6. PATCH requests sent to update `sortOrder` for each changed item
7. Table briefly shows saving indicator, then settles

### Interaction: Load More

1. First page of data loads automatically
2. If `hasNextPage` is true, a "Load more" button appears below the table
3. User clicks "Load more" — button shows loading state
4. Next page of items appended to the existing list
5. Repeat until `hasNextPage` is false, then button disappears

## File Structure (Decomposition)

```
features/payload-admin/components/collection-reference-field/
├── index.ts                          # Public API — re-exports CollectionReferenceField
├── collection-reference-field.tsx     # Main component (composition only)
├── use-collection-reference.ts        # Hook: filter building + data fetching
├── use-reorder.ts                     # Hook: DnD state + persist logic
├── use-load-more.ts                   # Hook: accumulate pages, load more logic
├── reorderable-table.tsx              # DnD-wrapped DataTable
├── load-more-button.tsx               # "Load more" button with loading state
└── types.ts                           # Shared types for this component
```

### Responsibility Breakdown

| File | Responsibility |
|------|---------------|
| `collection-reference-field.tsx` | Composition root — renders header, manage link, conditionally renders table variant |
| `use-collection-reference.ts` | Builds `whereCondition` from filters, calls `useCollectionData`, adds `sort` param |
| `use-reorder.ts` | Manages DnD sensors, `onDragEnd` handler, PATCH calls to persist `sortOrder` |
| `use-load-more.ts` | Accumulates pages into single array, tracks `hasNextPage`, exposes `loadMore()` |
| `reorderable-table.tsx` | Wraps `DataTable` rows with `@dnd-kit/sortable`, adds grip handle column |
| `load-more-button.tsx` | Button component with loading spinner |
| `types.ts` | `CollectionReferenceFieldProps`, internal types |

## Dependencies

### New Package: `@dnd-kit`

```
@dnd-kit/core
@dnd-kit/sortable
@dnd-kit/utilities
```

Rationale: `@dnd-kit` is the modern standard for React DnD — lightweight, accessible, supports keyboard, works well with tables. `react-beautiful-dnd` is deprecated.

### API Dependency: `sortOrder` Field

Collections that use `reorderable: true` MUST have a numeric `sortOrder` field. This is the responsibility of the Payload collection schema (not this component). The component will:
- Fetch with `sort=sortOrder`
- PATCH `{ sortOrder: <number> }` on each reordered item

## Edge Cases

- **Reorder + load-more**: When both `reorderable` and `paginationType: 'load-more'` are combined, reorder applies to the currently loaded items. Saving recalculates `sortOrder` for all visible items.
- **Reorder + page pagination**: Reorder applies only to items on the current page. This is acceptable since `sortOrder` is absolute — items retain their position globally.
- **Concurrent edits**: If another admin changes order while the current admin is viewing, the stale data will be overwritten on save. This is acceptable for an admin tool — no optimistic locking needed.
- **PATCH failure**: If one or more PATCH requests fail, show an error toast/message and refetch data to restore server state.
- **Empty table + reorder**: Drag handles hidden when no rows exist — no special handling needed.
- **Load more + filter change**: Accumulated data resets, page goes back to 1.
- **Reorder save during loading**: MUST prevent drag operations while a save is in progress.

## Out of Scope

- Auto-scroll infinite loading (scroll-triggered) — only button-triggered "load more"
- Drag-and-drop across pages (only within currently visible rows)
- Multi-row selection and batch reorder
- Undo/redo for reorder operations
- Creating the `sortOrder` field on Payload collections (schema responsibility)
- Keyboard-based reorder (future enhancement — `@dnd-kit` supports it but not wiring it now)

## Acceptance Criteria

- [ ] Existing blocks (doctors, prices, feedbacks, FAQ, etc.) render unchanged with no prop changes
- [ ] Adding `reorderable: true` to a block config shows drag handles in the table
- [ ] Dragging a row to a new position updates the table visually
- [ ] After drag-and-drop, PATCH requests update `sortOrder` for affected items
- [ ] Data refetches sorted by `sortOrder` when `reorderable` is enabled
- [ ] Adding `paginationType: 'load-more'` replaces pagination with a "Load more" button
- [ ] Clicking "Load more" appends next page of items to the list
- [ ] "Load more" button disappears when all items are loaded
- [ ] "Load more" button shows loading state while fetching
- [ ] Component folder structure matches the decomposition plan
- [ ] `fields/collection-reference-field.ts` updated with new options and correct component path
- [ ] No TypeScript errors, no console errors
