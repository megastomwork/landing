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

// Config
import { SERVER_CONFIG } from '@/shared/constants/server-config.constants'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Determine if we're in production (Vercel) or development
const isProduction = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production'

console.log(SERVER_CONFIG)

// Connection pool configuration
const poolConfig = isProduction
  ? {
      // Production (Vercel) - minimal connections for serverless with Transaction mode
      connectionString: SERVER_CONFIG.DATABASE_URL,
      max: 1, // One connection per serverless function
      min: 0, // Don't keep connections open
      idleTimeoutMillis: 20000, // 20 seconds
      connectionTimeoutMillis: 10000, // 10 seconds
    }
  : {
      // Development - Session mode with conservative settings to avoid Supabase limits
      connectionString: SERVER_CONFIG.DATABASE_URL,
      max: 3, // Limited connections to stay within Supabase free tier limits
      min: 0, // Don't keep idle connections
      idleTimeoutMillis: 30000, // 30 seconds
      connectionTimeoutMillis: 20000, // 20 seconds
      allowExitOnIdle: true, // Allow pool to shutdown when idle
    }

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
  secret: SERVER_CONFIG.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, '../../shared/payload/payload-types.ts'),
  },
  db: postgresAdapter({
    pool: poolConfig,
  }),
  cors: [
    "http://localhost:3000",
    "https://megastom-frontend-git-payload-migration-ginetiks-projects.vercel.app"
  ],
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
