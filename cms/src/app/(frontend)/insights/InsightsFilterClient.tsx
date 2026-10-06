'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { INSIGHT_CATEGORIES, INSIGHT_POSTS, InsightPost, getInsightCategories } from './defaultInsights'

interface Props {
  initialPosts?: any[]
  categories?: any[]
  currentLocale?: string
}

const TAG_LABELS_EN: Record<string, string> = {
  'Bất động sản': 'Real Estate',
  'Doanh nghiệp': 'Enterprise',
  'Chuẩn mực thẩm định giá': 'Valuation Standards',
  'Chứng thư': 'Valuation Certificate',
  'TP.HCM': 'HCMC',
  'Khu công nghiệp': 'Industrial Parks',
  'M&A': 'M&A',
  'Hà Nội': 'Hanoi',
  'Luật Giá 2023': 'Law on Price 2023',
  'Máy móc thiết bị': 'Machinery & Equipment',
  'Vay vốn': 'Bank Collateral',
  'Tài sản vô hình': 'Intangible Assets',
  'Thẩm định giá': 'Valuation',
}

export default function InsightsFilterClient({ currentLocale = 'vi', initialPosts }: Props) {
  const isEn = currentLocale === 'en'
  const categoriesList = getInsightCategories(currentLocale)
  const [selectedCat, setSelectedCat] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [tagFilter, setTagFilter] = useState<string | null>(null)
  const [limit, setLimit] = useState(8)

  // Listen to hash changes (e.g. #cm/thi-truong or #tag/bds)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace(/^#/, '')
      if (hash.startsWith('cm/')) {
        const catId = decodeURIComponent(hash.slice(3))
        setSelectedCat(catId || null)
        setTagFilter(null)
      } else if (hash.startsWith('tag/')) {
        const tag = decodeURIComponent(hash.slice(4))
        setTagFilter(tag || null)
        setSelectedCat(null)
      }
    }
    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  // Merge CMS posts with default posts
  const formattedCmsPosts: InsightPost[] = (initialPosts || []).map((doc: any) => ({
    slug: doc.slug,
    cat: typeof doc.category === 'object' && doc.category ? doc.category.slug : 'thi-truong',
    img: doc.coverImage?.url || doc.featuredImage?.url || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    date: doc.publishedAt ? new Date(doc.publishedAt).toLocaleDateString(isEn ? 'en-US' : 'vi-VN') : '01/09/2026',
    author: doc.author || (isEn ? 'MHD Research' : 'Phòng Nghiên cứu thị trường'),
    tags: doc.tags && Array.isArray(doc.tags) && doc.tags.length > 0 ? doc.tags : [isEn ? 'Valuation' : 'Thẩm định giá'],
    title: doc.title,
    excerpt: doc.summary,
    readTime: doc.readingTime || (isEn ? '4 min read' : '4 phút đọc'),
    body: [['p', doc.summary]],
  }))

  const allPosts = formattedCmsPosts.length > 0
    ? [...formattedCmsPosts, ...INSIGHT_POSTS.filter((p) => !formattedCmsPosts.some((cp) => cp.slug === p.slug))]
    : INSIGHT_POSTS

  // Calculate tag counts
  const tagCounts: Record<string, number> = {}
  allPosts.forEach((p) => {
    p.tags.forEach((t) => {
      tagCounts[t] = (tagCounts[t] || 0) + 1
    })
  })

  // Fixed order of tags matching reference exactly
  const defaultTagOrder = [
    'Bất động sản',
    'Doanh nghiệp',
    'Chuẩn mực thẩm định giá',
    'Chứng thư',
    'TP.HCM',
    'Khu công nghiệp',
    'M&A',
    'Hà Nội',
    'Luật Giá 2023',
    'Máy móc thiết bị',
    'Vay vốn',
    'Tài sản vô hình',
  ]
  const tagList = defaultTagOrder.filter((t) => tagCounts[t] !== undefined)

  // Category counts
  const catCounts: Record<string, number> = {}
  categoriesList.forEach((c) => {
    catCounts[c.id] = allPosts.filter((p) => p.cat === c.id).length
  })

  // Filtered posts
  const filteredPosts = allPosts.filter((p) => {
    if (selectedCat && p.cat !== selectedCat) return false
    if (tagFilter && !p.tags.includes(tagFilter)) return false
    if (query.trim()) {
      const q = query.toLowerCase()
      const inTitle = p.title.toLowerCase().includes(q)
      const inExcerpt = p.excerpt.toLowerCase().includes(q)
      const inTags = p.tags.some((t) => t.toLowerCase().includes(q))
      if (!inTitle && !inExcerpt && !inTags) return false
    }
    return true
  })

  const pagedPosts = filteredPosts.slice(0, limit)
  const hasMore = filteredPosts.length > limit

  const currentCatObj = categoriesList.find((c) => c.id === selectedCat)

  // Dynamic hero texts
  let heroTitle = isEn ? 'All Articles' : 'Tất cả bài viết'
  let heroDesc = isEn ? `${allPosts.length} articles` : `${allPosts.length} bài viết`

  if (query.trim()) {
    heroTitle = isEn ? `Search: "${query}"` : `Tìm kiếm: "${query}"`
    heroDesc = isEn ? `${filteredPosts.length} matching articles` : `${filteredPosts.length} bài viết phù hợp`
  } else if (tagFilter) {
    const displayTag = isEn ? (TAG_LABELS_EN[tagFilter] || tagFilter) : tagFilter
    heroTitle = isEn ? `Topic: ${displayTag}` : `Chủ đề: ${tagFilter}`
    heroDesc = isEn ? `${filteredPosts.length} articles` : `${filteredPosts.length} bài viết`
  } else if (currentCatObj) {
    heroTitle = currentCatObj.label
    heroDesc = `${filteredPosts.length} ${isEn ? 'articles' : 'bài viết'}`
  }

  const isFiltered = Boolean(selectedCat || tagFilter || query.trim())

  const clearAllFilters = () => {
    setSelectedCat(null)
    setTagFilter(null)
    setQuery('')
    if (window.location.hash) {
      window.history.pushState(null, '', window.location.pathname)
    }
  }

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section
        data-screen-label="Insight — Chuyên mục"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--c-page,#f6f5f2)',
          color: 'var(--c-ink,#16181c)',
          borderBottom: '1px solid var(--c-border,#e2e0da)',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            backgroundImage:
              'linear-gradient(rgba(var(--c-ink-rgb,22,24,28),.05) 1px,transparent 1px),linear-gradient(90deg,rgba(var(--c-ink-rgb,22,24,28),.05) 1px,transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'linear-gradient(100deg,transparent 0%,#000 50%,#000 75%,transparent 100%)',
            WebkitMaskImage: 'linear-gradient(100deg,transparent 0%,#000 50%,#000 75%,transparent 100%)',
          }}
        ></div>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-10%',
            top: '-40%',
            width: '620px',
            height: '620px',
            borderRadius: '50%',
            pointerEvents: 'none',
            background: 'radial-gradient(circle,rgba(var(--c-accent-rgb,217,79,10),.12),transparent 65%)',
            animation: 'mhdDrift 14s ease-in-out infinite alternate',
          }}
        ></div>
        <svg
          aria-hidden="true"
          viewBox="0 0 400 300"
          fill="none"
          style={{
            position: 'absolute',
            right: '4%',
            top: '6%',
            width: 'min(36%,400px)',
            height: 'auto',
            pointerEvents: 'none',
            opacity: 0.7,
          }}
        >
          <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'mhdFloatA 9s ease-in-out infinite alternate' }}>
            <polygon points="260,40 330,80 330,160 260,200 190,160 190,80" strokeWidth="1.2" stroke="var(--c-accent,#d94f0a)" />
          </g>
          <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'mhdSpin 40s linear infinite' }}>
            <circle cx="240" cy="140" r="110" strokeDasharray="3 12" stroke="rgba(var(--c-ink-rgb,22,24,28),.18)" />
          </g>
        </svg>

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '1240px',
            margin: '0 auto',
            padding: 'clamp(3rem,6vw,5rem) clamp(1rem,4vw,2.5rem) clamp(2.4rem,5vw,3.5rem)',
          }}
        >
          <nav
            aria-label="Breadcrumb"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '.5rem',
              flexWrap: 'wrap',
              fontSize: '.8rem',
              color: 'var(--c-faint,#8a8f96)',
              marginBottom: '1.6rem',
            }}
          >
            <Link href="/" style={{ color: 'var(--c-faint,#8a8f96)' }}>
              {isEn ? 'Home' : 'Trang chủ'}
            </Link>
            <span aria-hidden="true">/</span>
            <button
              type="button"
              onClick={clearAllFilters}
              style={{
                color: isFiltered ? 'var(--c-faint,#8a8f96)' : 'var(--c-ink,#16181c)',
                fontWeight: isFiltered ? 400 : 600,
                cursor: 'pointer',
              }}
            >
              {isEn ? 'Data & Insights' : 'Dữ liệu & Insight'}
            </button>
            <span aria-hidden="true">/</span>
            <span style={{ color: 'var(--c-ink,#16181c)', fontWeight: 600 }}>{heroTitle}</span>
          </nav>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1.6rem 3rem', flexWrap: 'wrap' }}>
            <div style={{ minWidth: 0, flex: '1 1 440px' }}>
              <h1
                style={{
                  fontFamily: "'Be Vietnam Pro',sans-serif",
                  fontWeight: 600,
                  fontSize: 'clamp(2.2rem,1.5rem + 2.6vw,3.5rem)',
                  lineHeight: 1.15,
                  letterSpacing: '-.02em',
                  marginBottom: '.9rem',
                  textWrap: 'balance',
                }}
              >
                {heroTitle}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem 1.2rem', flexWrap: 'wrap' }}>
                <p style={{ fontSize: 'clamp(1rem,.95rem + .3vw,1.12rem)', color: 'var(--c-muted,#5f656d)', maxWidth: '58ch', textWrap: 'pretty' }}>
                  {heroDesc}
                </p>
                {isFiltered && (
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    style={{
                      fontSize: '.84rem',
                      fontWeight: 700,
                      color: 'var(--c-accent,#d94f0a)',
                      cursor: 'pointer',
                      border: 'none',
                      background: 'none',
                    }}
                  >
                    {isEn ? 'Clear filters' : 'Xoá bộ lọc'}
                  </button>
                )}
              </div>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              role="search"
              style={{ position: 'relative', display: 'block', flex: '0 1 340px', minWidth: 'min(100%,260px)' }}
            >
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ position: 'absolute', left: '.95rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--c-faint,#8a8f96)' }}
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
              <input
                type="search"
                name="q"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={isEn ? 'Search articles...' : 'Tìm bài viết'}
                aria-label="Tìm bài viết"
                style={{
                  width: '100%',
                  padding: '.85rem 1rem .85rem 2.6rem',
                  border: '1px solid var(--c-border,#e2e0da)',
                  borderRadius: '8px',
                  background: '#fff',
                  font: 'inherit',
                  fontSize: '.92rem',
                  color: 'var(--c-ink,#16181c)',
                  outline: 'none',
                  transition: 'border-color .2s, box-shadow .2s',
                }}
              />
            </form>
          </div>
        </div>
      </section>

      {/* 2. ARTICLES LISTING & SIDEBAR (Matches Screenshot 1 100%) */}
      <section
        data-screen-label="Insight — Danh sách bài viết"
        style={{
          background: '#fff',
          padding: 'clamp(2.5rem,5vw,4rem) 0 clamp(4.5rem,8vw,7rem)',
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: '0 clamp(1rem,4vw,2.5rem)',
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) 280px',
            gap: 'clamp(2.5rem,5vw,5rem)',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Articles */}
          <div style={{ minWidth: 0 }}>
            {pagedPosts.length === 0 ? (
              <div style={{ padding: '4rem 0', color: 'var(--c-muted,#5f656d)' }}>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--c-ink,#16181c)', marginBottom: '.4rem' }}>
                  {isEn ? 'No matching articles' : 'Chưa có bài viết phù hợp'}
                </div>
                <div style={{ fontSize: '.9rem' }}>
                  {isEn ? 'Try another keyword or select another category.' : 'Thử từ khoá khác hoặc chọn chuyên mục khác.'}
                </div>
              </div>
            ) : (
              pagedPosts.map((post: InsightPost, idx: number) => {
                const catObj = categoriesList.find((c) => c.id === post.cat)
                const hasThumb = catObj?.mode === 'image' && Boolean(post.img)

                return (
                  <Link
                    key={post.slug || idx}
                    href={`/insights/${post.slug}`}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: hasThumb ? '240px minmax(0,1fr)' : 'minmax(0,1fr)',
                      gap: 'clamp(1rem,2.5vw,1.8rem)',
                      alignItems: 'start',
                      padding: '1.6rem 0',
                      borderBottom: '1px solid var(--c-border,#e2e0da)',
                      color: 'var(--c-ink,#16181c)',
                      textDecoration: 'none',
                      transition: 'all .2s',
                    }}
                    className="insight-listing-item"
                  >
                    {hasThumb && (
                      <span
                        style={{
                          display: 'block',
                          aspectRatio: '3/2',
                          borderRadius: '10px',
                          overflow: 'hidden',
                          background: 'var(--c-subtle,#eeece7)',
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.img}
                          alt={post.title}
                          loading="lazy"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </span>
                    )}

                    <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: '.45rem' }}>
                      <span style={{ display: 'flex', flexWrap: 'wrap', gap: '.3rem .9rem', fontSize: '.76rem' }}>
                        <span style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--c-accent,#d94f0a)' }}>
                          {catObj?.label || (isEn ? 'Category' : 'Chuyên mục')}
                        </span>
                        <span style={{ color: 'var(--c-faint,#8a8f96)' }}>
                          {post.date} · {post.readTime}
                        </span>
                      </span>

                      <span
                        style={{
                          display: 'block',
                          fontSize: 'clamp(1.05rem,1rem + .3vw,1.22rem)',
                          fontWeight: 700,
                          lineHeight: 1.4,
                          textWrap: 'pretty',
                          color: 'var(--c-ink,#16181c)',
                        }}
                      >
                        {post.title}
                      </span>

                      <span
                        style={{
                          display: 'block',
                          fontSize: '.9rem',
                          color: 'var(--c-muted,#5f656d)',
                          lineHeight: 1.6,
                          textWrap: 'pretty',
                        }}
                      >
                        {post.excerpt}
                      </span>
                    </span>
                  </Link>
                )
              })
            )}

            {hasMore && (
              <div style={{ marginTop: '2.4rem' }}>
                <button
                  type="button"
                  onClick={() => setLimit((prev) => prev + 6)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '.5rem',
                    border: '1.5px solid var(--c-ink,#16181c)',
                    color: 'var(--c-ink,#16181c)',
                    fontWeight: 700,
                    fontSize: '.88rem',
                    padding: '.8rem 1.5rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    background: 'none',
                    transition: 'all .2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--c-ink,#16181c)'
                    e.currentTarget.style.color = '#fff'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'none'
                    e.currentTarget.style.color = 'var(--c-ink,#16181c)'
                  }}
                >
                  {isEn ? 'Load more articles' : 'Xem thêm bài viết'}
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Sidebar (Matches Screenshot 1) */}
          <aside style={{ position: 'sticky', top: '96px', display: 'flex', flexDirection: 'column', gap: '2rem', minWidth: 0 }}>
            {/* Chuyên mục */}
            <div>
              <span
                style={{
                  display: 'block',
                  fontSize: '.74rem',
                  fontWeight: 700,
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  color: 'var(--c-ink,#16181c)',
                  paddingBottom: '.8rem',
                  borderBottom: '1px solid var(--c-border,#e2e0da)',
                }}
              >
                {isEn ? 'Categories' : 'Chuyên mục'}
              </span>

              {/* All posts item */}
              <button
                type="button"
                onClick={clearAllFilters}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '.8rem 0',
                  borderBottom: '1px solid var(--c-subtle,#eeece7)',
                  fontSize: '.9rem',
                  fontWeight: !selectedCat && !tagFilter && !query ? 700 : 400,
                  color: !selectedCat && !tagFilter && !query ? 'var(--c-accent,#d94f0a)' : 'var(--c-ink,#16181c)',
                  background: 'none',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span>{isEn ? 'All Articles' : 'Tất cả bài viết'}</span>
                <span
                  style={{
                    minWidth: '26px',
                    padding: '.1rem .45rem',
                    borderRadius: '999px',
                    fontSize: '.74rem',
                    fontWeight: 700,
                    textAlign: 'center',
                    background: 'var(--c-page,#f6f5f2)',
                    color: 'var(--c-muted,#5f656d)',
                  }}
                >
                  {allPosts.length}
                </span>
              </button>

              {/* Individual categories */}
              {categoriesList.map((c) => {
                const isActive = selectedCat === c.id
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setSelectedCat(c.id)
                      setTagFilter(null)
                      setQuery('')
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '.8rem 0',
                      borderBottom: '1px solid var(--c-subtle,#eeece7)',
                      fontSize: '.9rem',
                      fontWeight: isActive ? 700 : 400,
                      color: isActive ? 'var(--c-accent,#d94f0a)' : 'var(--c-ink,#16181c)',
                      background: 'none',
                      borderTop: 'none',
                      borderLeft: 'none',
                      borderRight: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span>{c.label}</span>
                    <span
                      style={{
                        minWidth: '26px',
                        padding: '.1rem .45rem',
                        borderRadius: '999px',
                        fontSize: '.74rem',
                        fontWeight: 700,
                        textAlign: 'center',
                        background: 'var(--c-page,#f6f5f2)',
                        color: 'var(--c-muted,#5f656d)',
                      }}
                    >
                      {catCounts[c.id] || 0}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Chủ đề (Tag Cloud) */}
            <div>
              <span
                style={{
                  display: 'block',
                  fontSize: '.74rem',
                  fontWeight: 700,
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  color: 'var(--c-ink,#16181c)',
                  paddingBottom: '.8rem',
                  borderBottom: '1px solid var(--c-border,#e2e0da)',
                  marginBottom: '1rem',
                }}
              >
                {isEn ? 'Topics' : 'Chủ đề'}
              </span>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.45rem' }}>
                {tagList.map((tag) => {
                  const isActive = tagFilter === tag
                  const displayTag = isEn ? (TAG_LABELS_EN[tag] || tag) : tag
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        if (isActive) {
                          setTagFilter(null)
                        } else {
                          setTagFilter(tag)
                          setSelectedCat(null)
                          setQuery('')
                        }
                      }}
                      style={{
                        padding: '.32rem .75rem',
                        borderRadius: '999px',
                        fontSize: '.8rem',
                        fontWeight: 600,
                        border: `1px solid ${isActive ? 'var(--c-accent,#d94f0a)' : 'var(--c-border,#e2e0da)'}`,
                        background: isActive ? 'rgba(217,79,10,.08)' : '#fff',
                        color: isActive ? 'var(--c-accent,#d94f0a)' : 'var(--c-ink,#16181c)',
                        cursor: 'pointer',
                        transition: 'all .2s',
                      }}
                    >
                      {displayTag}
                    </button>
                  )
                })}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
