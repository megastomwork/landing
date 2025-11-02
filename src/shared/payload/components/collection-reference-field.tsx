'use client'

import React from 'react'

interface CollectionReferenceFieldProps {
  collectionSlug: string
  title: string
  description?: string
}

export const CollectionReferenceField: React.FC<CollectionReferenceFieldProps> = ({
  collectionSlug,
  title,
  description,
}) => {
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
    </div>
  )
}
