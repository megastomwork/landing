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
    <div
      style={{
        padding: '1rem',
        border: '1px solid var(--theme-elevation-200)',
        borderRadius: '4px',
        backgroundColor: 'var(--theme-elevation-50)',
        marginBottom: '1rem',
      }}
    >
      <div style={{ marginBottom: '0.75rem' }}>
        <strong style={{ color: 'var(--theme-elevation-800)' }}>
          ℹ️ {title}
        </strong>
        <p
          style={{
            margin: '0.5rem 0 0 0',
            fontSize: '0.875rem',
            color: 'var(--theme-elevation-600)',
          }}
        >
          {description || 'Дані керуються через колекцію. Використайте поля нижче для вибору елементів.'}
        </p>
      </div>

      <a
        href={`/admin/collections/${collectionSlug}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          padding: '0.5rem 1rem',
          backgroundColor: 'var(--theme-elevation-200)',
          color: 'var(--theme-elevation-800)',
          textDecoration: 'none',
          borderRadius: '4px',
          fontSize: '0.875rem',
          fontWeight: 500,
          border: '1px solid var(--theme-elevation-300)',
          transition: 'all 0.2s ease',
          marginBottom: showTable ? '1rem' : '0',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--theme-elevation-300)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--theme-elevation-200)'
        }}
      >
        Керувати {title.toLowerCase()} →
      </a>

      {showTable && columns.length > 0 && data.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
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
