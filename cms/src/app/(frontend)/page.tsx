import React from 'react'
import { cookies } from 'next/headers'
import { getCachedHomepageData } from '@/lib/cachedQueries'
import Hero from '@/components/Hero'
import WhyUs from '@/components/WhyUs'
import Process from '@/components/Process'
import ServicesSection from '@/components/ServicesSection'
import PartnerPortal from '@/components/PartnerPortal'
import InsightsSection from '@/components/InsightsSection'
import TestimonialsAndCta from '@/components/TestimonialsAndCta'

interface PageProps {
  searchParams?: Promise<{ locale?: string }>
}

export default async function HomePage({ searchParams }: PageProps) {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('mhd_locale')?.value
  const resolvedParams = searchParams ? await searchParams : {}
  const locale = (resolvedParams?.locale || localeCookie) === 'en' ? 'en' : 'vi'

  let homePage: any = null
  let servicesList: any[] = []
  let teamList: any[] = []
  let postsList: any[] = []

  try {
    const data = await getCachedHomepageData(locale as 'vi' | 'en')
    homePage = data.homePage
    servicesList = data.servicesList
    teamList = data.teamList
    postsList = data.postsList
  } catch (error) {
    console.error('Cached fetch error on HomePage:', error)
  }

  const layoutBlocks = (homePage?.layout as any[]) || []

  // Helper to find block data
  const findBlock = (type: string) => layoutBlocks.find((b: any) => b.blockType === type)

  const heroData = findBlock('hero')
  const whyUsData = findBlock('whyUs')
  const processData = findBlock('process')
  const servicesData = findBlock('servicesBlock')
  const portalData = findBlock('partnerPortal')
  const insightsData = findBlock('insightsBlock')
  const ctaData = findBlock('ctaBanner')
  const testimonialsData = findBlock('testimonials')

  return (
    <main>
      <Hero data={heroData} currentLocale={locale} />
      <WhyUs data={whyUsData} teamMembers={teamList} currentLocale={locale} />
      <Process data={processData} currentLocale={locale} />
      <ServicesSection data={servicesData} servicesList={servicesList} currentLocale={locale} />
      <PartnerPortal data={portalData} currentLocale={locale} />
      <InsightsSection data={insightsData} posts={postsList} currentLocale={locale} />
      <TestimonialsAndCta data={ctaData} testimonialsData={testimonialsData} currentLocale={locale} />
    </main>
  )
}
