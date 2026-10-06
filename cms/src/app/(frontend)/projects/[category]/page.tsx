import React from 'react'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { getCachedProjectsData } from '@/lib/cachedQueries'
import ProjectsClient from '../ProjectsClient'
import { DEFAULT_PROJECTS } from '../defaultProjects'

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
  searchParams?: Promise<{
    locale?: string
  }>
}

const VALID_CATEGORIES = [
  'doanh-nghiep',
  'bat-dong-san',
  'ha-tang',
  'may-thiet-bi',
  'may-moc-thiet-bi',
  'tai-san-vo-hinh',
]

export async function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }))
}

export async function generateMetadata({ params, searchParams }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const resolvedParams = searchParams ? await searchParams : {}
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('mhd_locale')?.value
  const locale = (resolvedParams.locale || localeCookie) === 'en' ? 'en' : 'vi'
  const isEn = locale === 'en'

  const labels: Record<string, { vi: string; en: string }> = {
    'doanh-nghiep': {
      vi: 'Dự án Thẩm định giá Doanh nghiệp',
      en: 'Enterprise Valuation Projects',
    },
    'bat-dong-san': {
      vi: 'Dự án Thẩm định giá Bất động sản',
      en: 'Real Estate Valuation Projects',
    },
    'ha-tang': {
      vi: 'Dự án Hạ tầng & Nhà máy',
      en: 'Infrastructure & Plant Valuation Projects',
    },
    'may-thiet-bi': {
      vi: 'Dự án Máy móc thiết bị & Động sản',
      en: 'Plant & Equipment Valuation Projects',
    },
    'tai-san-vo-hinh': {
      vi: 'Dự án Thẩm định giá Tài sản vô hình',
      en: 'Intangible Asset Valuation Projects',
    },
  }

  const title = labels[category]?.[isEn ? 'en' : 'vi'] || (isEn ? 'Valuation Projects' : 'Dự án Thẩm định giá')

  return {
    title: `${title} — ${isEn ? 'MHD Valuation' : 'MHD Thẩm định giá'}`,
    description: isEn
      ? `Verified valuation dossiers and case studies for ${title} under Vietnamese Valuation Standards.`
      : `Hồ sơ thẩm định giá tiêu biểu thực tế cho ${title} theo Chuẩn mực thẩm định giá Việt Nam.`,
  }
}

export default async function ProjectCategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category } = await params
  if (!VALID_CATEGORIES.includes(category)) {
    notFound()
  }

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

  if (projectsList.length === 0) {
    projectsList = isEn ? DEFAULT_PROJECTS.en : DEFAULT_PROJECTS.vi
  }

  const normalizedCategory = category === 'may-moc-thiet-bi' ? 'may-thiet-bi' : category

  return (
    <ProjectsClient
      initialProjects={projectsList}
      activeCategory={normalizedCategory}
      currentLocale={currentLocale}
    />
  )
}
