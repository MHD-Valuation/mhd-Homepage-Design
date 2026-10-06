import React from 'react'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Be_Vietnam_Pro } from 'next/font/google'
import { getCachedGlobal } from '@/lib/cachedQueries'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import QuickContactWidget from '@/components/QuickContactWidget'
import './global.css'

const beVietnamPro = Be_Vietnam_Pro({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-be-vietnam-pro',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://mhd.com.vn'),
  title: {
    default: 'MHD — Thẩm định giá theo Chuẩn mực Việt Nam',
    template: '%s | MHD Valuation',
  },
  description:
    'MHD cung cấp dịch vụ thẩm định giá độc lập cho doanh nghiệp, bất động sản, hạ tầng khu công nghiệp, máy móc thiết bị và tài sản vô hình tuân thủ Chuẩn mực thẩm định giá Việt Nam và Luật Giá 2023.',
  keywords: [
    'thẩm định giá',
    'thẩm định giá doanh nghiệp',
    'thẩm định giá bất động sản',
    'thẩm định giá máy móc thiết bị',
    'MHD valuation',
    'chứng thư thẩm định giá',
    'chuẩn mực thẩm định giá Việt Nam',
    'M&A',
    'định giá tài sản vô hình',
  ],
  authors: [{ name: 'MHD Valuation' }],
  creator: 'MHD Valuation Team',
  publisher: 'Công ty TNHH Thẩm định giá MHD',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://mhd.com.vn',
    siteName: 'MHD Thẩm định giá — Vietnam Valuation Standards',
    title: 'MHD — Thẩm định giá theo Chuẩn mực Việt Nam',
    description:
      'Hơn 5.000 hồ sơ thẩm định giá doanh nghiệp, bất động sản và tài sản chuyên sâu được hệ thống ngân hàng thương mại và kiểm toán Big4 chấp thuận.',
    images: [
      {
        url: '/assets/hero-office.png',
        width: 1200,
        height: 630,
        alt: 'MHD Valuation — Trụ sở và năng lực thẩm định giá',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MHD — Thẩm định giá theo Chuẩn mực Việt Nam',
    description:
      'Hệ thống thẩm định giá độc lập, khách quan tuân thủ Chuẩn mực thẩm định giá Việt Nam và Luật Giá 2023.',
    images: ['/assets/hero-office.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('mhd_locale')?.value
  const currentLocale = localeCookie === 'en' ? 'en' : 'vi'

  // Fetch header, footer, and site-settings data using high-performance Next.js cache
  const [headerData, footerData, siteSettings] = await Promise.all([
    getCachedGlobal('header', currentLocale),
    getCachedGlobal('footer', currentLocale),
    getCachedGlobal('site-settings', currentLocale),
  ])

  return (
    <html lang={currentLocale} className={beVietnamPro.variable}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://pplx-res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://pplx-res.cloudinary.com" />
      </head>
      <body className={beVietnamPro.className}>
        <Header data={headerData} currentLocale={currentLocale} />
        {children}
        <Footer data={footerData} currentLocale={currentLocale} />
        <QuickContactWidget
          hotline={(siteSettings as any)?.hotline || '1900 000 000'}
          zaloNumber={(siteSettings as any)?.zaloNumber || '3920702626611603828'}
          zaloUrl={(siteSettings as any)?.zaloUrl || 'https://zalo.me/3920702626611603828'}
          workingHours={(siteSettings as any)?.workingHours}
          title={(siteSettings as any)?.quickContactTitle}
          phoneLabel={(siteSettings as any)?.phoneTitle}
          zaloLabel={(siteSettings as any)?.zaloTitle}
          currentLocale={currentLocale}
        />
      </body>
    </html>
  )
}
