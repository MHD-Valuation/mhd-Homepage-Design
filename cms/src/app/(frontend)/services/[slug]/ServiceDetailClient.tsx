'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export interface ServiceData {
  slug: string
  menu: string
  title: string
  noun: string
  sub: string
  hl: string[]
  purposes: [string, string][]
  scope: string[]
  methods: [string, string][]
  step3: string
  docs: string[]
  legal: string[]
  cases: [string, string, string][] | [string, string][]
  faq: [string, string][]
}

interface Props {
  service: ServiceData
  allServices: ServiceData[]
  currentLocale?: string
}

export function renderServiceSvg(slug: string) {
  if (slug === 'Dich-vu-Doanh-nghiep') {
    return (
      <svg width="72" height="56" viewBox="0 0 72 56" fill="none" aria-hidden="true">
        <path d="M4 52h56" stroke="#9aa0a7" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="10" y="14" width="24" height="38" rx="2" fill="#fbf7f3" stroke="#9aa0a7" strokeWidth="1.5" />
        <rect x="34" y="26" width="16" height="26" rx="2" fill="#fff" stroke="#9aa0a7" strokeWidth="1.5" />
        <path d="M16 22h4M24 22h4M16 30h4M24 30h4M16 38h4M24 38h4M39 34h6M39 42h6" stroke="#e2e0da" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M44 18l7-7 5 4 10-10" stroke="#d94f0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 3" style={{ animation: 'mhdDashS 1.8s linear infinite' }} />
        <path d="M60 5h6v6" stroke="#d94f0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (slug === 'Dich-vu-Bat-dong-san') {
    return (
      <svg width="72" height="56" viewBox="0 0 72 56" fill="none" aria-hidden="true">
        <path d="M4 52h48" stroke="#9aa0a7" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 28L27 13l19 15" stroke="#9aa0a7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="12" y="26" width="30" height="26" fill="#fbf7f3" stroke="#9aa0a7" strokeWidth="1.5" />
        <rect x="23" y="37" width="8" height="15" fill="#fff" stroke="#9aa0a7" strokeWidth="1.5" />
        <path d="M17 32h4M33 32h4" stroke="#e2e0da" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M46 52l5-8h17l-5 8z" stroke="#d94f0a" strokeWidth="1.5" strokeDasharray="3 2.5" fill="rgba(217,79,10,.08)" />
        <g style={{ animation: 'mhdMagnify 5s ease-in-out infinite' }}>
          <path d="M58 40s-9-9-9-16a9 9 0 0118 0c0 7-9 16-9 16z" fill="#fff" stroke="#d94f0a" strokeWidth="2" />
          <circle cx="58" cy="24" r="3.2" fill="#d94f0a" />
        </g>
      </svg>
    )
  }
  if (slug === 'Dich-vu-May-thiet-bi') {
    return (
      <svg width="72" height="56" viewBox="0 0 72 56" fill="none" aria-hidden="true">
        <path d="M4 52h62" stroke="#9aa0a7" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="24" cy="30" r="14" stroke="#9aa0a7" strokeWidth="5" strokeDasharray="4 3.33" style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'mhdSpin 12s linear infinite' }} />
        <circle cx="24" cy="30" r="10" fill="#fbf7f3" stroke="#9aa0a7" strokeWidth="1.5" />
        <circle cx="24" cy="30" r="3.5" fill="#fff" stroke="#9aa0a7" strokeWidth="1.5" />
        <circle cx="48" cy="17" r="8" stroke="#d94f0a" strokeWidth="4" strokeDasharray="3.1 3.2" style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'mhdSpin 7s linear infinite reverse' }} />
        <circle cx="48" cy="17" r="5.2" fill="#fff" stroke="#d94f0a" strokeWidth="1.5" />
        <circle cx="48" cy="17" r="1.8" fill="#d94f0a" />
        <rect x="42" y="36" width="24" height="12" rx="2" fill="#fff" stroke="#9aa0a7" strokeWidth="1.5" />
        <path d="M46 42h8" stroke="#e2e0da" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="60" cy="42" r="2" fill="#d94f0a" style={{ animation: 'mhdPulse 1.8s ease-in-out infinite' }} />
      </svg>
    )
  }
  if (slug === 'Dich-vu-Thuong-hieu') {
    return (
      <svg width="72" height="56" viewBox="0 0 72 56" fill="none" aria-hidden="true">
        <circle cx="28" cy="22" r="15" fill="#fbf7f3" stroke="#9aa0a7" strokeWidth="1.5" />
        <circle cx="28" cy="22" r="10.5" stroke="#9aa0a7" strokeWidth="1" strokeDasharray="2 2" />
        <path d="M20 34l-4 16 7-3 5 5 1-14M36 34l4 16-7-3-5 5" stroke="#9aa0a7" strokeWidth="1.5" strokeLinejoin="round" fill="#fff" />
        <path d="M28 14.5l2.3 4.7 5.2.8-3.8 3.6.9 5.1-4.6-2.4-4.6 2.4.9-5.1-3.8-3.6 5.2-.8z" fill="#d94f0b" />
        <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'mhdPop 2.2s ease-in-out infinite' }}>
          <path d="M56 8v10M51 13h10" stroke="#d94f0a" strokeWidth="2" strokeLinecap="round" />
        </g>
        <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'mhdPop 2.2s .9s ease-in-out infinite' }}>
          <path d="M62 30v7M58.5 33.5h7" stroke="#d94f0a" strokeWidth="1.8" strokeLinecap="round" />
        </g>
        <circle cx="50" cy="44" r="2" fill="#e2e0da" />
      </svg>
    )
  }
  if (slug === 'Dich-vu-Du-an-dau-tu') {
    return (
      <svg width="72" height="56" viewBox="0 0 72 56" fill="none" aria-hidden="true">
        <path d="M36 52h32" stroke="#9aa0a7" strokeWidth="1.5" strokeLinecap="round" />
        <ellipse cx="18" cy="46" rx="11" ry="4" fill="#fbf7f3" stroke="#9aa0a7" strokeWidth="1.5" />
        <path d="M7 40v6M29 40v6" stroke="#9aa0a7" strokeWidth="1.5" />
        <ellipse cx="18" cy="40" rx="11" ry="4" fill="#fbf7f3" stroke="#9aa0a7" strokeWidth="1.5" />
        <path d="M7 34v6M29 34v6" stroke="#9aa0a7" strokeWidth="1.5" />
        <ellipse cx="18" cy="34" rx="11" ry="4" fill="#fff" stroke="#d94f0a" strokeWidth="1.5" style={{ animation: 'mhdMagnify 3.5s ease-in-out infinite' }} />
        <path d="M38 44l8-9 7 5 12-16" stroke="#d94f0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M59 24h6v6" stroke="#d94f0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="46" cy="35" r="2.2" fill="#fff" stroke="#d94f0a" strokeWidth="1.5" />
        <circle cx="53" cy="40" r="2.2" fill="#fff" stroke="#d94f0a" strokeWidth="1.5" />
        <path d="M38 16h14M38 22h9" stroke="#e2e0da" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    )
  }
  // Default: Dich-vu-Chung-minh-tai-chinh
  return (
    <svg width="72" height="56" viewBox="0 0 72 56" fill="none" aria-hidden="true">
      <rect x="8" y="8" width="28" height="42" rx="3" fill="#fbf7f3" stroke="#9aa0a7" strokeWidth="1.5" />
      <circle cx="22" cy="24" r="7.5" stroke="#d94f0a" strokeWidth="1.5" />
      <path d="M14.5 24h15M22 16.5c-3 3.5-3 11.5 0 15M22 16.5c3 3.5 3 11.5 0 15" stroke="#d94f0a" strokeWidth="1.2" />
      <path d="M15 38h14M15 43h9" stroke="#e2e0da" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M38 46c12-2 20-12 22-26" stroke="#d94f0a" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" style={{ animation: 'mhdDashS 1.6s linear infinite reverse' }} />
      <g style={{ animation: 'mhdMagnify 4s ease-in-out infinite' }}>
        <path d="M50 14l17-8-6 18-4.5-5.5z" fill="#fff" stroke="#d94f0a" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M56.5 18.5L67 6" stroke="#d94f0a" strokeWidth="1.3" />
      </g>
    </svg>
  )
}

