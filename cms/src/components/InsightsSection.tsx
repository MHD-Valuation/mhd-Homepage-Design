'use client'

import React from 'react'
import { cleanNavHref } from '@/lib/cleanUrl'

interface InsightsSectionProps {
  data?: any
  posts?: any[]
  currentLocale?: string
}

export default function InsightsSection({ data, posts = [], currentLocale = 'vi' }: InsightsSectionProps) {
  const isEn = currentLocale === 'en'
  const badge = data?.badge || (isEn ? 'Data & Insights' : 'Dữ liệu & Insight')
  const title = data?.heading || data?.title || (isEn ? 'Market Analysis & Valuation Trends' : 'Thông tin thị trường và chuyên môn')
  const description =
    data?.description ||
    (isEn
      ? 'Periodic analysis by industry, region, and asset class based on actual valuation data from MHD. Client data is strictly confidential.'
      : 'Nội dung được tổng hợp theo ngành, khu vực và loại tài sản từ nguồn thông tin phù hợp. Dữ liệu khách hàng được bảo mật theo quy định.')

  const rawViewAllText = data?.viewAllText || (isEn ? 'View all articles' : 'Xem tất cả bài viết')
  const viewAllText = rawViewAllText.replace(/[→\->\s]+$/, '').trim()
  const viewAllUrl = cleanNavHref(data?.viewAllUrl || '/insights')

  const defaultCategoryChips = isEn
    ? [
        { name: 'Market News', slug: 'thi-truong' },
        { name: 'Valuation Knowledge', slug: 'kien-thuc' },
        { name: 'Policy & Legal', slug: 'chinh-sach' },
        { name: 'Case study', slug: 'case-study' },
        { name: 'Market Reports', slug: 'bao-cao' },
      ]
    : [
        { name: 'Tin thị trường', slug: 'thi-truong' },
        { name: 'Kiến thức thẩm định giá', slug: 'kien-thuc' },
        { name: 'Chính sách & Pháp lý', slug: 'chinh-sach' },
        { name: 'Case study', slug: 'case-study' },
        { name: 'Báo cáo thị trường', slug: 'bao-cao' },
      ]

  const categoryChips = data?.categoryChips && data.categoryChips.length > 0 ? data.categoryChips : defaultCategoryChips

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return isEn ? 'September 5, 2026' : '05 Tháng 9, 2026'
    try {
      return new Date(dateStr).toLocaleDateString(isEn ? 'en-US' : 'vi-VN', {
        day: '2-digit',
        month: isEn ? 'short' : 'long',
        year: 'numeric',
      })
    } catch {
      return dateStr
    }
  }

  // Featured article from CMS or fallback
  const featured = posts[0] || {}
  const featTitle =
    featured.title || (isEn ? 'Central HCMC Real Estate Price Movements Q3' : 'Biến động giá bất động sản khu vực trung tâm TP.HCM quý 3')
  const featDesc =
    featured.summary ||
    (isEn
      ? 'Analysis of land and apartment price trends in central districts based on actual appraisal data.'
      : 'Phân tích xu hướng giá đất và căn hộ tại các quận trung tâm dựa trên dữ liệu thẩm định thực tế.')
  const featCategory = featured.category?.name || (isEn ? 'Market News' : 'Tin thị trường')
  const featDate = formatDate(featured.publishedAt || featured.publishedDate)
  const featImage =
    featured.coverImage?.url ||
    featured.featuredImage?.url ||
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80'
  const featUrl = featured.slug ? `/insights/${featured.slug}` : '/insights'

  // Sub article 1
  const sub1 = posts[1] || {}
  const sub1Title =
    sub1.title || (isEn ? '3 Common Approaches in Enterprise Valuation' : '3 cách tiếp cận phổ biến khi thẩm định giá trị doanh nghiệp')
  const sub1Category = sub1.category?.name || (isEn ? 'Valuation Knowledge' : 'Kiến thức thẩm định giá')
  const sub1Date = formatDate(sub1.publishedAt || sub1.publishedDate)
  const sub1Image =
    sub1.coverImage?.url ||
    sub1.featuredImage?.url ||
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
  const sub1Url = sub1.slug ? `/insights/${sub1.slug}` : '/insights'

  // Sub article 2
  const sub2 = posts[2] || {}
  const sub2Title =
    sub2.title || (isEn ? 'Circular 36/2024/TT-BTC Update on Enterprise Valuation' : 'Cập nhật Thông tư 36/2024/TT-BTC về thẩm định giá doanh nghiệp')
  const sub2Category = sub2.category?.name || (isEn ? 'Policy & Legal' : 'Chính sách & Pháp lý')
  const sub2Date = formatDate(sub2.publishedAt || sub2.publishedDate)
  const sub2Image =
    sub2.coverImage?.url ||
    sub2.featuredImage?.url ||
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80'
  const sub2Url = sub2.slug ? `/insights/${sub2.slug}` : '/insights'

  return (
    <section id="insight" data-screen-label="Insight" style={{ background: 'var(--c-page,#f6f5f2)', padding: 'clamp(5rem,9vw,8.5rem) 0' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem,4vw,2.5rem)' }}>
        <div
          data-reveal="0"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '1.5rem',
            flexWrap: 'wrap',
            marginBottom: 'clamp(2.4rem,4vw,3.4rem)',
          }}
        >
          <div>
            <span
              style={{
                display: 'block',
                fontSize: '.74rem',
                fontWeight: 700,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                color: 'var(--c-accent,#d94f0a)',
                marginBottom: '.8rem',
              }}
            >
              {badge}
            </span>
            <h2
              style={{
                fontFamily: "'Be Vietnam Pro',sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(1.9rem,1.4rem + 1.4vw,2.7rem)',
                lineHeight: 1.28,
                letterSpacing: '-.012em',
                textWrap: 'balance',
                maxWidth: '18ch',
              }}
            >
              {title}
            </h2>
          </div>
          <p
            style={{
              maxWidth: '50ch',
              color: 'var(--c-muted,#5f656d)',
              fontSize: '.95rem',
              lineHeight: 1.6,
              textWrap: 'pretty',
              paddingBottom: '.35rem',
            }}
          >
            {description}
          </p>
        </div>

        {/* Dynamic Category Chips & View All Link */}
        <nav
          aria-label="Danh mục Dữ liệu & Insight"
          data-reveal="0"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '2rem',
          }}
        >
          <div className="mhd-insight-chips" style={{ display: 'flex', flexWrap: 'wrap', gap: '.6rem 1.8rem' }}>
            {categoryChips.map((chip: any, i: number) => (
              <a
                key={i}
                href={`/insights?category=${chip.slug || 'thi-truong'}`}
                className="hover-insight-nav"
                style={{ fontSize: '.9rem', fontWeight: 400, padding: '.25rem 0', color: 'var(--c-faint,#8a8f96)', transition: 'color .2s' }}
              >
                {chip.name}
              </a>
            ))}
          </div>
          <a
            href={viewAllUrl}
            className="hover-all-posts"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '.4rem',
              fontSize: '.84rem',
              fontWeight: 700,
              color: 'var(--c-accent,#d94f0a)',
              transition: 'all .2s',
            }}
          >
            {viewAllText}{' '}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </nav>

        {/* Featured article */}
        <a
          href={featUrl}
          data-reveal="0"
          className="hover-featured-article"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))',
            background: '#fff',
            border: '1px solid var(--c-border,#e2e0da)',
            borderRadius: '14px',
            overflow: 'hidden',
            marginBottom: '1.6rem',
            color: 'var(--c-ink,#16181c)',
            transition: 'all .25s cubic-bezier(.16,1,.3,1)',
          }}
        >
          <div style={{ position: 'relative', aspectRatio: '16/10', background: 'var(--c-subtle,#eeece7)', overflow: 'hidden', minHeight: '240px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              id="mhd-insight-featured"
              src={featImage}
              alt={featTitle}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div style={{ padding: 'clamp(1.5rem,2.5vw,2.4rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontSize: '.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--c-accent,#d94f0a)' }}>
              {featCategory}
            </span>
            <h4
              style={{
                fontFamily: "'Be Vietnam Pro',sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(1.4rem,1.2rem + .6vw,1.8rem)',
                lineHeight: 1.2,
                margin: '.7rem 0 .7rem',
                textWrap: 'balance',
              }}
            >
              {featTitle}
            </h4>
            <p style={{ fontSize: '.92rem', color: 'var(--c-muted,#5f656d)', textWrap: 'pretty' }}>
              {featDesc}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', fontSize: '.8rem', color: 'var(--c-faint,#8a8f96)', marginTop: '1rem' }}>
              <span>{featDate}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.3rem', fontWeight: 600, color: 'var(--c-ink,#16181c)' }}>
                {isEn ? 'Read article' : 'Đọc bài'}{' '}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </div>
          </div>
        </a>

        {/* Sub-articles grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))', gap: '1.6rem' }}>
          <a
            href={sub1Url}
            data-reveal="0"
            className="hover-sub-article"
            style={{
              display: 'block',
              background: '#fff',
              border: '1px solid var(--c-border,#e2e0da)',
              borderRadius: '14px',
              overflow: 'hidden',
              color: 'var(--c-ink,#16181c)',
              transition: 'all .25s cubic-bezier(.16,1,.3,1)',
            }}
          >
            <div style={{ aspectRatio: '16/9', background: 'var(--c-subtle,#eeece7)', overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sub1Image}
                alt={sub1Title}
                width={320}
                height={200}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '1.3rem' }}>
              <span style={{ fontSize: '.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--c-accent,#d94f0a)' }}>
                {sub1Category}
              </span>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '.5rem 0 .4rem', textWrap: 'balance' }}>
                {sub1Title}
              </h4>
              <div style={{ fontSize: '.78rem', color: 'var(--c-faint,#9a9fa6)', marginTop: '.6rem' }}>{sub1Date}</div>
            </div>
          </a>

          <a
            href={sub2Url}
            data-reveal="90"
            className="hover-sub-article"
            style={{
              display: 'block',
              background: '#fff',
              border: '1px solid var(--c-border,#e2e0da)',
              borderRadius: '14px',
              overflow: 'hidden',
              color: 'var(--c-ink,#16181c)',
              transition: 'all .25s cubic-bezier(.16,1,.3,1)',
            }}
          >
            <div style={{ aspectRatio: '16/9', background: 'var(--c-subtle,#eeece7)', overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sub2Image}
                alt={sub2Title}
                width={320}
                height={200}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '1.3rem' }}>
              <span style={{ fontSize: '.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--c-accent,#d94f0a)' }}>
                {sub2Category}
              </span>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '.5rem 0 .4rem', textWrap: 'balance' }}>
                {sub2Title}
              </h4>
              <div style={{ fontSize: '.78rem', color: 'var(--c-faint,#9a9fa6)', marginTop: '.6rem' }}>{sub2Date}</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
