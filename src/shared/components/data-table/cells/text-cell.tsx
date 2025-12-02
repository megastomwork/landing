import React from 'react';

export interface TextCellProps {
  value: unknown;
  row: Record<string, unknown>;
}

/**
 * Default cell component for displaying text content
 */
export function TextCell({ value }: TextCellProps) {
  return <span>{String(value ?? '')}</span>;
}
