import { MetadataRoute } from 'next'
import { SERVICES_CATALOG } from '@/lib/services-data'
import { INSIGHT_POSTS } from '@/app/(frontend)/insights/defaultInsights'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://mhd.com.vn'
  const currentDate = new Date().toISOString()

  // 1. Static Core Pages
  const staticRoutes = [
    { url: `${baseUrl}`, priority: 1.0, changeFrequency: 'daily' as const },
    { url: `${baseUrl}/about`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/about/phap-ly`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/about/doi-tac`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/about/doi-ngu`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/services`, priority: 0.95, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/projects`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/insights`, priority: 0.85, changeFrequency: 'daily' as const },
    { url: `${baseUrl}/phap-ly/quy-trinh`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/phap-ly/tra-cuu`, priority: 0.85, changeFrequency: 'daily' as const },
    { url: `${baseUrl}/phap-ly/chinh-sach`, priority: 0.7, changeFrequency: 'yearly' as const },
    { url: `${baseUrl}/contact`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/tuyen-dung`, priority: 0.75, changeFrequency: 'weekly' as const },
  ]

  // 2. Service Detail Dynamic Pages
  const serviceRoutes = Object.keys(SERVICES_CATALOG).map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // 3. Project Categories
  const projectCategoryRoutes = [
    'doanh-nghiep',
    'bat-dong-san',
    'ha-tang',
    'may-thiet-bi',
    'tai-san-vo-hinh',
  ].map((cat) => ({
    url: `${baseUrl}/projects/${cat}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // 4. Insight Article Dynamic Pages
  const insightRoutes = INSIGHT_POSTS.map((post) => ({
    url: `${baseUrl}/insights/${post.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    ...staticRoutes.map((r) => ({
      url: r.url,
      lastModified: currentDate,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...serviceRoutes,
    ...projectCategoryRoutes,
    ...insightRoutes,
  ]
}
