'use client'

import React, { useState } from 'react'
import { DataTable } from '@/shared/components/data-table'
import type { DataTableColumn, DataTableAction } from '@/shared/components/data-table'
import type { CollectionReferenceFieldColumn } from '@/shared/payload/fields/collection-reference-field'
import { useCollectionData } from '@/shared/hooks/use-collection-data'

interface CollectionReferenceFieldProps {
  collectionSlug: string
  title: string
  description?: string
  showTable?: boolean
  columns?: CollectionReferenceFieldColumn[]
  pageSize?: number
}

export const CollectionReferenceField: React.FC<CollectionReferenceFieldProps> = ({
  collectionSlug,
  title,
  description,
  showTable = false,
  columns = [],
  pageSize = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(1)

  const { data: response, isLoading } = useCollectionData({
    collectionSlug,
    page: currentPage,
    limit: pageSize,
    enabled: showTable,
  })

  const data = response?.docs || []
  const totalItems = response?.totalDocs || 0

  const handleEdit = (row: Record<string, unknown>) => {
    const id = row.id
    window.open(`/admin/collections/${collectionSlug}/${id}`, '_blank')
  }

  const dataTableColumns: DataTableColumn[] = columns.map((col) => ({
    key: col.key,
    label: col.label,
    render: col.render
      ? (value: unknown) => col.render!(value)
      : undefined,
  }))

  const actions: DataTableAction[] = [
    {
      label: 'Edit',
      onClick: handleEdit,
      variant: 'primary',
    },
  ]

  return (
    <div className="mb-4 rounded border border-field-border bg-field-bg p-4">
      <div className="mb-3">
        <strong className="text-field-text">
          ℹ️ {title}
        </strong>
        <p className="mt-2 text-sm text-field-text-muted">
          {description || 'Дані керуються через колекцію. Використайте поля нижче для вибору елементів.'}
        </p>
      </div>

      <a
        href={`/admin/collections/${collectionSlug}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-block rounded border border-field-border bg-field-link-bg px-4 py-2 text-sm font-medium text-field-text no-underline transition-all duration-200 hover:bg-field-link-hover ${showTable ? 'mb-4' : ''}`}
      >
        Керувати {title.toLowerCase()} →
      </a>

      {showTable && columns.length > 0 && data.length > 0 && (
        <div className="mt-4 w-full">
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
        </div>
      )}
    </div>
  )
}
