'use client';

import React, { useState, useCallback } from 'react';
import { DataTable, Pagination } from '@/shared/components/data-table';
import type { DataTableColumn, DataTableAction } from '@/shared/components/data-table';
import { Button } from '@/shared/components/ui-kit/button';
import { useCollectionReference } from './use-collection-reference';
import { useLoadMore } from './use-load-more';
import { useReorder } from './use-reorder';
import { ReorderableTable } from './reorderable-table';
import { LoadMoreButton } from './load-more-button';
import type { CollectionReferenceFieldProps } from './types';

export const CollectionReferenceField: React.FC<
  CollectionReferenceFieldProps
> = ({
  collectionSlug,
  title,
  description,
  showTable = false,
  columns = [],
  pageSize = 10,
  filters,
  reorderable = false,
  paginationType = 'page',
}) => {
  const isLoadMore = paginationType === 'load-more';

  return (
    <div className="border-field-border bg-field-bg mb-4 rounded border p-4">
			<div className="flex justify-between items-center">

				<div className="mb-3">
        <strong className="text-field-text">{title}</strong>
        <p className="text-field-text-muted mt-2 text-sm">
          {description ||
            'Дані керуються через колекцію. Використайте поля нижче для вибору елементів.'}
        </p>
      </div>

      <Button variant="admin-secondary" size="admin-default" asChild className="hover:bg-foreground/5">
        <a
          href={`/admin/collections/${collectionSlug}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Керувати колекцією →
        </a>
      </Button>
     </div>

      {showTable && columns.length > 0 && (
        <div className="mt-4 w-full">
          {isLoadMore ? (
            <LoadMoreTable
              collectionSlug={collectionSlug}
              columns={columns}
              pageSize={pageSize}
              filters={filters}
              reorderable={reorderable}
            />
          ) : (
            <PageTable
              collectionSlug={collectionSlug}
              columns={columns}
              pageSize={pageSize}
              filters={filters}
              reorderable={reorderable}
            />
          )}
        </div>
      )}
    </div>
  );
};

// Standard pagination table
function PageTable({
  collectionSlug,
  columns,
  pageSize,
  filters,
  reorderable,
}: {
  collectionSlug: string;
  columns: CollectionReferenceFieldProps['columns'] & object;
  pageSize: number;
  filters?: Record<string, string>;
  reorderable: boolean;
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, totalDocs, isLoading, refetch } = useCollectionReference({
    collectionSlug,
    filters,
    pageSize,
    page: currentPage,
    showTable: true,
    reorderable,
  });

  const handleEdit = (row: Record<string, unknown>) => {
    window.open(`/admin/collections/${collectionSlug}/${row.id}`, '_blank');
  };

  const dataTableColumns: DataTableColumn<Record<string, unknown>>[] =
    columns.map(col => ({
      key: col.key,
      label: col.label,
      render: col.render as
        | ((value: unknown, row: Record<string, unknown>) => React.ReactNode)
        | undefined,
    }));

  const actions: DataTableAction<Record<string, unknown>>[] = [
    { label: 'Edit', onClick: handleEdit, variant: 'primary' },
  ];

  const onReorderComplete = useCallback(() => {
    refetch();
  }, [refetch]);

  const totalPages = Math.ceil(totalDocs / pageSize);

  if (reorderable) {
    return (
      <>
        <ReorderableContent
          data={data}
          columns={dataTableColumns}
          actions={actions}
          collectionSlug={collectionSlug}
          isLoading={isLoading}
          onReorderComplete={onReorderComplete}
        />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            pageSize={pageSize}
            totalItems={totalDocs}
          />
        )}
      </>
    );
  }

  if (data.length === 0 && !isLoading) {
    return (
      <p className="text-field-text-muted text-sm">
        Немає даних для відображення
      </p>
    );
  }

  return (
    <DataTable
      data={data}
      columns={dataTableColumns}
      actions={actions}
      pageSize={pageSize}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      totalItems={totalDocs}
      isLoading={isLoading}
      emptyMessage="Немає даних для відображення"
    />
  );
}

function LoadMoreTable({
  collectionSlug,
  columns,
  pageSize,
  filters,
  reorderable,
}: {
  collectionSlug: string;
  columns: CollectionReferenceFieldProps['columns'] & object;
  pageSize: number;
  filters?: Record<string, string>;
  reorderable: boolean;
}) {
  const {
    items,
    hasNextPage,
    isLoading,
    isLoadingMore,
    loadMore,
    totalItems,
    refetch,
  } = useLoadMore({
    collectionSlug,
    filters,
    pageSize,
    showTable: true,
    reorderable,
  });

  const handleEdit = (row: Record<string, unknown>) => {
    window.open(`/admin/collections/${collectionSlug}/${row.id}`, '_blank');
  };

  const dataTableColumns: DataTableColumn<Record<string, unknown>>[] =
    columns.map(col => ({
      key: col.key,
      label: col.label,
      render: col.render as
        | ((value: unknown, row: Record<string, unknown>) => React.ReactNode)
        | undefined,
    }));

  const actions: DataTableAction<Record<string, unknown>>[] = [
    { label: 'Edit', onClick: handleEdit, variant: 'primary' },
  ];

  const onReorderComplete = useCallback(() => {
    refetch();
  }, [refetch]);

  if (reorderable) {
    return (
      <>
        <ReorderableContent
          data={items}
          columns={dataTableColumns}
          actions={actions}
          collectionSlug={collectionSlug}
          isLoading={isLoading}
          onReorderComplete={onReorderComplete}
        />
        {hasNextPage && (
          <LoadMoreButton onClick={loadMore} isLoading={isLoadingMore} />
        )}
      </>
    );
  }

  if (items.length === 0 && !isLoading) {
    return (
      <p className="text-field-text-muted text-sm">
        Немає даних для відображення
      </p>
    );
  }

  return (
    <>
      <DataTable
        data={items}
        columns={dataTableColumns}
        actions={actions}
        pageSize={items.length}
        totalItems={totalItems}
        isLoading={isLoading}
        emptyMessage="Немає даних для відображення"
        hidePagination
      />
      {hasNextPage && (
        <LoadMoreButton onClick={loadMore} isLoading={isLoadingMore} />
      )}
    </>
  );
}

function ReorderableContent({
  data,
  columns,
  actions,
  collectionSlug,
  isLoading,
  onReorderComplete,
}: {
  data: Record<string, unknown>[];
  columns: DataTableColumn<Record<string, unknown>>[];
  actions: DataTableAction<Record<string, unknown>>[];
  collectionSlug: string;
  isLoading: boolean;
  onReorderComplete: () => void;
}) {
  const {
    orderedItems,
    sensors,
    onDragStart,
    onDragEnd,
    onDragCancel,
    isSaving,
    activeId,
  } = useReorder({
    items: data,
    collectionSlug,
    onReorderComplete,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="border-table-border border-t-table-primary h-8 w-8 animate-spin rounded-full border-4" />
      </div>
    );
  }

  if (orderedItems.length === 0) {
    return (
      <p className="text-field-text-muted text-sm">
        Немає даних для відображення
      </p>
    );
  }

  return (
    <ReorderableTable
      items={orderedItems}
      columns={columns}
      actions={actions}
      isSaving={isSaving}
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
      activeId={activeId}
    />
  );
}
