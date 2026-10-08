'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { INSIGHT_CATEGORIES, getInsightCategories } from '../defaultInsights'

interface Props {
  post: any
  sameCatPosts: any[]
  relatedPosts: any[]
  isEn: boolean
  catLabel: string
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

export default function ArticleDetailClient({
  post,
  sameCatPosts,
  relatedPosts,
  isEn,
  catLabel,
}: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <article data-screen-label="Insight — Chi tiết" style={{ background: '#fff', minHeight: '100vh', color: 'var(--c-ink,#16181c)' }}>
      {/* Header */}
      <header style={{ maxWidth: 1240, margin: '0 auto', padding: 'clamp(2.5rem,5vw,4rem) clamp(1rem,4vw,2.5rem) 0' }}>
        <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '.5rem', flexWrap: 'wrap', fontSize: '.8rem', color: 'var(--c-faint,#8a8f96)', marginBottom: '1.8rem' }}>
          <Link href="/" style={{ color: 'var(--c-faint,#8a8f96)' }}>{isEn ? 'Home' : 'Trang chủ'}</Link>
          <span aria-hidden="true">/</span>
          <Link href="/insights" style={{ color: 'var(--c-faint,#8a8f96)' }}>{isEn ? 'Data & Insights' : 'Dữ liệu & Insight'}</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/insights#cm/${post.cat}`} style={{ color: 'var(--c-ink,#16181c)', fontWeight: 600 }}>{catLabel}</Link>
        </nav>

        <div style={{ maxWidth: 880 }}>
          <Link
            href={`/insights#cm/${post.cat}`}
            style={{ display: 'inline-block', fontSize: '.74rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)', marginBottom: '.9rem' }}
          >
            {catLabel}
          </Link>
          <h1 style={{ fontFamily: "'Be Vietnam Pro',sans-serif", fontWeight: 600, fontSize: 'clamp(2rem,1.4rem + 2.2vw,3.1rem)', lineHeight: 1.2, letterSpacing: '-.015em', marginBottom: '1rem', textWrap: 'balance' }}>
            {post.title}
          </h1>
          <p style={{ fontSize: 'clamp(1.02rem,.98rem + .25vw,1.15rem)', color: 'var(--c-muted,#5f656d)', lineHeight: 1.65, textWrap: 'pretty', marginBottom: '1.4rem' }}>
            {post.excerpt}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '.4rem 1.2rem', fontSize: '.84rem', color: 'var(--c-muted,#5f656d)', paddingBottom: '1.8rem' }}>
            <span style={{ fontWeight: 700, color: 'var(--c-ink,#16181c)' }}>{post.author}</span>
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* 16/7 Featured Banner Image */}
        <div style={{ aspectRatio: '16/7', borderRadius: 14, overflow: 'hidden', background: 'var(--c-subtle,#eeece7)' }}>
          <img src={post.img} alt={post.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </header>

      {/* Main 2-column content & sidebar */}
      <div
        className="mhd-article-detail-grid"
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: 'clamp(2.5rem,5vw,4rem) clamp(1rem,4vw,2.5rem) clamp(4rem,7vw,6rem)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) 320px',
          gap: 'clamp(2.5rem,5vw,5rem)',
          alignItems: 'start',
        }}
      >
        
        {/* Left Column: Article Blocks */}
        <div className="mhd-article-body-col" style={{ minWidth: 0, maxWidth: '72ch' }}>
          {post.body && post.body.map((b: any, bIdx: number) => {
            const type = b[0]
            const content = b[1]
            if (type === 'h') {
              return (
                <h2 key={bIdx} style={{ fontSize: 'clamp(1.2rem,1.1rem + .4vw,1.45rem)', fontWeight: 700, lineHeight: 1.35, margin: '2.2rem 0 .8rem', textWrap: 'balance' }}>
                  {content}
                </h2>
              )
            }
            if (type === 'q') {
              return (
                <blockquote key={bIdx} style={{ margin: '2rem 0', padding: '1.4rem 0', borderTop: '1px solid var(--c-border,#e2e0da)', borderBottom: '1px solid var(--c-border,#e2e0da)', fontSize: 'clamp(1.1rem,1rem + .4vw,1.3rem)', fontWeight: 500, fontStyle: 'italic', lineHeight: 1.55, color: 'var(--c-ink,#16181c)', textWrap: 'pretty' }}>
                  <span aria-hidden="true" style={{ display: 'block', fontSize: '2.6rem', lineHeight: 0.6, fontStyle: 'normal', color: 'var(--c-accent,#d94f0a)', marginBottom: '.6rem' }}>“</span>
                  {content}
                </blockquote>
              )
            }
            if (type === 'l' && Array.isArray(content)) {
              return (
                <ul key={bIdx} style={{ display: 'flex', flexDirection: 'column', gap: '.6rem', margin: '0 0 1.3rem', padding: 0, listStyle: 'none' }}>
                  {content.map((li: string, liIdx: number) => (
                    <li key={liIdx} style={{ display: 'flex', gap: '.8rem', alignItems: 'flex-start', fontSize: '1.02rem', lineHeight: 1.7, color: 'var(--c-muted2,#3f444b)' }}>
                      <span aria-hidden="true" style={{ width: 6, height: 6, flexShrink: 0, marginTop: '.7em', background: 'var(--c-accent,#d94f0a)' }} />
                      <span style={{ flex: 1, minWidth: 0 }}>{li}</span>
                    </li>
                  ))}
                </ul>
              )
            }
            return (
              <p key={bIdx} style={{ fontSize: '1.02rem', lineHeight: 1.8, color: 'var(--c-muted2,#3f444b)', marginBottom: '1.1rem', textWrap: 'pretty' }}>
                {content}
              </p>
            )
          })}

          {/* Tags & Share */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1.2rem', flexWrap: 'wrap', marginTop: '2.6rem', paddingTop: '1.6rem', borderTop: '1px solid var(--c-border,#e2e0da)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.45rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '.74rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--c-faint,#8a8f96)', marginRight: '.3rem' }}>
                {isEn ? 'Topics' : 'Chủ đề'}
              </span>
              {post.tags && post.tags.map((t: string) => {
                const displayTag = isEn ? (TAG_LABELS_EN[t] || t) : t
                return (
                  <Link
                    key={t}
                    href={`/insights#tag/${encodeURIComponent(t)}`}
                    style={{ padding: '.32rem .75rem', borderRadius: 999, fontSize: '.8rem', fontWeight: 600, border: '1px solid var(--c-border,#e2e0da)', color: 'var(--c-ink,#16181c)' }}
                  >
                    {displayTag}
                  </Link>
                )
              })}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '.45rem' }}>
              <button
                type="button"
                onClick={handleCopy}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '.45rem', padding: '.5rem .85rem', borderRadius: 6, border: '1px solid var(--c-border,#e2e0da)', background: '#fff', fontSize: '.8rem', fontWeight: 700, cursor: 'pointer' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007.5.5l3-3a5 5 0 00-7-7l-1.7 1.7M14 11a5 5 0 00-7.5-.5l-3 3a5 5 0 007 7l1.7-1.7" /></svg>
                {copied ? (isEn ? 'Copied!' : 'Đã chép!') : (isEn ? 'Copy link' : 'Sao chép liên kết')}
              </button>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chia sẻ Facebook"
                style={{ width: 36, height: 36, borderRadius: 6, border: '1px solid var(--c-border,#e2e0da)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-ink,#16181c)' }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.3c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2H7.5v3.6h2.8V22H14v-9.9h2.8l.4-3.6z" /></svg>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chia sẻ LinkedIn"
                style={{ width: 36, height: 36, borderRadius: 6, border: '1px solid var(--c-border,#e2e0da)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-ink,#16181c)' }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V21h-4z" /></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right Sticky Sidebar */}
        <aside className="mhd-article-detail-sidebar" style={{ position: 'sticky', top: 96, display: 'flex', flexDirection: 'column', gap: '1.6rem', minWidth: 0 }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', paddingBottom: '.8rem', borderBottom: '1px solid var(--c-border,#e2e0da)' }}>
              <span style={{ fontSize: '.74rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--c-ink,#16181c)' }}>
                {isEn ? 'In same category' : 'Cùng chuyên mục'}
              </span>
              <Link href={`/insights#cm/${post.cat}`} style={{ fontSize: '.78rem', fontWeight: 700, color: 'var(--c-accent,#d94f0a)' }}>
                {isEn ? 'View all' : 'Xem tất cả'}
              </Link>
            </div>
            {sameCatPosts.map((s) => (
              <Link
                key={s.slug}
                href={`/insights/${s.slug}`}
                style={{ display: 'grid', gridTemplateColumns: '84px minmax(0,1fr)', gap: '.9rem', alignItems: 'start', padding: '.9rem 0', borderBottom: '1px solid var(--c-subtle,#eeece7)', color: 'var(--c-ink,#16181c)' }}
              >
                <span style={{ display: 'block', aspectRatio: '4/3', borderRadius: 6, overflow: 'hidden', background: 'var(--c-subtle,#eeece7)' }}>
                  <img src={s.img} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: '.88rem', fontWeight: 700, lineHeight: 1.4, textWrap: 'pretty' }}>{s.title}</span>
                  <span style={{ display: 'block', fontSize: '.74rem', color: 'var(--c-faint,#8a8f96)', marginTop: '.3rem' }}>{s.date}</span>
                </span>
              </Link>
            ))}
          </div>

          {/* Consultation CTA card */}
          <div style={{ padding: '1.4rem', borderRadius: 12, background: 'var(--c-ink,#16181c)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
            <div aria-hidden="true" style={{ position: 'absolute', right: '-50px', top: '-50px', width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle,rgba(var(--c-accent-rgb,217,79,10),.4),transparent 70%)' }} />
            <div style={{ position: 'relative', fontWeight: 700, fontSize: '1.02rem', marginBottom: '.35rem' }}>
              {isEn ? 'Need asset valuation?' : 'Cần thẩm định giá tài sản?'}
            </div>
            <p style={{ position: 'relative', fontSize: '.84rem', color: 'var(--c-ondark-muted,#b9bcc3)', marginBottom: '1.1rem', textWrap: 'pretty' }}>
              {isEn ? 'Submit asset information. MHD will confirm requirements within 24 working hours.' : 'Gửi thông tin tài sản. MHD xác nhận yêu cầu trong 24 giờ làm việc.'}
            </p>
            <Link
              href="/contact#yeu-cau"
              data-cta-dark="1"
              style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '.5rem', background: 'var(--c-accent,#d94f0a)', color: '#fff', fontWeight: 700, fontSize: '.86rem', padding: '.75rem 1.1rem', borderRadius: 6 }}
            >
              {isEn ? 'Submit request' : 'Gửi yêu cầu'} <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
          </div>
        </aside>

      </div>

      {/* Bottom Related Articles Section */}
      {relatedPosts.length > 0 && (
        <section data-screen-label="Insight — Bài liên quan" style={{ background: 'var(--c-page,#f6f5f2)', borderTop: '1px solid var(--c-border,#e2e0da)', padding: 'clamp(4rem,7vw,6rem) 0' }}>
          <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(1rem,4vw,2.5rem)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem 2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <div>
                <span style={{ display: 'block', fontSize: '.74rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)', marginBottom: '.7rem' }}>
                  {isEn ? 'Related articles' : 'Bài viết liên quan'}
                </span>
                <h2 style={{ fontFamily: "'Be Vietnam Pro',sans-serif", fontWeight: 600, fontSize: 'clamp(1.6rem,1.2rem + 1vw,2.1rem)', lineHeight: 1.28, textWrap: 'balance' }}>
                  {isEn ? 'Same Topic' : 'Cùng chủ đề'}
                </h2>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: '1.8rem' }}>
              {relatedPosts.map((r) => {
                const rCatObj = getInsightCategories(isEn ? 'en' : 'vi').find((c) => c.id === r.cat)
                return (
                  <Link
                    key={r.slug}
                    href={`/insights/${r.slug}`}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      background: '#fff',
                      borderRadius: 12,
                      overflow: 'hidden',
                      border: '1px solid var(--c-border,#e2e0da)',
                      color: 'var(--c-ink,#16181c)',
                      transition: 'all .2s ease',
                    }}
                  >
                    <span style={{ display: 'block', aspectRatio: '16/9', overflow: 'hidden', background: 'var(--c-subtle,#eeece7)' }}>
                      <img src={r.img} alt={r.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </span>
                    <span style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <span style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.76rem', color: 'var(--c-faint,#8a8f96)', marginBottom: '.5rem' }}>
                        <span style={{ fontWeight: 700, textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)' }}>
                          {rCatObj?.label || r.cat}
                        </span>
                        <span>{r.date}</span>
                      </span>
                      <span style={{ display: 'block', fontWeight: 700, fontSize: '1.05rem', lineHeight: 1.4, marginBottom: '.6rem', textWrap: 'pretty' }}>
                        {r.title}
                      </span>
                      <span style={{ display: 'block', fontSize: '.86rem', color: 'var(--c-muted,#5f656d)', lineHeight: 1.55, textWrap: 'pretty', marginTop: 'auto' }}>
                        {r.excerpt}
                      </span>
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
