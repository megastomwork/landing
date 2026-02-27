import { useState, useCallback, useEffect } from 'react';
import {
  useSensor,
  useSensors,
  PointerSensor,
  type DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import payloadAPI from '@/shared/lib/payload-rest';

interface UseReorderParams {
  items: Record<string, unknown>[];
  collectionSlug: string;
  onReorderComplete: () => void;
}

export function useReorder({
  items,
  collectionSlug,
  onReorderComplete,
}: UseReorderParams) {
  const [orderedItems, setOrderedItems] = useState(items);
  const [isSaving, setIsSaving] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Sync local state when items change externally (initial load, refetch)
  useEffect(() => {
    setOrderedItems(items);
  }, [items]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  const onDragStart = useCallback((event: { active: { id: string | number } }) => {
    setActiveId(String(event.active.id));
  }, []);

  const onDragEnd = useCallback(
    async (event: DragEndEvent) => {
      setActiveId(null);

      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = orderedItems.findIndex(
        item => String(item.id) === String(active.id),
      );
      const newIndex = orderedItems.findIndex(
        item => String(item.id) === String(over.id),
      );

      if (oldIndex === -1 || newIndex === -1) return;

      const reordered = arrayMove(orderedItems, oldIndex, newIndex);
      setOrderedItems(reordered);

      // Only send items whose sortOrder actually changed (between old and new index)
      const rangeStart = Math.min(oldIndex, newIndex);
      const rangeEnd = Math.max(oldIndex, newIndex);
      const changedItems = reordered
        .slice(rangeStart, rangeEnd + 1)
        .map((item, i) => ({
          id: String(item.id),
          sortOrder: rangeStart + i,
        }));

      const previousItems = orderedItems;
      setIsSaving(true);
      try {
        const result = await payloadAPI.batchUpdateSortOrder(collectionSlug, changedItems);

        if (!result.success) {
          console.error('Batch reorder partial failure:', result.errors);
          setOrderedItems(previousItems);
        }
      } catch (error) {
        console.error('Failed to persist reorder:', error);
        setOrderedItems(previousItems);
      } finally {
        setIsSaving(false);
        onReorderComplete();
      }
    },
    [orderedItems, collectionSlug, onReorderComplete],
  );

  const onDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  return {
    orderedItems,
    sensors,
    onDragStart,
    onDragEnd,
    onDragCancel,
    isSaving,
    activeId,
  };
}
