'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/shared/components/ui-kit/button'

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
    <div className="mb-4 rounded border border-field-border bg-field-bg p-4">
      <div className="mb-3">
        <strong className="text-field-text">
          ⚠️ {title}
        </strong>
        <p className="mt-2 text-sm text-field-text-muted">
          Ці дані редагуються глобально. Зміни відобразяться на всіх сторінках.
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-field-text-muted">
          Завантаження...
        </p>
      ) : (
        <div className="mb-3 rounded bg-field-bg-secondary p-3">
          {fields.map((field) => {
            const value = data ? getNestedValue(data, field) : undefined
            const label = fieldLabels[field] || field

            return (
              <div key={field} className="mb-2">
                <div className="mb-1 text-xs font-semibold uppercase text-field-text-muted">
                  {label}
                </div>
                <div className="text-sm text-field-text">
                  {Array.isArray(value)
                    ? value.map((item, idx) => (
                        <div key={idx} className="mb-1">
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

      <Button variant='admin-secondary' size='admin-default' asChild>
        <a
          href={`/admin/globals/${globalSlug}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Редагувати {title.toLowerCase()} →
        </a>
      </Button>
    </div>
  )
}
