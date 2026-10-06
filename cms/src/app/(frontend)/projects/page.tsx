import React from 'react'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import ProjectsClient from './ProjectsClient'

interface ProjectsPageProps {
  searchParams?: Promise<{
    locale?: string
    category?: string
  }>
}

export async function generateMetadata({ searchParams }: ProjectsPageProps): Promise<Metadata> {
  const resolvedParams = searchParams ? await searchParams : {}
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('mhd_locale')?.value
  const locale = (resolvedParams.locale || localeCookie) === 'en' ? 'en' : 'vi'

  if (locale === 'en') {
    return {
      title: 'Featured Projects & Dossiers — MHD Valuation',
      description:
        'Selected valuation track record across enterprise equity, commercial real estate, industrial infrastructure, and intangible assets accepted by top banks.',
    }
  }

  return {
    title: 'Dự án & Hồ sơ Tiêu biểu — MHD Thẩm định giá',
    description:
      'Hồ sơ thẩm định giá tiêu biểu theo nhóm tài sản: doanh nghiệp, bất động sản, hạ tầng khu công nghiệp và máy móc thiết bị, được hệ thống ngân hàng chấp thuận.',
  }
}

import { DEFAULT_PROJECTS } from './defaultProjects'
import { getCachedProjectsData } from '@/lib/cachedQueries'

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const resolvedParams = searchParams ? await searchParams : {}
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('mhd_locale')?.value
  const currentLocale = (resolvedParams.locale || localeCookie) === 'en' ? 'en' : 'vi'
  const isEn = currentLocale === 'en'

  let projectsList: any[] = []

  try {
    const docs = await getCachedProjectsData(currentLocale as 'vi' | 'en')

    if (docs && docs.length > 0) {
      const defaultDataMap = new Map(
        (isEn ? DEFAULT_PROJECTS.en : DEFAULT_PROJECTS.vi).map((p) => [p.title.slice(0, 20), p])
      )

      projectsList = docs.map((d: any) => {
        const fallback = defaultDataMap.get(d.title?.slice(0, 20))
        return {
          id: d.id,
          title: d.title,
          category: d.category,
          client: d.client,
          valuationPurpose: d.valuationPurpose,
          scale: d.scale,
          year: d.year,
          image: d.coverImage?.url || fallback?.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
          location: fallback?.location || (isEn ? 'Vietnam' : 'Việt Nam'),
          highlights: fallback?.highlights || [],
        }
      })
    }
  } catch (e) {
    console.error('Error fetching CMS projects:', e)
  }

  // Fallback if CMS collection has no projects yet
  if (projectsList.length === 0) {
    projectsList = isEn ? DEFAULT_PROJECTS.en : DEFAULT_PROJECTS.vi
  }

  const category = resolvedParams.category || 'all'

  return (
    <ProjectsClient
      initialProjects={projectsList}
      activeCategory={category}
      currentLocale={currentLocale}
    />
  )
}
