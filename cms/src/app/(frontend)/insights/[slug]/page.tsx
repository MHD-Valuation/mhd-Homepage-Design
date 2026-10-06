import React from 'react'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { getCachedInsightArticle } from '@/lib/cachedQueries'
import { INSIGHT_POSTS, INSIGHT_CATEGORIES, getInsightCategories } from '../defaultInsights'
import ArticleDetailClient from './ArticleDetailClient'

interface ArticlePageProps {
  params: Promise<{
    slug: string
  }>
  searchParams?: Promise<{
    locale?: string
  }>
}

export async function generateMetadata({ params, searchParams }: ArticlePageProps) {
  const { slug } = await params
  const defaultPost = INSIGHT_POSTS.find((p) => p.slug === slug)
  if (defaultPost) {
    return {
      title: `${defaultPost.title} — MHD Insight`,
      description: defaultPost.excerpt,
    }
  }

  const resolvedParams = searchParams ? await searchParams : {}
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('mhd_locale')?.value
  const locale = (resolvedParams.locale || localeCookie) === 'en' ? 'en' : 'vi'

  const p: any = await getCachedInsightArticle(slug, locale as 'vi' | 'en')
  if (p) {
    return {
      title: `${p.title} — MHD Insight`,
      description: p.summary,
    }
  }

  return { title: locale === 'en' ? 'Article — MHD Valuation' : 'Bài viết — MHD Thẩm định giá' }
}

export default async function InsightArticlePage({ params, searchParams }: ArticlePageProps) {
  const { slug } = await params
  const resolvedParams = searchParams ? await searchParams : {}
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('mhd_locale')?.value
  const currentLocale = (resolvedParams.locale || localeCookie) === 'en' ? 'en' : 'vi'
  const isEn = currentLocale === 'en'

  // Look in default insights first
  const defaultPost = INSIGHT_POSTS.find((p) => p.slug === slug)
  let post: any = defaultPost || null

  if (!post) {
    const doc: any = await getCachedInsightArticle(slug, currentLocale as 'vi' | 'en')
    if (doc) {
      post = {
        slug: doc.slug,
        cat: typeof doc.category === 'object' && doc.category ? (doc.category as any).slug : 'thi-truong',
        img: doc.featuredImage?.url || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
        date: doc.publishedAt ? new Date(doc.publishedAt).toLocaleDateString(isEn ? 'en-US' : 'vi-VN') : '01/09/2026',
        author: doc.author || 'MHD Valuation',
        tags: doc.tags || ['Thẩm định giá'],
        title: doc.title,
        excerpt: doc.summary,
        readTime: doc.readingTime || (isEn ? '4 min read' : '4 phút đọc'),
        body: [['p', doc.summary]],
      }
    }
  }

  if (!post) {
    notFound()
  }

  const catObj = getInsightCategories(currentLocale).find((c) => c.id === post.cat)
  const catLabel = catObj?.label || (isEn ? 'Market News' : 'Tin thị trường')

  // Find posts in same category (excluding current)
  const sameCatPosts = INSIGHT_POSTS.filter((p) => p.cat === post.cat && p.slug !== post.slug).slice(0, 3)

  // Find related posts by tags (excluding current)
  const relatedPosts = INSIGHT_POSTS.filter(
    (p) => p.slug !== post.slug && p.tags.some((t: string) => post.tags.includes(t))
  ).slice(0, 3)

  return (
    <ArticleDetailClient
      post={post}
      sameCatPosts={sameCatPosts}
      relatedPosts={relatedPosts}
      isEn={isEn}
      catLabel={catLabel}
    />
  )
}
