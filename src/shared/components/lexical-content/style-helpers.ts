import type { CSSProperties } from 'react';
import { TextFormat } from './types';

/**
 * Get text alignment style from format string
 */
export function getAlignmentStyle(
  format?: string | number
): CSSProperties | undefined {
  if (typeof format !== 'string' || format === 'left' || !format) {
    return undefined;
  }

  const validAlignments = ['center', 'right', 'justify'];
  if (validAlignments.includes(format)) {
    return { textAlign: format as 'center' | 'right' | 'justify' };
  }

  return undefined;
}

/**
 * Check if text format flag is set
 */
export function hasTextFormat(format: number, flag: TextFormat): boolean {
  return (format & flag) !== 0;
}

/**
 * Get indent style
 */
export function getIndentStyle(indent?: number): CSSProperties | undefined {
  if (!indent || indent === 0) {
    return undefined;
  }

  return {
    paddingLeft: `${indent * 2}rem`,
  };
}

/**
 * Merge multiple style objects
 */
export function mergeStyles(
  ...styles: (CSSProperties | undefined)[]
): CSSProperties | undefined {
  const merged = styles.filter(Boolean).reduce((acc, style) => {
    return { ...acc, ...style };
  }, {});

  return Object.keys(merged).length > 0 ? merged : undefined;
}
