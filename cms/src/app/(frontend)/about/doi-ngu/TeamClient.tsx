'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'

interface TeamMember {
  id?: string | number
  name: string
  position?: string | null
  category?: 'leadership' | 'valuer' | string | null
  experienceYears?: number | string | null
  order?: number | null
  avatar?: any
  bio?: string | null
}

interface TeamClientProps {
  initialTeam: TeamMember[]
  currentLocale?: string
}

export default function TeamClient({
  initialTeam = [],
  currentLocale = 'vi',
}: TeamClientProps) {
  const isEn = currentLocale === 'en'
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // 3-tab navigation bar: "Tất cả nhân sự", "Ban lãnh đạo", "Thẩm định viên"
  const categories = [
    { key: 'all', label: isEn ? 'All Personnel' : 'Tất cả nhân sự' },
    { key: 'leadership', label: isEn ? 'Executive Board' : 'Ban lãnh đạo' },
    { key: 'valuer', label: isEn ? 'Certified Valuers' : 'Thẩm định viên' },
  ]

  // Filter members based on category
  const filteredTeam = useMemo(() => {
    return initialTeam.filter((member) => {
      // Category filter
      if (selectedCategory === 'leadership') {
        const cat = member.category || ''
        const pos = (member.position || '').toLowerCase()
        const isLead =
          cat === 'leadership' ||
          pos.includes('giám đốc') ||
          pos.includes('director') ||
          member.order === 1
        if (!isLead) return false
      } else if (selectedCategory === 'valuer') {
        const cat = member.category || ''
        const pos = (member.position || '').toLowerCase()
        const isLeadOnly =
          cat === 'leadership' &&
          (pos.includes('tổng giám đốc') || (pos.includes('giám đốc') && !pos.includes('chuyên môn'))) &&
          member.order === 1
        if (isLeadOnly) return false
      }

      return true
    })
  }, [initialTeam, selectedCategory])

  // Curated formal executive portraits for consistent professional presentation
  const defaultAvatars: Record<string, string> = {
    'Trần Khánh Du': '/api/media/file/giam-doc-dieu-hanh-tran-khanh-du.png',
    'Trần Minh Hoàng': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=85',
    'Lê Thu Hương': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85',
    'Phạm Quốc Bảo': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=85',
    'Đặng Tuấn Kiệt': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85',
    'Vũ Hải Yến': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=85',
  }

  // Safe avatar URL extractor with corporate fallback
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

  return (
    <main style={{ background: 'var(--c-page, #f6f5f2)', color: 'var(--c-ink, #16181c)' }}>
      {/* 1. HERO SECTION (Clean, prestigious, without trust box) */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--c-page, #f6f5f2)',
          padding: 'clamp(3rem, 5vw, 4.5rem) 0 2rem',
          borderBottom: '1px solid var(--c-border, #e2e0da)',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem, 4vw, 2.5rem)' }}>
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '.5rem',
              fontSize: '.82rem',
              color: 'var(--c-faint, #8a8f96)',
              marginBottom: '1.2rem',
            }}
          >
            <Link href="/" style={{ color: 'var(--c-faint, #8a8f96)', textDecoration: 'none' }}>
              {isEn ? 'Home' : 'Trang chủ'}
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/about" style={{ color: 'var(--c-faint, #8a8f96)', textDecoration: 'none' }}>
              {isEn ? 'About MHD' : 'Về MHD'}
            </Link>
            <span aria-hidden="true">/</span>
            <span style={{ color: 'var(--c-ink, #16181c)', fontWeight: 600 }}>
              {isEn ? 'Valuation Team' : 'Đội ngũ chuyên môn'}
            </span>
          </nav>

          {/* Badge */}
          <div style={{ marginBottom: '.9rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.45rem',
                fontSize: '.72rem',
                fontWeight: 700,
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                color: 'var(--c-accent, #d94f0a)',
                border: '1px solid var(--c-border, #e2e0da)',
                background: '#fff',
                padding: '.38rem .85rem',
                borderRadius: '999px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              {isEn ? 'Ministry of Finance Licensed Valuers' : 'Thẩm định viên hành nghề Bộ Tài chính'}
            </span>
          </div>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: 'clamp(2.1rem, 1.4rem + 2.4vw, 3.2rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-.02em',
              maxWidth: '28ch',
              marginBottom: '.85rem',
              color: 'var(--c-ink, #16181c)',
            }}
          >
            {isEn ? 'Certified Appraisers & Valuation Registry' : 'Đội ngũ Thẩm định viên & Ban Chuyên môn'}
          </h1>

          <p
            style={{
              fontSize: 'clamp(.95rem, .9rem + .2vw, 1.05rem)',
              color: 'var(--c-muted, #5f656d)',
              maxWidth: '64ch',
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            {isEn
              ? 'MHD brings together certified practicing valuers licensed under the Vietnam Law on Prices 2023, possessing profound expertise across Corporate Equity, Commercial Real Estate, Industrial Machinery, and Intangible Assets.'
              : 'MHD quy tụ đội ngũ thẩm định viên về giá được Bộ Tài chính cấp thẻ hành nghề theo quy định Luật Giá 2023, chuyên sâu trong 4 khối nghiệp vụ: Doanh nghiệp, Bất động sản, Máy móc thiết bị và Tài sản vô hình.'}
          </p>
        </div>
      </section>

      {/* 2. TOOLBAR: 3-TAB NAVBAR (Unified Theme, Clean without search) */}
      <section
        style={{
          background: 'var(--c-page, #f6f5f2)',
          borderBottom: '1px solid var(--c-border, #e2e0da)',
          position: 'sticky',
          top: '64px',
          zIndex: 20,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem, 4vw, 2.5rem)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '1rem',
            }}
          >
            {/* 3 Categories Underline Tabs */}
            <nav
              className="mhd-team-filter-tabs"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(1.2rem, 3.2vw, 2.5rem)',
                overflowX: 'auto',
                scrollbarWidth: 'none',
              }}
            >
              {categories.map((cat) => {
                const active = selectedCategory === cat.key
                const count =
                  cat.key === 'all'
                    ? initialTeam.length
                    : cat.key === 'leadership'
                    ? initialTeam.filter(
                        (m) =>
                          m.category === 'leadership' ||
                          (m.position || '').toLowerCase().includes('giám đốc') ||
                          (m.position || '').toLowerCase().includes('director') ||
                          m.order === 1
                      ).length
                    : initialTeam.filter(
                        (m) =>
                          !(
                            m.category === 'leadership' &&
                            ((m.position || '').toLowerCase().includes('tổng giám đốc') ||
                              ((m.position || '').toLowerCase().includes('giám đốc') &&
                                !(m.position || '').toLowerCase().includes('chuyên môn'))) &&
                            m.order === 1
                          )
                      ).length

                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setSelectedCategory(cat.key)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '1.15rem 0 1rem',
                      fontSize: '.92rem',
                      fontWeight: active ? 700 : 500,
                      color: active ? 'var(--c-ink, #16181c)' : 'var(--c-muted, #5f656d)',
                      borderBottom: active
                        ? '2.5px solid var(--c-accent, #d94f0a)'
                        : '2.5px solid transparent',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.18s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '.5rem',
                    }}
                  >
                    <span>{cat.label}</span>
                    <span
                      style={{
                        fontSize: '.74rem',
                        fontWeight: 600,
                        padding: '.15rem .55rem',
                        borderRadius: '999px',
                        background: active ? 'rgba(217, 79, 10, 0.12)' : 'rgba(0, 0, 0, 0.05)',
                        color: active ? 'var(--c-accent, #d94f0a)' : 'var(--c-faint, #8a8f96)',
                        transition: 'all 0.18s ease',
                      }}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>
      </section>

      {/* 3. ULTRA-PREMIUM CORPORATE MEMBER CARDS GRID */}
      <section
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: 'clamp(3rem, 5vw, 4.5rem) clamp(1rem, 4vw, 2.5rem)',
        }}
      >
        {filteredTeam.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 1.5rem',
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px dashed var(--c-border, #e2e0da)',
            }}
          >
            <p style={{ fontSize: '1rem', color: 'var(--c-muted, #5f656d)', margin: 0 }}>
              {isEn
                ? 'No personnel in this category.'
                : 'Không có nhân sự nào trong nhóm này.'}
            </p>
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              style={{
                marginTop: '1rem',
                background: 'var(--c-accent, #d94f0a)',
                color: '#fff',
                border: 'none',
                padding: '.55rem 1.2rem',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '.86rem',
                cursor: 'pointer',
              }}
            >
              {isEn ? 'View All Personnel' : 'Xem tất cả nhân sự'}
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 330px), 1fr))',
              gap: '2rem',
            }}
          >
            {filteredTeam.map((member, idx) => {
              const name = member.name || 'Thẩm định viên'
              const initials = name
                .split(' ')
                .map((n: string) => n[0])
                .slice(-2)
                .join('')
              const position = member.position || 'Thẩm định viên về giá'
              const avatarUrl = getAvatarUrl(member.avatar, name)
              const isLeadership =
                member.category === 'leadership' ||
                position.toLowerCase().includes('giám đốc') ||
                position.toLowerCase().includes('director') ||
                member.order === 1

              return (
                <article
                  key={member.id || idx}
                  className="mhd-corporate-team-card"
                  style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #e2ded5',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.02)',
                    position: 'relative',
                  }}
                >
                  {/* 1. Large, Sharp Executive Portrait (Height: 380px, clean, complete framing) */}
                  <div
                    className="mhd-team-portrait-box"
                    style={{
                      position: 'relative',
                      height: '380px',
                      width: '100%',
                      background: isLeadership
                        ? 'linear-gradient(180deg, #111827 0%, #1f2937 100%)'
                        : 'linear-gradient(180deg, #1e293b 0%, #334155 100%)',
                      overflow: 'hidden',
                      borderBottom: '1px solid #eef0f3',
                    }}
                  >
                    {avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={avatarUrl}
                        alt={name}
                        loading="lazy"
                        decoding="async"
                        className="mhd-team-portrait-img"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center 15%',
                          display: 'block',
                          imageRendering: '-webkit-optimize-contrast',
                          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: isLeadership
                            ? 'linear-gradient(145deg, #111827 0%, #1e293b 100%)'
                            : 'linear-gradient(145deg, #1e293b 0%, #334155 100%)',
                        }}
                      >
                        <div
                          style={{
                            width: '88px',
                            height: '88px',
                            borderRadius: '50%',
                            border: '2px solid rgba(217, 79, 10, 0.45)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(255, 255, 255, 0.06)',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'Be Vietnam Pro', sans-serif",
                              fontSize: '2rem',
                              fontWeight: 700,
                              color: '#ffffff',
                              letterSpacing: '.04em',
                            }}
                          >
                            {initials}
                          </span>
                        </div>
                        <span
                          style={{
                            marginTop: '1rem',
                            fontSize: '.75rem',
                            color: 'rgba(255,255,255,0.65)',
                            letterSpacing: '.08em',
                            textTransform: 'uppercase',
                            fontWeight: 600,
                          }}
                        >
                          {isLeadership ? 'Ban Lãnh Đạo MHD' : 'Thẩm Định Viên MHD'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* 2. CARD CONTENT BODY (Authoritative, Formal, Clean) */}
                  <div
                    className="mhd-team-card-body"
                    style={{
                      padding: '1.75rem 1.75rem 1.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                    }}
                  >
                    {/* Identity Header */}
                    <div style={{ marginBottom: '1.25rem' }}>
                      <h2
                        style={{
                          fontFamily: "'Be Vietnam Pro', sans-serif",
                          fontSize: '1.38rem',
                          fontWeight: 700,
                          color: '#0f172a',
                          margin: '0 0 .35rem',
                          lineHeight: 1.25,
                          letterSpacing: '-.025em',
                        }}
                      >
                        {name}
                      </h2>
                      <div
                        style={{
                          fontSize: '.92rem',
                          color: 'var(--c-accent, #d94f0a)',
                          fontWeight: 600,
                          lineHeight: 1.4,
                          letterSpacing: '-.01em',
                        }}
                      >
                        {position}
                      </div>
                    </div>

                    {/* Formal Hairline Divider */}
                    <div
                      style={{
                        height: '1px',
                        background: '#eef0f3',
                        marginBottom: '1.25rem',
                      }}
                    />

                    {/* Formal Credentials & Bio List */}
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: '.7rem',
                          fontWeight: 700,
                          letterSpacing: '.08em',
                          textTransform: 'uppercase',
                          color: '#94a3b8',
                          marginBottom: '.75rem',
                        }}
                      >
                        {isEn ? 'Professional Profile & Credentials' : 'Hồ Sơ Năng Lực & Chuyên Môn'}
                      </div>

                      {member.bio ? (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '.6rem',
                          }}
                        >
                          {member.bio
                            .split('\n')
                            .map((line) => line.trim())
                            .filter((line) => line.length > 0)
                            .map((line, bIdx) => (
                              <div
                                key={bIdx}
                                style={{
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  gap: '.6rem',
                                  fontSize: '.88rem',
                                  color: '#334155',
                                  lineHeight: 1.6,
                                }}
                              >
                                <span
                                  style={{
                                    color: 'var(--c-accent, #d94f0a)',
                                    fontWeight: 700,
                                    lineHeight: 1.6,
                                    flexShrink: 0,
                                  }}
                                >
                                  –
                                </span>
                                <span style={{ fontWeight: 450, color: '#2d3748' }}>
                                  {line.replace(/^[\-–—•\*\+]\s*/, '').trim()}
                                </span>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <p
                          style={{
                            fontSize: '.88rem',
                            color: '#64748b',
                            lineHeight: 1.6,
                            margin: 0,
                            fontStyle: 'italic',
                          }}
                        >
                          {isEn
                            ? 'Practicing certified valuation professional at MHD.'
                            : 'Thẩm định viên chuyên trách thẩm định giá tài sản và điều hành hồ sơ tại MHD.'}
                        </p>
                      )}
                    </div>

                    {/* 3. EXPERIENCE: Clean, cohesive corporate style */}
                    <div
                      style={{
                        marginTop: 'auto',
                        paddingTop: '1.1rem',
                        borderTop: '1px solid #eef0f3',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '.45rem',
                          fontSize: '.82rem',
                          fontWeight: 500,
                          color: 'var(--c-muted, #5f656d)',
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent, #d94f0a)" strokeWidth="2.2">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>{isEn ? 'Experience' : 'Kinh nghiệm'}</span>
                      </div>

                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '.25rem',
                          padding: '.25rem .65rem',
                          borderRadius: '6px',
                          background: 'rgba(217, 79, 10, 0.06)',
                          border: '1px solid rgba(217, 79, 10, 0.18)',
                          fontSize: '.82rem',
                          fontWeight: 700,
                        }}
                      >
                        <span style={{ color: 'var(--c-accent, #d94f0a)', fontWeight: 800 }}>
                          {member.experienceYears || '15+'}
                        </span>
                        <span style={{ color: '#0f172a', fontWeight: 600 }}>
                          {isEn ? 'Years' : 'Năm'}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>

      {/* 4. BOTTOM CTA SECTION */}
      <section
        style={{
          background: 'var(--c-partner, #23262c)',
          color: '#fff',
          padding: '4.5rem 0',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: '0 clamp(1rem, 4vw, 2.5rem)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2rem',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ maxWidth: '640px' }}>
            <span
              style={{
                display: 'block',
                fontSize: '.74rem',
                fontWeight: 700,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                color: 'var(--c-accent, #d94f0a)',
                marginBottom: '.6rem',
              }}
            >
              {isEn ? 'DIRECT EXPERT CONSULTATION' : 'TRAO ĐỔI CHUYÊN MÔN TRỰC TIẾP'}
            </span>
            <h2
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: 'clamp(1.6rem, 1.3rem + 1vw, 2.2rem)',
                fontWeight: 700,
                color: '#fff',
                margin: '0 0 .5rem',
                lineHeight: 1.3,
              }}
            >
              {isEn ? 'Connect with Our Lead Valuers' : 'Làm việc trực tiếp cùng chuyên gia MHD'}
            </h2>
            <p style={{ color: 'var(--c-ondark-muted, #b9bcc3)', margin: 0, fontSize: '.95rem', lineHeight: 1.6 }}>
              {isEn
                ? 'Consult directly with specialized valuers on enterprise M&A, commercial properties, and infrastructure dossiers.'
                : 'Trao đổi phương pháp luận và chuẩn bị hồ sơ cùng thẩm định viên trưởng phụ trách từng nhóm tài sản chuyên biệt.'}
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <Link
              href="/contact"
              style={{
                padding: '.85rem 1.8rem',
                background: 'var(--c-accent, #d94f0a)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '.9rem',
                borderRadius: '8px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(217, 79, 10, 0.3)',
              }}
            >
              {isEn ? 'Book a Consultation' : 'Đặt lịch tư vấn chuyên môn'}
            </Link>
            <a
              href="tel:02835153516"
              style={{
                padding: '.85rem 1.6rem',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '.9rem',
                borderRadius: '8px',
                textDecoration: 'none',
                border: '1px solid rgba(255, 255, 255, 0.16)',
              }}
            >
              Hotline: 028 3515 3516
            </a>
          </div>
        </div>
      </section>

      {/* Corporate Card Hover CSS */}
      <style>{`
        .mhd-corporate-team-card {
          border-color: #e2ded5 !important;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease !important;
        }
        .mhd-corporate-team-card:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 20px 45px -10px rgba(15, 23, 42, 0.12), 0 8px 18px -4px rgba(15, 23, 42, 0.04) !important;
          border-color: rgba(217, 79, 10, 0.38) !important;
        }
        .mhd-corporate-team-card:hover .mhd-team-portrait-img {
          transform: scale(1.04);
        }
      `}</style>
    </main>
  )
}
