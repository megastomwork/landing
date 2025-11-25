import type { Field } from 'payload'

/**
 * Schema for Doctors block
 * No custom fields needed - only displays collection reference UI
 */
export const createDoctorsBlockFields = (): Field[] => []
/**
 * Configuration for doctors collection reference field
 * Used by createCollectionReferenceField in the block definition
 */
export const doctorsReferenceConfig = {
  collectionSlug: 'doctors' as const,
  title: 'Лікарі',
  showTable: true,
  pageSize: 10,
  columns: [
    { key: 'name', label: "Ім'я" },
    { key: 'position', label: 'Посада' },
    { key: 'experience', label: 'Досвід' },
    { key: 'status', label: 'Статус' },
  ],
}
