'use client';

import React from 'react';
import { Button } from '@/shared/components/ui-kit/button';

interface LoadMoreButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export function LoadMoreButton({ onClick, isLoading }: LoadMoreButtonProps) {
  return (
    <div className="mt-3 flex justify-center">
      <Button
        variant="admin-ghost"
        size="admin-default"
        onClick={onClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="border-current h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
            Завантаження...
          </span>
        ) : (
          'Завантажити ще'
        )}
      </Button>
    </div>
  );
}
