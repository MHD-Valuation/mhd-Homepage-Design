import React from 'react'
import { cookies } from 'next/headers'
import ContactClient from './ContactClient'

interface ContactPageProps {
  searchParams?: Promise<{
    locale?: string
  }>
}

export async function generateMetadata({ searchParams }: ContactPageProps) {
  const resolvedParams = searchParams ? await searchParams : {}
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('mhd_locale')?.value
  const locale = (resolvedParams.locale || localeCookie) === 'en' ? 'en' : 'vi'

  if (locale === 'en') {
    return {
      title: 'Contact & Quotation — MHD Valuation',
      description: 'Submit information for MHD Valuation to confirm work scope, dossiers, and formal quotation.',
    }
  }

  return {
    title: 'Liên hệ & Báo giá — MHD Thẩm định giá',
    description: 'Gửi thông tin để MHD xác nhận phạm vi công việc, hồ sơ cần cung cấp và lập báo giá thẩm định giá.',
  }
}

import { getCachedGlobal } from '@/lib/cachedQueries'

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const resolvedParams = searchParams ? await searchParams : {}
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('mhd_locale')?.value
  const currentLocale = (resolvedParams.locale || localeCookie) === 'en' ? 'en' : 'vi'

  const [footerData, siteSettings] = await Promise.all([
    getCachedGlobal('footer', currentLocale as 'vi' | 'en'),
    getCachedGlobal('site-settings', currentLocale as 'vi' | 'en'),
  ])

  const phone = (footerData as any)?.phone || (siteSettings as any)?.hotline || '1900 000 000'
  const email = (footerData as any)?.email || 'info@mhd.com.vn'
  const address = (footerData as any)?.address || (currentLocale === 'en' ? 'Ho Chi Minh City, Vietnam' : 'TP. Hồ Chí Minh, Việt Nam')

  return (
    <ContactClient
      currentLocale={currentLocale}
      contactInfo={{ phone, email, address }}
    />
  )
}
