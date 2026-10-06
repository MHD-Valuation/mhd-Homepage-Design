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

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const resolvedParams = searchParams ? await searchParams : {}
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('mhd_locale')?.value
  const currentLocale = (resolvedParams.locale || localeCookie) === 'en' ? 'en' : 'vi'

  return <ContactClient currentLocale={currentLocale} />
}
