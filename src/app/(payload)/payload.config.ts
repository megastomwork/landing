import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'
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
import { Articles } from '@/app/(payload)/collections/articles'
import { Doctors } from '@/app/(payload)/collections/doctors'
import { Services } from '@/app/(payload)/collections/services'
import { Feedbacks } from '@/app/(payload)/collections/feedbacks'
import { Socials } from '@/app/(payload)/collections/socials'
import { Questions } from '@/app/(payload)/collections/questions'
import { Schedule } from '@/app/(payload)/collections/schedule'
import { ServicePrices } from '@/app/(payload)/collections/service-prices'
import { Users } from '@/app/(payload)/collections/users'
import { Media } from '@/app/(payload)/collections/media'
import { Pages } from '@/app/(payload)/collections/pages'

// Globals
import { siteSettings } from '@/shared/payload/globals/site-settings'
import { contacts } from '@/shared/payload/globals/contacts'
import { Content } from '@/shared/payload/globals/content'
import { WorkingHours } from '@/shared/payload/globals/working-hours'
import { scrollModal } from '@/shared/payload/globals/scroll-modal'

// Config
import { SERVER_CONFIG } from '@/shared/constants/server-config.constants'
import { CONFIG } from '@/shared/constants/client-config.constants'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Determine if we're in production (Vercel) or development
const _ = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production'

export default buildConfig({
  serverURL: CONFIG.SERVER_URL,
  admin: {
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
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
  globals: [siteSettings, contacts, Content, WorkingHours, scrollModal],
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
  secret: SERVER_CONFIG.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, '../../shared/payload/payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: SERVER_CONFIG.DATABASE_URL,
      max: 3, // Limited connections to stay within Supabase free tier limits
      min: 0, // Don't keep idle connections
      idleTimeoutMillis: 30000, // 30 seconds
      connectionTimeoutMillis: 20000, // 20 seconds
      allowExitOnIdle: true, // Allow pool to shutdown when idle
    },
  }),
  cors: "*",
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        },
      },
      bucket: SERVER_CONFIG.S3_BUCKET,
      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId: SERVER_CONFIG.S3_ACCESS_KEY_ID,
          secretAccessKey: SERVER_CONFIG.S3_SECRET_ACCESS_KEY,
        },
        region: SERVER_CONFIG.S3_REGION,
        endpoint: SERVER_CONFIG.S3_ENDPOINT,
      },
    }),
  ],
})
