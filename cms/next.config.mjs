import path from 'path'
import { fileURLToPath } from 'url'
import { withPayload } from '@payloadcms/next/withPayload'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  poweredByHeader: false,
  compress: true,
  experimental: {
    reactCompiler: false,
    optimizePackageImports: ['@payloadcms/richtext-lexical'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  async rewrites() {
    return [
      { source: '/Dich-vu-:slug.dc.html', destination: '/services/Dich-vu-:slug' },
      { source: '/Du-lieu-Insight.dc.html', destination: '/insights' },
      { source: '/Du-lieu-Insight-Chuyen-muc.dc.html', destination: '/insights' },
      { source: '/Du-lieu-Insight-Chi-tiet.dc.html', destination: '/insights' },
      { source: '/Phap-ly-Tra-cuu.dc.html', destination: '/phap-ly/tra-cuu' },
      { source: '/Phap-ly-Quy-trinh.dc.html', destination: '/phap-ly/quy-trinh' },
      { source: '/Phap-ly-Chinh-sach.dc.html', destination: '/phap-ly/chinh-sach' },
      { source: '/Tuyen-dung.dc.html', destination: '/tuyen-dung' },
      { source: '/MHD About.dc.html', destination: '/about' },
      { source: '/MHD%20About.dc.html', destination: '/about' },
      { source: '/MHD Contact.dc.html', destination: '/contact' },
      { source: '/MHD%20Contact.dc.html', destination: '/contact' },
      { source: '/MHD Homepage v2.dc.html', destination: '/' },
      { source: '/MHD%20Homepage%20v2.dc.html', destination: '/' },
    ]
  },
}

export default withPayload(nextConfig)
