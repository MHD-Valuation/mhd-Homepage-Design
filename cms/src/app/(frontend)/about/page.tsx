import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'
import PartnersSection from '@/components/PartnersSection'

import { getCachedAboutData, getCachedGlobal, getCachedTeamList } from '@/lib/cachedQueries'

interface PageProps {
  searchParams?: Promise<{ locale?: string }>
}

export const metadata: Metadata = {
  title: 'Về MHD — Thẩm định giá',
  description:
    'MHD thẩm định giá bất động sản, doanh nghiệp, động sản, tài sản vô hình và dự án đầu tư theo Luật Giá 2023 và Chuẩn mực thẩm định giá Việt Nam.',
}

export default async function AboutPage({ searchParams }: PageProps) {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('mhd_locale')?.value
  const resolvedParams = searchParams ? await searchParams : {}
  const locale = (resolvedParams?.locale || localeCookie) === 'en' ? 'en' : 'vi'
  const isEn = locale === 'en'

  let teamList: any[] = []
  let partnersList: any[] = []
  let footerData: any = null

  try {
    const [cachedData, footerGlobal, fullTeam] = await Promise.all([
      getCachedAboutData(locale as 'vi' | 'en'),
      getCachedGlobal('footer', locale as 'vi' | 'en'),
      getCachedTeamList(locale as 'vi' | 'en'),
    ])
    teamList = fullTeam.length > 0 ? fullTeam : (cachedData.teamList || [])
    partnersList = cachedData.partnersList
    footerData = footerGlobal
  } catch (error) {
    console.error('Cached fetch error on AboutPage:', error)
  }

  const contactPhone = footerData?.phone || '028 3515 3516'
  const contactEmail = footerData?.email || 'info@mhd.com.vn'

  const defaultAvatars: Record<string, string> = {
    'Trần Khánh Du': '/api/media/file/giam-doc-dieu-hanh-tran-khanh-du.png',
    'Trần Minh Hoàng': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=85',
    'Lê Thu Hương': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85',
    'Phạm Quốc Bảo': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=85',
    'Đặng Tuấn Kiệt': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85',
    'Vũ Hải Yến': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=85',
  }

  const getAvatarUrl = (avatar: any, name?: string): string | null => {
    if (avatar) {
      if (typeof avatar === 'string') return avatar
      if (typeof avatar === 'object' && avatar.url) {
        if (avatar.url.startsWith('http')) {
          try {
            const u = new URL(avatar.url)
            return u.pathname
          } catch {}
        }
        return avatar.url
      }
    }
    if (name && defaultAvatars[name]) {
      return defaultAvatars[name]
    }
    return null
  }

  const leadershipMembers = teamList.filter((m: any) => {
    const cat = m.category || ''
    const pos = (m.position || '').toLowerCase()
    return (
      cat === 'leadership' ||
      pos.includes('giám đốc') ||
      pos.includes('director') ||
      pos.includes('trưởng ban') ||
      pos.includes('trưởng khối') ||
      pos.includes('trưởng') ||
      m.order === 1
    )
  })
  const displayLeaders = leadershipMembers.length >= 3 ? leadershipMembers.slice(0, 3) : teamList.slice(0, 3)

  // Real-time dynamic calculation of last updated date from team records
  const latestTeamUpdate = (() => {
    let latestTime = 0
    if (teamList && teamList.length > 0) {
      for (const m of teamList) {
        const dateVal = m.updatedAt || m.createdAt
        if (dateVal) {
          const t = new Date(dateVal).getTime()
          if (!isNaN(t) && t > latestTime) latestTime = t
        }
      }
    }
    const d = latestTime > 0 ? new Date(latestTime) : new Date()
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    return `${day}/${month}/${year}`
  })()

  const defaultAppraisers = [
    { initials: 'VD', name: 'Phạm Văn D', role: 'Bất động sản', license: 'Thẻ TĐV-01012' },
    { initials: 'TE', name: 'Hoàng Thị E', role: 'Tài sản vô hình', license: 'Thẻ TĐV-01345' },
    { initials: 'MF', name: 'Vũ Minh F', role: 'Bất động sản', license: 'Thẻ TĐV-01678' },
    { initials: 'TG', name: 'Đặng Thu G', role: 'Doanh nghiệp', license: 'Thẻ TĐV-02011' },
    { initials: 'QH', name: 'Bùi Quang H', role: 'Máy thiết bị', license: 'Thẻ TĐV-02344' },
    { initials: 'TK', name: 'Ngô Thanh K', role: 'Kiểm soát chất lượng', license: 'Thẻ TĐV-02677' },
  ]

  return (
    <main style={{ background: 'var(--c-page,#f6f5f2)', color: 'var(--c-ink,#16181c)' }}>
      {/* 1. HERO SECTION */}
      <section
        data-screen-label="Về MHD — Hero"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--c-page,#f6f5f2)',
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
            maskImage: 'linear-gradient(100deg,#000 0%,rgba(0,0,0,.4) 45%,transparent 70%)',
            WebkitMaskImage: 'linear-gradient(100deg,#000 0%,rgba(0,0,0,.4) 45%,transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'relative',
            maxWidth: '1240px',
            margin: '0 auto',
            padding: 'clamp(3rem,6vw,5rem) clamp(1rem,4vw,2.5rem) clamp(3rem,6vw,4.5rem)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(2.5rem,5vw,4.5rem)',
            alignItems: 'center',
          }}
        >
          <div style={{ flex: '1.15 1 460px', minWidth: 0 }}>
            <nav
              aria-label="Breadcrumb"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '.5rem',
                fontSize: '.8rem',
                color: 'var(--c-faint,#8a8f96)',
                marginBottom: '1.6rem',
              }}
            >
              <a href="/" style={{ color: 'var(--c-faint,#8a8f96)' }}>
                {isEn ? 'Home' : 'Trang chủ'}
              </a>
              <span aria-hidden="true">/</span>
              <span style={{ color: 'var(--c-ink,#16181c)', fontWeight: 600 }}>
                {isEn ? 'About MHD' : 'Về MHD'}
              </span>
            </nav>
            <span
              className="mhd-about-hero-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.55rem',
                fontSize: '.72rem',
                fontWeight: 700,
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                color: 'var(--c-ink,#16181c)',
                border: '1px solid var(--c-border,#e2e0da)',
                background: '#fff',
                padding: '.5rem 1rem',
                borderRadius: '999px',
                marginBottom: '1.5rem',
                whiteSpace: 'normal',
                lineHeight: 1.4,
                maxWidth: '100%',
                boxSizing: 'border-box',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d94f0b" strokeWidth="2" aria-hidden="true">
                <path d="M9 12l2 2 4-4M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7z" />
              </svg>
              {isEn ? 'Licensed Valuation Firm under Vietnamese Law' : 'Doanh nghiệp thẩm định giá hoạt động theo quy định pháp luật'}
            </span>
            <h1
              style={{
                fontFamily: "'Be Vietnam Pro',sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(2.2rem,1.4rem + 2.8vw,3.8rem)',
                lineHeight: 1.18,
                letterSpacing: '-.02em',
                color: 'var(--c-ink,#16181c)',
                textWrap: 'balance',
                marginBottom: '1.3rem',
              }}
            >
              {isEn
                ? 'Independent Valuation for Crucial Asset Decisions'
                : 'Thẩm định giá độc lập cho những quyết định tài sản quan trọng'}
            </h1>
            <p
              style={{
                fontSize: 'clamp(1rem,.95rem + .3vw,1.12rem)',
                color: 'var(--c-muted,#5f656d)',
                maxWidth: '54ch',
                marginBottom: '2rem',
                textWrap: 'pretty',
              }}
            >
              {isEn
                ? 'MHD appraises real estate, enterprises, plant & equipment, intangible assets, and investment projects. Our clients include banks, corporations, and institutions requiring rigorous and verified value conclusions.'
                : 'MHD thẩm định giá bất động sản, doanh nghiệp, động sản, tài sản vô hình và dự án đầu tư. Khách hàng của MHD gồm ngân hàng, doanh nghiệp, tổ chức và cá nhân cần một cơ sở giá trị có căn cứ.'}
            </p>
            <div style={{ display: 'flex', gap: '.8rem', flexWrap: 'wrap' }}>
              <a
                href="/contact#yeu-cau"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '.55rem',
                  background: 'var(--c-accent,#d94f0a)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '.95rem',
                  padding: '.95rem 1.6rem',
                  borderRadius: '6px',
                  whiteSpace: 'nowrap',
                  transition: 'all .2s cubic-bezier(.16,1,.3,1)',
                  textDecoration: 'none',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z" />
                  <path d="M14 3v6h6M9 14l2 2 4-4" />
                </svg>
                {isEn ? 'Request Valuation' : 'Yêu cầu thẩm định'}
              </a>
              <a
                href="#phap-ly"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '.55rem',
                  border: '1.5px solid var(--c-ink,#16181c)',
                  color: 'var(--c-ink,#16181c)',
                  fontWeight: 700,
                  fontSize: '.95rem',
                  padding: '.9rem 1.5rem',
                  borderRadius: '6px',
                  whiteSpace: 'nowrap',
                  transition: 'all .2s',
                  textDecoration: 'none',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                {isEn ? 'Download Credentials' : 'Tải hồ sơ năng lực'}
              </a>
            </div>
          </div>
          <div style={{ flex: '1 1 380px', minWidth: 0, position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                aspectRatio: '4/3.4',
                borderRadius: '16px',
                overflow: 'hidden',
                background: 'var(--c-subtle,#eeece7)',
                boxShadow: '0 40px 80px rgba(var(--c-ink-rgb,22,24,28),.14)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/hero-office.webp"
                alt="Văn phòng thẩm định giá MHD"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div
              className="mhd-about-floating-badge"
              style={{
                position: 'absolute',
                left: '-1.2rem',
                bottom: '-1.4rem',
                background: '#fff',
                border: '1px solid var(--c-border,#e2e0da)',
                borderRadius: '12px',
                padding: '1rem 1.2rem',
                boxShadow: '0 20px 40px rgba(var(--c-ink-rgb,22,24,28),.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '.8rem',
                maxWidth: 'calc(100% - 1rem)',
              }}
            >
              <span
                style={{
                  width: '40px',
                  height: '40px',
                  flexShrink: 0,
                  borderRadius: '10px',
                  background: 'var(--c-icon,#fbf7f3)',
                  border: '1px solid var(--c-border,#e2e0da)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d94f0b" strokeWidth="2" aria-hidden="true">
                  <path d="M9 12l2 2 4-4M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7z" />
                </svg>
              </span>
              <span style={{ minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--c-faint,#8a8f96)' }}>
                  {isEn ? 'Eligibility Certificate' : 'Giấy chứng nhận ĐĐKKD'}
                </span>
                <span style={{ display: 'block', fontWeight: 700, fontSize: '.92rem', whiteSpace: 'nowrap' }}>
                  Số 000/GCN-BTC
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* 4 Stats Bar */}
        <div style={{ position: 'relative', borderTop: '1px solid var(--c-border,#e2e0da)', background: '#fff' }}>
          <div
            className="mhd-stats-grid"
            style={{
              maxWidth: '1240px',
              margin: '0 auto',
              padding: '0 clamp(1rem,4vw,2.5rem)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
            }}
          >
            <div style={{ padding: '1.6rem 1.4rem 1.6rem 0' }}>
              <div style={{ fontSize: '2.1rem', fontWeight: 700, letterSpacing: '-.02em', lineHeight: 1.15, color: 'var(--c-ink,#16181c)' }}>
                13
              </div>
              <div style={{ fontSize: '.84rem', color: 'var(--c-muted,#5f656d)', marginTop: '.35rem' }}>
                {isEn ? 'years of operation' : 'năm hoạt động'}
              </div>
            </div>
            <div style={{ padding: '1.6rem 1.4rem', borderLeft: '1px solid var(--c-border,#e2e0da)' }}>
              <div style={{ fontSize: '2.1rem', fontWeight: 700, letterSpacing: '-.02em', lineHeight: 1.15, color: 'var(--c-ink,#16181c)' }}>
                5.000+
              </div>
              <div style={{ fontSize: '.84rem', color: 'var(--c-muted,#5f656d)', marginTop: '.35rem' }}>
                {isEn ? 'completed engagements' : 'hồ sơ đã hoàn thành'}
              </div>
            </div>
            <div style={{ padding: '1.6rem 1.4rem', borderLeft: '1px solid var(--c-border,#e2e0da)' }}>
              <div style={{ fontSize: '2.1rem', fontWeight: 700, letterSpacing: '-.02em', lineHeight: 1.15, color: 'var(--c-ink,#16181c)' }}>
                60+
              </div>
              <div style={{ fontSize: '.84rem', color: 'var(--c-muted,#5f656d)', marginTop: '.35rem' }}>
                {isEn ? 'certified professionals' : 'nhân sự chuyên môn'}
              </div>
            </div>
            <div style={{ padding: '1.6rem 1.4rem', borderLeft: '1px solid var(--c-border,#e2e0da)' }}>
              <div style={{ fontSize: '1.35rem', fontWeight: 700, letterSpacing: '-.02em', lineHeight: 1.15, color: 'var(--c-ink,#16181c)' }}>
                {isEn ? 'Price Law 2023' : 'Luật Giá 2023'}
              </div>
              <div style={{ fontSize: '.84rem', color: 'var(--c-muted,#5f656d)', marginTop: '.35rem' }}>
                {isEn ? 'and Vietnam Valuation Standards' : 'và Chuẩn mực thẩm định giá Việt Nam'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ANCHOR NAVIGATION */}
      <div
        id="about-anchors"
        style={{
          position: 'sticky',
          top: '72px',
          zIndex: 30,
          background: '#ffffff',
          borderBottom: '1px solid var(--c-border, #e2e0da)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
        }}
      >
        <nav
          className="mhd-about-subnav-nav"
          aria-label={isEn ? 'Page sections' : 'Mục trên trang'}
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: '0 clamp(1rem, 4vw, 2.5rem)',
            display: 'flex',
            gap: 'clamp(1.5rem, 2.6vw, 2.8rem)',
            overflowX: 'auto',
            scrollbarWidth: 'none',
          }}
        >
          <a
            href="#tong-quan"
            style={{
              padding: '1.05rem 0 .95rem',
              fontSize: '.92rem',
              fontWeight: 700,
              color: 'var(--c-ink, #16181c)',
              whiteSpace: 'nowrap',
              textDecoration: 'none',
              borderBottom: '2.5px solid var(--c-accent, #d94f0a)',
              marginBottom: '-1px',
            }}
          >
            {isEn ? 'Overview' : 'Tổng quan'}
          </a>
          <a
            href="#gia-tri"
            style={{
              padding: '1.05rem 0 .95rem',
              fontSize: '.92rem',
              fontWeight: 500,
              color: 'var(--c-muted, #5f656d)',
              whiteSpace: 'nowrap',
              textDecoration: 'none',
              borderBottom: '2.5px solid transparent',
              marginBottom: '-1px',
            }}
          >
            {isEn ? 'Core Values' : 'Giá trị cốt lõi'}
          </a>
          <a
            href="#hanh-trinh"
            style={{
              padding: '1.05rem 0 .95rem',
              fontSize: '.92rem',
              fontWeight: 500,
              color: 'var(--c-muted, #5f656d)',
              whiteSpace: 'nowrap',
              textDecoration: 'none',
              borderBottom: '2.5px solid transparent',
              marginBottom: '-1px',
            }}
          >
            {isEn ? 'Development Journey' : 'Hành trình phát triển'}
          </a>
          <a
            href="#lanh-dao"
            style={{
              padding: '1.05rem 0 .95rem',
              fontSize: '.92rem',
              fontWeight: 500,
              color: 'var(--c-muted, #5f656d)',
              whiteSpace: 'nowrap',
              textDecoration: 'none',
              borderBottom: '2.5px solid transparent',
              marginBottom: '-1px',
            }}
          >
            {isEn ? 'Leadership' : 'Ban lãnh đạo'}
          </a>
          <a
            href="#doi-ngu"
            style={{
              padding: '1.05rem 0 .95rem',
              fontSize: '.92rem',
              fontWeight: 500,
              color: 'var(--c-muted, #5f656d)',
              whiteSpace: 'nowrap',
              textDecoration: 'none',
              borderBottom: '2.5px solid transparent',
              marginBottom: '-1px',
            }}
          >
            {isEn ? 'Appraisers & Team' : 'Đội ngũ chuyên môn'}
          </a>
          <a
            href="#phap-ly"
            style={{
              padding: '1.05rem 0 .95rem',
              fontSize: '.92rem',
              fontWeight: 500,
              color: 'var(--c-muted, #5f656d)',
              whiteSpace: 'nowrap',
              textDecoration: 'none',
              borderBottom: '2.5px solid transparent',
              marginBottom: '-1px',
            }}
          >
            {isEn ? 'Legal & Credentials' : 'Năng lực & pháp lý'}
          </a>
          <a
            href="#lien-he"
            style={{
              padding: '1.05rem 0 .95rem',
              fontSize: '.92rem',
              fontWeight: 500,
              color: 'var(--c-muted, #5f656d)',
              whiteSpace: 'nowrap',
              textDecoration: 'none',
              borderBottom: '2.5px solid transparent',
              marginBottom: '-1px',
            }}
          >
            {isEn ? 'Contact' : 'Liên hệ'}
          </a>
        </nav>
      </div>

      {/* 3. TỔNG QUAN / CÂU CHUYỆN */}
      <section id="tong-quan" style={{ scrollMarginTop: '130px', background: '#fff', padding: 'clamp(4.5rem,8vw,7.5rem) 0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem,4vw,2.5rem)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(2.5rem,5vw,5rem)', alignItems: 'center' }}>
            <figure style={{ flex: '1 1 380px', minWidth: 0, margin: 0 }}>
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '5/4',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  background: 'var(--c-subtle,#eeece7)',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/hero-office.png" alt="Khảo sát tài sản" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <figcaption style={{ fontSize: '.8rem', color: 'var(--c-faint,#8a8f96)', marginTop: '.8rem' }}>
                {isEn ? 'MHD Appraisers conducting on-site asset inspection.' : 'Thẩm định viên MHD khảo sát hiện trạng tài sản tại hiện trường.'}
              </figcaption>
            </figure>
            <div style={{ flex: '1.1 1 420px', minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: '.74rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)', marginBottom: '.8rem' }}>
                {isEn ? 'The Story of MHD' : 'Câu chuyện của MHD'}
              </span>
              <h2 style={{ fontFamily: "'Be Vietnam Pro',sans-serif", fontWeight: 600, fontSize: 'clamp(1.8rem,1.3rem + 1.3vw,2.5rem)', lineHeight: 1.28, letterSpacing: '-.012em', color: 'var(--c-ink,#16181c)' }}>
                {isEn ? 'Asset Value Requires Solid Grounding to Inspire Trust' : 'Giá trị tài sản cần có căn cứ để được tin cậy'}
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--c-muted,#5f656d)', marginTop: '1rem', maxWidth: '52ch', lineHeight: 1.65 }}>
                {isEn
                  ? 'Asset value is the cornerstone for credit decisions, investment approvals, M&A transactions, capital restructuring, and financial reporting. An unsupported figure puts entire decisions at risk.'
                  : 'Giá trị tài sản là cơ sở cho cấp tín dụng, đầu tư, M&A, tái cấu trúc, báo cáo tài chính và xử lý tài sản bảo đảm. Một con số thiếu căn cứ có thể ảnh hưởng đến cả quyết định đó.'}
              </p>
              <p style={{ fontSize: '1rem', color: 'var(--c-muted,#5f656d)', marginTop: '1rem', maxWidth: '52ch', lineHeight: 1.65 }}>
                {isEn
                  ? 'MHD was founded to deliver independent valuation: clearly defining purposes, methodologies, market sources, and scope limitations.'
                  : 'MHD được thành lập để cung cấp cơ sở giá trị độc lập: nêu rõ mục đích, phương pháp, nguồn thông tin và giới hạn của từng hồ sơ.'}
              </p>
              <div
                style={{
                  marginTop: '2rem',
                  padding: '1.4rem 1.6rem',
                  borderRadius: '12px',
                  background: 'var(--c-page,#f6f5f2)',
                  border: '1px solid var(--c-border,#e2e0da)',
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start',
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#d94f0b" aria-hidden="true" style={{ flexShrink: 0 }}>
                  <path d="M12 2l2.4 6.6L21 9l-5 4.5L17.4 21 12 17l-5.4 4L8 13.5 3 9l6.6-.4z" />
                </svg>
                <div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--c-ink,#16181c)' }}>
                    {isEn ? 'Asset Value – Core Value' : 'Giá trị tài sản – Giá trị cốt lõi'}
                  </div>
                  <div style={{ fontSize: '.86rem', color: 'var(--c-muted,#5f656d)', marginTop: '.2rem' }}>
                    {isEn ? 'The founding principle MHD has honored since day one.' : 'Nguyên tắc MHD theo đuổi từ ngày đầu hoạt động.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GIÁ TRỊ CỐT LÕI */}
      <section id="gia-tri" style={{ scrollMarginTop: '130px', background: 'var(--c-page,#f6f5f2)', padding: 'clamp(4.5rem,8vw,7.5rem) 0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem,4vw,2.5rem)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 'clamp(2rem,4vw,4rem)', marginBottom: 'clamp(3rem,5vw,4.5rem)' }}>
            <div>
              <span style={{ display: 'block', fontSize: '.74rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)', marginBottom: '.8rem' }}>
                {isEn ? 'Vision' : 'Tầm nhìn'}
              </span>
              <p style={{ fontSize: 'clamp(1.3rem,1.1rem + .7vw,1.75rem)', fontWeight: 600, lineHeight: 1.45, color: 'var(--c-ink,#16181c)' }}>
                {isEn
                  ? 'To become the preeminent valuation firm of choice, renowned for professional excellence, integrity, and verifiable valuation reports.'
                  : 'Trở thành doanh nghiệp thẩm định giá được lựa chọn nhờ năng lực chuyên môn, tính độc lập và hồ sơ có căn cứ rõ ràng.'}
              </p>
            </div>
            <div style={{ paddingLeft: 'clamp(0rem,3vw,2.5rem)', borderLeft: '1px solid var(--c-border,#e2e0da)' }}>
              <span style={{ display: 'block', fontSize: '.74rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)', marginBottom: '.8rem' }}>
                {isEn ? 'Mission' : 'Sứ mệnh'}
              </span>
              <p style={{ fontSize: 'clamp(1.3rem,1.1rem + .7vw,1.75rem)', fontWeight: 600, lineHeight: 1.45, color: 'var(--c-ink,#16181c)' }}>
                {isEn
                  ? 'Delivering trustworthy asset valuations that underpin vital commercial and legal decisions for institutions, businesses, and individuals.'
                  : 'Cung cấp cơ sở giá trị đáng tin cậy cho quyết định tài sản của doanh nghiệp, tổ chức và cá nhân.'}
              </p>
            </div>
          </div>

          {/* 4 Values */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: '0 clamp(1.5rem,3vw,2.5rem)' }}>
            <div style={{ padding: '2rem 0', borderTop: '1px solid var(--c-border,#e2e0da)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.7rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '.82rem', fontWeight: 700, color: 'var(--c-accent,#d94f0a)' }}>01</span>
                <span style={{ flex: 1, height: '1px', background: 'var(--c-border,#e2e0da)' }}></span>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--c-accent,#d94f0a)' }}></span>
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '.6rem' }}>{isEn ? 'Independence' : 'Độc lập'}</h3>
              <p style={{ fontSize: '.92rem', color: 'var(--c-muted,#5f656d)', lineHeight: 1.6 }}>
                {isEn
                  ? 'Conclusions are rooted exclusively in empirical evidence, standards, and methodology—free from conflict of interest.'
                  : 'Kết luận dựa trên bằng chứng, phương pháp và chuẩn mực chuyên môn, không phụ thuộc vào kỳ vọng của bên liên quan.'}
              </p>
            </div>
            <div style={{ padding: '2rem 0', borderTop: '1px solid var(--c-border,#e2e0da)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.7rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '.82rem', fontWeight: 700, color: 'var(--c-accent,#d94f0a)' }}>02</span>
                <span style={{ flex: 1, height: '1px', background: 'var(--c-border,#e2e0da)' }}></span>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--c-accent,#d94f0a)' }}></span>
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '.6rem' }}>{isEn ? 'Accuracy' : 'Chính xác'}</h3>
              <p style={{ fontSize: '.92rem', color: 'var(--c-muted,#5f656d)', lineHeight: 1.6 }}>
                {isEn
                  ? 'Data, assumptions, and computation models are verified through internal quality control before issuance.'
                  : 'Dữ liệu, giả thiết và phương pháp được kiểm tra trước khi đưa ra kết luận thẩm định giá.'}
              </p>
            </div>
            <div style={{ padding: '2rem 0', borderTop: '1px solid var(--c-border,#e2e0da)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.7rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '.82rem', fontWeight: 700, color: 'var(--c-accent,#d94f0a)' }}>03</span>
                <span style={{ flex: 1, height: '1px', background: 'var(--c-border,#e2e0da)' }}></span>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--c-accent,#d94f0a)' }}></span>
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '.6rem' }}>{isEn ? 'Transparency' : 'Minh bạch'}</h3>
              <p style={{ fontSize: '.92rem', color: 'var(--c-muted,#5f656d)', lineHeight: 1.6 }}>
                {isEn
                  ? 'Scope of work, statutory procedures, and data sources are comprehensively documented in every certificate.'
                  : 'Phạm vi công việc, quy trình, nguồn thông tin và giới hạn của báo cáo được nêu rõ trong từng hồ sơ.'}
              </p>
            </div>
            <div style={{ padding: '2rem 0', borderTop: '1px solid var(--c-border,#e2e0da)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.7rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '.82rem', fontWeight: 700, color: 'var(--c-accent,#d94f0a)' }}>04</span>
                <span style={{ flex: 1, height: '1px', background: 'var(--c-border,#e2e0da)' }}></span>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--c-accent,#d94f0a)' }}></span>
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '.6rem' }}>{isEn ? 'Responsibility' : 'Trách nhiệm'}</h3>
              <p style={{ fontSize: '.92rem', color: 'var(--c-muted,#5f656d)', lineHeight: 1.6 }}>
                {isEn
                  ? 'Client data confidentiality, statutory compliance, and rigorous accountability for our professional opinions.'
                  : 'Bảo mật thông tin khách hàng, tuân thủ pháp luật và chịu trách nhiệm về chất lượng chuyên môn.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HÀNH TRÌNH PHÁT TRIỂN (#hanh-trinh) */}
      <section id="hanh-trinh" style={{ scrollMarginTop: '130px', background: '#fff', padding: 'clamp(4.5rem,8vw,7.5rem) 0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem,4vw,2.5rem)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1.5rem', flexWrap: 'wrap', marginBottom: 'clamp(2.6rem,4vw,3.6rem)' }}>
            <div>
              <span style={{ display: 'block', fontSize: '.74rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)', marginBottom: '.8rem' }}>
                {isEn ? 'Development Journey' : 'Hành trình phát triển'}
              </span>
              <h2 style={{ fontFamily: "'Be Vietnam Pro',sans-serif", fontWeight: 600, fontSize: 'clamp(1.8rem,1.3rem + 1.3vw,2.5rem)', lineHeight: 1.28, letterSpacing: '-.012em', color: 'var(--c-ink,#16181c)' }}>
                {isEn ? '13 Years of Building Valuation Excellence' : '13 năm tích luỹ năng lực thẩm định'}
              </h2>
            </div>
            <p style={{ maxWidth: '44ch', color: 'var(--c-muted,#5f656d)', fontSize: '.95rem' }}>
              {isEn
                ? 'Key milestones throughout the evolution of MHD valuation capacity and credentials.'
                : 'Các mốc chính trong quá trình phát triển năng lực chuyên môn của MHD.'}
            </p>
          </div>

          <ol
            className="mhd-timeline-list"
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
              gap: '1.6rem',
            }}
          >
            <li className="mhd-timeline-item" style={{ position: 'relative', padding: '2.4rem 0 0 0' }}>
              <span className="mhd-timeline-line" aria-hidden="true" style={{ position: 'absolute', left: 0, right: '-1.6rem', top: '6px', height: '2px', background: 'var(--c-border,#e2e0da)' }} />
              <span className="mhd-timeline-dot" aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, width: '14px', height: '14px', borderRadius: '50%', background: '#fff', border: '2px solid var(--c-accent,#d94f0a)', zIndex: 1 }} />
              <span style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: 'var(--c-accent,#d94f0a)', letterSpacing: '.04em', marginBottom: '.5rem', whiteSpace: 'nowrap' }}>2013</span>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '.4rem' }}>{isEn ? 'Founding of MHD' : 'Thành lập MHD'}</h3>
              <p style={{ fontSize: '.88rem', color: 'var(--c-muted,#5f656d)', lineHeight: 1.55 }}>
                {isEn ? 'Began operations in valuation services in Ho Chi Minh City.' : 'Bắt đầu hoạt động trong lĩnh vực thẩm định giá tại TP. Hồ Chí Minh.'}
              </p>
            </li>
            <li className="mhd-timeline-item" style={{ position: 'relative', padding: '2.4rem 0 0 0' }}>
              <span className="mhd-timeline-line" aria-hidden="true" style={{ position: 'absolute', left: 0, right: '-1.6rem', top: '6px', height: '2px', background: 'var(--c-border,#e2e0da)' }} />
              <span className="mhd-timeline-dot" aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, width: '14px', height: '14px', borderRadius: '50%', background: '#fff', border: '2px solid var(--c-accent,#d94f0a)', zIndex: 1 }} />
              <span style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: 'var(--c-accent,#d94f0a)', letterSpacing: '.04em', marginBottom: '.5rem', whiteSpace: 'nowrap' }}>2014 – 2017</span>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '.4rem' }}>{isEn ? 'Capacity Expansion' : 'Mở rộng năng lực'}</h3>
              <p style={{ fontSize: '.88rem', color: 'var(--c-muted,#5f656d)', lineHeight: 1.55 }}>
                {isEn ? 'Accumulated extensive expertise across real estate, industrial assets, and businesses.' : 'Tích luỹ kinh nghiệm với bất động sản, doanh nghiệp và tài sản công nghiệp.'}
              </p>
            </li>
            <li className="mhd-timeline-item" style={{ position: 'relative', padding: '2.4rem 0 0 0' }}>
              <span className="mhd-timeline-line" aria-hidden="true" style={{ position: 'absolute', left: 0, right: '-1.6rem', top: '6px', height: '2px', background: 'var(--c-border,#e2e0da)' }} />
              <span className="mhd-timeline-dot" aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, width: '14px', height: '14px', borderRadius: '50%', background: '#fff', border: '2px solid var(--c-accent,#d94f0a)', zIndex: 1 }} />
              <span style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: 'var(--c-accent,#d94f0a)', letterSpacing: '.04em', marginBottom: '.5rem', whiteSpace: 'nowrap' }}>2018 – 2021</span>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '.4rem' }}>{isEn ? 'Large-scale Engagements' : 'Hồ sơ quy mô lớn'}</h3>
              <p style={{ fontSize: '.88rem', color: 'var(--c-muted,#5f656d)', lineHeight: 1.55 }}>
                {isEn ? 'Undertook complex industrial plants, production lines, urban developments, and hotel assets.' : 'Thực hiện hồ sơ nhà máy, dây chuyền, khu đô thị, khách sạn và doanh nghiệp.'}
              </p>
            </li>
            <li className="mhd-timeline-item" style={{ position: 'relative', padding: '2.4rem 0 0 0' }}>
              <span className="mhd-timeline-line" aria-hidden="true" style={{ position: 'absolute', left: 0, right: '-1.6rem', top: '6px', height: '2px', background: 'var(--c-border,#e2e0da)' }} />
              <span className="mhd-timeline-dot" aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, width: '14px', height: '14px', borderRadius: '50%', background: '#fff', border: '2px solid var(--c-accent,#d94f0a)', zIndex: 1 }} />
              <span style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: 'var(--c-accent,#d94f0a)', letterSpacing: '.04em', marginBottom: '.5rem', whiteSpace: 'nowrap' }}>2022 – 2024</span>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '.4rem' }}>{isEn ? 'Statutory Compliance Standardization' : 'Chuẩn hoá theo quy định mới'}</h3>
              <p style={{ fontSize: '.88rem', color: 'var(--c-muted,#5f656d)', lineHeight: 1.55 }}>
                {isEn ? 'Updated to Vietnamese Price Law 2023 and strengthened multi-tier quality control.' : 'Cập nhật theo Luật Giá 2023, củng cố hệ thống kiểm soát chất lượng.'}
              </p>
            </li>
            <li className="mhd-timeline-item" style={{ position: 'relative', padding: '2.4rem 0 0 0' }}>
              <span className="mhd-timeline-line" aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, top: '6px', height: '2px', background: 'var(--c-border,#e2e0da)' }} />
              <span className="mhd-timeline-dot" aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, width: '14px', height: '14px', borderRadius: '50%', background: 'var(--c-accent,#d94f0a)', border: '2px solid var(--c-accent,#d94f0a)', boxShadow: '0 0 0 5px rgba(var(--c-accent-rgb,217,79,10),.15)', zIndex: 1 }} />
              <span style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: 'var(--c-accent,#d94f0a)', letterSpacing: '.04em', marginBottom: '.5rem', whiteSpace: 'nowrap' }}>2025 – nay</span>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '.4rem' }}>{isEn ? 'Data-driven Valuation' : 'Thẩm định dựa trên dữ liệu'}</h3>
              <p style={{ fontSize: '.88rem', color: 'var(--c-muted,#5f656d)', lineHeight: 1.55 }}>
                {isEn ? 'Building verified market data pools, certificate lookups, and modern client digital experiences.' : 'Xây dựng dữ liệu thị trường, tra cứu chứng thư và trải nghiệm khách hàng số.'}
              </p>
            </li>
          </ol>
          <p style={{ fontSize: '.78rem', color: 'var(--c-faint,#8a8f96)', marginTop: '2rem' }}>
            {isEn ? 'Milestones and events are verified against internal company records.' : 'Mốc thời gian và sự kiện sẽ được cập nhật theo tài liệu nội bộ đã xác nhận.'}
          </p>
        </div>
      </section>

      {/* 6. BAN LÃNH ĐẠO (#lanh-dao) */}
      <section id="lanh-dao" style={{ scrollMarginTop: '130px', background: 'var(--c-page,#f6f5f2)', padding: 'clamp(4.5rem,8vw,7.5rem) 0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem,4vw,2.5rem)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(2.5rem,5vw,5rem)', alignItems: 'flex-start' }}>
            <div style={{ flex: '1 1 300px', minWidth: 0, maxWidth: '420px' }}>
              <span style={{ display: 'block', fontSize: '.74rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)', marginBottom: '.8rem' }}>
                {isEn ? 'Executive Leadership' : 'Ban lãnh đạo'}
              </span>
              <h2 style={{ fontFamily: "'Be Vietnam Pro',sans-serif", fontWeight: 600, fontSize: 'clamp(1.8rem,1.3rem + 1.3vw,2.5rem)', lineHeight: 1.28, letterSpacing: '-.012em', color: 'var(--c-ink,#16181c)' }}>
                {isEn ? 'Professional Accountability Leaders' : 'Người chịu trách nhiệm chuyên môn'}
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--c-muted,#5f656d)', marginTop: '1rem', maxWidth: '52ch', lineHeight: 1.65 }}>
                {isEn
                  ? 'MHD senior leadership directly oversees methodologies, internal audit quality control, and signs certificate issuance.'
                  : 'Ban lãnh đạo MHD trực tiếp phụ trách phương pháp, kiểm soát chất lượng và ký phát hành chứng thư thẩm định giá.'}
              </p>
              <div style={{ marginTop: '1.8rem' }}>
                <a
                  href="#phap-ly"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '.4rem',
                    fontSize: '.88rem',
                    fontWeight: 700,
                    color: 'var(--c-accent,#d94f0a)',
                    whiteSpace: 'nowrap',
                    textDecoration: 'none',
                  }}
                >
                  {isEn ? 'View Legal Dossier' : 'Xem hồ sơ pháp lý'}{' '}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </div>

            <div style={{ flex: '2 1 520px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {displayLeaders.map((member: any, idx: number) => {
                const name = member.name || (isEn ? 'Certified Valuer' : 'Thẩm định viên')
                const initials = name
                  .split(' ')
                  .map((n: string) => n[0])
                  .slice(-2)
                  .join('')
                const position = member.position || (isEn ? 'Practicing Valuer' : 'Thẩm định viên về giá')
                const experienceYears = member.experienceYears || (20 - idx * 4)

                // License extract or formal fallback
                let license = isEn ? 'Ministry of Finance Licensed Valuer' : 'Thẻ TĐV về giá Bộ Tài chính'
                if (member.bio) {
                  const cardLine = member.bio
                    .split('\n')
                    .find((l: string) => l.toLowerCase().includes('thẻ') || l.toLowerCase().includes('chứng chỉ'))
                  if (cardLine) {
                    license = cardLine.replace(/^[\-–—•\*\+]\s*/, '').trim()
                  }
                }

                // Specialty extract
                let specialty = ''
                if (position.includes('—')) {
                  specialty = position.split('—')[1]?.trim() || ''
                } else if (position.toLowerCase().includes('bất động sản')) {
                  specialty = isEn ? 'Real Estate & Infrastructure' : 'Bất động sản, dự án phát triển'
                } else if (position.toLowerCase().includes('thiết bị') || position.toLowerCase().includes('máy')) {
                  specialty = isEn ? 'Machinery & Equipment' : 'Máy móc thiết bị, tài sản công nghiệp'
                } else if (position.toLowerCase().includes('kiểm soát') || position.toLowerCase().includes('chất lượng')) {
                  specialty = isEn ? 'Quality Control & Audit' : 'Kiểm soát chất lượng, thẩm tra độc lập'
                } else if (position.toLowerCase().includes('giám đốc') || position.toLowerCase().includes('director')) {
                  specialty = isEn ? 'Enterprise Valuation, M&A' : 'Thẩm định giá doanh nghiệp, M&A'
                } else {
                  specialty = isEn ? 'Comprehensive Valuation' : 'Thẩm định giá tài sản đa ngành'
                }

                // Executive philosophy quotes
                const defaultQuotesVi = [
                  'Mỗi kết luận thẩm định giá phải lập luận được bằng dữ liệu và phương pháp.',
                  'Hồ sơ tốt là hồ sơ người thẩm tra có thể đối chiếu từng căn cứ.',
                  'Kiểm soát chất lượng bắt đầu từ việc xác định đúng phạm vi công việc.',
                ]
                const defaultQuotesEn = [
                  'Every valuation conclusion must be substantiated with verified empirical data and robust methodology.',
                  'A solid appraisal dossier is one where every conclusion can be cross-checked against authoritative evidence.',
                  'True quality control begins with rigorous scope definition and methodological independence.',
                ]

                let quote = isEn ? defaultQuotesEn[idx % defaultQuotesEn.length] : defaultQuotesVi[idx % defaultQuotesVi.length]
                if (member.bio && !member.bio.includes('\n') && member.bio.length > 20 && member.bio.length < 180) {
                  quote = member.bio
                }

                const avatarUrl = getAvatarUrl(member.avatar, name)

                return (
                  <article
                    key={member.id || idx}
                    className="mhd-leader-card"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'minmax(140px, 160px) 1fr',
                      gap: '1.5rem',
                      background: '#fff',
                      border: '1px solid var(--c-border,#e2e0da)',
                      borderRadius: '14px',
                      padding: '1.2rem',
                    }}
                  >
                    <div
                      className="mhd-leader-img"
                      style={{
                        position: 'relative',
                        aspectRatio: '4/5',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        background: 'var(--c-subtle,#eeece7)',
                      }}
                    >
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt={name}
                          loading="lazy"
                          decoding="async"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                        />
                      ) : (
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'linear-gradient(135deg, #16181c 0%, #2a2e39 100%)',
                            color: '#fff',
                            fontSize: '1.8rem',
                            fontWeight: 700,
                            fontFamily: "'Be Vietnam Pro', sans-serif',",
                          }}
                        >
                          {initials}
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
                      <div className="mhd-leader-header">
                        <h3 className="mhd-leader-name" style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--c-ink,#16181c)' }}>{name}</h3>
                        <div className="mhd-leader-pos" style={{ fontSize: '.9rem', fontWeight: 600, color: 'var(--c-accent,#d94f0a)', marginTop: '.15rem' }}>
                          {position}
                        </div>
                      </div>
                      <dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '.35rem 1rem', margin: '1rem 0', fontSize: '.86rem' }}>
                        <dt style={{ color: 'var(--c-faint,#8a8f96)' }}>{isEn ? 'License' : 'Chứng chỉ'}</dt>
                        <dd style={{ margin: 0, fontWeight: 600 }}>{license}</dd>
                        <dt style={{ color: 'var(--c-faint,#8a8f96)' }}>{isEn ? 'Experience' : 'Kinh nghiệm'}</dt>
                        <dd style={{ margin: 0, fontWeight: 600 }}>
                          {experienceYears ? `${experienceYears} ${isEn ? 'years' : 'năm'}` : (isEn ? '15+ years' : '15 năm')}
                        </dd>
                      </dl>
                      {quote && (
                        <p style={{ fontSize: '.9rem', fontStyle: 'italic', color: 'var(--c-muted,#5f656d)', paddingTop: '.9rem', borderTop: '1px solid var(--c-border,#e2e0da)', margin: 0 }}>
                          “{quote}”
                        </p>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 7. ĐỘI NGŨ CHUYÊN MÔN (#doi-ngu) */}
      <section id="doi-ngu" style={{ scrollMarginTop: '130px', background: '#fff', padding: 'clamp(4.5rem,8vw,7.5rem) 0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem,4vw,2.5rem)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1.5rem', flexWrap: 'wrap', marginBottom: 'clamp(2.6rem,4vw,3.6rem)' }}>
            <div>
              <span style={{ display: 'block', fontSize: '.74rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)', marginBottom: '.8rem' }}>
                {isEn ? 'Professional Specialists' : 'Đội ngũ chuyên môn'}
              </span>
              <h2 style={{ fontFamily: "'Be Vietnam Pro',sans-serif", fontWeight: 600, fontSize: 'clamp(1.8rem,1.3rem + 1.3vw,2.5rem)', lineHeight: 1.28, letterSpacing: '-.012em', color: 'var(--c-ink,#16181c)' }}>
                {isEn ? '60+ Specialists across Four Core Practice Groups' : '60+ nhân sự theo bốn nhóm chuyên môn'}
              </h2>
            </div>
            <p style={{ maxWidth: '46ch', color: 'var(--c-muted,#5f656d)', fontSize: '.95rem' }}>
              {isEn
                ? 'Each engagement is assigned based on asset class and rigorously verified by our Quality Control division.'
                : 'Mỗi hồ sơ được phân công theo loại tài sản và được soát xét bởi bộ phận kiểm soát chất lượng.'}
            </p>
          </div>

          {/* 4 Practice Group Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,max(240px,45%)),1fr))', gap: '1.2rem', marginBottom: 'clamp(3rem,5vw,4rem)' }}>
            <div style={{ display: 'flex', gap: '1.1rem', alignItems: 'flex-start', padding: '1.5rem', border: '1px solid var(--c-border,#e2e0da)', borderRadius: '12px', background: '#fff' }}>
              <span style={{ width: '48px', height: '48px', flexShrink: 0, borderRadius: '10px', background: 'var(--c-icon,#fbf7f3)', border: '1px solid var(--c-border,#e2e0da)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-accent,#d94f0a)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                  <path d="M3 21h18M6 21V9l6-4 6 4v12M10 21v-5h4v5" />
                </svg>
              </span>
              <div style={{ minWidth: 0 }}>
                <h3 style={{ fontSize: '1.02rem', fontWeight: 700, marginBottom: '.3rem' }}>
                  {isEn ? 'Real Estate & Development Projects' : 'Bất động sản và dự án phát triển'}
                </h3>
                <p style={{ fontSize: '.88rem', color: 'var(--c-muted,#5f656d)', lineHeight: 1.55 }}>
                  {isEn ? 'Land, residential, commercial complexes, hotels, and development sites.' : 'Đất, nhà, công trình, khu đô thị, khách sạn và dự án bất động sản.'}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.1rem', alignItems: 'flex-start', padding: '1.5rem', border: '1px solid var(--c-border,#e2e0da)', borderRadius: '12px', background: '#fff' }}>
              <span style={{ width: '48px', height: '48px', flexShrink: 0, borderRadius: '10px', background: 'var(--c-icon,#fbf7f3)', border: '1px solid var(--c-border,#e2e0da)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-accent,#d94f0a)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                  <path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 5-6" />
                </svg>
              </span>
              <div style={{ minWidth: 0 }}>
                <h3 style={{ fontSize: '1.02rem', fontWeight: 700, marginBottom: '.3rem' }}>
                  {isEn ? 'Enterprises, M&A & Intangible Assets' : 'Doanh nghiệp, M&A và tài sản vô hình'}
                </h3>
                <p style={{ fontSize: '.88rem', color: 'var(--c-muted,#5f656d)', lineHeight: 1.55 }}>
                  {isEn ? 'Enterprise value, capital stakes, brands, and intellectual property.' : 'Giá trị doanh nghiệp, phần vốn, thương hiệu và quyền sở hữu trí tuệ.'}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.1rem', alignItems: 'flex-start', padding: '1.5rem', border: '1px solid var(--c-border,#e2e0da)', borderRadius: '12px', background: '#fff' }}>
              <span style={{ width: '48px', height: '48px', flexShrink: 0, borderRadius: '10px', background: 'var(--c-icon,#fbf7f3)', border: '1px solid var(--c-border,#e2e0da)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-accent,#d94f0a)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
                </svg>
              </span>
              <div style={{ minWidth: 0 }}>
                <h3 style={{ fontSize: '1.02rem', fontWeight: 700, marginBottom: '.3rem' }}>
                  {isEn ? 'Machinery, Equipment & Industrial Plants' : 'Máy móc, thiết bị và tài sản công nghiệp'}
                </h3>
                <p style={{ fontSize: '.88rem', color: 'var(--c-muted,#5f656d)', lineHeight: 1.55 }}>
                  {isEn ? 'Production lines, factories, industrial equipment, and transportation vehicles.' : 'Dây chuyền sản xuất, nhà máy, phương tiện vận tải và thiết bị chuyên dùng.'}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.1rem', alignItems: 'flex-start', padding: '1.5rem', border: '1px solid var(--c-border,#e2e0da)', borderRadius: '12px', background: '#fff' }}>
              <span style={{ width: '48px', height: '48px', flexShrink: 0, borderRadius: '10px', background: 'var(--c-icon,#fbf7f3)', border: '1px solid var(--c-border,#e2e0da)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-accent,#d94f0a)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                  <path d="M9 12l2 2 4-4" />
                  <path d="M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7z" />
                </svg>
              </span>
              <div style={{ minWidth: 0 }}>
                <h3 style={{ fontSize: '1.02rem', fontWeight: 700, marginBottom: '.3rem' }}>
                  {isEn ? 'Quality Control, Legal & Market Data' : 'Kiểm soát chất lượng, pháp lý và dữ liệu'}
                </h3>
                <p style={{ fontSize: '.88rem', color: 'var(--c-muted,#5f656d)', lineHeight: 1.55 }}>
                  {isEn ? 'Independent audit review, statutory compliance oversight, and verified database.' : 'Soát xét hồ sơ, rà soát pháp lý và quản lý dữ liệu thị trường.'}
                </p>
              </div>
            </div>
          </div>

          {/* Appraisers Section */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
              {isEn ? 'Accredited Lead Valuers' : 'Thẩm định viên về giá tiêu biểu'}
            </h3>
            <span style={{ fontSize: '.78rem', color: 'var(--c-faint,#8a8f96)' }}>
              {isEn ? `Updated: ${latestTeamUpdate}` : `Dữ liệu cập nhật: ${latestTeamUpdate}`}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: '.8rem', marginBottom: '1.6rem' }}>
            {(teamList.length > 0 ? teamList : defaultAppraisers).map((item: any, idx: number) => {
              const name = item.name || 'Thẩm định viên'
              const initials = item.initials || name.split(' ').map((n: string) => n[0]).slice(-2).join('')
              const role = item.role || item.position || 'Thẩm định viên về giá'
              const avatarUrl = getAvatarUrl(item.avatar, name)

              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '.9rem',
                    padding: '.9rem 1rem',
                    border: '1px solid var(--c-border,#e2e0da)',
                    borderRadius: '10px',
                    background: '#fff',
                  }}
                >
                  <span
                    style={{
                      width: '44px',
                      height: '44px',
                      flexShrink: 0,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      background: 'var(--c-page,#f6f5f2)',
                      border: '1px solid var(--c-border,#e2e0da)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={name}
                        loading="lazy"
                        decoding="async"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                      />
                    ) : (
                      <span
                        style={{
                          fontSize: '.86rem',
                          fontWeight: 700,
                          color: 'var(--c-ink,#16181c)',
                        }}
                      >
                        {initials}
                      </span>
                    )}
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', fontSize: '.9rem', fontWeight: 700 }}>{name}</span>
                    <span style={{ display: 'block', fontSize: '.78rem', color: 'var(--c-muted,#5f656d)', lineHeight: 1.4 }}>
                      {role}
                    </span>
                  </span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d94f0b" strokeWidth="2" aria-hidden="true">
                    <path d="M9 12l2 2 4-4M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7z" />
                  </svg>
                </div>
              )
            })}
          </div>

          <div>
            <Link
              href="/about/doi-ngu"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.4rem',
                fontSize: '.88rem',
                fontWeight: 700,
                color: 'var(--c-accent,#d94f0a)',
                whiteSpace: 'nowrap',
                textDecoration: 'none',
              }}
            >
              {isEn ? 'View Complete Valuer Registry' : 'Xem danh sách thẩm định viên về giá'}{' '}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. NĂNG LỰC & PHÁP LÝ (#phap-ly) */}
      <section id="phap-ly" style={{ scrollMarginTop: '130px', background: 'var(--c-page,#f6f5f2)', padding: 'clamp(4.5rem,8vw,7.5rem) 0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem,4vw,2.5rem)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(2.5rem,5vw,5rem)', alignItems: 'flex-start' }}>
            <div style={{ flex: '1 1 380px', minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: '.74rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)', marginBottom: '.8rem' }}>
                {isEn ? 'Legal & Credentials' : 'Năng lực & pháp lý'}
              </span>
              <h2 style={{ fontFamily: "'Be Vietnam Pro',sans-serif", fontWeight: 600, fontSize: 'clamp(1.8rem,1.3rem + 1.3vw,2.5rem)', lineHeight: 1.28, letterSpacing: '-.012em', color: 'var(--c-ink,#16181c)' }}>
                {isEn ? 'Public Legal Dossier for Verification' : 'Hồ sơ pháp lý công khai để tra cứu'}
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--c-muted,#5f656d)', marginTop: '1rem', maxWidth: '52ch', lineHeight: 1.65 }}>
                {isEn
                  ? 'Banks, corporate clients, and auditors can verify MHD legal credentials and accredited valuer licenses before engaging.'
                  : 'Ngân hàng, doanh nghiệp và đối tác có thể kiểm tra tư cách pháp lý của MHD và đội ngũ thẩm định viên trước khi làm việc.'}
              </p>

              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem', padding: 0, listStyle: 'none' }}>
                <li style={{ display: 'flex', gap: '.8rem', alignItems: 'flex-start', fontSize: '.95rem', color: 'var(--c-ink,#16181c)' }}>
                  <span style={{ flexShrink: 0, marginTop: '2px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d94f0b" strokeWidth="2" aria-hidden="true">
                      <path d="M9 12l2 2 4-4M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7z" />
                    </svg>
                  </span>
                  <span>{isEn ? 'Certified with Certificate of Eligibility for Valuation Services by Ministry of Finance' : 'Được Bộ Tài chính cấp Giấy chứng nhận đủ điều kiện kinh doanh dịch vụ thẩm định giá'}</span>
                </li>
                <li style={{ display: 'flex', gap: '.8rem', alignItems: 'flex-start', fontSize: '.95rem', color: 'var(--c-ink,#16181c)' }}>
                  <span style={{ flexShrink: 0, marginTop: '2px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d94f0b" strokeWidth="2" aria-hidden="true">
                      <path d="M9 12l2 2 4-4M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7z" />
                    </svg>
                  </span>
                  <span>{isEn ? 'Valuers officially approved and registered to practice at MHD by Ministry of Finance' : 'Thẩm định viên về giá được Bộ Tài chính thông báo hành nghề tại MHD'}</span>
                </li>
                <li style={{ display: 'flex', gap: '.8rem', alignItems: 'flex-start', fontSize: '.95rem', color: 'var(--c-ink,#16181c)' }}>
                  <span style={{ flexShrink: 0, marginTop: '2px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d94f0b" strokeWidth="2" aria-hidden="true">
                      <path d="M9 12l2 2 4-4M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7z" />
                    </svg>
                  </span>
                  <span>{isEn ? 'Compliant with Price Law 2023 & Vietnam Valuation Standards (Circulars 30, 31, 36/2024/TT-BTC)' : 'Thực hiện theo Luật Giá 2023 và Chuẩn mực thẩm định giá Việt Nam (Thông tư 30, 31, 36/2024/TT-BTC)'}</span>
                </li>
                <li style={{ display: 'flex', gap: '.8rem', alignItems: 'flex-start', fontSize: '.95rem', color: 'var(--c-ink,#16181c)' }}>
                  <span style={{ flexShrink: 0, marginTop: '2px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d94f0b" strokeWidth="2" aria-hidden="true">
                      <path d="M9 12l2 2 4-4M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7z" />
                    </svg>
                  </span>
                  <span>{isEn ? 'Strict adherence to professional code of ethics and client confidentiality' : 'Bảo mật thông tin khách hàng theo quy tắc đạo đức nghề nghiệp'}</span>
                </li>
                <li style={{ display: 'flex', gap: '.8rem', alignItems: 'flex-start', fontSize: '.95rem', color: 'var(--c-ink,#16181c)' }}>
                  <span style={{ flexShrink: 0, marginTop: '2px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d94f0b" strokeWidth="2" aria-hidden="true">
                      <path d="M9 12l2 2 4-4M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7z" />
                    </svg>
                  </span>
                  <span>{isEn ? 'Every certificate is issued with a verification QR code for authentic validation' : 'Chứng thư có mã QR để đối chiếu thông tin phát hành'}</span>
                </li>
              </ul>

              <div style={{ display: 'flex', gap: '.8rem', flexWrap: 'wrap', marginTop: '2.2rem' }}>
                <a
                  href="/phap-ly/quy-trinh"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '.55rem',
                    border: '1.5px solid var(--c-ink,#16181c)',
                    color: 'var(--c-ink,#16181c)',
                    fontWeight: 700,
                    fontSize: '.95rem',
                    padding: '.9rem 1.5rem',
                    borderRadius: '6px',
                    whiteSpace: 'nowrap',
                    transition: 'all .2s',
                    textDecoration: 'none',
                  }}
                >
                  {isEn ? 'Standards & Procedures' : 'Xem hồ sơ pháp lý'}
                </a>
                <a
                  href="/phap-ly/tra-cuu"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '.4rem',
                    fontSize: '.88rem',
                    fontWeight: 700,
                    color: 'var(--c-accent,#d94f0a)',
                    whiteSpace: 'nowrap',
                    textDecoration: 'none',
                  }}
                >
                  {isEn ? 'Verify Certificate' : 'Tra cứu chứng thư'}{' '}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right: 4 PDF Download Cards */}
            <div
              style={{
                flex: '1 1 420px',
                minWidth: 0,
                background: '#fff',
                border: '1px solid var(--c-border,#e2e0da)',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 30px 60px rgba(var(--c-ink-rgb,22,24,28),.06)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', padding: '1.2rem 1.5rem', borderBottom: '1px solid var(--c-border,#e2e0da)', background: 'var(--c-page,#f6f5f2)' }}>
                <span style={{ fontSize: '.74rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--c-ink,#16181c)' }}>
                  {isEn ? 'Public Documents' : 'Tài liệu công khai'}
                </span>
                <span style={{ fontSize: '.74rem', color: 'var(--c-faint,#8a8f96)' }}>
                  {isEn ? '4 documents · PDF' : '4 tài liệu · PDF'}
                </span>
              </div>

              <a
                href="#"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.15rem 1.5rem',
                  color: 'var(--c-ink,#16181c)',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--c-border,#e2e0da)',
                }}
              >
                <span style={{ width: '42px', height: '48px', flexShrink: 0, borderRadius: '6px', border: '1px solid var(--c-border,#e2e0da)', background: 'var(--c-icon,#fbf7f3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px', color: 'var(--c-accent,#d94f0a)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z" /><path d="M14 3v6h6M9 14l2 2 4-4" /></svg>
                  <span style={{ fontSize: '.52rem', fontWeight: 800, letterSpacing: '.04em' }}>PDF</span>
                </span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: '.92rem', fontWeight: 700, lineHeight: 1.4 }}>
                    {isEn ? 'Certificate of Eligibility for Valuation Services' : 'Giấy chứng nhận đủ điều kiện kinh doanh dịch vụ thẩm định giá'}
                  </span>
                  <span style={{ display: 'block', fontSize: '.78rem', color: 'var(--c-faint,#8a8f96)', marginTop: '.15rem' }}>
                    {isEn ? `No. 000/GCN-BTC · Updated ${latestTeamUpdate}` : `Số 000/GCN-BTC · Cập nhật ${latestTeamUpdate}`}
                  </span>
                </span>
                <span style={{ flexShrink: 0, color: 'var(--c-accent,#d94f0a)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                </span>
              </a>

              <a
                href="#"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.15rem 1.5rem',
                  color: 'var(--c-ink,#16181c)',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--c-border,#e2e0da)',
                }}
              >
                <span style={{ width: '42px', height: '48px', flexShrink: 0, borderRadius: '6px', border: '1px solid var(--c-border,#e2e0da)', background: 'var(--c-icon,#fbf7f3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px', color: 'var(--c-accent,#d94f0a)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z" /><path d="M14 3v6h6M9 14l2 2 4-4" /></svg>
                  <span style={{ fontSize: '.52rem', fontWeight: 800, letterSpacing: '.04em' }}>PDF</span>
                </span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: '.92rem', fontWeight: 700, lineHeight: 1.4 }}>
                    {isEn ? 'Registry of Practicing Valuers at MHD' : 'Danh sách thẩm định viên về giá hành nghề tại MHD'}
                  </span>
                  <span style={{ display: 'block', fontSize: '.78rem', color: 'var(--c-faint,#8a8f96)', marginTop: '.15rem' }}>
                    {isEn ? `Ministry of Finance Official Notice · Updated ${latestTeamUpdate}` : `Theo thông báo của Bộ Tài chính · Cập nhật ${latestTeamUpdate}`}
                  </span>
                </span>
                <span style={{ flexShrink: 0, color: 'var(--c-accent,#d94f0a)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                </span>
              </a>

              <a
                href="/phap-ly/quy-trinh"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.15rem 1.5rem',
                  color: 'var(--c-ink,#16181c)',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--c-border,#e2e0da)',
                }}
              >
                <span style={{ width: '42px', height: '48px', flexShrink: 0, borderRadius: '6px', border: '1px solid var(--c-border,#e2e0da)', background: 'var(--c-icon,#fbf7f3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px', color: 'var(--c-accent,#d94f0a)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z" /><path d="M14 3v6h6M9 14l2 2 4-4" /></svg>
                  <span style={{ fontSize: '.52rem', fontWeight: 800, letterSpacing: '.04em' }}>PDF</span>
                </span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: '.92rem', fontWeight: 700, lineHeight: 1.4 }}>
                    {isEn ? 'Standard Valuation Operating Procedures' : 'Quy trình thẩm định giá tiêu chuẩn'}
                  </span>
                  <span style={{ display: 'block', fontSize: '.78rem', color: 'var(--c-faint,#8a8f96)', marginTop: '.15rem' }}>
                    {isEn ? 'Effective from 01/07/2024' : 'Áp dụng từ 01/07/2024'}
                  </span>
                </span>
                <span style={{ flexShrink: 0, color: 'var(--c-accent,#d94f0a)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                </span>
              </a>

              <a
                href="/phap-ly/chinh-sach"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.15rem 1.5rem',
                  color: 'var(--c-ink,#16181c)',
                  textDecoration: 'none',
                }}
              >
                <span style={{ width: '42px', height: '48px', flexShrink: 0, borderRadius: '6px', border: '1px solid var(--c-border,#e2e0da)', background: 'var(--c-icon,#fbf7f3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px', color: 'var(--c-accent,#d94f0a)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z" /><path d="M14 3v6h6M9 14l2 2 4-4" /></svg>
                  <span style={{ fontSize: '.52rem', fontWeight: 800, letterSpacing: '.04em' }}>PDF</span>
                </span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: '.92rem', fontWeight: 700, lineHeight: 1.4 }}>
                    {isEn ? 'Client Confidentiality & Data Policy' : 'Chính sách bảo mật thông tin khách hàng'}
                  </span>
                  <span style={{ display: 'block', fontSize: '.78rem', color: 'var(--c-faint,#8a8f96)', marginTop: '.15rem' }}>
                    {isEn ? 'Version 2.0' : 'Phiên bản 2.0'}
                  </span>
                </span>
                <span style={{ flexShrink: 0, color: 'var(--c-accent,#d94f0a)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 9. HỒ SƠ TIÊU BIỂU (#du-an) */}
      <section id="du-an" style={{ scrollMarginTop: '130px', background: '#fff', padding: 'clamp(4.5rem,8vw,7.5rem) 0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem,4vw,2.5rem)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1.5rem', flexWrap: 'wrap', marginBottom: 'clamp(2.6rem,4vw,3.6rem)' }}>
            <div>
              <span style={{ display: 'block', fontSize: '.74rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)', marginBottom: '.8rem' }}>
                {isEn ? 'Selected Engagements' : 'Hồ sơ tiêu biểu'}
              </span>
              <h2 style={{ fontFamily: "'Be Vietnam Pro',sans-serif", fontWeight: 600, fontSize: 'clamp(1.8rem,1.3rem + 1.3vw,2.5rem)', lineHeight: 1.28, letterSpacing: '-.012em', color: 'var(--c-ink,#16181c)' }}>
                {isEn ? 'Proven Track Record Across Practical Assets' : 'Kinh nghiệm qua các hồ sơ thực tế'}
              </h2>
            </div>
            <a
              href="/projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.4rem',
                fontSize: '.88rem',
                fontWeight: 700,
                color: 'var(--c-accent,#d94f0a)',
                whiteSpace: 'nowrap',
                textDecoration: 'none',
              }}
            >
              {isEn ? 'View All Projects' : 'Xem dự án tiêu biểu'}{' '}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,max(260px,45%)),1fr))', gap: '1.4rem' }}>
            {/* Card 1 */}
            <article style={{ display: 'flex', flexDirection: 'column', border: '1px solid var(--c-border,#e2e0da)', borderRadius: '14px', overflow: 'hidden', background: '#fff' }}>
              <div style={{ padding: '1.5rem 1.6rem 1.2rem', borderBottom: '1px solid var(--c-border,#e2e0da)', background: 'var(--c-page,#f6f5f2)' }}>
                <span style={{ display: 'inline-block', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)', marginBottom: '.5rem' }}>
                  {isEn ? 'Machinery & Equipment' : 'Máy móc thiết bị'}
                </span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                  {isEn ? 'Flour Milling Production Line' : 'Dây chuyền sản xuất bột mì'}
                </h3>
              </div>
              <dl style={{ margin: 0, padding: '1.3rem 1.6rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '.9rem' }}>
                <div>
                  <dt style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--c-faint,#8a8f96)', marginBottom: '.2rem' }}>
                    {isEn ? 'Context' : 'Bối cảnh'}
                  </dt>
                  <dd style={{ margin: 0, fontSize: '.9rem', color: 'var(--c-ink,#16181c)' }}>
                    {isEn ? 'Enterprise required asset value basis for credit facility and capital restructuring.' : 'Doanh nghiệp cần cơ sở giá trị tài sản phục vụ cấp tín dụng và tái cấu trúc vốn.'}
                  </dd>
                </div>
                <div>
                  <dt style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--c-faint,#8a8f96)', marginBottom: '.2rem' }}>
                    {isEn ? 'Scope' : 'Phạm vi thẩm định'}
                  </dt>
                  <dd style={{ margin: 0, fontSize: '.9rem', color: 'var(--c-ink,#16181c)' }}>
                    {isEn ? 'On-site technical survey, engineering dossier audit, secondary machinery market analysis.' : 'Khảo sát hiện trạng, thu thập hồ sơ kỹ thuật, phân tích thông tin thị trường.'}
                  </dd>
                </div>
                <div>
                  <dt style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--c-faint,#8a8f96)', marginBottom: '.2rem' }}>
                    {isEn ? 'Delivered Value' : 'Giá trị cung cấp'}
                  </dt>
                  <dd style={{ margin: 0, fontSize: '.9rem', color: 'var(--c-ink,#16181c)' }}>
                    {isEn ? 'Authoritative valuation report and certificate underpinning successful commercial banking approval.' : 'Chứng thư và báo cáo thẩm định giá làm cơ sở cho quyết định của khách hàng.'}
                  </dd>
                </div>
              </dl>
            </article>

            {/* Card 2 */}
            <article style={{ display: 'flex', flexDirection: 'column', border: '1px solid var(--c-border,#e2e0da)', borderRadius: '14px', overflow: 'hidden', background: '#fff' }}>
              <div style={{ padding: '1.5rem 1.6rem 1.2rem', borderBottom: '1px solid var(--c-border,#e2e0da)', background: 'var(--c-page,#f6f5f2)' }}>
                <span style={{ display: 'inline-block', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)', marginBottom: '.5rem' }}>
                  {isEn ? 'Real Estate' : 'Bất động sản'}
                </span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                  {isEn ? 'Urban Township Complex in Southern Hub' : 'Khu đô thị tại TP. Hồ Chí Minh'}
                </h3>
              </div>
              <dl style={{ margin: 0, padding: '1.3rem 1.6rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '.9rem' }}>
                <div>
                  <dt style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--c-faint,#8a8f96)', marginBottom: '.2rem' }}>
                    {isEn ? 'Context' : 'Bối cảnh'}
                  </dt>
                  <dd style={{ margin: 0, fontSize: '.9rem', color: 'var(--c-ink,#16181c)' }}>
                    {isEn ? 'Developer required project market valuation for joint-venture investment and financing.' : 'Chủ đầu tư cần xác định giá trị dự án phục vụ hợp tác đầu tư.'}
                  </dd>
                </div>
                <div>
                  <dt style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--c-faint,#8a8f96)', marginBottom: '.2rem' }}>
                    {isEn ? 'Scope' : 'Phạm vi thẩm định'}
                  </dt>
                  <dd style={{ margin: 0, fontSize: '.9rem', color: 'var(--c-ink,#16181c)' }}>
                    {isEn ? 'Statutory land permit review, DCF cash flow simulation, comparable transaction benchmarking.' : 'Rà soát pháp lý dự án, phân tích dòng tiền, đối chiếu giao dịch so sánh.'}
                  </dd>
                </div>
                <div>
                  <dt style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--c-faint,#8a8f96)', marginBottom: '.2rem' }}>
                    {isEn ? 'Delivered Value' : 'Giá trị cung cấp'}
                  </dt>
                  <dd style={{ margin: 0, fontSize: '.9rem', color: 'var(--c-ink,#16181c)' }}>
                    {isEn ? 'Robust valuation opinion facilitating institutional investor syndication.' : 'Chứng thư và báo cáo thẩm định giá làm cơ sở cho quyết định của khách hàng.'}
                  </dd>
                </div>
              </dl>
            </article>

            {/* Card 3 */}
            <article style={{ display: 'flex', flexDirection: 'column', border: '1px solid var(--c-border,#e2e0da)', borderRadius: '14px', overflow: 'hidden', background: '#fff' }}>
              <div style={{ padding: '1.5rem 1.6rem 1.2rem', borderBottom: '1px solid var(--c-border,#e2e0da)', background: 'var(--c-page,#f6f5f2)' }}>
                <span style={{ display: 'inline-block', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)', marginBottom: '.5rem' }}>
                  {isEn ? 'Enterprise Valuation' : 'Giá trị doanh nghiệp'}
                </span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                  {isEn ? 'FMCG Manufacturing Enterprise' : 'Doanh nghiệp sản xuất'}
                </h3>
              </div>
              <dl style={{ margin: 0, padding: '1.3rem 1.6rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '.9rem' }}>
                <div>
                  <dt style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--c-faint,#8a8f96)', marginBottom: '.2rem' }}>
                    {isEn ? 'Context' : 'Bối cảnh'}
                  </dt>
                  <dd style={{ margin: 0, fontSize: '.9rem', color: 'var(--c-ink,#16181c)' }}>
                    {isEn ? 'Enterprise required valuation for capital reorganization and private placement.' : 'Doanh nghiệp cần xác định giá trị phục vụ tái cấu trúc vốn.'}
                  </dd>
                </div>
                <div>
                  <dt style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--c-faint,#8a8f96)', marginBottom: '.2rem' }}>
                    {isEn ? 'Scope' : 'Phạm vi thẩm định'}
                  </dt>
                  <dd style={{ margin: 0, fontSize: '.9rem', color: 'var(--c-ink,#16181c)' }}>
                    {isEn ? 'Financial audit review, selection of multiple approaches compliant with Circular 36/2024.' : 'Phân tích báo cáo tài chính, lựa chọn phương pháp theo Thông tư 36/2024.'}
                  </dd>
                </div>
                <div>
                  <dt style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--c-faint,#8a8f96)', marginBottom: '.2rem' }}>
                    {isEn ? 'Delivered Value' : 'Giá trị cung cấp'}
                  </dt>
                  <dd style={{ margin: 0, fontSize: '.9rem', color: 'var(--c-ink,#16181c)' }}>
                    {isEn ? 'Independent valuation certified for shareholder and board ratification.' : 'Chứng thư và báo cáo thẩm định giá làm cơ sở cho quyết định của khách hàng.'}
                  </dd>
                </div>
              </dl>
            </article>

            {/* Card 4 */}
            <article style={{ display: 'flex', flexDirection: 'column', border: '1px solid var(--c-border,#e2e0da)', borderRadius: '14px', overflow: 'hidden', background: '#fff' }}>
              <div style={{ padding: '1.5rem 1.6rem 1.2rem', borderBottom: '1px solid var(--c-border,#e2e0da)', background: 'var(--c-page,#f6f5f2)' }}>
                <span style={{ display: 'inline-block', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)', marginBottom: '.5rem' }}>
                  {isEn ? 'Commercial Hospitality' : 'Bất động sản thương mại'}
                </span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                  {isEn ? 'Beachfront Luxury Resort Hotel' : 'Khách sạn nghỉ dưỡng'}
                </h3>
              </div>
              <dl style={{ margin: 0, padding: '1.3rem 1.6rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '.9rem' }}>
                <div>
                  <dt style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--c-faint,#8a8f96)', marginBottom: '.2rem' }}>
                    {isEn ? 'Context' : 'Bối cảnh'}
                  </dt>
                  <dd style={{ margin: 0, fontSize: '.9rem', color: 'var(--c-ink,#16181c)' }}>
                    {isEn ? 'Commercial credit institution required asset appraisal for collateralized loan facility.' : 'Tổ chức tín dụng cần cơ sở giá trị tài sản bảo đảm.'}
                  </dd>
                </div>
                <div>
                  <dt style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--c-faint,#8a8f96)', marginBottom: '.2rem' }}>
                    {isEn ? 'Scope' : 'Phạm vi thẩm định'}
                  </dt>
                  <dd style={{ margin: 0, fontSize: '.9rem', color: 'var(--c-ink,#16181c)' }}>
                    {isEn ? 'Comprehensive hospitality asset audit, RevPAR/ADR cash flow yield modeling, and regional market comparison.' : 'Khảo sát tài sản, phân tích thu nhập và thị trường khu vực.'}
                  </dd>
                </div>
                <div>
                  <dt style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--c-faint,#8a8f96)', marginBottom: '.2rem' }}>
                    {isEn ? 'Delivered Value' : 'Giá trị cung cấp'}
                  </dt>
                  <dd style={{ margin: 0, fontSize: '.9rem', color: 'var(--c-ink,#16181c)' }}>
                    {isEn ? 'Valuation dossier rigorously defended before internal bank risk committee.' : 'Chứng thư và báo cáo thẩm định giá làm cơ sở cho quyết định của khách hàng.'}
                  </dd>
                </div>
              </dl>
            </article>
          </div>

          <p style={{ fontSize: '.78rem', color: 'var(--c-faint,#8a8f96)', marginTop: '1.4rem' }}>
            {isEn ? 'Client identities and asset values are masked in compliance with statutory confidentiality.' : 'Thông tin khách hàng và giá trị tài sản được ẩn theo nghĩa vụ bảo mật.'}
          </p>
        </div>
      </section>

      {/* 10. ĐỐI TÁC & KHÁCH HÀNG (#doi-tac) */}
      <section id="doi-tac" style={{ scrollMarginTop: '130px', background: 'var(--c-page,#f6f5f2)', padding: 'clamp(4.5rem,8vw,7.5rem) 0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem,4vw,2.5rem)' }}>
          <PartnersSection
            data={{
              badge: isEn ? 'PARTNERS & CLIENTS' : 'ĐỐI TÁC & KHÁCH HÀNG',
              heading: isEn ? 'Organizations Working with MHD' : 'Đơn vị đã làm việc cùng MHD',
              description: '',
            }}
            partners={partnersList}
            currentLocale={locale}
          />

          <figure style={{ margin: '0 auto', maxWidth: '820px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', lineHeight: 0.6, color: 'var(--c-accent,#d94f0a)', marginBottom: '.8rem' }} aria-hidden="true">
              “
            </div>
            <blockquote style={{ margin: 0, fontSize: 'clamp(1.1rem,1rem + .5vw,1.35rem)', fontWeight: 500, lineHeight: 1.6, color: 'var(--c-ink,#16181c)', textWrap: 'balance' }}>
              {isEn
                ? 'MHD’s valuation reports and certificates maintain strict professional independence, solid statutory grounds, and transparent methodologies, fully meeting rigorous credit review requirements from partner banking institutions.'
                : 'Báo cáo và Chứng thư thẩm định giá của MHD luôn bảo đảm tính độc lập, căn cứ pháp lý chặt chẽ và phương pháp tính toán minh bạch, đáp ứng tuyệt đối yêu cầu thẩm định từ các tổ chức tín dụng và ngân hàng đối tác.'}
            </blockquote>
            <figcaption style={{ marginTop: '1.2rem', fontSize: '.88rem', color: 'var(--c-muted,#5f656d)' }}>
              <strong style={{ color: 'var(--c-ink,#16181c)' }}>{isEn ? 'Chief Financial Officer (CFO)' : 'Giám đốc Tài chính (CFO)'}</strong> · {isEn ? 'Industrial & Manufacturing Client Group' : 'Tập đoàn Sản xuất & Công nghiệp đối tác'}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 11. CTA CUỐI TRANG (#lien-he) */}
      <section
        id="lien-he"
        style={{
          scrollMarginTop: '130px',
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--c-partner,#23262c)',
          color: '#fff',
          padding: 'clamp(5rem,9vw,8rem) 0',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse at 80% 20%,#000 0%,transparent 60%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 80% 20%,#000 0%,transparent 60%)',
          }}
        />
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem,4vw,2.5rem)' }}>
          <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', gap: 'clamp(2.5rem,5vw,4rem)', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: '1.3 1 420px', minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: '.74rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-badge,#f3c9b3)', marginBottom: '.8rem' }}>
                {isEn ? 'Next Step' : 'Bước tiếp theo'}
              </span>
              <h2 style={{ fontFamily: "'Be Vietnam Pro',sans-serif", fontWeight: 600, fontSize: 'clamp(1.8rem,1.3rem + 1.3vw,2.5rem)', lineHeight: 1.28, color: '#fff', marginBottom: '1rem' }}>
                {isEn ? 'Discuss Your Valuation Requirements with Us' : 'Trao đổi về nhu cầu thẩm định của quý khách'}
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--c-ondark-muted,#b9bcc3)', maxWidth: '52ch', lineHeight: 1.65 }}>
                {isEn
                  ? 'MHD receives initial parameters, defines statutory scope, and responds promptly with technical orientation.'
                  : 'MHD tiếp nhận thông tin ban đầu, xác định phạm vi công việc phù hợp và phản hồi hướng xử lý.'}
              </p>
              <div style={{ display: 'flex', gap: '.8rem', flexWrap: 'wrap', marginTop: '2rem' }}>
                <a
                  href="/contact#yeu-cau"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '.55rem',
                    background: 'var(--c-accent,#d94f0a)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '.95rem',
                    padding: '.95rem 1.7rem',
                    borderRadius: '6px',
                    whiteSpace: 'nowrap',
                    textDecoration: 'none',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z" />
                    <path d="M14 3v6h6M9 14l2 2 4-4" />
                  </svg>
                  {isEn ? 'Submit Valuation Request' : 'Gửi yêu cầu thẩm định'}
                </a>
                <a
                  href={`tel:${contactPhone.replace(/\s+/g, '')}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '.55rem',
                    border: '1.5px solid rgba(255,255,255,.4)',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '.95rem',
                    padding: '.9rem 1.5rem',
                    borderRadius: '6px',
                    whiteSpace: 'nowrap',
                    textDecoration: 'none',
                  }}
                >
                  Hotline {contactPhone}
                </a>
              </div>
            </div>

            <div
              style={{
                flex: '1 1 320px',
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
                border: '1px solid rgba(255,255,255,.14)',
                borderRadius: '14px',
                background: 'rgba(255,255,255,.04)',
              }}
            >
              <div style={{ padding: '1.2rem 1.4rem', display: 'flex', gap: '.9rem', alignItems: 'flex-start' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--c-badge,#f3c9b3)', marginTop: '.5rem', flexShrink: 0 }}></span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: '.72rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--c-badge,#f3c9b3)' }}>
                    {isEn ? 'Response Commitment' : 'Phản hồi tiếp nhận'}
                  </span>
                  <span style={{ display: 'block', fontSize: '.92rem', color: '#fff', marginTop: '.2rem' }}>
                    {isEn ? 'Within business hours upon receiving full information' : 'Trong giờ làm việc, sau khi nhận đủ thông tin ban đầu'}
                  </span>
                </span>
              </div>
              <div style={{ padding: '1.2rem 1.4rem', borderTop: '1px solid rgba(255,255,255,.1)', display: 'flex', gap: '.9rem', alignItems: 'flex-start' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--c-badge,#f3c9b3)', marginTop: '.5rem', flexShrink: 0 }}></span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: '.72rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--c-badge,#f3c9b3)' }}>
                    {isEn ? 'Confidentiality' : 'Bảo mật thông tin'}
                  </span>
                  <span style={{ display: 'block', fontSize: '.92rem', color: '#fff', marginTop: '.2rem' }}>
                    {isEn ? 'Information is strictly utilized for valuation request purposes' : 'Thông tin hồ sơ chỉ dùng cho mục đích xử lý yêu cầu'}
                  </span>
                </span>
              </div>
              <div style={{ padding: '1.2rem 1.4rem', borderTop: '1px solid rgba(255,255,255,.1)', display: 'flex', gap: '.9rem', alignItems: 'flex-start' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--c-badge,#f3c9b3)', marginTop: '.5rem', flexShrink: 0 }}></span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: '.72rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--c-badge,#f3c9b3)' }}>
                    {isEn ? 'Direct Contact' : 'Đầu mối phụ trách'}
                  </span>
                  <span style={{ display: 'block', fontSize: '.92rem', color: '#fff', marginTop: '.2rem' }}>
                    {contactEmail} · {contactPhone}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
