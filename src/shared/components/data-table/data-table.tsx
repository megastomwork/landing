'use client';

import React, { useState, useMemo } from 'react';
import type { DataTableProps } from './types';
import { Pagination } from './pagination';
import { Button } from '@/shared/components/ui-kit/button';
import { Pencil, Trash2 } from 'lucide-react';
import { TextCell } from './cells';

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
  hidePagination = false,
}: DataTableProps<T>) {
  const [internalPage, setInternalPage] = useState(1);

  // Use controlled or uncontrolled pagination
  const currentPage = controlledPage ?? internalPage;
  const onPageChange = controlledPageChange ?? setInternalPage;
  const isControlled = controlledPage !== undefined;

  // Calculate pagination
  const totalItems = controlledTotalItems ?? data.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  // Get current page data (only if not controlled)
  const paginatedData = useMemo(() => {
    if (isControlled) {
      return data;
    }
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, pageSize, isControlled]);

  const getCellValue = (row: T, columnKey: string): unknown => {
    return row[columnKey];
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="border-table-border border-t-table-primary h-8 w-8 animate-spin rounded-full border-4" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-table-text-secondary flex flex-col items-center justify-center py-8">
        <svg
          className="text-table-text-secondary mb-2 h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <title>Empty state icon</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  const getActionIcon = (label: string, variant?: string) => {
    if (label.toLowerCase().includes('edit') || variant === 'primary') {
      return <Pencil className="h-4 w-4" />;
    }
    if (label.toLowerCase().includes('delete') || variant === 'danger') {
      return <Trash2 className="h-4 w-4" />;
    }
    return null;
  };

  const getButtonVariant = (
    variant?: string,
  ): 'admin-outline' | 'admin-ghost' | 'default' => {
    if (variant === 'danger') return 'admin-ghost';
    if (variant === 'secondary') return 'admin-ghost';
    return 'admin-outline';
  };

  return (
    <div className="border-table-border bg-table-bg w-full overflow-hidden rounded-sm border">
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="border-table-border bg-table-header-bg border-b-2">
            <tr>
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
          <tbody className="bg-table-bg">
            {paginatedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-table-border hover:bg-table-hover border-b transition-colors last:border-b-0"
              >
                {columns.map(column => {
                  const value = getCellValue(row, column.key);

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
            ))}
          </tbody>
        </table>
      </div>
      {!hidePagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          pageSize={pageSize}
          totalItems={totalItems}
        />
      )}
    </div>
  );
}
