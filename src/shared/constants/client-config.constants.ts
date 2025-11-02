import { z } from 'zod'

// Client-side config schema (NEXT_PUBLIC_* variables)
const clientConfigSchema = z.object({
  BACKEND_URL: z.string().url('NEXT_PUBLIC_BACKEND_URL must be a valid URL'),
  SERVER_URL: z.string().url('NEXT_PUBLIC_SERVER_URL must be a valid URL'),
})

// Parse and validate client config
const parseClientConfig = () => {
  const config = {
    BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  }

  try {
    return clientConfigSchema.parse(config)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.issues.map((err) => `${err.path.join('.')}: ${err.message}`).join('\n')
      throw new Error(`Client config validation failed:\n${messages}`)
    }
    throw error
  }
}

// Client config - can be used on both client and server
export const CLIENT_CONFIG = parseClientConfig()

// Legacy export for backwards compatibility
export const CONFIG = CLIENT_CONFIG
