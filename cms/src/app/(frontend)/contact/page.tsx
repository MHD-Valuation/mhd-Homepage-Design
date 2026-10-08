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

  const phone = (siteSettings as any)?.officePhone || (footerData as any)?.phone || (siteSettings as any)?.hotline || '028 3515 3516'
  const email = (siteSettings as any)?.officeEmail || (footerData as any)?.email || 'contact@mhd.com.vn'
  const companyName = (siteSettings as any)?.officeCompany || (footerData as any)?.companyName || (currentLocale === 'en' ? 'MHD Valuation Co., Ltd.' : 'Công ty TNHH Thẩm định giá MHD')
  const address = (siteSettings as any)?.officeAddress || (footerData as any)?.address || (currentLocale === 'en' ? 'Ho Chi Minh City, Vietnam' : 'Số 00 Đường ABC, Phường X, TP. Hồ Chí Minh')
  const hoursWeekday = (siteSettings as any)?.officeHoursWeekday || (footerData as any)?.workingHours || (currentLocale === 'en' ? 'Monday – Friday: 8:00 – 17:30' : 'Thứ 2 – Thứ 6: 8:00 – 17:30')
  const hoursWeekend = (siteSettings as any)?.officeHoursWeekend || (currentLocale === 'en' ? 'Saturday: 8:00 – 12:00' : 'Thứ 7: 8:00 – 12:00')
  const mapUrl = (siteSettings as any)?.officeMapUrl || 'https://maps.google.com/?q=TP.+Ho+Chi+Minh'

  return (
    <ContactClient
      currentLocale={currentLocale}
      contactInfo={{
        phone,
        email,
        companyName,
        address,
        hoursWeekday,
        hoursWeekend,
        mapUrl,
      }}
    />
  )
}
