'use client';

import React from 'react';
import {
  DndContext,
  closestCenter,
  DragOverlay,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { DataTableColumn, DataTableAction } from '@/shared/components/data-table';
import { Button } from '@/shared/components/ui-kit/button';
import { GripVertical, Pencil, Trash2 } from 'lucide-react';
import { TextCell } from '@/shared/components/data-table/cells';

interface ReorderableTableProps {
  items: Record<string, unknown>[];
  columns: DataTableColumn<Record<string, unknown>>[];
  actions?: DataTableAction<Record<string, unknown>>[];
  isSaving: boolean;
  sensors: ReturnType<typeof import('@dnd-kit/core').useSensors>;
  onDragStart: (event: { active: { id: string | number } }) => void;
  onDragEnd: (event: DragEndEvent) => void;
  onDragCancel: () => void;
  activeId: string | null;
}

function SortableRow({
  row,
  columns,
  actions,
  isSaving,
}: {
  row: Record<string, unknown>;
  columns: DataTableColumn<Record<string, unknown>>[];
  actions?: DataTableAction<Record<string, unknown>>[];
  isSaving: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: String(row.id) });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className="border-table-border hover:bg-table-hover border-b transition-colors last:border-b-0"
    >
      <td className="border-table-border border-r px-2 py-4 text-center">
        <Button
          variant="admin-ghost"
          size="icon"
          className="rounded-full cursor-grab active:cursor-grabbing disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isSaving}
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </Button>
      </td>
      {columns.map(column => {
        const value = row[column.key];
        return (
          <td
            key={column.key}
            className="border-table-border text-table-text border-r px-6 py-4 text-sm last:border-r-0"
          >
            <div className="line-clamp-4 h-full w-full">
              {column.render ? (
                column.render(value, row)
              ) : (
                <TextCell value={value} row={row} />
              )}
            </div>
          </td>
        );
      })}
      {actions && actions.length > 0 && (
        <td className="px-6 py-4 text-center">
          <div className="flex justify-center gap-2">
            {actions.map(action => (
              <Button
                key={action.label}
                onClick={() => action.onClick(row)}
                variant="admin-ghost"
                size="icon"
                className="h-full w-full"
                title={action.label}
              >
                {getActionIcon(action.label, action.variant)}
              </Button>
            ))}
          </div>
        </td>
      )}
    </tr>
  );
}

function getActionIcon(label: string, variant?: string) {
  if (label.toLowerCase().includes('edit') || variant === 'primary') {
    return <Pencil className="h-4 w-4" />;
  }
  if (label.toLowerCase().includes('delete') || variant === 'danger') {
    return <Trash2 className="h-4 w-4" />;
  }
  return null;
}

function DragOverlayRow({
  row,
  columns,
}: {
  row: Record<string, unknown>;
  columns: DataTableColumn<Record<string, unknown>>[];
}) {
  return (
    <table className="border-table-border bg-table-bg w-full border shadow-lg">
      <tbody>
        <tr className="border-table-border border-b">
          <td className="border-table-border border-r px-2 py-4 text-center">
            <GripVertical className="text-table-text-muted h-4 w-4" />
          </td>
          {columns.map(column => {
            const value = row[column.key];
            return (
              <td
                key={column.key}
                className="border-table-border text-table-text border-r px-6 py-4 text-sm last:border-r-0"
              >
                <div className="line-clamp-4 h-full w-full">
                  {column.render ? (
                    column.render(value, row)
                  ) : (
                    <TextCell value={value} row={row} />
                  )}
                </div>
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
}

export function ReorderableTable({
  items,
  columns,
  actions,
  isSaving,
  sensors,
  onDragStart,
  onDragEnd,
  onDragCancel,
  activeId,
}: ReorderableTableProps) {
  const activeItem = activeId
    ? items.find(item => String(item.id) === activeId)
    : null;

  return (
    <div className="relative">
      {isSaving && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50">
          <div className="border-table-border border-t-table-primary h-6 w-6 animate-spin rounded-full border-4" />
        </div>
      )}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragCancel={onDragCancel}
      >
        <div className="border-table-border bg-table-bg w-full overflow-hidden rounded-sm border">
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="border-table-border bg-table-header-bg border-b-2">
                <tr>
                  <th
                    scope="col"
                    className="border-table-border text-table-text-muted border-r px-2 py-4 text-center text-xs font-semibold tracking-wider uppercase"
                    style={{ width: '48px' }}
                  >
                    &nbsp;
                  </th>
                  {columns.map(column => (
                    <th
                      key={column.key}
                      scope="col"
                      className="border-table-border text-table-text-muted border-r px-6 py-4 text-left text-xs font-semibold tracking-wider uppercase last:border-r-0"
                      style={column.width ? { width: column.width } : undefined}
                    >
                      {column.label}
                    </th>
                  ))}
                  {actions && actions.length > 0 && (
                    <th
                      scope="col"
                      className="text-table-text-muted px-6 py-4 text-center text-xs font-semibold tracking-wider uppercase"
                      style={{ width: '80px' }}
                    >
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <SortableContext
                items={items.map(item => String(item.id))}
                strategy={verticalListSortingStrategy}
              >
                <tbody className="bg-table-bg">
                  {items.map(row => (
                    <SortableRow
                      key={String(row.id)}
                      row={row}
                      columns={columns}
                      actions={actions}
                      isSaving={isSaving}
                    />
                  ))}
                </tbody>
              </SortableContext>
            </table>
          </div>
        </div>
        <DragOverlay>
          {activeItem ? (
            <DragOverlayRow row={activeItem} columns={columns} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
