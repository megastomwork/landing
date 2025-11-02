import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

// Collections
import { Articles } from './src/payload/collections/Articles'
import { Doctors } from './src/payload/collections/Doctors'
import { Services } from './src/payload/collections/Services'
import { Feedbacks } from './src/payload/collections/Feedbacks'
import { Socials } from './src/payload/collections/Socials'
import { Questions } from './src/payload/collections/Questions'
import { Schedule } from './src/payload/collections/Schedule'
import { ServicePrices } from './src/payload/collections/ServicePrices'
import { Users } from './src/payload/collections/Users'
import { Media } from './src/payload/collections/Media'

// Globals
import { Contacts } from './src/payload/globals/Contacts'
import { Content } from './src/payload/globals/Content'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
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
  globals: [Contacts, Content],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
})
