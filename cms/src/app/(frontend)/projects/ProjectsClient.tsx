'use client'

import React, { useState } from 'react'
import Link from 'next/link'

interface ProjectItem {
  id: string | number
  title: string
  category: string
  client?: string
  valuationPurpose?: string
  scale?: string
  year?: number
  image?: string
  location?: string
  highlights?: string[]
}

interface ProjectsClientProps {
  initialProjects: ProjectItem[]
  activeCategory?: string
  currentLocale?: string
}

export default function ProjectsClient({
  initialProjects = [],
  activeCategory = 'all',
  currentLocale = 'vi',
}: ProjectsClientProps) {
  const isEn = currentLocale === 'en'
  const [selectedCat, setSelectedCat] = useState<string>(activeCategory)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)

  const categories = [
    { key: 'all', href: '/projects', label: isEn ? 'All Asset Classes' : 'Tất cả nhóm tài sản' },
    { key: 'doanh-nghiep', href: '/projects/doanh-nghiep', label: isEn ? 'Enterprise Valuation' : 'Doanh nghiệp' },
    { key: 'bat-dong-san', href: '/projects/bat-dong-san', label: isEn ? 'Real Estate' : 'Bất động sản' },
    { key: 'ha-tang', href: '/projects/ha-tang', label: isEn ? 'Infrastructure & Plants' : 'Hạ tầng & Nhà máy' },
    { key: 'may-thiet-bi', href: '/projects/may-thiet-bi', label: isEn ? 'Machinery & Equipment' : 'Máy móc thiết bị' },
    { key: 'tai-san-vo-hinh', href: '/projects/tai-san-vo-hinh', label: isEn ? 'Intangibles & IP' : 'Tài sản vô hình' },
  ]

  const filteredProjects = initialProjects.filter((p) => {
    const matchesCat = selectedCat === 'all' || p.category === selectedCat
    if (!matchesCat) return false
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase().trim()
    return (
      p.title?.toLowerCase().includes(q) ||
      p.client?.toLowerCase().includes(q) ||
      p.valuationPurpose?.toLowerCase().includes(q) ||
      p.scale?.toLowerCase().includes(q) ||
      p.location?.toLowerCase().includes(q)
    )
  })

  // Featured project for showcase banner (first project or prominent one)
  const featuredProject = filteredProjects[0] || initialProjects[0]

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'doanh-nghiep':
        return isEn ? 'Enterprise' : 'Doanh nghiệp'
      case 'bat-dong-san':
        return isEn ? 'Real Estate' : 'Bất động sản'
      case 'ha-tang':
        return isEn ? 'Infrastructure' : 'Hạ tầng & Nhà máy'
      case 'may-thiet-bi':
        return isEn ? 'Machinery' : 'Máy móc thiết bị'
      case 'tai-san-vo-hinh':
        return isEn ? 'Intangibles & IP' : 'Tài sản vô hình'
      default:
        return isEn ? 'Valuation' : 'Thẩm định giá'
    }
  }

  const getCategoryBadgeColor = (cat: string) => {
    switch (cat) {
      case 'doanh-nghiep':
        return { bg: 'rgba(217, 79, 10, 0.08)', text: 'var(--c-accent, #d94f0a)', border: 'rgba(217, 79, 10, 0.22)' }
      case 'bat-dong-san':
        return { bg: 'rgba(20, 110, 180, 0.08)', text: '#0e6aab', border: 'rgba(20, 110, 180, 0.22)' }
      case 'ha-tang':
        return { bg: 'rgba(24, 140, 90, 0.08)', text: '#15804c', border: 'rgba(24, 140, 90, 0.22)' }
      case 'may-thiet-bi':
        return { bg: 'rgba(120, 60, 200, 0.08)', text: '#7038bb', border: 'rgba(120, 60, 200, 0.22)' }
      case 'tai-san-vo-hinh':
        return { bg: 'rgba(180, 90, 30, 0.08)', text: '#a85012', border: 'rgba(180, 90, 30, 0.22)' }
      default:
        return { bg: 'rgba(22, 24, 28, 0.06)', text: 'var(--c-ink, #16181c)', border: 'rgba(22, 24, 28, 0.15)' }
    }
  }

  return (
    <div style={{ background: 'var(--c-page, #f6f5f2)', minHeight: '100vh', color: 'var(--c-ink, #16181c)' }}>
      {/* 1. HERO SECTION (Identical Aesthetics with Homepage & Legal page) */}
      <section
        data-screen-label="Dự án — Hero"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--c-page, #f6f5f2)',
          borderBottom: '1px solid var(--c-border, #e2e0da)',
          paddingTop: 'clamp(2.5rem, 5vw, 4rem)',
          paddingBottom: 'clamp(3rem, 5vw, 4.5rem)',
        }}
      >
        {/* Architectural 56px subtle grid */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            backgroundImage:
              'linear-gradient(rgba(var(--c-ink-rgb, 22, 24, 28), .045) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--c-ink-rgb, 22, 24, 28), .045) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'linear-gradient(100deg, transparent 0%, #000 40%, #000 75%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(100deg, transparent 0%, #000 40%, #000 75%, transparent 100%)',
          }}
        />

        {/* Ambient Warm Gradient Glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-8%',
            top: '-25%',
            width: '640px',
            height: '640px',
            borderRadius: '50%',
            pointerEvents: 'none',
            background: 'radial-gradient(circle, rgba(var(--c-accent-rgb, 217, 79, 10), .11), transparent 65%)',
            filter: 'blur(30px)',
          }}
        />

        {/* Floating Geometric Wireframe Hexagon Branding SVG */}
        <svg
          aria-hidden="true"
          viewBox="0 0 500 400"
          fill="none"
          style={{
            position: 'absolute',
            right: '3%',
            top: '8%',
            width: 'min(40%, 460px)',
            height: 'auto',
            pointerEvents: 'none',
            opacity: 0.65,
          }}
        >
          <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'mhdFloatA 10s ease-in-out infinite alternate' }}>
            <polygon points="340,60 430,110 430,215 340,265 250,215 250,110" stroke="var(--c-accent, #d94f0a)" strokeWidth="1.3" />
            <polygon points="340,100 400,135 400,205 340,240 280,205 280,135" stroke="var(--c-accent, #d94f0a)" strokeWidth="0.8" opacity="0.45" />
          </g>
          <circle cx="340" cy="188" r="140" stroke="rgba(var(--c-ink-rgb, 22, 24, 28), 0.12)" strokeWidth="1" strokeDasharray="4 12" />
        </svg>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem, 4vw, 2.5rem)' }}>
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '.5rem',
              fontSize: '.82rem',
              color: 'var(--c-faint, #8a8f96)',
              marginBottom: '1.4rem',
            }}
          >
            <Link href="/" style={{ color: 'var(--c-faint, #8a8f96)', textDecoration: 'none' }}>
              {isEn ? 'Home' : 'Trang chủ'}
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href="/projects"
              onClick={() => setSelectedCat('all')}
              style={{
                color: selectedCat === 'all' ? 'var(--c-ink, #16181c)' : 'var(--c-faint, #8a8f96)',
                fontWeight: selectedCat === 'all' ? 600 : 400,
                textDecoration: 'none',
              }}
            >
              {isEn ? 'Portfolio & Projects' : 'Dự án & Hồ sơ Tiêu biểu'}
            </Link>
            {selectedCat !== 'all' && (
              <>
                <span aria-hidden="true">/</span>
                <span style={{ color: 'var(--c-accent, #d94f0a)', fontWeight: 600 }}>
                  {getCategoryLabel(selectedCat)}
                </span>
              </>
            )}
          </nav>

          {/* Header row with Title & Fast Action */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ maxWidth: '780px' }}>
              {/* Badge Pill */}
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '.5rem',
                  fontSize: '.74rem',
                  fontWeight: 700,
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  color: 'var(--c-accent, #d94f0a)',
                  border: '1px solid var(--c-border, #e2e0da)',
                  background: '#fff',
                  padding: '.42rem .95rem',
                  borderRadius: '999px',
                  marginBottom: '1.2rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M9 12l2 2 4-4M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7z" />
                </svg>
                {isEn ? 'Proven Valuation Track Record' : 'Năng lực hồ sơ thực tiễn'}
              </span>

              {/* Page Title */}
              <h1
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: 'clamp(2.2rem, 1.6rem + 2.5vw, 3.6rem)',
                  fontWeight: 700,
                  lineHeight: 1.16,
                  letterSpacing: '-.025em',
                  color: 'var(--c-ink, #16181c)',
                  marginBottom: '1rem',
                }}
              >
                {isEn ? 'Featured Valuation Engagements' : 'Dự án & Hồ sơ Tiêu biểu'}
              </h1>

              {/* Subtitle Description */}
              <p
                style={{
                  fontSize: 'clamp(1rem, .95rem + .3vw, 1.15rem)',
                  color: 'var(--c-muted, #5f656d)',
                  maxWidth: '68ch',
                  lineHeight: 1.6,
                }}
              >
                {isEn
                  ? 'Over 5,000 completed valuation engagements across enterprise equity, commercial real estate, industrial infrastructure, and intangible assets accepted by top commercial banks and audit institutions.'
                  : 'Hơn 5.000 hồ sơ thẩm định giá doanh nghiệp, bất động sản, hạ tầng khu công nghiệp và tài sản vô hình đã hoàn thành, được các tổ chức tín dụng và kiểm toán độc lập chấp thuận.'}
              </p>
            </div>

            {/* Quick Consultation Callout in Hero */}
            <div
              style={{
                background: '#fff',
                border: '1px solid var(--c-border, #e2e0da)',
                borderRadius: '12px',
                padding: '1.4rem 1.6rem',
                boxShadow: '0 8px 24px rgba(22, 24, 28, 0.04)',
                minWidth: '260px',
                maxWidth: '320px',
                flex: '0 0 auto',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '.6rem' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--c-accent, #d94f0a)',
                    boxShadow: '0 0 0 3px rgba(217, 79, 10, 0.2)',
                  }}
                />
                <span style={{ fontSize: '.76rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--c-muted, #5f656d)' }}>
                  {isEn ? 'Direct Appraisal Desk' : 'Tư vấn thẩm định nhanh'}
                </span>
              </div>
              <div style={{ fontSize: '.9rem', color: 'var(--c-ink, #16181c)', fontWeight: 600, lineHeight: 1.45, marginBottom: '1rem' }}>
                {isEn ? 'Need valuation scoping for similar portfolios?' : 'Bạn cần tư vấn hồ sơ cho dự án tương tự?'}
              </div>
              <Link
                href="/contact"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '.5rem',
                  width: '100%',
                  background: 'var(--c-ink, #16181c)',
                  color: '#fff',
                  fontSize: '.85rem',
                  fontWeight: 600,
                  padding: '.65rem 1rem',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
              >
                {isEn ? 'Request Quotation' : 'Yêu cầu báo phí'}
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Key Metrics Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
              gap: '1.5rem',
              paddingTop: '2rem',
              marginTop: '2.5rem',
              borderTop: '1px solid var(--c-border, #e2e0da)',
            }}
          >
            <div>
              <div style={{ fontSize: 'clamp(1.8rem, 1.4rem + 1vw, 2.4rem)', fontWeight: 700, color: 'var(--c-ink, #16181c)', letterSpacing: '-0.03em' }}>
                5.000+
              </div>
              <div style={{ fontSize: '.84rem', color: 'var(--c-muted, #5f656d)', marginTop: '.25rem' }}>
                {isEn ? 'Completed dossiers' : 'Hồ sơ thẩm định hoàn thành'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 'clamp(1.8rem, 1.4rem + 1vw, 2.4rem)', fontWeight: 700, color: 'var(--c-accent, #d94f0a)', letterSpacing: '-0.03em' }}>
                100.000+ Tỷ
              </div>
              <div style={{ fontSize: '.84rem', color: 'var(--c-muted, #5f656d)', marginTop: '.25rem' }}>
                {isEn ? 'Total Asset Value Appraised' : 'Tổng giá trị tài sản thẩm định'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 'clamp(1.8rem, 1.4rem + 1vw, 2.4rem)', fontWeight: 700, color: 'var(--c-ink, #16181c)', letterSpacing: '-0.03em' }}>
                100%
              </div>
              <div style={{ fontSize: '.84rem', color: 'var(--c-muted, #5f656d)', marginTop: '.25rem' }}>
                {isEn ? 'Bank Credit Acceptance' : 'Được hệ thống ngân hàng chấp thuận'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 'clamp(1.8rem, 1.4rem + 1vw, 2.4rem)', fontWeight: 700, color: 'var(--c-ink, #16181c)', letterSpacing: '-0.03em' }}>
                60+
              </div>
              <div style={{ fontSize: '.84rem', color: 'var(--c-muted, #5f656d)', marginTop: '.25rem' }}>
                {isEn ? 'Nationwide Coverage (Provinces)' : 'Tỉnh thành phố trên cả nước'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STICKY FILTER TOOLBAR & VIEW CONTROLS */}
      <section
        style={{
          background: '#fff',
          borderBottom: '1px solid var(--c-border, #e2e0da)',
          position: 'sticky',
          top: '72px',
          zIndex: 20,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem, 4vw, 2.5rem)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
              padding: '.75rem 0',
            }}
          >
            {/* Filter Tabs */}
            <div
              style={{
                display: 'flex',
                gap: '.5rem',
                overflowX: 'auto',
                scrollbarWidth: 'none',
                alignItems: 'center',
                padding: '.2rem 0',
              }}
            >
              {categories.map((cat) => {
                const active = selectedCat === cat.key
                const count =
                  cat.key === 'all'
                    ? initialProjects.length
                    : initialProjects.filter((p) => p.category === cat.key).length

                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setSelectedCat(cat.key)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '.45rem',
                      padding: '.48rem 1rem',
                      fontSize: '.86rem',
                      fontWeight: active ? 700 : 500,
                      borderRadius: '8px',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      transition: 'all 0.18s ease',
                      background: active ? 'var(--c-ink, #16181c)' : '#f6f5f2',
                      color: active ? '#fff' : 'var(--c-muted, #5f656d)',
                      border: active ? '1px solid var(--c-ink, #16181c)' : '1px solid var(--c-border, #e2e0da)',
                    }}
                  >
                    <span>{cat.label}</span>
                    <span
                      style={{
                        fontSize: '.72rem',
                        fontWeight: 700,
                        padding: '.15rem .45rem',
                        borderRadius: '999px',
                        background: active ? 'rgba(255, 255, 255, 0.22)' : 'rgba(0, 0, 0, 0.06)',
                        color: active ? '#fff' : 'var(--c-muted, #5f656d)',
                      }}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Right Tools: Search Input + View Mode Switcher */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '.8rem', flex: '1 1 auto', justifyContent: 'flex-end', minWidth: '280px' }}>
              {/* Search Box */}
              <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isEn ? 'Search project, client, scale...' : 'Tìm kiếm hồ sơ, khách hàng...'}
                  style={{
                    width: '100%',
                    padding: '.52rem .95rem .52rem 2.2rem',
                    fontSize: '.86rem',
                    borderRadius: '8px',
                    border: '1px solid var(--c-border, #e2e0da)',
                    background: '#faf9f6',
                    outline: 'none',
                    color: 'var(--c-ink, #16181c)',
                    transition: 'border-color 0.2s',
                  }}
                />
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{
                    position: 'absolute',
                    left: '.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--c-faint, #8a8f96)',
                    pointerEvents: 'none',
                  }}
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    style={{
                      position: 'absolute',
                      right: '.65rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'var(--c-faint, #8a8f96)',
                      cursor: 'pointer',
                      fontSize: '.9rem',
                      lineHeight: 1,
                    }}
                  >
                    ×
                  </button>
                )}
              </div>

              {/* View Toggle */}
              <div
                style={{
                  display: 'flex',
                  background: '#f6f5f2',
                  padding: '3px',
                  borderRadius: '8px',
                  border: '1px solid var(--c-border, #e2e0da)',
                }}
              >
                <button
                  type="button"
                  title={isEn ? 'Grid View' : 'Xem dạng lưới'}
                  onClick={() => setViewMode('grid')}
                  style={{
                    padding: '.4rem .6rem',
                    borderRadius: '6px',
                    background: viewMode === 'grid' ? '#fff' : 'transparent',
                    color: viewMode === 'grid' ? 'var(--c-ink, #16181c)' : 'var(--c-faint, #8a8f96)',
                    boxShadow: viewMode === 'grid' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                </button>
                <button
                  type="button"
                  title={isEn ? 'Table View' : 'Xem bảng chi tiết'}
                  onClick={() => setViewMode('table')}
                  style={{
                    padding: '.4rem .6rem',
                    borderRadius: '6px',
                    background: viewMode === 'table' ? '#fff' : 'transparent',
                    color: viewMode === 'table' ? 'var(--c-ink, #16181c)' : 'var(--c-faint, #8a8f96)',
                    boxShadow: viewMode === 'table' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN PROJECTS CONTENT AREA */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1rem, 4vw, 2.5rem)' }}>
        {/* Active Filter Info & Reset */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.8rem' }}>
            <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--c-ink, #16181c)' }}>
              {selectedCat === 'all'
                ? isEn ? 'All Valuation Dossiers' : 'Tất cả hồ sơ thực tiễn'
                : getCategoryLabel(selectedCat)}
            </span>
            <span style={{ fontSize: '.84rem', color: 'var(--c-muted, #5f656d)', background: '#fff', border: '1px solid var(--c-border, #e2e0da)', padding: '.2rem .6rem', borderRadius: '999px' }}>
              {filteredProjects.length} {isEn ? 'dossiers' : 'hồ sơ'}
            </span>
          </div>

          {(selectedCat !== 'all' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCat('all')
                setSearchQuery('')
              }}
              style={{
                fontSize: '.84rem',
                fontWeight: 600,
                color: 'var(--c-accent, #d94f0a)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.3rem',
                cursor: 'pointer',
              }}
            >
              <span>✕</span> {isEn ? 'Clear filters' : 'Xóa bộ lọc'}
            </button>
          )}
        </div>

        {/* 3A. FEATURED SPOTLIGHT CASE STUDY BANNER (Matching Editorial Standard) */}
        {selectedCat === 'all' && !searchQuery && featuredProject && (
          <div
            style={{
              background: '#fff',
              border: '1px solid var(--c-border, #e2e0da)',
              borderRadius: '16px',
              overflow: 'hidden',
              marginBottom: '3rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
              boxShadow: '0 12px 36px rgba(22, 24, 28, 0.05)',
              position: 'relative',
            }}
          >
            {/* Visual Media Column */}
            <div style={{ position: 'relative', minHeight: '320px', background: 'var(--c-subtle, #eeece7)', overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featuredProject.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop'}
                alt={featuredProject.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)',
                }}
              />
              <div style={{ position: 'absolute', top: '1.2rem', left: '1.2rem' }}>
                <span
                  style={{
                    fontSize: '.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '.08em',
                    background: 'var(--c-accent, #d94f0a)',
                    color: '#fff',
                    padding: '.35rem .75rem',
                    borderRadius: '6px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  }}
                >
                  {isEn ? 'Featured Spotlight Case' : 'Hồ sơ tiêu biểu nổi bật'}
                </span>
              </div>
              <div style={{ position: 'absolute', bottom: '1.2rem', left: '1.2rem', right: '1.2rem', color: '#fff' }}>
                <div style={{ fontSize: '.78rem', textTransform: 'uppercase', letterSpacing: '.06em', opacity: 0.85 }}>
                  {featuredProject.location || (isEn ? 'Vietnam' : 'Việt Nam')} · {featuredProject.year || 2025}
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '.2rem' }}>
                  {featuredProject.scale}
                </div>
              </div>
            </div>

            {/* Editorial Content Column */}
            <div style={{ padding: 'clamp(1.8rem, 3vw, 2.8rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '.9rem' }}>
                  <span
                    style={{
                      fontSize: '.74rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      padding: '.28rem .65rem',
                      borderRadius: '6px',
                      ...getCategoryBadgeColor(featuredProject.category),
                      border: `1px solid ${getCategoryBadgeColor(featuredProject.category).border}`,
                    }}
                  >
                    {getCategoryLabel(featuredProject.category)}
                  </span>
                  <span style={{ fontSize: '.82rem', color: 'var(--c-faint, #8a8f96)' }}>
                    {isEn ? 'Completed Year' : 'Năm thực hiện'}: {featuredProject.year || 2025}
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: 'clamp(1.25rem, 1.1rem + .6vw, 1.65rem)',
                    fontWeight: 700,
                    lineHeight: 1.35,
                    color: 'var(--c-ink, #16181c)',
                    marginBottom: '1.2rem',
                  }}
                >
                  {featuredProject.title}
                </h2>

                {/* Metadata highlights */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.7rem', marginBottom: '1.5rem', background: '#faf9f6', padding: '1rem 1.2rem', borderRadius: '10px', border: '1px solid var(--c-border, #e2e0da)' }}>
                  {featuredProject.client && (
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '.8rem', fontSize: '.88rem' }}>
                      <span style={{ color: 'var(--c-faint, #8a8f96)', width: '85px', flexShrink: 0, fontWeight: 600 }}>
                        {isEn ? 'Client' : 'Khách hàng'}:
                      </span>
                      <span style={{ fontWeight: 600, color: 'var(--c-ink, #16181c)' }}>{featuredProject.client}</span>
                    </div>
                  )}
                  {featuredProject.valuationPurpose && (
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '.8rem', fontSize: '.88rem' }}>
                      <span style={{ color: 'var(--c-faint, #8a8f96)', width: '85px', flexShrink: 0, fontWeight: 600 }}>
                        {isEn ? 'Purpose' : 'Mục đích'}:
                      </span>
                      <span style={{ color: 'var(--c-muted, #5f656d)', lineHeight: 1.5 }}>{featuredProject.valuationPurpose}</span>
                    </div>
                  )}
                </div>

                {featuredProject.highlights && featuredProject.highlights.length > 0 && (
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '.4rem', marginBottom: '1.5rem' }}>
                    {featuredProject.highlights.map((h, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '.5rem', fontSize: '.84rem', color: 'var(--c-muted, #5f656d)' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent, #d94f0a)" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Action row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingTop: '1.2rem', borderTop: '1px solid var(--c-border, #e2e0da)', flexWrap: 'wrap' }}>
                <Link
                  href="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '.5rem',
                    background: 'var(--c-accent, #d94f0a)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '.9rem',
                    padding: '.75rem 1.4rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(217, 79, 10, 0.25)',
                  }}
                >
                  {isEn ? 'Request Appraisal for Similar Asset' : 'Báo giá cho tài sản tương tự'}
                  <span>→</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedProject(featuredProject)}
                  style={{
                    fontSize: '.88rem',
                    fontWeight: 600,
                    color: 'var(--c-ink, #16181c)',
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px',
                    cursor: 'pointer',
                  }}
                >
                  {isEn ? 'View Dossier Summary' : 'Xem tóm tắt hồ sơ'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3B. EMPTY STATE */}
        {filteredProjects.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '5rem 1.5rem',
              background: '#fff',
              borderRadius: '16px',
              border: '1px solid var(--c-border, #e2e0da)',
            }}
          >
            <div
              style={{
                width: '54px',
                height: '54px',
                margin: '0 auto 1.2rem',
                borderRadius: '12px',
                background: 'var(--c-page, #f6f5f2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent, #d94f0a)" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--c-ink, #16181c)' }}>
              {isEn ? 'No valuation dossiers found' : 'Không tìm thấy hồ sơ phù hợp'}
            </h3>
            <p style={{ color: 'var(--c-muted, #5f656d)', marginTop: '.5rem', fontSize: '.92rem' }}>
              {isEn
                ? 'Try adjusting your search query or reset your asset class filters.'
                : 'Vui lòng thay đổi từ khóa tìm kiếm hoặc chọn nhóm tài sản khác.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('')
                setSelectedCat('all')
              }}
              style={{
                marginTop: '1.4rem',
                padding: '.65rem 1.4rem',
                fontSize: '.88rem',
                fontWeight: 600,
                borderRadius: '6px',
                background: 'var(--c-ink, #16181c)',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {isEn ? 'Reset All Filters' : 'Đặt lại bộ lọc'}
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* 3C. GRID VIEW (Modern Editorial Cards with Visual Thumbnail) */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: '2rem',
            }}
          >
            {filteredProjects.map((p) => {
              const badge = getCategoryBadgeColor(p.category)
              return (
                <article
                  key={p.id}
                  style={{
                    background: '#fff',
                    borderRadius: '14px',
                    border: '1px solid var(--c-border, #e2e0da)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 10px rgba(22, 24, 28, 0.03)',
                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(22, 24, 28, 0.08)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none'
                    e.currentTarget.style.boxShadow = '0 2px 10px rgba(22, 24, 28, 0.03)'
                  }}
                >
                  <div>
                    {/* Visual Media Header */}
                    <div style={{ position: 'relative', aspectRatio: '16/9', background: 'var(--c-subtle, #eeece7)', overflow: 'hidden' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop'}
                        alt={p.title}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(180deg, transparent 40%, rgba(22,24,28,0.7) 100%)',
                        }}
                      />
                      {/* Top Badges */}
                      <div style={{ position: 'absolute', top: '.9rem', left: '.9rem', right: '.9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span
                          style={{
                            fontSize: '.7rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '.06em',
                            padding: '.3rem .65rem',
                            borderRadius: '6px',
                            background: badge.bg,
                            color: badge.text,
                            backdropFilter: 'blur(8px)',
                            border: `1px solid ${badge.border}`,
                          }}
                        >
                          {getCategoryLabel(p.category)}
                        </span>
                        <span
                          style={{
                            fontSize: '.75rem',
                            fontWeight: 700,
                            padding: '.25rem .55rem',
                            borderRadius: '6px',
                            background: 'rgba(0,0,0,0.5)',
                            color: '#fff',
                            backdropFilter: 'blur(4px)',
                          }}
                        >
                          {p.year || 2025}
                        </span>
                      </div>

                      {/* Bottom Scale Banner inside Image */}
                      <div style={{ position: 'absolute', bottom: '.75rem', left: '.9rem', right: '.9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={{ fontSize: '.72rem', color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase', letterSpacing: '.05em', fontWeight: 600 }}>
                          {p.location || (isEn ? 'Vietnam' : 'Việt Nam')}
                        </span>
                        <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                          {p.scale}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: '1.4rem 1.4rem 1rem' }}>
                      <h3
                        style={{
                          fontFamily: "'Be Vietnam Pro', sans-serif",
                          fontSize: '1.12rem',
                          fontWeight: 700,
                          lineHeight: 1.42,
                          color: 'var(--c-ink, #16181c)',
                          marginBottom: '1rem',
                          minHeight: '2.85rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {p.title}
                      </h3>

                      {/* Client & Purpose Info Box */}
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '.55rem',
                          fontSize: '.86rem',
                          background: 'var(--c-page, #f6f5f2)',
                          padding: '.9rem 1rem',
                          borderRadius: '8px',
                          border: '1px solid #ebe9e4',
                        }}
                      >
                        {p.client && (
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '.6rem' }}>
                            <span style={{ color: 'var(--c-faint, #8a8f96)', width: isEn ? '65px' : '85px', flexShrink: 0, fontSize: '.78rem', fontWeight: 600 }}>
                              {isEn ? 'Client' : 'Khách hàng'}
                            </span>
                            <span style={{ fontWeight: 600, color: 'var(--c-ink, #16181c)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {p.client}
                            </span>
                          </div>
                        )}
                        {p.valuationPurpose && (
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '.6rem' }}>
                            <span style={{ color: 'var(--c-faint, #8a8f96)', width: isEn ? '65px' : '85px', flexShrink: 0, fontSize: '.78rem', fontWeight: 600 }}>
                              {isEn ? 'Purpose' : 'Mục đích'}
                            </span>
                            <span
                              style={{
                                color: 'var(--c-muted, #5f656d)',
                                lineHeight: 1.4,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                              }}
                            >
                              {p.valuationPurpose}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Scale & Request Action */}
                  <div
                    style={{
                      padding: '.95rem 1.4rem 1.2rem',
                      borderTop: '1px solid var(--c-border, #e2e0da)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: '#fff',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedProject(p)}
                      style={{
                        fontSize: '.82rem',
                        fontWeight: 600,
                        color: 'var(--c-muted, #5f656d)',
                        cursor: 'pointer',
                        padding: 0,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '.3rem',
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                      </svg>
                      {isEn ? 'Details' : 'Chi tiết'}
                    </button>

                    <Link
                      href="/contact"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '.4rem',
                        fontSize: '.84rem',
                        fontWeight: 700,
                        color: 'var(--c-accent, #d94f0a)',
                        textDecoration: 'none',
                        padding: '.45rem .85rem',
                        borderRadius: '6px',
                        background: 'rgba(217, 79, 10, 0.06)',
                        border: '1px solid rgba(217, 79, 10, 0.16)',
                        transition: 'all 0.18s ease',
                      }}
                    >
                      {isEn ? 'Request quote' : 'Báo giá tương tự'}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          /* 3D. TABLE VIEW (Corporate Registry Layout for Institutional Partners) */
          <div
            style={{
              background: '#fff',
              borderRadius: '14px',
              border: '1px solid var(--c-border, #e2e0da)',
              overflowX: 'auto',
              boxShadow: '0 2px 10px rgba(22, 24, 28, 0.03)',
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px', fontSize: '.88rem' }}>
              <thead>
                <tr style={{ background: '#faf9f6', borderBottom: '1px solid var(--c-border, #e2e0da)' }}>
                  <th style={{ padding: '1rem 1.2rem', fontWeight: 700, color: 'var(--c-ink, #16181c)', width: '90px' }}>
                    {isEn ? 'Year' : 'Năm'}
                  </th>
                  <th style={{ padding: '1rem 1.2rem', fontWeight: 700, color: 'var(--c-ink, #16181c)', width: '160px' }}>
                    {isEn ? 'Category' : 'Phân loại'}
                  </th>
                  <th style={{ padding: '1rem 1.2rem', fontWeight: 700, color: 'var(--c-ink, #16181c)' }}>
                    {isEn ? 'Project / Dossier Title' : 'Hồ sơ Thẩm định giá'}
                  </th>
                  <th style={{ padding: '1rem 1.2rem', fontWeight: 700, color: 'var(--c-ink, #16181c)', width: '220px' }}>
                    {isEn ? 'Valuation Purpose' : 'Mục đích'}
                  </th>
                  <th style={{ padding: '1rem 1.2rem', fontWeight: 700, color: 'var(--c-accent, #d94f0a)', width: '170px', textAlign: 'right' }}>
                    {isEn ? 'Appraised Value' : 'Quy mô / Giá trị'}
                  </th>
                  <th style={{ padding: '1rem 1.2rem', fontWeight: 700, color: 'var(--c-ink, #16181c)', width: '120px', textAlign: 'center' }}>
                    {isEn ? 'Action' : 'Thao tác'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((p, idx) => {
                  const badge = getCategoryBadgeColor(p.category)
                  return (
                    <tr
                      key={p.id}
                      style={{
                        borderBottom: idx === filteredProjects.length - 1 ? 'none' : '1px solid var(--c-border, #e2e0da)',
                        background: idx % 2 === 0 ? '#fff' : '#fcfbf9',
                        transition: 'background 0.15s',
                      }}
                    >
                      <td style={{ padding: '1rem 1.2rem', fontWeight: 600, color: 'var(--c-faint, #8a8f96)' }}>
                        {p.year || 2025}
                      </td>
                      <td style={{ padding: '1rem 1.2rem' }}>
                        <span
                          style={{
                            fontSize: '.72rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            padding: '.25rem .6rem',
                            borderRadius: '4px',
                            background: badge.bg,
                            color: badge.text,
                            border: `1px solid ${badge.border}`,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {getCategoryLabel(p.category)}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 1.2rem' }}>
                        <div style={{ fontWeight: 700, color: 'var(--c-ink, #16181c)', marginBottom: '.25rem' }}>
                          {p.title}
                        </div>
                        {p.client && (
                          <div style={{ fontSize: '.8rem', color: 'var(--c-muted, #5f656d)' }}>
                            <span style={{ color: 'var(--c-faint, #8a8f96)' }}>{isEn ? 'Client' : 'Khách hàng'}:</span> {p.client}
                            {p.location && ` · ${p.location}`}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '1rem 1.2rem', color: 'var(--c-muted, #5f656d)', fontSize: '.84rem', lineHeight: 1.4 }}>
                        {p.valuationPurpose || '—'}
                      </td>
                      <td style={{ padding: '1rem 1.2rem', fontWeight: 800, color: 'var(--c-accent, #d94f0a)', textAlign: 'right', whiteSpace: 'nowrap', fontSize: '1rem' }}>
                        {p.scale}
                      </td>
                      <td style={{ padding: '1rem 1.2rem', textAlign: 'center' }}>
                        <Link
                          href="/contact"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '.25rem',
                            fontSize: '.8rem',
                            fontWeight: 700,
                            color: 'var(--c-ink, #16181c)',
                            textDecoration: 'none',
                            padding: '.4rem .7rem',
                            borderRadius: '6px',
                            background: '#f6f5f2',
                            border: '1px solid var(--c-border, #e2e0da)',
                          }}
                        >
                          {isEn ? 'Consult' : 'Tư vấn'}
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* 4. MODAL POPUP FOR DOSSIER SUMMARY */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(22, 24, 28, 0.65)',
            backdropFilter: 'blur(6px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '16px',
              maxWidth: '620px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
              position: 'relative',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ padding: '1.4rem 1.8rem', borderBottom: '1px solid var(--c-border, #e2e0da)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#faf9f6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
                <span
                  style={{
                    fontSize: '.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    padding: '.25rem .6rem',
                    borderRadius: '4px',
                    ...getCategoryBadgeColor(selectedProject.category),
                    border: `1px solid ${getCategoryBadgeColor(selectedProject.category).border}`,
                  }}
                >
                  {getCategoryLabel(selectedProject.category)}
                </span>
                <span style={{ fontSize: '.84rem', fontWeight: 600, color: 'var(--c-faint, #8a8f96)' }}>
                  {selectedProject.year || 2025}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.4rem',
                  color: 'var(--c-faint, #8a8f96)',
                  cursor: 'pointer',
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '1.8rem', overflowY: 'auto' }}>
              <h3
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  lineHeight: 1.35,
                  color: 'var(--c-ink, #16181c)',
                  marginBottom: '1.2rem',
                }}
              >
                {selectedProject.title}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem', background: '#f6f5f2', padding: '1.2rem', borderRadius: '10px' }}>
                <div>
                  <div style={{ fontSize: '.76rem', color: 'var(--c-faint, #8a8f96)', textTransform: 'uppercase', fontWeight: 700 }}>
                    {isEn ? 'Appraised Scale' : 'Quy mô định giá'}
                  </div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--c-accent, #d94f0a)', marginTop: '.2rem' }}>
                    {selectedProject.scale}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '.76rem', color: 'var(--c-faint, #8a8f96)', textTransform: 'uppercase', fontWeight: 700 }}>
                    {isEn ? 'Location' : 'Địa bàn thẩm định'}
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--c-ink, #16181c)', marginTop: '.3rem' }}>
                    {selectedProject.location || (isEn ? 'Vietnam' : 'Việt Nam')}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '.92rem' }}>
                {selectedProject.client && (
                  <div>
                    <span style={{ fontWeight: 700, color: 'var(--c-ink, #16181c)', display: 'block', marginBottom: '.2rem' }}>
                      {isEn ? 'Client / Beneficiary' : 'Khách hàng / Đơn vị thụ hưởng'}:
                    </span>
                    <span style={{ color: 'var(--c-muted, #5f656d)' }}>{selectedProject.client}</span>
                  </div>
                )}
                {selectedProject.valuationPurpose && (
                  <div>
                    <span style={{ fontWeight: 700, color: 'var(--c-ink, #16181c)', display: 'block', marginBottom: '.2rem' }}>
                      {isEn ? 'Valuation Objective & Purpose' : 'Mục đích & Phạm vi thẩm định'}:
                    </span>
                    <span style={{ color: 'var(--c-muted, #5f656d)', lineHeight: 1.55 }}>{selectedProject.valuationPurpose}</span>
                  </div>
                )}
                {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                  <div>
                    <span style={{ fontWeight: 700, color: 'var(--c-ink, #16181c)', display: 'block', marginBottom: '.4rem' }}>
                      {isEn ? 'Methodology & Regulatory Compliance' : 'Phương pháp & Tuân thủ pháp lý'}:
                    </span>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
                      {selectedProject.highlights.map((h, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '.5rem', color: 'var(--c-muted, #5f656d)', fontSize: '.88rem' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent, #d94f0a)" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{ padding: '1.2rem 1.8rem', borderTop: '1px solid var(--c-border, #e2e0da)', display: 'flex', justifyContent: 'flex-end', gap: '.8rem', background: '#faf9f6' }}>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                style={{
                  padding: '.6rem 1.2rem',
                  fontSize: '.88rem',
                  fontWeight: 600,
                  borderRadius: '6px',
                  background: 'none',
                  border: '1px solid var(--c-border, #e2e0da)',
                  color: 'var(--c-ink, #16181c)',
                  cursor: 'pointer',
                }}
              >
                {isEn ? 'Close' : 'Đóng'}
              </button>
              <Link
                href="/contact"
                style={{
                  padding: '.6rem 1.3rem',
                  fontSize: '.88rem',
                  fontWeight: 700,
                  borderRadius: '6px',
                  background: 'var(--c-accent, #d94f0a)',
                  color: '#fff',
                  textDecoration: 'none',
                }}
              >
                {isEn ? 'Contact for Similar Project' : 'Tư vấn dự án tương tự'}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 5. CALL TO ACTION SECTION (Institutional Grade Dark Banner matching WhyUs and Homepage CTA) */}
      <section
        style={{
          background: 'var(--c-hero, #14161a)',
          color: '#fff',
          padding: 'clamp(4rem, 7vw, 6rem) 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            backgroundImage:
              'linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem, 4vw, 2.5rem)', display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ maxWidth: '680px' }}>
            <span
              style={{
                display: 'inline-block',
                fontSize: '.74rem',
                fontWeight: 700,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                color: 'var(--c-badge, #f3c9b3)',
                marginBottom: '.8rem',
              }}
            >
              {isEn ? 'Legal & Financial Advisory' : 'Tư vấn pháp lý & tài chính'}
            </span>
            <h2
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: 'clamp(1.8rem, 1.3rem + 1.4vw, 2.6rem)',
                fontWeight: 600,
                lineHeight: 1.25,
                color: '#fff',
                marginBottom: '1rem',
              }}
            >
              {isEn ? 'Require Tailored Valuation for Your Assets?' : 'Bạn có tài sản cần định giá chính xác & độc lập?'}
            </h2>
            <p
              style={{
                color: 'var(--c-ondark-muted, #b9bcc3)',
                fontSize: 'clamp(.95rem, .9rem + .2vw, 1.08rem)',
                lineHeight: 1.65,
              }}
            >
              {isEn
                ? 'Contact MHD Valuation specialists directly to receive scoping analysis, checklist requirements, and formal quotations within 24 hours.'
                : 'Liên hệ thẩm định viên MHD để nhận tư vấn phương pháp, danh mục hồ sơ cần chuẩn bị và báo phí sơ bộ trong vòng 24 giờ.'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.5rem',
                background: 'var(--c-accent, #d94f0a)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '.95rem',
                padding: '.95rem 1.8rem',
                borderRadius: '8px',
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(217, 79, 10, 0.35)',
              }}
            >
              {isEn ? 'Submit Valuation Request' : 'Gửi yêu cầu thẩm định'}
              <span>→</span>
            </Link>
            <a
              href="tel:1900000000"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.5rem',
                border: '1.5px solid rgba(255, 255, 255, 0.3)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '.95rem',
                padding: '.95rem 1.6rem',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              <span>Hotline: 1900 000 000</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
