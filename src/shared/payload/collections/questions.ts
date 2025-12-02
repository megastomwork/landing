import { GROUPS_LABELS } from '@/shared/payload/constants/groups'
import type { CollectionConfig } from 'payload'

export const Questions: CollectionConfig = {
  slug: 'questions',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'question',
    group: GROUPS_LABELS.REPUTATION,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      label: 'Питання',
      required: true,
      admin: {
        description: 'Часте питання від пацієнтів',
        placeholder: 'Наприклад: Чи болюче видаляти зуб?',
      },
      validate: (value: string) => {
        if (typeof value === 'string' && value.length < 5) {
          return 'Питання повинно містити щонайменше 5 символів'
        }
        return true
      },
    },
    {
      name: 'answer',
      type: 'textarea',
      label: 'Відповідь',
      required: true,
      admin: {
        description: 'Детальна відповідь на питання',
        placeholder: 'Введіть відповідь...',
        rows: 4,
      },
      validate: (value: string) => {
        if (typeof value === 'string' && value.length < 10) {
          return 'Відповідь повинна містити щонайменше 10 символів'
        }
        return true
      },
    },
  ],
}
