import { z } from 'zod'

// Server-side config schema (private variables)
const serverConfigSchema = z.object({
  PAYLOAD_SECRET: z.string().min(1, 'PAYLOAD_SECRET is required'),
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid connection string'),
  S3_BUCKET: z.string().min(1, 'S3_BUCKET is required'),
  S3_ACCESS_KEY_ID: z.string().min(1, 'S3_ACCESS_KEY_ID is required'),
  S3_SECRET_ACCESS_KEY: z.string().min(1, 'S3_SECRET_ACCESS_KEY is required'),
  S3_REGION: z.string().min(1, 'S3_REGION is required'),
  S3_ENDPOINT: z.string().url('S3_ENDPOINT must be a valid URL'),
})

// Parse and validate server config
const parseServerConfig = () => {
  const config = {
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    S3_BUCKET: process.env.S3_BUCKET,
    S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
    S3_REGION: process.env.S3_REGION,
    S3_ENDPOINT: process.env.S3_ENDPOINT,
  }

  try {
    return serverConfigSchema.parse(config)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.issues.map((err) => `${err.path.join('.')}: ${err.message}`).join('\n')
      throw new Error(`Server config validation failed:\n${messages}`)
    }
    throw error
  }
}

// Server config - can only be used on server
export const SERVER_CONFIG = parseServerConfig()
