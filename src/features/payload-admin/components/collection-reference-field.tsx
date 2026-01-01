'use client';

import React, { useState, useMemo } from 'react';
import { useDocumentInfo, useAllFormFields } from '@payloadcms/ui';
import { DataTable } from '@/shared/components/data-table';
import type {
  DataTableColumn,
  DataTableAction,
} from '@/shared/components/data-table';
import type { CollectionReferenceFieldColumn } from '@/features/payload-admin';
import { useCollectionData } from '@/shared/hooks/use-collection-data';
import { Button } from '@/shared/components/ui-kit/button';

interface CollectionReferenceFieldProps {
  collectionSlug: string;
  title: string;
  description?: string;
  showTable?: boolean;
  columns?: CollectionReferenceFieldColumn[];
  pageSize?: number;
  filters?: Record<string, string>;
}

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
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { id } = useDocumentInfo();
  const [fields] = useAllFormFields();

  /**
   * Build where condition from filters config
   * Replaces $id and $field_name with actual document values
   */
  const whereCondition = useMemo(() => {
    if (!filters || Object.keys(filters).length === 0) {
      return undefined;
    }

    const whereCondition: Record<string, { equals: unknown }> = {};

    Object.entries(filters).forEach(([field, value]) => {
      // Handle special $-prefixed values (references to current document)
      if (typeof value === 'string' && value.startsWith('$')) {
        const fieldName = value.slice(1); // Remove $ prefix

        // $id is a special case - refers to document ID
        if (fieldName === 'id') {
          if (id) {
            whereCondition[field] = { equals: id };
          }
        } else {
          // $fieldName refers to a field in the current document
          const fieldValue = fields?.[fieldName]?.value;
          if (fieldValue !== undefined && fieldValue !== null) {
            whereCondition[field] = { equals: fieldValue };
          }
        }
      } else {
        // Static value - use as is
        whereCondition[field] = { equals: value };
      }
    });

    return Object.keys(whereCondition).length > 0 ? whereCondition : undefined;
  }, [filters, id, fields]);

  const { data: response, isLoading } = useCollectionData({
    collectionSlug,
    page: currentPage,
    limit: pageSize,
    enabled: showTable,
    where: whereCondition,
  });

  const data = response?.docs || [];
  const totalItems = response?.totalDocs || 0;

  const handleEdit = (row: Record<string, unknown>) => {
    const rowId = row.id;
    window.open(`/admin/collections/${collectionSlug}/${rowId}`, '_blank');
  };

  const dataTableColumns: DataTableColumn<Record<string, unknown>>[] =
    columns.map(col => ({
      key: col.key,
      label: col.label,
      render: col.render as
        | ((value: unknown, row: Record<string, unknown>) => React.ReactNode)
        | undefined,
    }));

  const actions: DataTableAction[] = [
    {
      label: 'Edit',
      onClick: handleEdit,
      variant: 'primary',
    },
  ];

  return (
    <div className="border-field-border bg-field-bg mb-4 rounded border p-4">
      <div className="mb-3">
        <strong className="text-field-text">{title}</strong>
        <p className="text-field-text-muted mt-2 text-sm">
          {description ||
            'Дані керуються через колекцію. Використайте поля нижче для вибору елементів.'}
        </p>
      </div>

      <Button variant="admin-secondary" size="admin-default" asChild>
        <a
          href={`/admin/collections/${collectionSlug}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Керувати {title?.toLowerCase()} →
        </a>
      </Button>

      {showTable && columns.length > 0 && (
        <div className="mt-4 w-full">
          {data.length > 0 ? (
            <DataTable
              data={data}
              columns={dataTableColumns}
              actions={actions}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              totalItems={totalItems}
              isLoading={isLoading}
              emptyMessage={`Немає даних для відображення`}
            />
          ) : !isLoading ? (
            <p className="text-field-text-muted text-sm">
              Немає даних для відображення
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
};
