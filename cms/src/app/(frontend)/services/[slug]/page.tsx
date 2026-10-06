import React from 'react'
import { notFound } from 'next/navigation'
import { cookies } from 'next/headers'
import { getCachedServiceUpdates } from '@/lib/cachedQueries'
import { SERVICES_CATALOG, ServiceData, getServiceData, getServiceCatalog } from '@/lib/services-data'
import ServiceDetailClient from './ServiceDetailClient'

interface ServicePageProps {
  params: Promise<{
    slug: string
  }>
  searchParams?: Promise<{
    locale?: string
  }>
}

export async function generateStaticParams() {
  return Object.keys(SERVICES_CATALOG).map((slug) => ({ slug }))
}

export async function generateMetadata({ params, searchParams }: ServicePageProps) {
  const { slug } = await params
  const resolvedParams = searchParams ? await searchParams : {}
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('mhd_locale')?.value
  const locale = (resolvedParams?.locale || localeCookie) === 'en' ? 'en' : 'vi'
  const isEn = locale === 'en'

  const svc = getServiceData(slug, locale)
  if (!svc) return { title: isEn ? 'Valuation Services | MHD Valuation' : 'Dịch vụ thẩm định giá | MHD Thẩm định giá' }
  const titleClean = (svc.title || '').replace(/&amp;/g, '&').replace(/&;/g, '&')
  const descClean = (svc.sub || '').replace(/&amp;/g, '&').replace(/&;/g, '&')
  return {
    title: `${titleClean} — ${isEn ? 'MHD Valuation' : 'MHD Thẩm định giá'}`,
    description: descClean,
  }
}

export default async function ServiceDetailPage({ params, searchParams }: ServicePageProps) {
  const { slug } = await params
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('mhd_locale')?.value
  const resolvedParams = searchParams ? await searchParams : {}
  const locale = (resolvedParams?.locale || localeCookie) === 'en' ? 'en' : 'vi'

  const svc = getServiceData(slug, locale)

  if (!svc) {
    notFound()
  }

  // Fetch CMS service updates if any to supplement catalog (cached)
  let mergedService = { ...svc }
  const cmsDoc = await getCachedServiceUpdates(svc.slug, locale as 'vi' | 'en')
  if (cmsDoc) {
    if (cmsDoc.title) mergedService.title = cmsDoc.title
    if (cmsDoc.shortDescription) mergedService.sub = cmsDoc.shortDescription
  }

  // Clean any HTML entities or typos in title
  if (mergedService.title) {
    mergedService.title = mergedService.title.replace(/&amp;/g, '&').replace(/&;/g, '&')
  }
  if (mergedService.sub) {
    mergedService.sub = mergedService.sub.replace(/&amp;/g, '&').replace(/&;/g, '&')
  }

  return (
    <ServiceDetailClient
      service={mergedService}
      allServices={Object.values(getServiceCatalog(locale))}
      currentLocale={locale}
    />
  )
}

