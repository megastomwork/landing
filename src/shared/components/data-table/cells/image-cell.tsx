import React from 'react';
import Image from 'next/image';

export interface ImageCellProps {
  value: unknown;
  row: Record<string, unknown>;
}

interface MediaValue {
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
}

/**
 * Cell component for displaying images
 * Handles both media objects and direct URL strings
 */
export function ImageCell({ value }: ImageCellProps) {
  // Handle media object
  if (value && typeof value === 'object' && 'url' in value) {
    const media = value as MediaValue;
    if (!media.url) return <span className="text-gray-400">No image</span>;

    return (
      <div className="flex items-center">
        <Image
          src={media.url}
          alt={media.alt || 'Image'}
          width={32}
          height={32}
          className="h-8 w-8 rounded object-contain"
        />
      </div>
    );
  }

  // Handle direct URL string
  if (typeof value === 'string' && value) {
    return (
      <div className="flex items-center">
        <Image
          src={value}
          alt="Image"
          width={32}
          height={32}
          className="h-8 w-8 rounded object-contain"
        />
      </div>
    );
  }

  return <span className="text-gray-400">No image</span>;
}
