import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import {
  lexicalEditor,
  HeadingFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  ParagraphFeature,
  UnorderedListFeature,
  OrderedListFeature,
  BlockquoteFeature,
  FixedToolbarFeature,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

// Collections
import { Articles } from '@/shared/payload/collections/articles'
import { Doctors } from '@/shared/payload/collections/doctors'
import { Services } from '@/shared/payload/collections/services'
import { Feedbacks } from '@/shared/payload/collections/feedbacks'
import { Socials } from '@/shared/payload/collections/socials'
import { Questions } from '@/shared/payload/collections/questions'
import { Schedule } from '@/shared/payload/collections/schedule'
import { ServicePrices } from '@/shared/payload/collections/service-prices'
import { Users } from '@/shared/payload/collections/users'
import { Media } from '@/shared/payload/collections/media'
import { Pages } from '@/shared/payload/collections/pages'

// Globals
import { Contacts } from '@/shared/payload/globals/contacts'
import { Content } from '@/shared/payload/globals/content'
import { WorkingHours } from '@/shared/payload/globals/working-hours'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Pages,
    Articles,
    Doctors,
    Services,
    Feedbacks,
    Socials,
    Questions,
    Schedule,
    ServicePrices,
    Media,
  ],
  globals: [Contacts, Content, WorkingHours],
  editor: lexicalEditor({
    features: () => [
      FixedToolbarFeature(),
      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
      ParagraphFeature(),
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      UnorderedListFeature(),
      OrderedListFeature(),
      BlockquoteFeature(),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, '../../shared/payload/payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  cors: [
    "http://localhost:3000",
    "https://megastom-frontend-git-payload-migration-ginetiks-projects.vercel.app"
  ]
})
