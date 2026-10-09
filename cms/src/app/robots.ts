import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3005').replace(/\/$/, '')

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/*', '/api/*'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
