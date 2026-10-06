import 'dotenv/config'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor, HTMLConverterFeature } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Services } from './collections/Services'
import { Projects } from './collections/Projects'
import { Categories } from './collections/Categories'
import { Posts } from './collections/Posts'
import { Documents } from './collections/Documents'
import { Team } from './collections/Team'
import { Inquiries } from './collections/Inquiries'
import { Partners } from './collections/Partners'

import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isProd = process.env.NODE_ENV === 'production'

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`[config] Missing required environment variable: ${name}`)
  return value
}

const PAYLOAD_SECRET = requireEnv('PAYLOAD_SECRET')
if (isProd && PAYLOAD_SECRET.length < 32) {
  throw new Error('[config] PAYLOAD_SECRET must be at least 32 characters in production')
}

// Origins allowed to call the CMS API with credentials (CORS + CSRF).
// Strictly dynamically read from environment variables (NEXT_PUBLIC_SERVER_URL, ALLOWED_ORIGINS).
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3005'
const allowedOrigins = Array.from(
  new Set(
    [
      serverURL,
      ...(process.env.ALLOWED_ORIGINS || '').split(','),
    ]
      .map((o) => o.trim().replace(/\/$/, ''))
      .filter(Boolean),
  ),
)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' | MHD Valuation CMS',
      description: 'Hệ thống quản lý nội dung MHD Valuation',
    },
  },
  localization: {
    locales: [
      {
        label: 'Tiếng Việt',
        code: 'vi',
      },
      {
        label: 'English',
        code: 'en',
      },
    ],
    defaultLocale: 'vi',
    fallback: true,
  },
  globals: [
    Header,
    Footer,
    SiteSettings,
  ],
  collections: [
    Pages,
    Services,
    Projects,
    Categories,
    Posts,
    Documents,
    Team,
    Partners,
    Inquiries,
    Media,
    Users,
  ],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      HTMLConverterFeature({}),
    ],
  }),
  graphQL: { disable: true },
  secret: PAYLOAD_SECRET,
  serverURL,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: requireEnv('DATABASE_URI'),
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    },
    push: true,
  }),
  sharp,
  cors: allowedOrigins,
  csrf: allowedOrigins,
  // Bound relationship population so crafted ?depth= queries can't fan out
  maxDepth: 5,
  defaultDepth: 2,
  upload: {
    limits: { fileSize: 20 * 1024 * 1024 },
  },
})