export default function ServiceDetailClient({ service: rawService, allServices, currentLocale = 'vi' }: Props) {
  const isEn = currentLocale === 'en'

  const service = {
    ...rawService,
    title: (rawService.title || '').replace(/&amp;/g, '&').replace(/&;/g, '&'),
    menu: (rawService.menu || '').replace(/&amp;/g, '&').replace(/&;/g, '&'),
    sub: (rawService.sub || '').replace(/&amp;/g, '&').replace(/&;/g, '&'),
  }

  // FAQ open/close state
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    note: '',
    consent: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [ticket, setTicket] = useState('')
  const [sending, setSending] = useState(false)
  const [botField, setBotField] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (sending) return

    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = isEn ? 'Please enter your full name.' : 'Vui lòng nhập họ và tên.'
    const ph = formData.phone.replace(/[\s.-]/g, '')
    if (!/^(\+?84|0)\d{9,10}$/.test(ph)) newErrors.phone = isEn ? 'Invalid phone number.' : 'Số điện thoại chưa hợp lệ.'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) newErrors.email = isEn ? 'Invalid email address.' : 'Email chưa hợp lệ.'
    if (!formData.consent)
      newErrors.consent = isEn
        ? 'Please confirm your consent for MHD to process your request.'
        : 'Vui lòng xác nhận đồng ý để MHD xử lý yêu cầu.'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setSending(true)
    setErrors({})
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.name,
          phone: formData.phone,
          email: formData.email,
          serviceType: service.slug,
          dossierType: 'request',
          message: `[${service.title}] ${formData.note}`.trim(),
          website_url: botField,
        }),
      })
      const data = await res.json().catch(() => ({}))

      if (res.ok && data.success) {
        setTicket(data.ticketNumber || '')
        setSubmitted(true)
      } else {
        setErrors({
          general:
            data?.error ||
            (isEn ? 'Could not submit your request. Please try again.' : 'Chưa gửi được yêu cầu. Vui lòng thử lại.'),
        })
      }
    } catch {
      setErrors({
        general: isEn ? 'Network error. Please try again.' : 'Lỗi kết nối mạng. Vui lòng thử lại.',
      })
    } finally {
      setSending(false)
    }
  }

  const scrollToForm = () => {
    const el = document.getElementById('mhd-form')
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 96,
        behavior: 'smooth',
      })
    }
  }

  // Filter other services
  const otherServices = allServices.filter((s) => s.slug !== service.slug)

  return (
    <main style={{ background: 'var(--c-page,#f6f5f2)', color: 'var(--c-ink,#16181c)' }}>
      {/* 1. HERO SECTION */}
      <section
        data-screen-label={`${service.menu} — Hero`}
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--c-page,#f6f5f2)',
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
            maskImage: 'linear-gradient(100deg,#000 0%,rgba(0,0,0,.35) 50%,transparent 75%)',
            WebkitMaskImage: 'linear-gradient(100deg,#000 0%,rgba(0,0,0,.35) 50%,transparent 75%)',
          }}
        ></div>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-10%',
            top: '-30%',
            width: '640px',
            height: '640px',
            borderRadius: '50%',
            pointerEvents: 'none',
            background: 'radial-gradient(circle,rgba(var(--c-accent-rgb,217,79,10),.12),transparent 65%)',
            animation: 'mhdDrift 14s ease-in-out infinite alternate',
          }}
        ></div>

        <div
          style={{
            position: 'relative',
            maxWidth: '1240px',
            margin: '0 auto',
            padding: 'clamp(2.5rem,5vw,4.5rem) clamp(1rem,4vw,2.5rem) clamp(3rem,6vw,5rem)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(2.5rem,5vw,4.5rem)',
            alignItems: 'flex-start',
          }}
        >
          {/* Hero Left Content */}
          <div style={{ flex: '1.15 1 440px', minWidth: 0, paddingTop: '.5rem' }}>
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '.5rem',
                fontSize: '.8rem',
                color: 'var(--c-faint,#8a8f96)',
                marginBottom: '1.8rem',
                flexWrap: 'wrap',
              }}
            >
              <Link href="/" style={{ color: 'var(--c-faint,#8a8f96)' }}>
                {isEn ? 'Home' : 'Trang chủ'}
              </Link>
              <span aria-hidden="true">/</span>
              <Link href="/#services" style={{ color: 'var(--c-faint,#8a8f96)' }}>
                {isEn ? 'Services' : 'Dịch vụ'}
              </Link>
              <span aria-hidden="true">/</span>
              <span style={{ color: 'var(--c-ink,#16181c)', fontWeight: 600 }}>{service.menu}</span>
            </nav>

            {/* Icon Card + Category Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.3rem' }}>
              <span
                style={{
                  width: '88px',
                  height: '72px',
                  flexShrink: 0,
                  borderRadius: '14px',
                  background: '#fff',
                  border: '1px solid var(--c-border,#e2e0da)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 12px 28px rgba(var(--c-ink-rgb,22,24,28),.06)',
                }}
              >
                {renderServiceSvg(service.slug)}
              </span>
              <span style={{ fontSize: '.74rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)' }}>
                {isEn ? 'Valuation Services' : 'Dịch vụ thẩm định giá'}
              </span>
            </div>

            {/* H1 Title */}
            <h1
              style={{
                fontFamily: "'Be Vietnam Pro',sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(2.2rem,1.4rem + 2.6vw,3.6rem)',
                lineHeight: 1.18,
                letterSpacing: '-.02em',
                color: 'var(--c-ink,#16181c)',
                textWrap: 'balance',
                marginBottom: '1.2rem',
              }}
            >
              {service.title}
            </h1>

            {/* Sub description */}
            <p
              style={{
                fontSize: 'clamp(1rem,.95rem + .3vw,1.12rem)',
                color: 'var(--c-muted,#5f656d)',
                maxWidth: '54ch',
                marginBottom: '1.8rem',
                textWrap: 'pretty',
              }}
            >
              {service.sub}
            </p>

            {/* 3 Highlights */}
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '.75rem', marginBottom: '2.2rem' }}>
              {service.hl.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', gap: '.7rem', alignItems: 'flex-start', fontSize: '.98rem', fontWeight: 600, color: 'var(--c-ink,#16181c)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d94f0b" strokeWidth="2.4" style={{ flexShrink: 0, marginTop: '3px' }} aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span style={{ flex: 1, minWidth: 0 }}>{item}</span>
                </li>
              ))}
            </ul>

            {/* Hotline & Process Link */}
            <div style={{ display: 'flex', gap: '1.4rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="tel:1900000000" style={{ display: 'inline-flex', alignItems: 'center', gap: '.7rem', color: 'var(--c-ink,#16181c)' }}>
                <span style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--c-ink,#16181c)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
                    <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8 9.8a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.7.7a2 2 0 011.7 2z" />
                  </svg>
                </span>
                <span>
                  <span style={{ display: 'block', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--c-faint,#8a8f96)' }}>Hotline tư vấn</span>
                  <span style={{ display: 'block', fontSize: '1.15rem', fontWeight: 700 }}>1900 000 000</span>
                </span>
              </a>

              <a href="#quy-trinh" style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', fontSize: '.9rem', fontWeight: 700, color: 'var(--c-accent,#d94f0a)' }}>
                {isEn ? 'View process' : 'Xem quy trình'}{' '}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Hero Right: Inquiry Form Card (Exact match) */}
          <div
            id="mhd-form"
            style={{
              flex: '1 1 380px',
              minWidth: 0,
              maxWidth: '520px',
              scrollMarginTop: '96px',
              background: '#fff',
              border: '1px solid var(--c-border,#e2e0da)',
              borderRadius: '16px',
              padding: 'clamp(1.4rem,2.6vw,2rem)',
              boxShadow: '0 30px 60px rgba(var(--c-ink-rgb,22,24,28),.1)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg,var(--c-accent,#d94f0a),var(--c-gold,#7d7d7d))',
              }}
            ></div>

            {!submitted ? (
              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--c-ink,#16181c)' }}>
                    {isEn ? 'Request Valuation Quote' : 'Nhận báo giá thẩm định'}
                  </div>
                  <div style={{ fontSize: '.84rem', color: 'var(--c-muted,#5f656d)', marginTop: '.2rem' }}>
                    {isEn
                      ? 'MHD will contact you to confirm scope and required files.'
                      : 'MHD liên hệ để xác nhận phạm vi và hồ sơ cần cung cấp.'}
                  </div>
                </div>

                <label style={{ display: 'block' }}>
                  <span style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: 'var(--c-ink,#16181c)', marginBottom: '.4rem' }}>
                    {isEn ? 'Full name' : 'Họ và tên'} <span style={{ color: 'var(--c-accent,#d94f0a)' }}>*</span>
                  </span>
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={isEn ? 'John Doe' : 'Nguyễn Văn A'}
                    style={{
                      width: '100%',
                      padding: '.8rem .95rem',
                      border: '1px solid var(--c-border,#e2e0da)',
                      borderRadius: '8px',
                      background: '#fff',
                      font: 'inherit',
                      fontSize: '.92rem',
                      color: 'var(--c-ink,#16181c)',
                      outline: 'none',
                    }}
                  />
                  {errors.name && <span style={{ display: 'block', fontSize: '.76rem', color: '#c0392b', marginTop: '.35rem' }}>{errors.name}</span>}
                </label>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,170px),1fr))', gap: '1rem' }}>
                  <label style={{ display: 'block' }}>
                    <span style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: 'var(--c-ink,#16181c)', marginBottom: '.4rem' }}>
                      {isEn ? 'Phone' : 'Điện thoại'} <span style={{ color: 'var(--c-accent,#d94f0a)' }}>*</span>
                    </span>
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="09xx xxx xxx"
                      style={{
                        width: '100%',
                        padding: '.8rem .95rem',
                        border: '1px solid var(--c-border,#e2e0da)',
                        borderRadius: '8px',
                        background: '#fff',
                        font: 'inherit',
                        fontSize: '.92rem',
                        color: 'var(--c-ink,#16181c)',
                        outline: 'none',
                      }}
                    />
                    {errors.phone && <span style={{ display: 'block', fontSize: '.76rem', color: '#c0392b', marginTop: '.35rem' }}>{errors.phone}</span>}
                  </label>

                  <label style={{ display: 'block' }}>
                    <span style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: 'var(--c-ink,#16181c)', marginBottom: '.4rem' }}>
                      Email <span style={{ color: 'var(--c-accent,#d94f0a)' }}>*</span>
                    </span>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ten@congty.vn"
                      style={{
                        width: '100%',
                        padding: '.8rem .95rem',
                        border: '1px solid var(--c-border,#e2e0da)',
                        borderRadius: '8px',
                        background: '#fff',
                        font: 'inherit',
                        fontSize: '.92rem',
                        color: 'var(--c-ink,#16181c)',
                        outline: 'none',
                      }}
                    />
                    {errors.email && <span style={{ display: 'block', fontSize: '.76rem', color: '#c0392b', marginTop: '.35rem' }}>{errors.email}</span>}
                  </label>
                </div>

                <label style={{ display: 'block' }}>
                  <span style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: 'var(--c-ink,#16181c)', marginBottom: '.4rem' }}>
                    {isEn ? `Brief note about ${service.noun}` : `Mô tả ngắn về ${service.noun}`}
                  </span>
                  <textarea
                    name="note"
                    rows={3}
                    value={formData.note}
                    onChange={handleInputChange}
                    placeholder={isEn ? 'Asset type, location, purpose...' : 'Loại tài sản, địa điểm, mục đích thẩm định'}
                    style={{
                      width: '100%',
                      padding: '.8rem .95rem',
                      border: '1px solid var(--c-border,#e2e0da)',
                      borderRadius: '8px',
                      background: '#fff',
                      font: 'inherit',
                      fontSize: '.92rem',
                      color: 'var(--c-ink,#16181c)',
                      outline: 'none',
                      resize: 'vertical',
                      minHeight: '88px',
                    }}
                  ></textarea>
                </label>

                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '.65rem', fontSize: '.8rem', color: 'var(--c-muted,#5f656d)', lineHeight: 1.5, cursor: 'pointer' }}>
                  <input
                    name="consent"
                    type="checkbox"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    style={{ width: '18px', height: '18px', margin: '1px 0 0', flexShrink: 0, accentColor: 'var(--c-accent,#d94f0a)' }}
                  />
                  <span style={{ flex: 1, minWidth: 0 }}>
                    {isEn
                      ? 'I agree to allow MHD to use the above information to contact and process this request.'
                      : 'Tôi đồng ý để MHD sử dụng thông tin trên nhằm liên hệ và xử lý yêu cầu.'}
                  </span>
                </label>
                {errors.consent && <span style={{ display: 'block', fontSize: '.76rem', color: '#c0392b', marginTop: '.35rem' }}>{errors.consent}</span>}

                {/* Antispam honeypot — invisible to humans */}
                <input
                  type="text"
                  name="website_url"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={botField}
                  onChange={(e) => setBotField(e.target.value)}
                  style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
                />

                {errors.general && (
                  <div role="alert" style={{ padding: '.8rem 1rem', borderRadius: '8px', background: '#fdf2f2', border: '1px solid #f8b4b4', color: '#c0392b', fontSize: '.86rem' }}>
                    {errors.general}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  aria-busy={sending}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '.55rem',
                    background: 'var(--c-accent,#d94f0a)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '.95rem',
                    padding: '1rem 1.4rem',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: sending ? 'wait' : 'pointer',
                    opacity: sending ? 0.7 : 1,
                    transition: 'all .2s cubic-bezier(.16,1,.3,1)',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z" />
                    <path d="M14 3v6h6M9 14l2 2 4-4" />
                  </svg>
                  {sending
                    ? isEn ? 'Sending…' : 'Đang gửi…'
                    : isEn ? 'Submit Valuation Request' : 'Gửi yêu cầu thẩm định'}
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', fontSize: '.74rem', color: 'var(--c-faint,#8a8f96)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d94f0b" strokeWidth="2" aria-hidden="true" style={{ flexShrink: 0 }}>
                    <path d="M9 12l2 2 4-4M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7z" />
                  </svg>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    {isEn ? 'Information is strictly used for request processing only.' : 'Thông tin chỉ dùng để xử lý yêu cầu, không chia sẻ cho bên thứ ba.'}
                  </span>
                </div>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '2.2rem .5rem', animation: 'mhdFadeUp .6s cubic-bezier(.16,1,.3,1) both' }}>
                <div
                  style={{
                    width: '68px',
                    height: '68px',
                    margin: '0 auto 1.3rem',
                    borderRadius: '50%',
                    background: 'var(--c-icon,#fbf7f3)',
                    border: '1px solid var(--c-border,#e2e0da)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--c-accent,#d94f0a)',
                    animation: 'mhdPop 2.4s ease-in-out infinite',
                  }}
                >
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '.5rem' }}>
                  {isEn ? 'Request Received' : 'Đã tiếp nhận yêu cầu'}
                </h3>
                <p style={{ fontSize: '.9rem', color: 'var(--c-muted,#5f656d)', maxWidth: '34ch', margin: '0 auto 1.1rem' }}>
                  {isEn
                    ? 'MHD will contact you to verify details and files.'
                    : 'MHD sẽ liên hệ để xác nhận thông tin, hồ sơ và các bước thực hiện.'}
                </p>
                <div
                  style={{
                    display: 'inline-flex',
                    gap: '.5rem',
                    alignItems: 'center',
                    padding: '.5rem 1rem',
                    borderRadius: '999px',
                    background: 'var(--c-page,#f6f5f2)',
                    border: '1px solid var(--c-border,#e2e0da)',
                    fontSize: '.8rem',
                    color: 'var(--c-muted,#5f656d)',
                    marginBottom: '1.4rem',
                  }}
                >
                  {isEn ? 'Intake Ticket' : 'Mã tiếp nhận'}{' '}
                  <strong style={{ color: 'var(--c-ink,#16181c)', fontVariantNumeric: 'tabular-nums' }}>{ticket}</strong>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({ name: '', phone: '', email: '', note: '', consent: false })
                    }}
                    style={{ fontSize: '.86rem', fontWeight: 700, color: 'var(--c-accent,#d94f0a)', cursor: 'pointer', background: 'none', border: 'none' }}
                  >
                    {isEn ? 'Submit another request' : 'Gửi yêu cầu khác'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. TRUST BAR (4 Items) */}
      <div style={{ background: '#fff', borderBottom: '1px solid var(--c-border,#e2e0da)' }}>
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: '0 clamp(1rem,4vw,2.5rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,250px),1fr))',
          }}
        >
          <div style={{ display: 'flex', gap: '.8rem', alignItems: 'center', padding: '1.2rem', borderLeft: 'none' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d94f0b" strokeWidth="2" aria-hidden="true" style={{ flexShrink: 0 }}>
              <path d="M9 12l2 2 4-4M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7z" />
            </svg>
            <span style={{ minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: '.86rem', fontWeight: 700, color: 'var(--c-ink,#16181c)' }}>
                {isEn ? 'MOF Eligibility Certificate' : 'Giấy chứng nhận ĐĐKKD'}
              </span>
              <span style={{ display: 'block', fontSize: '.76rem', color: 'var(--c-muted,#5f656d)' }}>
                {isEn ? 'Lic. No. 000/GCN-BTC' : 'Số 000/GCN-BTC'}
              </span>
            </span>
          </div>

          <div style={{ display: 'flex', gap: '.8rem', alignItems: 'center', padding: '1.2rem', borderLeft: '1px solid var(--c-border,#e2e0da)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d94f0b" strokeWidth="2" aria-hidden="true" style={{ flexShrink: 0 }}>
              <path d="M9 12l2 2 4-4M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7z" />
            </svg>
            <span style={{ minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: '.86rem', fontWeight: 700, color: 'var(--c-ink,#16181c)' }}>
                {isEn ? 'Certified Practicing Valuers' : 'Thẩm định viên về giá'}
              </span>
              <span style={{ display: 'block', fontSize: '.76rem', color: 'var(--c-muted,#5f656d)' }}>
                {isEn ? 'Officially gazetted by MOF' : 'Được Bộ Tài chính thông báo'}
              </span>
            </span>
          </div>

          <div style={{ display: 'flex', gap: '.8rem', alignItems: 'center', padding: '1.2rem', borderLeft: '1px solid var(--c-border,#e2e0da)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d94f0b" strokeWidth="2" aria-hidden="true" style={{ flexShrink: 0 }}>
              <path d="M9 12l2 2 4-4M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7z" />
            </svg>
            <span style={{ minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: '.86rem', fontWeight: 700, color: 'var(--c-ink,#16181c)' }}>
                {isEn ? 'Applicable Standards' : 'Chuẩn mực áp dụng'}
              </span>
              <span style={{ display: 'block', fontSize: '.76rem', color: 'var(--c-muted,#5f656d)' }}>
                {isEn ? 'Law on Price 2023, Circulars 30–31/2024' : 'Luật Giá 2023, TT 30–31/2024'}
              </span>
            </span>
          </div>

          <div style={{ display: 'flex', gap: '.8rem', alignItems: 'center', padding: '1.2rem', borderLeft: '1px solid var(--c-border,#e2e0da)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d94f0b" strokeWidth="2" aria-hidden="true" style={{ flexShrink: 0 }}>
              <path d="M9 12l2 2 4-4M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7z" />
            </svg>
            <span style={{ minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: '.86rem', fontWeight: 700, color: 'var(--c-ink,#16181c)' }}>
                {isEn ? 'Certificate Verification' : 'Tra cứu chứng thư'}
              </span>
              <span style={{ display: 'block', fontSize: '.76rem', color: 'var(--c-muted,#5f656d)' }}>
                {isEn ? 'Via QR code or reference number' : 'Bằng mã QR hoặc số chứng thư'}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* 3. KHI NÀO CẦN THẨM ĐỊNH (Mục đích sử dụng kết quả thẩm định - 6 cards) */}
      <section id="khi-nao" data-screen-label="Khi nào cần" style={{ scrollMarginTop: '90px', background: '#fff', padding: 'clamp(4.5rem,8vw,7rem) 0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem,4vw,2.5rem)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1.5rem', flexWrap: 'wrap', marginBottom: 'clamp(2.4rem,4vw,3.2rem)' }}>
            <div>
              <span style={{ display: 'block', fontSize: '.74rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)', marginBottom: '.8rem' }}>
                {isEn ? 'When needed' : 'Khi nào cần thẩm định'}
              </span>
              <h2 style={{ fontFamily: "'Be Vietnam Pro',sans-serif", fontWeight: 600, fontSize: 'clamp(1.8rem,1.3rem + 1.3vw,2.5rem)', lineHeight: 1.28, letterSpacing: '-.012em', color: 'var(--c-ink,#16181c)' }}>
                {isEn ? 'Purposes of Valuation Results' : 'Mục đích sử dụng kết quả thẩm định'}
              </h2>
            </div>
            <p style={{ maxWidth: '46ch', color: 'var(--c-muted,#5f656d)', fontSize: '.95rem', textWrap: 'pretty' }}>
              {isEn
                ? 'Value basis and valuation methods are determined based on the intended purpose stated on certificate.'
                : 'Cơ sở giá trị và phương pháp được lựa chọn theo mục đích sử dụng kết quả ghi trên chứng thư.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap: '1.2rem' }}>
            {service.purposes.map(([pTitle, pDesc], idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.5rem',
                  border: '1px solid var(--c-border,#e2e0da)',
                  borderRadius: '12px',
                  background: '#fff',
                  transition: 'all .25s cubic-bezier(.16,1,.3,1)',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    background: 'var(--c-icon,#fbf7f3)',
                    border: '1px solid var(--c-border,#e2e0da)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '.78rem',
                    fontWeight: 700,
                    color: 'var(--c-accent,#d94f0a)',
                    marginBottom: '1rem',
                  }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h3 style={{ fontSize: '1.02rem', fontWeight: 700, marginBottom: '.35rem' }}>{pTitle}</h3>
                <p style={{ fontSize: '.88rem', color: 'var(--c-muted,#5f656d)', textWrap: 'pretty' }}>{pDesc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PHẠM VI TÀI SẢN */}
      <section id="pham-vi" data-screen-label="Phạm vi" style={{ scrollMarginTop: '90px', background: 'var(--c-page,#f6f5f2)', padding: 'clamp(4.5rem,8vw,7rem) 0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem,4vw,2.5rem)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(2.5rem,5vw,5rem)', alignItems: 'center' }}>
            {/* Left 5/4 Image Slot with Subtle Pattern */}
            <div style={{ flex: '1 1 380px', minWidth: 0 }}>
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '5/4',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  background: 'var(--c-subtle,#eeece7)',
                  boxShadow: '0 30px 60px rgba(var(--c-ink-rgb,22,24,28),.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem',
                  textAlign: 'center',
                }}
              >
                <div style={{ opacity: 0.7 }}>
                  <div style={{ width: '64px', height: '64px', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {renderServiceSvg(service.slug)}
                  </div>
                  <span style={{ fontSize: '.86rem', color: 'var(--c-muted,#5f656d)', fontWeight: 600 }}>
                    {isEn ? `On-site survey for ${service.noun}` : `Ảnh thật: thẩm định viên khảo sát ${service.noun}`}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Scope List */}
            <div style={{ flex: '1.1 1 420px', minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: '.74rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)', marginBottom: '.8rem' }}>
                {isEn ? 'Asset scope' : 'Phạm vi tài sản'}
              </span>
              <h2 style={{ fontFamily: "'Be Vietnam Pro',sans-serif", fontWeight: 600, fontSize: 'clamp(1.8rem,1.3rem + 1.3vw,2.5rem)', lineHeight: 1.28, letterSpacing: '-.012em', color: 'var(--c-ink,#16181c)' }}>
                {isEn ? `Types of ${service.noun} appraised by MHD` : `Loại ${service.noun} MHD thẩm định`}
              </h2>
              <ul style={{ display: 'flex', flexDirection: 'column', marginTop: '1.8rem', borderTop: '1px solid var(--c-border,#e2e0da)' }}>
                {service.scope.map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem 0',
                      borderBottom: '1px solid var(--c-border,#e2e0da)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: 'var(--c-ink,#16181c)',
                    }}
                  >
                    <span style={{ fontSize: '.76rem', fontWeight: 700, color: 'var(--c-accent,#d94f0a)', width: '1.6rem', fontVariantNumeric: 'tabular-nums' }}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span style={{ flex: 1, minWidth: 0 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PHƯƠNG PHÁP THẨM ĐỊNH (Cách tiếp cận theo Chuẩn mực thẩm định giá) */}
      <section id="phuong-phap" data-screen-label="Phương pháp" style={{ scrollMarginTop: '90px', background: '#fff', padding: 'clamp(4.5rem,8vw,7rem) 0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem,4vw,2.5rem)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1.5rem', flexWrap: 'wrap', marginBottom: 'clamp(2.4rem,4vw,3.2rem)' }}>
            <div>
              <span style={{ display: 'block', fontSize: '.74rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)', marginBottom: '.8rem' }}>
                {isEn ? 'Valuation Approaches' : 'Phương pháp thẩm định'}
              </span>
              <h2 style={{ fontFamily: "'Be Vietnam Pro',sans-serif", fontWeight: 600, fontSize: 'clamp(1.8rem,1.3rem + 1.3vw,2.5rem)', lineHeight: 1.28, letterSpacing: '-.012em', color: 'var(--c-ink,#16181c)' }}>
                {isEn ? 'Approaches According to Vietnam Valuation Standards' : 'Cách tiếp cận theo Chuẩn mực thẩm định giá'}
              </h2>
            </div>
            <p style={{ maxWidth: '46ch', color: 'var(--c-muted,#5f656d)', fontSize: '.95rem', textWrap: 'pretty' }}>
              {isEn
                ? 'Valuers select and justify appropriate valuation approaches based on asset characteristics and verifiable data.'
                : 'Thẩm định viên lựa chọn và lập luận phương pháp phù hợp với đặc điểm tài sản và thông tin thu thập được.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))', gap: '1.4rem' }}>
            {service.methods.map(([mTitle, mDesc], idx) => {
              const isHighlight = idx === 0
              return (
                <div
                  key={idx}
                  style={{
                    position: 'relative',
                    padding: '2rem 1.8rem',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    background: '#fff',
                    border: isHighlight ? '1px solid var(--c-accent,#d94f0a)' : '1px solid var(--c-border,#e2e0da)',
                    transition: 'all .25s cubic-bezier(.16,1,.3,1)',
                  }}
                >
                  {isHighlight && (
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        right: '-40px',
                        top: '-40px',
                        width: '160px',
                        height: '160px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle,rgba(var(--c-accent-rgb,217,79,10),.14),transparent 70%)',
                      }}
                    ></div>
                  )}
                  <span
                    style={{
                      position: 'relative',
                      display: 'block',
                      fontSize: '2.4rem',
                      fontWeight: 700,
                      letterSpacing: '-.02em',
                      lineHeight: 1,
                      color: isHighlight ? 'var(--c-accent,#d94f0a)' : 'var(--c-border,#e2e0da)',
                      marginBottom: '1.4rem',
                    }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 style={{ position: 'relative', fontSize: '1.12rem', fontWeight: 700, marginBottom: '.5rem' }}>{mTitle}</h3>
                  <p style={{ position: 'relative', fontSize: '.9rem', color: 'var(--c-muted,#5f656d)', textWrap: 'pretty' }}>{mDesc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 6. QUY TRÌNH THỰC HIỆN (Bốn bước từ tiếp nhận đến phát hành) */}
      <section id="quy-trinh" data-screen-label="Quy trình" style={{ scrollMarginTop: '90px', background: 'var(--c-page,#f6f5f2)', padding: 'clamp(4.5rem,8vw,7rem) 0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem,4vw,2.5rem)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1.5rem', flexWrap: 'wrap', marginBottom: 'clamp(2.4rem,4vw,3.2rem)' }}>
            <div>
              <span style={{ display: 'block', fontSize: '.74rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)', marginBottom: '.8rem' }}>
                {isEn ? 'Execution Process' : 'Quy trình thực hiện'}
              </span>
              <h2 style={{ fontFamily: "'Be Vietnam Pro',sans-serif", fontWeight: 600, fontSize: 'clamp(1.8rem,1.3rem + 1.3vw,2.5rem)', lineHeight: 1.28, letterSpacing: '-.012em', color: 'var(--c-ink,#16181c)' }}>
                {isEn ? 'Four Steps from Intake to Certificate Issuance' : 'Bốn bước từ tiếp nhận đến phát hành'}
              </h2>
            </div>
          </div>

          <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: '1.2rem' }}>
            <li style={{ position: 'relative', padding: '1.6rem', border: '1px solid var(--c-border,#e2e0da)', borderRadius: '12px', background: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.8rem', marginBottom: '1rem' }}>
                <span style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#fff', color: 'var(--c-ink,#16181c)', border: '1px solid var(--c-border,#e2e0da)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.84rem', fontWeight: 700, flexShrink: 0 }}>
                  1
                </span>
                <span style={{ flex: 1, height: '1px', background: 'var(--c-border,#e2e0da)' }}></span>
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '.35rem' }}>{isEn ? 'Intake & Quotation' : 'Tiếp nhận và báo giá'}</h3>
              <p style={{ fontSize: '.86rem', color: 'var(--c-muted,#5f656d)', textWrap: 'pretty' }}>
                {isEn ? 'Record asset specs, purpose; send quotation and checklist.' : 'Ghi nhận tài sản, mục đích; gửi báo giá và danh mục hồ sơ.'}
              </p>
            </li>

            <li style={{ position: 'relative', padding: '1.6rem', border: '1px solid var(--c-border,#e2e0da)', borderRadius: '12px', background: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.8rem', marginBottom: '1rem' }}>
                <span style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#fff', color: 'var(--c-ink,#16181c)', border: '1px solid var(--c-border,#e2e0da)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.84rem', fontWeight: 700, flexShrink: 0 }}>
                  2
                </span>
                <span style={{ flex: 1, height: '1px', background: 'var(--c-border,#e2e0da)' }}></span>
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '.35rem' }}>{isEn ? 'Engagement & Files' : 'Hợp đồng và hồ sơ'}</h3>
              <p style={{ fontSize: '.86rem', color: 'var(--c-muted,#5f656d)', textWrap: 'pretty' }}>
                {isEn ? 'Execute contract, receive legal dossiers from client.' : 'Ký hợp đồng dịch vụ, tiếp nhận hồ sơ khách hàng cung cấp.'}
              </p>
            </li>

            <li style={{ position: 'relative', padding: '1.6rem', border: '1px solid var(--c-border,#e2e0da)', borderRadius: '12px', background: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.8rem', marginBottom: '1rem' }}>
                <span style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#fff', color: 'var(--c-ink,#16181c)', border: '1px solid var(--c-border,#e2e0da)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.84rem', fontWeight: 700, flexShrink: 0 }}>
                  3
                </span>
                <span style={{ flex: 1, height: '1px', background: 'var(--c-border,#e2e0da)' }}></span>
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '.35rem' }}>{isEn ? 'Survey & Analysis' : 'Khảo sát và phân tích'}</h3>
              <p style={{ fontSize: '.86rem', color: 'var(--c-muted,#5f656d)', textWrap: 'pretty' }}>{service.step3}</p>
            </li>

            <li style={{ position: 'relative', padding: '1.6rem', border: '1px solid var(--c-border,#e2e0da)', borderRadius: '12px', background: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.8rem', marginBottom: '1rem' }}>
                <span style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--c-accent,#d94f0a)', color: '#fff', border: '1px solid var(--c-accent,#d94f0a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.84rem', fontWeight: 700, flexShrink: 0 }}>
                  4
                </span>
                <span style={{ flex: 1, height: '1px', background: 'var(--c-border,#e2e0da)' }}></span>
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '.35rem' }}>{isEn ? 'Issue Certificate' : 'Phát hành chứng thư'}</h3>
              <p style={{ fontSize: '.86rem', color: 'var(--c-muted,#5f656d)', textWrap: 'pretty' }}>
                {isEn ? 'Certificate accompanied by valuation report with QR lookup.' : 'Chứng thư kèm báo cáo thẩm định giá, có mã QR tra cứu.'}
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* 7. HỒ SƠ & PHÁP LÝ (2 Columns) */}
      <section id="ho-so" data-screen-label="Hồ sơ & pháp lý" style={{ scrollMarginTop: '90px', background: '#fff', padding: 'clamp(4.5rem,8vw,7rem) 0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem,4vw,2.5rem)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: '1.6rem' }}>
            {/* Left: Required Documents */}
            <div style={{ padding: 'clamp(1.6rem,3vw,2.4rem)', border: '1px solid var(--c-border,#e2e0da)', borderRadius: '16px', background: '#fff' }}>
              <span style={{ display: 'block', fontSize: '.74rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)', marginBottom: '.8rem' }}>
                {isEn ? 'Required Dossier' : 'Hồ sơ cần chuẩn bị'}
              </span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '1.4rem' }}>
                {isEn ? 'Standard Required Checklist' : 'Danh mục hồ sơ cơ bản'}
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '.8rem' }}>
                {service.docs.map((doc, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '.7rem', alignItems: 'flex-start', fontSize: '.94rem', color: 'var(--c-ink,#16181c)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d94f0b" strokeWidth="2.4" style={{ flexShrink: 0, marginTop: '3px' }} aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span style={{ flex: 1, minWidth: 0 }}>{doc}</span>
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: '.8rem', color: 'var(--c-faint,#8a8f96)', marginTop: '1.4rem', paddingTop: '1.2rem', borderTop: '1px solid var(--c-border,#e2e0da)' }}>
                {isEn ? 'MHD sends specific tailored checklists upon intake.' : 'MHD gửi danh mục chi tiết theo từng hồ sơ sau khi tiếp nhận yêu cầu.'}
              </p>
            </div>

            {/* Right: Legal References */}
            <div style={{ padding: 'clamp(1.6rem,3vw,2.4rem)', border: '1px solid var(--c-border,#e2e0da)', borderRadius: '16px', background: 'var(--c-page,#f6f5f2)' }}>
              <span style={{ display: 'block', fontSize: '.74rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)', marginBottom: '.8rem' }}>
                {isEn ? 'Legal Basis' : 'Căn cứ pháp lý'}
              </span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '1.4rem' }}>
                {isEn ? 'Applicable Statutes' : 'Văn bản áp dụng'}
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column' }}>
                {service.legal.map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      gap: '.9rem',
                      alignItems: 'center',
                      padding: '.9rem 0',
                      borderTop: idx > 0 ? '1px solid var(--c-border,#e2e0da)' : 'none',
                      fontSize: '.94rem',
                      fontWeight: 600,
                      color: 'var(--c-ink,#16181c)',
                    }}
                  >
                    <span
                      style={{
                        width: '34px',
                        height: '40px',
                        flexShrink: 0,
                        borderRadius: '5px',
                        background: '#fff',
                        border: '1px solid var(--c-border,#e2e0da)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--c-accent,#d94f0a)',
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z" />
                        <path d="M14 3v6h6M9 14l2 2 4-4" />
                      </svg>
                    </span>
                    <span style={{ flex: 1, minWidth: 0 }}>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/about#phap-ly"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '.4rem',
                  fontSize: '.88rem',
                  fontWeight: 700,
                  color: 'var(--c-accent,#d94f0a)',
                  marginTop: '1.2rem',
                }}
              >
                {isEn ? "MHD's Legal Dossier" : 'Hồ sơ pháp lý của MHD'}{' '}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. HỒ SƠ TIÊU BIỂU (Kinh nghiệm thực hiện - 2 Dossiers) */}
      <section id="ho-so-tieu-bieu" data-screen-label="Hồ sơ tiêu biểu" style={{ scrollMarginTop: '90px', background: 'var(--c-page,#f6f5f2)', padding: 'clamp(4.5rem,8vw,7rem) 0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem,4vw,2.5rem)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1.5rem', flexWrap: 'wrap', marginBottom: 'clamp(2.4rem,4vw,3.2rem)' }}>
            <div>
              <span style={{ display: 'block', fontSize: '.74rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)', marginBottom: '.8rem' }}>
                {isEn ? 'Featured Dossiers' : 'Hồ sơ tiêu biểu'}
              </span>
              <h2 style={{ fontFamily: "'Be Vietnam Pro',sans-serif", fontWeight: 600, fontSize: 'clamp(1.8rem,1.3rem + 1.3vw,2.5rem)', lineHeight: 1.28, letterSpacing: '-.012em', color: 'var(--c-ink,#16181c)' }}>
                {isEn ? 'Track Record & Experience' : 'Kinh nghiệm thực hiện'}
              </h2>
            </div>
            <p style={{ maxWidth: '46ch', color: 'var(--c-muted,#5f656d)', fontSize: '.95rem', textWrap: 'pretty' }}>
              {isEn ? 'Client identities and actual values are redacted per confidentiality.' : 'Thông tin khách hàng và giá trị tài sản được ẩn theo nghĩa vụ bảo mật.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap: '1.4rem' }}>
            {service.cases.map((c, idx) => {
              const caseTitle = c[0]
              const casePurpose = c[1]
              const caseDesc = c[2] || ''
              return (
                <article
                  key={idx}
                  style={{
                    display: 'flex',
                    gap: '1.4rem',
                    padding: '1.6rem',
                    border: '1px solid var(--c-border,#e2e0da)',
                    borderRadius: '14px',
                    background: '#fff',
                    transition: 'all .25s cubic-bezier(.16,1,.3,1)',
                  }}
                >
                  <span
                    style={{
                      width: '56px',
                      height: '56px',
                      flexShrink: 0,
                      borderRadius: '12px',
                      background: 'var(--c-icon,#fbf7f3)',
                      border: '1px solid var(--c-border,#e2e0da)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '.8rem',
                      fontWeight: 700,
                      color: 'var(--c-accent,#d94f0a)',
                    }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <span style={{ display: 'inline-block', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)', marginBottom: '.35rem' }}>
                      {casePurpose}
                    </span>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '.5rem' }}>{caseTitle}</h3>
                    {caseDesc && <p style={{ fontSize: '.88rem', color: 'var(--c-muted,#5f656d)', textWrap: 'pretty' }}>{caseDesc}</p>}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section id="faq" data-screen-label="FAQ" style={{ scrollMarginTop: '90px', background: '#fff', padding: 'clamp(4.5rem,8vw,7rem) 0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem,4vw,2.5rem)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))', gap: 'clamp(2.5rem,5vw,5rem)', alignItems: 'start' }}>
            <div>
              <span style={{ display: 'block', fontSize: '.74rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)', marginBottom: '.8rem' }}>
                {isEn ? 'Frequently Asked Questions' : 'Câu hỏi thường gặp'}
              </span>
              <h2 style={{ fontFamily: "'Be Vietnam Pro',sans-serif", fontWeight: 600, fontSize: 'clamp(1.8rem,1.3rem + 1.3vw,2.5rem)', lineHeight: 1.28, letterSpacing: '-.012em', color: 'var(--c-ink,#16181c)' }}>
                {isEn ? `Answers about ${service.noun}` : `Giải đáp về ${service.noun}`}
              </h2>
              <p style={{ fontSize: '.95rem', color: 'var(--c-muted,#5f656d)', margin: '1rem 0 1.6rem', maxWidth: '40ch', textWrap: 'pretty' }}>
                {isEn ? 'Need tailored advice? Contact MHD team directly.' : 'Chưa có câu trả lời phù hợp? Liên hệ trực tiếp đội ngũ MHD.'}
              </p>
              <a href="tel:1900000000" style={{ display: 'inline-flex', alignItems: 'center', gap: '.6rem', fontWeight: 700, fontSize: '1.1rem', color: 'var(--c-ink,#16181c)' }}>
                <span style={{ color: 'var(--c-accent,#d94f0a)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
                    <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8 9.8a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.7.7a2 2 0 011.7 2z" />
                  </svg>
                </span>
                1900 000 000
              </a>
            </div>

            <div style={{ borderTop: '1px solid var(--c-border,#e2e0da)' }}>
              {service.faq.map(([fQuest, fAns], idx) => {
                const isOpen = openFaq === idx
                return (
                  <div key={idx} style={{ borderBottom: '1px solid var(--c-border,#e2e0da)' }}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '1.2rem',
                        padding: '1.3rem 0',
                        textAlign: 'left',
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: 'var(--c-ink,#16181c)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <span style={{ flex: 1, minWidth: 0 }}>{fQuest}</span>
                      <span
                        style={{
                          width: '30px',
                          height: '30px',
                          flexShrink: 0,
                          borderRadius: '50%',
                          border: '1px solid var(--c-border,#e2e0da)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'transform .3s cubic-bezier(.16,1,.3,1)',
                          transform: isOpen ? 'rotate(45deg)' : 'none',
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                    </button>
                    {isOpen && (
                      <div style={{ padding: '0 3rem 1.3rem 0' }}>
                        <p style={{ fontSize: '.92rem', color: 'var(--c-muted,#5f656d)', textWrap: 'pretty', lineHeight: 1.6 }}>{fAns}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 10. CTA BANNER (Dark Section) */}
      <section
        data-screen-label="CTA"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--c-partner,#23262c)',
          color: '#fff',
          padding: 'clamp(4.5rem,8vw,7rem) 0',
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
        ></div>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-120px',
            bottom: '-160px',
            width: '480px',
            height: '480px',
            borderRadius: '50%',
            pointerEvents: 'none',
            background: 'radial-gradient(circle,rgba(var(--c-accent-rgb,217,79,10),.3),transparent 65%)',
            filter: 'blur(30px)',
            animation: 'mhdDrift 12s ease-in-out infinite alternate',
          }}
        ></div>

        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem,4vw,2.5rem)' }}>
          <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: '1 1 420px', minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: '.74rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-badge,#f3c9b3)', marginBottom: '.8rem' }}>
                {isEn ? 'Next Step' : 'Bước tiếp theo'}
              </span>
              <h2 style={{ fontFamily: "'Be Vietnam Pro',sans-serif", fontWeight: 600, fontSize: 'clamp(1.8rem,1.3rem + 1.3vw,2.5rem)', lineHeight: 1.28, letterSpacing: '-.012em', color: '#fff' }}>
                {isEn ? `Submit ${service.noun} details for quotation` : `Gửi thông tin ${service.noun} để nhận báo giá`}
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--c-ondark-muted,#b9bcc3)', marginTop: '1rem', maxWidth: '50ch', textWrap: 'pretty' }}>
                {isEn
                  ? 'MHD confirms engagement scope, required checklist, and expected timeline.'
                  : 'MHD xác nhận phạm vi công việc, hồ sơ cần cung cấp và tiến độ dự kiến.'}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '.8rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                data-cta-dark="1"
                onClick={scrollToForm}
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
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all .2s cubic-bezier(.16,1,.3,1)',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z" />
                  <path d="M14 3v6h6M9 14l2 2 4-4" />
                </svg>
                {isEn ? 'Submit Valuation Request' : 'Gửi yêu cầu thẩm định'}
              </button>

              <a
                href="tel:1900000000"
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
                  transition: 'all .2s',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
                  <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8 9.8a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.7.7a2 2 0 011.7 2z" />
                </svg>
                1900 000 000
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 11. DỊCH VỤ THẨM ĐỊNH KHÁC (5 Cards) */}
      <section data-screen-label="Dịch vụ khác" style={{ background: 'var(--c-page,#f6f5f2)', padding: 'clamp(3.5rem,6vw,5rem) 0', borderBottom: '1px solid var(--c-border,#e2e0da)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem,4vw,2.5rem)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.6rem' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>{isEn ? 'Other Valuation Services' : 'Dịch vụ thẩm định khác'}</h2>
          </div>

          <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', scrollSnapType: 'x mandatory', paddingBottom: '.5rem', scrollbarWidth: 'thin' }}>
            {otherServices.map((other) => (
              <Link
                key={other.slug}
                href={`/services/${other.slug}`}
                style={{
                  flex: '1 0 210px',
                  scrollSnapAlign: 'start',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '.9rem',
                  padding: '1.4rem',
                  border: '1px solid var(--c-border,#e2e0da)',
                  borderRadius: '12px',
                  background: '#fff',
                  color: 'var(--c-ink,#16181c)',
                  textDecoration: 'none',
                  transition: 'all .25s cubic-bezier(.16,1,.3,1)',
                }}
              >
                <span style={{ height: '56px', display: 'flex', alignItems: 'center' }}>{renderServiceSvg(other.slug)}</span>
                <span style={{ fontSize: '.95rem', fontWeight: 700, lineHeight: 1.35, textWrap: 'balance' }}>{other.title}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', fontSize: '.8rem', fontWeight: 700, color: 'var(--c-accent,#d94f0a)', marginTop: 'auto' }}>
                  {isEn ? 'View service' : 'Xem dịch vụ'}{' '}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
