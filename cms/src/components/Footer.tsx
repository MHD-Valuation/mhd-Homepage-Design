'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { cleanNavHref } from '@/lib/cleanUrl'

interface FooterProps {
  data?: any
  currentLocale?: string
}

export default function Footer({ data, currentLocale = 'vi' }: FooterProps) {
  const isEn = currentLocale === 'en'
  const [theme, setTheme] = useState('gold')

  const TEAL: Record<string, string> = {
    '--c-accent': '#0E666C',
    '--c-accent-rgb': '22,128,132',
    '--c-accent-dark': '#8FD4D0',
    '--c-accent-dark-rgb': '143,212,208',
    '--c-ink': '#12343A',
    '--c-ink-rgb': '18,52,58',
    '--c-hero': '#073F45',
    '--c-hero-rgb': '7,63,69',
    '--c-partner': '#0B2E33',
    '--c-page': '#F7F9F8',
    '--c-page-rgb': '247,249,248',
    '--c-subtle': '#EAF1F0',
    '--c-subtle-rgb': '234,241,240',
    '--c-border': '#D7E2E0',
    '--c-border2': '#DCE6E4',
    '--c-border3': '#C9D8D6',
    '--c-border4': '#D0DDDB',
    '--c-muted': '#5C7073',
    '--c-muted2': '#45595C',
    '--c-muted3': '#5C7073',
    '--c-faint': '#87989A',
    '--c-ondark-muted': '#C2D1D0',
    '--c-ondark': '#F8FBFA',
    '--c-illus': '#98A8AA',
    '--c-icon': '#E2F0EE',
    '--c-badge': '#E6CC8C',
    '--c-gold': '#B68C39',
  }

  const applyTheme = (name: string) => {
    if (typeof document === 'undefined') return
    const r = document.documentElement
    const teal = name === 'teal'
    Object.keys(TEAL).forEach((k) =>
      teal ? r.style.setProperty(k, TEAL[k]) : r.style.removeProperty(k)
    )
    r.classList.toggle('mhd-teal', teal)
    try {
      localStorage.setItem('mhd-theme', name)
    } catch (e) {}
    setTheme(name)
  }

  useEffect(() => {
    let t = 'gold'
    try {
      t = localStorage.getItem('mhd-theme') || 'gold'
    } catch (e) {}
    applyTheme(t)
  }, [])

  const goldPressed = theme === 'gold' ? 'true' : 'false'
  const tealPressed = theme === 'teal' ? 'true' : 'false'
  const goldBorder = theme === 'gold' ? 'var(--c-ink,#16181c)' : 'transparent'
  const tealBorder = theme === 'teal' ? 'var(--c-ink,#16181c)' : 'transparent'

  return (
    <footer
      id="lien-he-footer"
      data-screen-label="Footer"
      style={{
        background: 'var(--c-subtle,#eeece7)',
        borderTop: '1px solid var(--c-border,#e2e0da)',
        padding: 'clamp(3rem,5vw,4rem) 0 2rem',
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem,4vw,2.5rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))', gap: '2.5rem' }}>
          {/* Column 1: Info */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link href="/" aria-label="MHD trang chủ" style={{ display: 'inline-block' }}>
              <img src="/assets/logomhd.png" alt="MHD Valuation" style={{ height: '48px', width: 'auto' }} />
            </Link>
            <p style={{ fontSize: '.86rem', color: 'var(--c-muted,#5f656d)', marginTop: '1rem', maxWidth: '34ch', textWrap: 'pretty' }}>
              <strong style={{ color: 'var(--c-ink,#16181c)' }}>
                {data?.companyName || (isEn ? 'MHD Valuation Co., Ltd.' : 'Công ty TNHH Thẩm định giá MHD')}
              </strong>
              <br />
              {data?.qualificationNotice || (isEn ? 'Enterprise certified with Certificate of Eligibility for Valuation Services Business according to legal regulations.' : 'Doanh nghiệp được cấp Giấy chứng nhận đủ điều kiện kinhdong dịch vụ thẩm định giá theo quy định pháp luật.')}
            </p>
          </div>

          {/* Columns */}
          {data?.columns && data.columns.length > 0 ? (
            data.columns.map((col: any, idx: number) => (
              <div key={idx}>
                <h5 style={{ fontSize: '.76rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--c-muted3,#6b7178)', marginBottom: '1rem' }}>
                  {col.title}
                </h5>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '.65rem', fontSize: '.9rem', listStyle: 'none', padding: 0 }}>
                  {col.links?.map((lnk: any, lIdx: number) => {
                    const href = cleanNavHref(lnk.href)
                    const isInternal = href.startsWith('/')
                    return (
                      <li key={lIdx}>
                        {isInternal ? (
                          <Link href={href}>{lnk.label}</Link>
                        ) : (
                          <a href={href}>{lnk.label}</a>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))
          ) : (
            <>
              {/* Column 2: Dịch vụ */}
              <div>
                <h5 style={{ fontSize: '.76rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--c-muted3,#6b7178)', marginBottom: '1rem' }}>
                  {isEn ? 'Services' : 'Dịch vụ'}
                </h5>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '.65rem', fontSize: '.9rem', listStyle: 'none', padding: 0 }}>
                  <li><Link href="/services/Dich-vu-Doanh-nghiep">{isEn ? 'Enterprise' : 'Doanh nghiệp'}</Link></li>
                  <li><Link href="/services/Dich-vu-Bat-dong-san">{isEn ? 'Real Estate' : 'Bất động sản'}</Link></li>
                  <li><Link href="/services/Dich-vu-May-thiet-bi">{isEn ? 'Machinery & Equipment' : 'Động sản & máy thiết bị'}</Link></li>
                  <li><Link href="/services/Dich-vu-Thuong-hieu">{isEn ? 'Brand & Intangibles' : 'Thương hiệu'}</Link></li>
                  <li><Link href="/services/Dich-vu-Du-an-dau-tu">{isEn ? 'Investment Projects' : 'Dự án đầu tư'}</Link></li>
                  <li><Link href="/services/Dich-vu-Chung-minh-tai-chinh">{isEn ? 'Financial Proof' : 'Chứng minh tài chính'}</Link></li>
                </ul>
              </div>

              {/* Column 3: Công ty */}
              <div>
                <h5 style={{ fontSize: '.76rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--c-muted3,#6b7178)', marginBottom: '1rem' }}>
                  {isEn ? 'Company' : 'Công ty'}
                </h5>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '.65rem', fontSize: '.9rem', listStyle: 'none', padding: 0 }}>
                  <li><Link href="/about">{isEn ? 'About MHD' : 'Về MHD'}</Link></li>
                  <li><Link href="/about/phap-ly">{isEn ? 'Legal Dossier' : 'Hồ sơ pháp lý'}</Link></li>
                  <li><Link href="/projects">{isEn ? 'Featured Projects' : 'Dự án tiêu biểu'}</Link></li>
                  <li><Link href="/insights">{isEn ? 'Data & Insights' : 'Dữ liệu & Insight'}</Link></li>
                  <li><Link href="/tuyen-dung">{isEn ? 'Careers' : 'Tuyển dụng'}</Link></li>
                </ul>
              </div>

              {/* Column 4: Liên hệ */}
              <div>
                <h5 style={{ fontSize: '.76rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--c-muted3,#6b7178)', marginBottom: '1rem' }}>
                  {isEn ? 'Contact' : 'Liên hệ'}
                </h5>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '.65rem', fontSize: '.9rem', listStyle: 'none', padding: 0 }}>
                  <li><a href={`tel:${data?.phone?.replace(/\s/g, '') || '1900000000'}`}>Hotline: {data?.phone || '1900 000 000'}</a></li>
                  <li><a href={`mailto:${data?.email || 'info@mhd.com.vn'}`}>{data?.email || 'info@mhd.com.vn'}</a></li>
                  <li><a href="/contact#van-phong">{data?.address || (isEn ? 'Ho Chi Minh City, Vietnam' : 'TP. Hồ Chí Minh, Việt Nam')}</a></li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: '2.6rem',
            paddingTop: '1.4rem',
            borderTop: '1px solid var(--c-border4,#dcd9d1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '.8rem 1.5rem',
            fontSize: '.78rem',
            color: 'var(--c-faint,#7d8189)',
          }}
        >
          <span>{data?.copyright || (isEn ? '© 2026 MHD Valuation Co., Ltd. All rights reserved.' : '© 2026 Công ty TNHH Thẩm định giá MHD. Bảo lưu các quyền.')}</span>

          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d94f0b" strokeWidth="2" aria-hidden="true">
              <path d="M9 12l2 2 4-4M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7z" />
            </svg>
            <span>
              {data?.licenseText || (isEn ? 'Certificate of Eligibility for Valuation Services Business No. 000/GCN-BTC' : 'Giấy chứng nhận đủ điều kiện kinh doanh dịch vụ thẩm định giá số 000/GCN-BTC')}
            </span>
          </span>

          {/* Theme switcher */}
          <div role="group" aria-label="Bộ màu" style={{ display: 'flex', alignItems: 'center', gap: '.35rem' }}>
            <button
              type="button"
              onClick={() => applyTheme('gold')}
              aria-pressed={goldPressed as any}
              aria-label="Bộ màu Gold"
              title="Gold"
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `2px solid ${goldBorder}`,
                transition: 'border-color .2s',
              }}
            >
              <span
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg,#d94f0a 50%,#16181c 50%)',
                }}
              />
            </button>
            <button
              type="button"
              onClick={() => applyTheme('teal')}
              aria-pressed={tealPressed as any}
              aria-label="Bộ màu Teal"
              title="Teal"
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `2px solid ${tealBorder}`,
                transition: 'border-color .2s',
              }}
            >
              <span
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg,#0E666C 50%,#B68C39 50%)',
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
