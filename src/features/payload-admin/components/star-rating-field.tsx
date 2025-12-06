'use client';

import React from 'react';
import { useField } from '@payloadcms/ui';
import type { NumberFieldClientComponent } from 'payload';

export const StarRatingField: NumberFieldClientComponent = ({ path }) => {
  const { value, setValue } = useField<number>({ path });

  const currentValue = typeof value === 'number' ? value : 0;

  const handleStarClick = (rating: number) => {
    setValue(rating);
  };

  return (
    <div className="star-rating-field">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            onClick={() => handleStarClick(star)}
            className="cursor-pointer border-none bg-transparent p-0 transition-transform hover:scale-110"
            aria-label={`Оцінка ${star} з 5`}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill={star <= currentValue ? '#fbbf24' : '#e5e7eb'}
              stroke={star <= currentValue ? '#f59e0b' : '#d1d5db'}
              strokeWidth="1.5"
              className="transition-colors"
            >
              <title>star icon</title>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        ))}
      </div>
      <div className="text-field-text-muted mt-2 text-sm">
        Обрано: {currentValue}{' '}
        {currentValue === 1
          ? 'зірка'
          : currentValue >= 2 && currentValue <= 4
            ? 'зірки'
            : 'зірок'}
      </div>
    </div>
  );
};
