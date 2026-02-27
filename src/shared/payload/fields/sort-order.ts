import type { Field } from 'payload';

/**
 * Creates a hidden sortOrder field for collections that support drag-and-drop reordering.
 * Add this to any collection that uses `reorderable: true` in its reference field config.
 */
export function createSortOrderField(): Field {
  return {
    name: 'sortOrder',
    type: 'number',
    defaultValue: 0,
    admin: {
      hidden: true,
    },
    index: true,
  };
}
