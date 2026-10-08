import React from 'react'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { getCachedTeamList } from '@/lib/cachedQueries'
import TeamClient from './TeamClient'

interface PageProps {
  searchParams?: Promise<{ locale?: string }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedParams = searchParams ? await searchParams : {}
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('mhd_locale')?.value
  const locale = (resolvedParams.locale || localeCookie) === 'en' ? 'en' : 'vi'

  if (locale === 'en') {
    return {
      title: 'Certified Valuers & Valuation Team — MHD Valuation',
      description:
        'Directory of Certified Practicing Valuers licensed by the Ministry of Finance Vietnam, senior consultants, and quality control experts at MHD.',
    }
  }

  return {
    title: 'Đội ngũ Thẩm định viên & Chuyên môn — MHD Thẩm định giá',
    description:
      'Danh bạ thẩm định viên về giá đủ điều kiện hành nghề theo quy định của Bộ Tài chính, chuyên gia định giá tài sản và hội đồng kiểm soát chất lượng MHD.',
  }
}

export default async function TeamPage({ searchParams }: PageProps) {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('mhd_locale')?.value
  const resolvedParams = searchParams ? await searchParams : {}
  const locale = (resolvedParams?.locale || localeCookie) === 'en' ? 'en' : 'vi'

  const teamList = await getCachedTeamList(locale as 'vi' | 'en')

  return (
    <TeamClient
      initialTeam={teamList}
      currentLocale={locale}
    />
  )
}
