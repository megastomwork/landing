'use client'

import React, { useEffect, useState } from 'react'

interface GlobalReferenceFieldProps {
  globalSlug: string
  title: string
  fields: string[]
  fieldLabels?: Record<string, string>
}

export const GlobalReferenceField: React.FC<GlobalReferenceFieldProps> = (props) => {
  const { globalSlug, title, fields, fieldLabels = {} } = props
  const [data, setData] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const response = await fetch(`/api/globals/${globalSlug}`)
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error(`Failed to fetch ${globalSlug}:`, error)
      } finally {
        setLoading(false)
      }
    }

    fetchGlobalData()
  }, [globalSlug])

  const getNestedValue = (obj: Record<string, unknown>, path: string): unknown => {
    return path.split('.').reduce((current, key) => {
      if (current && typeof current === 'object' && key in current) {
        return (current as Record<string, unknown>)[key]
      }
      return undefined
    }, obj as unknown)
  }

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
          ⚠️ {title}
        </strong>
        <p
          style={{
            margin: '0.5rem 0 0 0',
            fontSize: '0.875rem',
            color: 'var(--theme-elevation-600)',
          }}
        >
          Ці дані редагуються глобально. Зміни відобразяться на всіх сторінках.
        </p>
      </div>

      {loading ? (
        <p style={{ color: 'var(--theme-elevation-500)', fontSize: '0.875rem' }}>
          Завантаження...
        </p>
      ) : (
        <div
          style={{
            padding: '0.75rem',
            backgroundColor: 'var(--theme-elevation-100)',
            borderRadius: '4px',
            marginBottom: '0.75rem',
          }}
        >
          {fields.map((field) => {
            const value = data ? getNestedValue(data, field) : undefined
            const label = fieldLabels[field] || field

            return (
              <div key={field} style={{ marginBottom: '0.5rem' }}>
                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    color: 'var(--theme-elevation-600)',
                    marginBottom: '0.25rem',
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--theme-elevation-800)',
                  }}
                >
                  {Array.isArray(value)
                    ? value.map((item, idx) => (
                        <div key={idx} style={{ marginBottom: '0.25rem' }}>
                          {typeof item === 'object'
                            ? JSON.stringify(item)
                            : String(item || '—')}
                        </div>
                      ))
                    : String(value || '—')}
                </div>
              </div>
            )
          })}
        </div>
      )}

      <a
        href={`/admin/globals/${globalSlug}`}
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
        Редагувати {title.toLowerCase()} →
      </a>
    </div>
  )
}
