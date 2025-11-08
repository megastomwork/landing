'use client'

import React, { useState, useMemo } from 'react'
import type { DataTableProps } from './types'
import { Pagination } from './pagination'

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
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-cyan-600" />
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-500">
        <svg
          className="mb-2 h-12 w-12 text-gray-400"
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

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  style={column.width ? { width: column.width } : undefined}
                >
                  {column.label}
                </th>
              ))}
              {actions && actions.length > 0 && (
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map((column) => {
                  const value = getCellValue(row, column.key)
                  return (
                    <td
                      key={column.key}
                      className="whitespace-nowrap px-6 py-4 text-sm text-gray-900"
                    >
                      {column.render ? column.render(value, row) : String(value ?? '')}
                    </td>
                  )
                })}
                {actions && actions.length > 0 && (
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      {actions.map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          onClick={() => action.onClick(row)}
                          className={`inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                            action.variant === 'danger'
                              ? 'bg-red-100 text-red-700 hover:bg-red-200'
                              : action.variant === 'secondary'
                                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                : 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'
                          }`}
                        >
                          {action.label}
                        </button>
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
