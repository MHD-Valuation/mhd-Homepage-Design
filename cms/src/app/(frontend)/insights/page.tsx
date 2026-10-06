import React from 'react'
import { cookies } from 'next/headers'
import InsightsFilterClient from './InsightsFilterClient'

interface InsightsPageProps {
  searchParams?: Promise<{
    locale?: string
    category?: string
  }>
}

export async function generateMetadata({ searchParams }: InsightsPageProps) {
  const resolvedParams = searchParams ? await searchParams : {}
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('mhd_locale')?.value
  const locale = (resolvedParams.locale || localeCookie) === 'en' ? 'en' : 'vi'

  if (locale === 'en') {
    return {
      title: 'Data & Insights — MHD Valuation',
      description: 'Market intelligence, technical valuation practices, and regulatory updates in Vietnam.',
    }
  }

  return {
    title: 'Dữ liệu & Insight — MHD Thẩm định giá',
    description: 'Thông tin thị trường, nghiệp vụ và quy định liên quan đến thẩm định giá. Dữ liệu khách hàng trong các bài phân tích đã được ẩn theo nguyên tắc bảo mật.',
  }
}

import { getCachedPostsList } from '@/lib/cachedQueries'

export default async function InsightsPage({ searchParams }: InsightsPageProps) {
  const resolvedParams = searchParams ? await searchParams : {}
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('mhd_locale')?.value
  const currentLocale = (resolvedParams.locale || localeCookie) === 'en' ? 'en' : 'vi'

  const cmsPosts = await getCachedPostsList(currentLocale as 'vi' | 'en')

  return <InsightsFilterClient currentLocale={currentLocale} initialPosts={cmsPosts} />
}
