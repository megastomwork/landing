'use client'

import React, { useState, useMemo } from 'react'
import type { DataTableProps } from './types'
import { Pagination } from './pagination'
import { Button } from '@/shared/components/ui-kit/button'
import { Pencil, Trash2 } from 'lucide-react'

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  actions,
  pageSize = 10,
  currentPage: controlledPage,
  onPageChange: controlledPageChange,
  totalItems: controlledTotalItems,
  isLoading = false,
  emptyMessage = 'No data available',
}: DataTableProps<T>) {
  const [internalPage, setInternalPage] = useState(1)

  // Use controlled or uncontrolled pagination
  const currentPage = controlledPage ?? internalPage
  const onPageChange = controlledPageChange ?? setInternalPage
  const isControlled = controlledPage !== undefined

  // Calculate pagination
  const totalItems = controlledTotalItems ?? data.length
  const totalPages = Math.ceil(totalItems / pageSize)

  // Get current page data (only if not controlled)
  const paginatedData = useMemo(() => {
    if (isControlled) {
      return data
    }
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return data.slice(startIndex, endIndex)
  }, [data, currentPage, pageSize, isControlled])

  const getCellValue = (row: T, columnKey: string): unknown => {
    return row[columnKey]
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-table-border border-t-table-primary" />
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-table-text-secondary">
        <svg
          className="mb-2 h-12 w-12 text-table-text-secondary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <p>{emptyMessage}</p>
      </div>
    )
  }

  const getActionIcon = (label: string, variant?: string) => {
    if (label.toLowerCase().includes('edit') || variant === 'primary') {
      return <Pencil className="h-4 w-4" />
    }
    if (label.toLowerCase().includes('delete') || variant === 'danger') {
      return <Trash2 className="h-4 w-4" />
    }
    return null
  }

  const getButtonVariant = (variant?: string): 'outline' | 'ghost' | 'default' => {
    if (variant === 'danger') return 'outline'
    if (variant === 'secondary') return 'ghost'
    return 'outline'
  }

  return (
    <div className="w-full overflow-hidden rounded-lg border-2 border-table-border bg-table-bg shadow-sm">
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="border-b-2 border-table-border bg-table-header-bg">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="border-r border-table-border px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-table-text-muted last:border-r-0"
                  style={column.width ? { width: column.width } : undefined}
                >
                  {column.label}
                </th>
              ))}
              {actions && actions.length > 0 && (
                <th
                  scope="col"
                  className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-table-text-muted"
                  style={{ width: '80px' }}
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-table-bg">
            {paginatedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-table-border transition-colors hover:bg-table-hover last:border-b-0"
              >
                {columns.map((column) => {
                  const value = getCellValue(row, column.key)
                  return (
                    <td
                      key={column.key}
                      className="border-r border-table-border px-6 py-4 text-sm text-table-text last:border-r-0"
                    >
                      {column.render ? column.render(value, row) : String(value ?? '')}
                    </td>
                  )
                })}
                {actions && actions.length > 0 && (
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      {actions.map((action, actionIndex) => (
                        <Button
                          key={actionIndex}
                          onClick={() => action.onClick(row)}
                          variant={getButtonVariant(action.variant)}
                          size="icon"
                          className="h-8 w-8"
                          title={action.label}
                        >
                          {getActionIcon(action.label, action.variant)}
                        </Button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        pageSize={pageSize}
        totalItems={totalItems}
      />
    </div>
  )
}
