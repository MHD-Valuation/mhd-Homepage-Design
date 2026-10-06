'use client'

import React, { useState } from 'react'

interface Props {
  currentLocale?: string
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

export default function ContactClient({ currentLocale = 'vi' }: Props) {
  const isEn = currentLocale === 'en'

  const [formType, setFormType] = useState<'tham-dinh' | 'bao-gia'>('tham-dinh')
  const [fullName, setFullName] = useState('')
  const [organization, setOrganization] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [assetType, setAssetType] = useState('')
  const [purpose, setPurpose] = useState('')
  const [location, setLocation] = useState('')
  const [deadline, setDeadline] = useState('')
  const [note, setNote] = useState('')
  const [consent, setConsent] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const [ticketNo, setTicketNo] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [botField, setBotField] = useState('')

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx))
  }

  const scrollToForm = (type: 'tham-dinh' | 'bao-gia') => {
    setFormType(type)
    setSubmitted(false)
    const el = document.getElementById('mhd-form')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 96
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs: Record<string, string> = {}

    if (!fullName.trim()) errs.name = isEn ? 'Please enter your full name.' : 'Vui lòng nhập họ và tên.'
    const ph = phone.replace(/\s/g, '')
    if (!/^(\+?84|0)\d{8,10}$/.test(ph)) errs.phone = isEn ? 'Invalid phone number.' : 'Số điện thoại chưa hợp lệ.'
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errs.email = isEn ? 'Invalid email address.' : 'Email chưa hợp lệ.'
    if (!consent) errs.consent = isEn ? 'Please confirm your consent for MHD to process your request.' : 'Vui lòng xác nhận đồng ý để MHD xử lý yêu cầu.'

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setErrors({})
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('fullName', fullName)
      formData.append('phone', phone)
      if (email) formData.append('email', email)
      if (organization) formData.append('organization', organization)
      formData.append('serviceType', assetType || 'doanh-nghiep')
      formData.append('dossierType', formType === 'tham-dinh' ? 'request' : 'quote')
      formData.append('website_url', botField)
      formData.append(
        'message',
        `[${formType === 'tham-dinh' ? 'Yêu cầu thẩm định' : 'Nhận báo giá'}] Mục đích: ${purpose || 'N/A'}. Địa điểm: ${location || 'N/A'}. Thời hạn: ${deadline || 'N/A'}. Ghi chú: ${note}`
      )
      if (file) {
        formData.append('file', file)
      }

      const res = await fetch('/api/inquiries', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json().catch(() => ({}))

      if (res.ok && data.success) {
        setSubmitted(true)
        setTicketNo(data.ticketNumber || '')
      } else {
        setErrors({
          general:
            data?.error ||
            data?.errors?.[0]?.message ||
            (isEn
              ? 'An error occurred while submitting. Please call 1900 000 000.'
              : 'Có lỗi xảy ra khi gửi yêu cầu. Vui lòng liên hệ hotline 1900 000 000.'),
        })
      }
    } catch {
      setErrors({
        general: isEn
          ? 'Network connection error. Please try again or call 1900 000 000.'
          : 'Lỗi kết nối mạng. Vui lòng thử lại hoặc gọi hotline 1900 000 000.',
      })
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setSubmitted(false)
    setFullName('')
    setOrganization('')
    setPhone('')
    setEmail('')
    setAssetType('')
    setPurpose('')
    setLocation('')
    setDeadline('')
    setNote('')
    setConsent(false)
    setFile(null)
    setTicketNo('')
    setErrors({})
  }

  const faqItems = [
    {
      q: isEn ? 'What documents are required when requesting a valuation?' : 'Cần chuẩn bị hồ sơ gì khi yêu cầu thẩm định giá?',
      a: isEn
        ? 'Basic documents include legal titles of the asset, current condition dossiers, and intended use of valuation report. MHD will provide a specific tailored list upon receiving your initial request.'
        : 'Hồ sơ cơ bản gồm giấy tờ pháp lý của tài sản, thông tin về hiện trạng và mục đích sử dụng kết quả. MHD sẽ gửi danh mục cụ thể theo từng loại tài sản sau khi tiếp nhận yêu cầu.',
    },
    {
      q: isEn ? 'How long does a valuation engagement typically take?' : 'Thời gian thực hiện một hồ sơ là bao lâu?',
      a: isEn
        ? 'Timeline depends on asset category, quantity, site survey location, and document completeness. The estimated schedule is explicitly stated in our fee quotation and service contract.'
        : 'Thời gian phụ thuộc loại tài sản, số lượng, địa điểm khảo sát và mức độ đầy đủ của hồ sơ. Tiến độ dự kiến được ghi rõ trong báo giá và hợp đồng dịch vụ.',
    },
    {
      q: isEn ? 'How are valuation service fees determined?' : 'Phí thẩm định giá được xác định như thế nào?',
      a: isEn
        ? 'Fees are determined based on scope of work: asset class, preliminary asset scale/value, inspection locations, purpose, and required delivery timeline.'
        : 'Phí được xác định theo phạm vi công việc: loại và giá trị sơ bộ của tài sản, số lượng, địa điểm khảo sát, mục đích thẩm định và yêu cầu về thời hạn.',
    },
    {
      q: isEn ? 'How long is a valuation certificate legally valid?' : 'Chứng thư thẩm định giá có hiệu lực trong bao lâu?',
      a: isEn
        ? 'The validity period is stated on the certificate, determined according to valuation purpose, asset characteristics, and current Vietnamese statutory regulations.'
        : 'Thời hạn hiệu lực được ghi trên chứng thư, xác định theo mục đích thẩm định, đặc điểm tài sản và quy định pháp luật hiện hành.',
    },
    {
      q: isEn ? 'How can I verify the authenticity of a certificate?' : 'Làm sao để tra cứu thông tin chứng thư?',
      a: isEn
        ? 'Scan the QR code printed on the certificate or enter the certificate number on our lookup portal to verify issuance records against the official MHD database.'
        : 'Quét mã QR trên chứng thư hoặc nhập số chứng thư tại trang tra cứu để đối chiếu thông tin phát hành trên hệ thống MHD. Kết quả tra cứu không thay thế bản chứng thư và báo cáo thẩm định giá.',
    },
    {
      q: isEn ? 'Does MHD handle assets located outside Ho Chi Minh City?' : 'MHD có tiếp nhận hồ sơ ngoài TP. Hồ Chí Minh không?',
      a: isEn
        ? 'Yes. Inspection logistics and mobilization expenses are confirmed clearly once MHD receives initial details on the asset location.'
        : 'Có. Phạm vi khảo sát và chi phí đi lại được xác nhận cụ thể khi MHD tiếp nhận thông tin về địa điểm tài sản.',
    },
  ]

  return (
    <main style={{ background: 'var(--c-page,#f6f5f2)', color: 'var(--c-ink,#16181c)' }}>
      {/* 1. HERO HEADER */}
      <section
        data-screen-label="Liên hệ — Hero"
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
        />
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
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1240px', margin: '0 auto', padding: 'clamp(3.5rem,7vw,6rem) clamp(1rem,4vw,2.5rem) clamp(2.5rem,5vw,3.5rem)' }}>
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
            <a href="/" style={{ color: 'var(--c-faint,#8a8f96)', textDecoration: 'none' }}>
              {isEn ? 'Home' : 'Trang chủ'}
            </a>
            <span aria-hidden="true">/</span>
            <span style={{ color: 'var(--c-ink,#16181c)', fontWeight: 600 }}>
              {isEn ? 'Contact' : 'Liên hệ'}
            </span>
          </nav>
          <h1
            style={{
              fontFamily: "'Be Vietnam Pro',sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(2.4rem,1.6rem + 3vw,4rem)',
              lineHeight: 1.15,
              letterSpacing: '-.02em',
              marginBottom: '1.1rem',
            }}
          >
            {isEn ? 'Contact MHD Valuation' : 'Liên hệ MHD'}
          </h1>
          <p
            style={{
              fontSize: 'clamp(1rem,.95rem + .3vw,1.15rem)',
              color: 'var(--c-muted,#5f656d)',
              maxWidth: 'none',
              marginBottom: '2.4rem',
              textWrap: 'pretty',
            }}
          >
            {isEn
              ? 'Submit your information for MHD to confirm the scope of work and required document dossiers.'
              : 'Gửi thông tin để MHD xác nhận phạm vi công việc và hồ sơ cần cung cấp.'}
          </p>

          {/* Quick contact 4 cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
              gap: '1rem',
            }}
          >
            <a
              href="tel:1900000000"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '.9rem',
                padding: '1.1rem 1.2rem',
                borderRadius: '12px',
                border: '1px solid var(--c-border,#e2e0da)',
                background: '#fff',
                color: 'var(--c-ink,#16181c)',
                minWidth: 0,
                textDecoration: 'none',
                transition: 'all .25s cubic-bezier(.16,1,.3,1)',
              }}
            >
              <span
                style={{
                  width: '44px',
                  height: '44px',
                  flexShrink: 0,
                  borderRadius: '10px',
                  border: '1px solid var(--c-border,#e2e0da)',
                  background: 'var(--c-icon,#fbf7f3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--c-accent,#d94f0a)',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8 9.8a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.7.7a2 2 0 011.7 2z" />
                </svg>
              </span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--c-faint,#8a8f96)' }}>
                  {isEn ? 'Consulting Hotline' : 'Hotline tư vấn'}
                </span>
                <span style={{ display: 'block', fontWeight: 700, fontSize: '.98rem', marginTop: '.15rem', whiteSpace: 'nowrap' }}>
                  1900 000 000
                </span>
              </span>
            </a>

            <a
              href="mailto:info@mhd.com.vn"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '.9rem',
                padding: '1.1rem 1.2rem',
                borderRadius: '12px',
                border: '1px solid var(--c-border,#e2e0da)',
                background: '#fff',
                color: 'var(--c-ink,#16181c)',
                minWidth: 0,
                textDecoration: 'none',
                transition: 'all .25s cubic-bezier(.16,1,.3,1)',
              }}
            >
              <span
                style={{
                  width: '44px',
                  height: '44px',
                  flexShrink: 0,
                  borderRadius: '10px',
                  border: '1px solid var(--c-border,#e2e0da)',
                  background: 'var(--c-icon,#fbf7f3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--c-accent,#d94f0a)',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--c-faint,#8a8f96)' }}>
                  Email
                </span>
                <span style={{ display: 'block', fontWeight: 700, fontSize: '.98rem', marginTop: '.15rem', whiteSpace: 'nowrap' }}>
                  info@mhd.com.vn
                </span>
              </span>
            </a>

            <a
              href="#van-phong"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '.9rem',
                padding: '1.1rem 1.2rem',
                borderRadius: '12px',
                border: '1px solid var(--c-border,#e2e0da)',
                background: '#fff',
                color: 'var(--c-ink,#16181c)',
                minWidth: 0,
                textDecoration: 'none',
                transition: 'all .25s cubic-bezier(.16,1,.3,1)',
              }}
            >
              <span
                style={{
                  width: '44px',
                  height: '44px',
                  flexShrink: 0,
                  borderRadius: '10px',
                  border: '1px solid var(--c-border,#e2e0da)',
                  background: 'var(--c-icon,#fbf7f3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--c-accent,#d94f0a)',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--c-faint,#8a8f96)' }}>
                  {isEn ? 'Working Hours' : 'Thứ 2 – Thứ 6'}
                </span>
                <span style={{ display: 'block', fontWeight: 700, fontSize: '.98rem', marginTop: '.15rem', whiteSpace: 'nowrap' }}>
                  8:00 – 17:30
                </span>
              </span>
            </a>

            <a
              href="#van-phong"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '.9rem',
                padding: '1.1rem 1.2rem',
                borderRadius: '12px',
                border: '1px solid var(--c-border,#e2e0da)',
                background: '#fff',
                color: 'var(--c-ink,#16181c)',
                minWidth: 0,
                textDecoration: 'none',
                transition: 'all .25s cubic-bezier(.16,1,.3,1)',
              }}
            >
              <span
                style={{
                  width: '44px',
                  height: '44px',
                  flexShrink: 0,
                  borderRadius: '10px',
                  border: '1px solid var(--c-border,#e2e0da)',
                  background: 'var(--c-icon,#fbf7f3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--c-accent,#d94f0a)',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 21s-7-6.5-7-12a7 7 0 0114 0c0 5.5-7 12-7 12z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--c-faint,#8a8f96)' }}>
                  {isEn ? 'Office Location' : 'Văn phòng'}
                </span>
                <span style={{ display: 'block', fontWeight: 700, fontSize: '.98rem', marginTop: '.15rem', whiteSpace: 'nowrap' }}>
                  TP. Hồ Chí Minh
                </span>
              </span>
            </a>
          </div>
        </div>

        {/* Anchor subnav */}
        <div style={{ position: 'relative', zIndex: 1, borderTop: '1px solid var(--c-border,#e2e0da)', background: 'rgba(255,255,255,.6)' }}>
          <nav aria-label="Mục trên trang" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem,4vw,2.5rem)', display: 'flex', gap: '2rem', overflowX: 'auto' }}>
            <a href="#yeu-cau" style={{ padding: '1rem 0', fontSize: '.88rem', fontWeight: 600, color: 'var(--c-ink,#16181c)', whiteSpace: 'nowrap', textDecoration: 'none' }}>
              {isEn ? 'Valuation Request' : 'Yêu cầu thẩm định'}
            </a>
            <a href="#bao-gia" style={{ padding: '1rem 0', fontSize: '.88rem', fontWeight: 600, color: 'var(--c-muted,#5f656d)', whiteSpace: 'nowrap', textDecoration: 'none' }}>
              {isEn ? 'Quotation' : 'Báo giá'}
            </a>
            <a href="#van-phong" style={{ padding: '1rem 0', fontSize: '.88rem', fontWeight: 600, color: 'var(--c-muted,#5f656d)', whiteSpace: 'nowrap', textDecoration: 'none' }}>
              {isEn ? 'Offices' : 'Văn phòng'}
            </a>
            <a href="#faq" style={{ padding: '1rem 0', fontSize: '.88rem', fontWeight: 600, color: 'var(--c-muted,#5f656d)', whiteSpace: 'nowrap', textDecoration: 'none' }}>
              FAQ
            </a>
          </nav>
        </div>
      </section>

      {/* 2. MAIN SECTION: YÊU CẦU THẨM ĐỊNH (#yeu-cau) */}
      <section id="yeu-cau" data-screen-label="Yêu cầu thẩm định" style={{ scrollMarginTop: '80px', background: '#fff', padding: 'clamp(4.5rem,8vw,7.5rem) 0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem,4vw,2.5rem)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,400px),1fr))', gap: 'clamp(2.5rem,5vw,5rem)', alignItems: 'start' }}>
          <div>
            <span style={{ display: 'block', fontSize: '.74rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)', marginBottom: '.8rem' }}>
              {isEn ? 'Valuation Request' : 'Yêu cầu thẩm định'}
            </span>
            <h2 style={{ fontFamily: "'Be Vietnam Pro',sans-serif", fontWeight: 600, fontSize: 'clamp(1.8rem,1.3rem + 1.3vw,2.5rem)', lineHeight: 1.28, letterSpacing: '-.012em', textWrap: 'balance' }}>
              {isEn ? 'Submit Asset Details for Valuation' : 'Gửi thông tin tài sản cần thẩm định'}
            </h2>
            <p style={{ fontSize: '.98rem', color: 'var(--c-muted,#5f656d)', margin: '1rem 0 2.2rem', maxWidth: '46ch', textWrap: 'pretty' }}>
              {isEn
                ? 'Preliminary details enable our valuers to identify engagement scope, required documentation, and generate an accurate proposal.'
                : 'Thông tin ban đầu giúp thẩm định viên xác định phạm vi công việc, hồ sơ cần cung cấp và lập báo giá phù hợp.'}
            </p>

            <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', borderLeft: '1px solid var(--c-border,#e2e0da)', marginLeft: '18px' }}>
              <li style={{ position: 'relative', padding: '0 0 1.6rem 2rem' }}>
                <span style={{ position: 'absolute', left: '-18px', top: '-2px', width: '36px', height: '36px', borderRadius: '50%', background: 'var(--c-accent,#d94f0a)', color: '#fff', border: '1px solid var(--c-accent,#d94f0a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.82rem', fontWeight: 700 }}>
                  1
                </span>
                <span style={{ display: 'block', fontWeight: 700, fontSize: '1rem', marginBottom: '.25rem' }}>
                  {isEn ? 'Information Intake' : 'Tiếp nhận thông tin'}
                </span>
                <span style={{ display: 'block', fontSize: '.88rem', color: 'var(--c-muted,#5f656d)', textWrap: 'pretty' }}>
                  {isEn ? 'MHD records assets, purpose, and targeted delivery timeline.' : 'MHD ghi nhận tài sản, mục đích và thời hạn mong muốn.'}
                </span>
              </li>
              <li style={{ position: 'relative', padding: '0 0 1.6rem 2rem' }}>
                <span style={{ position: 'absolute', left: '-18px', top: '-2px', width: '36px', height: '36px', borderRadius: '50%', background: '#fff', color: 'var(--c-ink,#16181c)', border: '1px solid var(--c-border,#e2e0da)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.82rem', fontWeight: 700 }}>
                  2
                </span>
                <span style={{ display: 'block', fontWeight: 700, fontSize: '1rem', marginBottom: '.25rem' }}>
                  {isEn ? 'Scope & Dossier Confirmation' : 'Xác nhận phạm vi và hồ sơ'}
                </span>
                <span style={{ display: 'block', fontSize: '.88rem', color: 'var(--c-muted,#5f656d)', textWrap: 'pretty' }}>
                  {isEn ? 'Accredited valuers reach out directly to review technical scope and required title deeds.' : 'Thẩm định viên liên hệ, trao đổi phạm vi công việc và danh mục hồ sơ cần cung cấp.'}
                </span>
              </li>
              <li style={{ position: 'relative', padding: '0 0 1.6rem 2rem' }}>
                <span style={{ position: 'absolute', left: '-18px', top: '-2px', width: '36px', height: '36px', borderRadius: '50%', background: '#fff', color: 'var(--c-ink,#16181c)', border: '1px solid var(--c-border,#e2e0da)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.82rem', fontWeight: 700 }}>
                  3
                </span>
                <span style={{ display: 'block', fontWeight: 700, fontSize: '1rem', marginBottom: '.25rem' }}>
                  {isEn ? 'Proposal & Service Agreement' : 'Báo giá và hợp đồng'}
                </span>
                <span style={{ display: 'block', fontSize: '.88rem', color: 'var(--c-muted,#5f656d)', textWrap: 'pretty' }}>
                  {isEn ? 'MHD sends formal quotation, project timeline, and signs legal agreement.' : 'MHD gửi báo giá, tiến độ dự kiến và ký hợp đồng dịch vụ.'}
                </span>
              </li>
            </ol>

            <div style={{ marginTop: '1rem', padding: '1.4rem 1.5rem', borderRadius: '12px', background: 'var(--c-page,#f6f5f2)', border: '1px solid var(--c-border,#e2e0da)' }}>
              <span style={{ display: 'block', fontSize: '.72rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--c-faint,#8a8f96)', marginBottom: '.8rem' }}>
                {isEn ? 'Recommended Documents to Prepare' : 'Hồ sơ nên chuẩn bị'}
              </span>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '.55rem', fontSize: '.88rem', color: 'var(--c-ink,#16181c)', padding: 0, listStyle: 'none' }}>
                <li style={{ display: 'flex', gap: '.6rem', alignItems: 'flex-start' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d94f0b" strokeWidth="2.4" style={{ flexShrink: 0, marginTop: '3px' }}>
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>{isEn ? 'Legal asset ownership documentation (scans or photos)' : 'Giấy tờ pháp lý của tài sản (bản chụp)'}</span>
                </li>
                <li style={{ display: 'flex', gap: '.6rem', alignItems: 'flex-start' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d94f0b" strokeWidth="2.4" style={{ flexShrink: 0, marginTop: '3px' }}>
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>{isEn ? 'Photos or description of current asset state' : 'Hình ảnh hoặc mô tả hiện trạng tài sản'}</span>
                </li>
                <li style={{ display: 'flex', gap: '.6rem', alignItems: 'flex-start' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d94f0b" strokeWidth="2.4" style={{ flexShrink: 0, marginTop: '3px' }}>
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>{isEn ? 'Intended use of the valuation conclusion' : 'Mục đích sử dụng kết quả thẩm định'}</span>
                </li>
                <li style={{ display: 'flex', gap: '.6rem', alignItems: 'flex-start' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d94f0b" strokeWidth="2.4" style={{ flexShrink: 0, marginTop: '3px' }}>
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>{isEn ? 'Required delivery deadline' : 'Thời điểm cần nhận chứng thư'}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Form Container */}
          <div
            id="mhd-form"
            style={{
              scrollMarginTop: '90px',
              background: '#fff',
              border: '1px solid var(--c-border,#e2e0da)',
              borderRadius: '16px',
              padding: 'clamp(1.5rem,3vw,2.4rem)',
              boxShadow: '0 30px 60px rgba(var(--c-ink-rgb,22,24,28),.07)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg,var(--c-accent,#d94f0a),var(--c-gold,#7d7d7d))' }} />

            {!submitted ? (
              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div role="radiogroup" aria-label="Loại yêu cầu" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.3rem', padding: '.3rem', background: 'var(--c-page,#f6f5f2)', border: '1px solid var(--c-border,#e2e0da)', borderRadius: '10px' }}>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={formType === 'tham-dinh'}
                    onClick={() => setFormType('tham-dinh')}
                    style={{
                      padding: '.7rem',
                      borderRadius: '7px',
                      fontSize: '.88rem',
                      fontWeight: 700,
                      background: formType === 'tham-dinh' ? '#fff' : 'transparent',
                      color: formType === 'tham-dinh' ? 'var(--c-ink,#16181c)' : 'var(--c-muted,#5f656d)',
                      boxShadow: formType === 'tham-dinh' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                      cursor: 'pointer',
                      border: 'none',
                      transition: 'all .2s',
                    }}
                  >
                    {isEn ? 'Valuation Request' : 'Yêu cầu thẩm định'}
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={formType === 'bao-gia'}
                    onClick={() => setFormType('bao-gia')}
                    style={{
                      padding: '.7rem',
                      borderRadius: '7px',
                      fontSize: '.88rem',
                      fontWeight: 700,
                      background: formType === 'bao-gia' ? '#fff' : 'transparent',
                      color: formType === 'bao-gia' ? 'var(--c-ink,#16181c)' : 'var(--c-muted,#5f656d)',
                      boxShadow: formType === 'bao-gia' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                      cursor: 'pointer',
                      border: 'none',
                      transition: 'all .2s',
                    }}
                  >
                    {isEn ? 'Get Quotation' : 'Nhận báo giá'}
                  </button>
                </div>

                {errors.general && (
                  <div style={{ padding: '.8rem 1rem', borderRadius: '8px', background: '#fdf2f2', border: '1px solid #f8b4b4', color: '#c0392b', fontSize: '.86rem' }}>
                    {errors.general}
                  </div>
                )}

                {/* Antispam honeypot trap */}
                <input
                  type="text"
                  name="website_url"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={botField}
                  onChange={(e) => setBotField(e.target.value)}
                  style={{
                    position: 'absolute',
                    opacity: 0,
                    pointerEvents: 'none',
                    height: 0,
                    width: 0,
                    margin: 0,
                    padding: 0,
                    zIndex: -1,
                  }}
                />

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))', gap: '1rem' }}>
                  <label style={{ display: 'block' }}>
                    <span style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: 'var(--c-ink,#16181c)', marginBottom: '.4rem' }}>
                      {isEn ? 'Full Name' : 'Họ và tên'} <span style={{ color: 'var(--c-accent,#d94f0a)' }}>*</span>
                    </span>
                    <input
                      name="name"
                      type="text"
                      placeholder={isEn ? 'John Doe' : 'Nguyễn Văn A'}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      style={{ width: '100%', padding: '.8rem .95rem', border: '1px solid var(--c-border,#e2e0da)', borderRadius: '8px', background: '#fff', font: 'inherit', fontSize: '.92rem', color: 'var(--c-ink,#16181c)', outline: 'none' }}
                    />
                    {errors.name && <span style={{ display: 'block', fontSize: '.76rem', color: '#c0392b', marginTop: '.35rem' }}>{errors.name}</span>}
                  </label>

                  <label style={{ display: 'block' }}>
                    <span style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: 'var(--c-ink,#16181c)', marginBottom: '.4rem' }}>
                      {isEn ? 'Organization / Enterprise' : 'Tổ chức / Doanh nghiệp'}
                    </span>
                    <input
                      name="org"
                      type="text"
                      placeholder={isEn ? 'Entity name (optional)' : 'Tên đơn vị (nếu có)'}
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      style={{ width: '100%', padding: '.8rem .95rem', border: '1px solid var(--c-border,#e2e0da)', borderRadius: '8px', background: '#fff', font: 'inherit', fontSize: '.92rem', color: 'var(--c-ink,#16181c)', outline: 'none' }}
                    />
                  </label>

                  <label style={{ display: 'block' }}>
                    <span style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: 'var(--c-ink,#16181c)', marginBottom: '.4rem' }}>
                      {isEn ? 'Phone Number' : 'Điện thoại'} <span style={{ color: 'var(--c-accent,#d94f0a)' }}>*</span>
                    </span>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="09xx xxx xxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{ width: '100%', padding: '.8rem .95rem', border: '1px solid var(--c-border,#e2e0da)', borderRadius: '8px', background: '#fff', font: 'inherit', fontSize: '.92rem', color: 'var(--c-ink,#16181c)', outline: 'none' }}
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
                      placeholder="ten@congty.vn"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ width: '100%', padding: '.8rem .95rem', border: '1px solid var(--c-border,#e2e0da)', borderRadius: '8px', background: '#fff', font: 'inherit', fontSize: '.92rem', color: 'var(--c-ink,#16181c)', outline: 'none' }}
                    />
                    {errors.email && <span style={{ display: 'block', fontSize: '.76rem', color: '#c0392b', marginTop: '.35rem' }}>{errors.email}</span>}
                  </label>

                  <label style={{ display: 'block' }}>
                    <span style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: 'var(--c-ink,#16181c)', marginBottom: '.4rem' }}>
                      {isEn ? 'Asset Class' : 'Loại tài sản'}
                    </span>
                    <span style={{ position: 'relative', display: 'block' }}>
                      <select
                        name="asset"
                        value={assetType}
                        onChange={(e) => setAssetType(e.target.value)}
                        style={{ width: '100%', padding: '.8rem .95rem', border: '1px solid var(--c-border,#e2e0da)', borderRadius: '8px', background: '#fff', font: 'inherit', fontSize: '.92rem', color: 'var(--c-ink,#16181c)', outline: 'none', appearance: 'none', WebkitAppearance: 'none', paddingRight: '2.4rem' }}
                      >
                        <option value="">{isEn ? 'Select asset class' : 'Chọn'}</option>
                        <option value="doanh-nghiep">{isEn ? 'Enterprise Valuation' : 'Thẩm định giá trị doanh nghiệp'}</option>
                        <option value="bat-dong-san">{isEn ? 'Real Estate Valuation' : 'Thẩm định giá bất động sản'}</option>
                        <option value="may-thiet-bi">{isEn ? 'Machinery & Equipment' : 'Động sản & máy thiết bị'}</option>
                        <option value="thuong-hieu">{isEn ? 'Brand & Intangible Assets' : 'Thương hiệu & tài sản vô hình'}</option>
                        <option value="du-an-dau-tu">{isEn ? 'Investment Projects' : 'Thẩm định dự án đầu tư'}</option>
                        <option value="chung-minh-tai-chinh">{isEn ? 'Financial Solvency Proof' : 'Chứng minh tài chính'}</option>
                      </select>
                      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" style={{ position: 'absolute', right: '.9rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--c-muted3,#6b7178)' }}>
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </label>

                  <label style={{ display: 'block' }}>
                    <span style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: 'var(--c-ink,#16181c)', marginBottom: '.4rem' }}>
                      {isEn ? 'Valuation Purpose' : 'Mục đích thẩm định'}
                    </span>
                    <span style={{ position: 'relative', display: 'block' }}>
                      <select
                        name="purpose"
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        style={{ width: '100%', padding: '.8rem .95rem', border: '1px solid var(--c-border,#e2e0da)', borderRadius: '8px', background: '#fff', font: 'inherit', fontSize: '.92rem', color: 'var(--c-ink,#16181c)', outline: 'none', appearance: 'none', WebkitAppearance: 'none', paddingRight: '2.4rem' }}
                      >
                        <option value="">{isEn ? 'Select purpose' : 'Chọn'}</option>
                        <option value="vay-von">{isEn ? 'Bank Loan / Collateral' : 'Vay vốn, thế chấp'}</option>
                        <option value="mua-ban">{isEn ? 'Transaction / Transfer' : 'Mua bán, chuyển nhượng'}</option>
                        <option value="gop-von">{isEn ? 'Capital Contribution' : 'Góp vốn'}</option>
                        <option value="ma">{isEn ? 'M&A / Equitization' : 'M&A, cổ phần hoá'}</option>
                        <option value="bctc">{isEn ? 'Financial Reporting' : 'Báo cáo tài chính'}</option>
                        <option value="chung-minh">{isEn ? 'Proof of Solvency' : 'Chứng minh tài chính'}</option>
                        <option value="khac">{isEn ? 'Other Purpose' : 'Mục đích khác'}</option>
                      </select>
                      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" style={{ position: 'absolute', right: '.9rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--c-muted3,#6b7178)' }}>
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </label>

                  <label style={{ display: 'block' }}>
                    <span style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: 'var(--c-ink,#16181c)', marginBottom: '.4rem' }}>
                      {isEn ? 'Asset Location' : 'Địa điểm tài sản'}
                    </span>
                    <input
                      name="location"
                      type="text"
                      placeholder={isEn ? 'City / Province' : 'Tỉnh / thành phố'}
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      style={{ width: '100%', padding: '.8rem .95rem', border: '1px solid var(--c-border,#e2e0da)', borderRadius: '8px', background: '#fff', font: 'inherit', fontSize: '.92rem', color: 'var(--c-ink,#16181c)', outline: 'none' }}
                    />
                  </label>

                  <label style={{ display: 'block' }}>
                    <span style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: 'var(--c-ink,#16181c)', marginBottom: '.4rem' }}>
                      {isEn ? 'Target Completion Date' : 'Thời điểm cần kết quả'}
                    </span>
                    <input
                      name="deadline"
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      style={{ width: '100%', padding: '.8rem .95rem', border: '1px solid var(--c-border,#e2e0da)', borderRadius: '8px', background: '#fff', font: 'inherit', fontSize: '.92rem', color: 'var(--c-ink,#16181c)', outline: 'none' }}
                    />
                  </label>
                </div>

                <label style={{ display: 'block' }}>
                  <span style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: 'var(--c-ink,#16181c)', marginBottom: '.4rem' }}>
                    {isEn ? 'Brief Asset Description' : 'Mô tả ngắn tài sản'}
                  </span>
                  <textarea
                    name="note"
                    rows={4}
                    placeholder={isEn ? 'Example: Townhouse 4x20m in District 3, for bank loan collateral.' : 'Ví dụ: Nhà phố 4x20m tại Quận 3, phục vụ hồ sơ vay vốn ngân hàng.'}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    style={{ width: '100%', padding: '.8rem .95rem', border: '1px solid var(--c-border,#e2e0da)', borderRadius: '8px', background: '#fff', font: 'inherit', fontSize: '.92rem', color: 'var(--c-ink,#16181c)', outline: 'none', resize: 'vertical', minHeight: '110px' }}
                  />
                </label>

                {/* Upload File */}
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem 1.1rem',
                    border: '1.5px dashed var(--c-border,#e2e0da)',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    background: 'var(--c-page,#f6f5f2)',
                    transition: 'border-color .2s',
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault()
                    if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0])
                  }}
                >
                  <span
                    style={{
                      width: '40px',
                      height: '40px',
                      flexShrink: 0,
                      borderRadius: '8px',
                      background: '#fff',
                      border: '1px solid var(--c-border,#e2e0da)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--c-accent,#d94f0a)',
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                    </svg>
                  </span>
                  <span style={{ minWidth: 0, flex: 1 }}>
                    <span style={{ display: 'block', fontSize: '.88rem', fontWeight: 700, color: 'var(--c-ink,#16181c)' }}>
                      {file ? file.name : (isEn ? 'Upload property dossier / images' : 'Tải lên hồ sơ tài sản (nếu có)')}
                    </span>
                    <span style={{ display: 'block', fontSize: '.76rem', color: 'var(--c-faint,#8a8f96)' }}>
                      {file ? formatFileSize(file.size) : 'PDF, JPG, PNG · tối đa 25 MB'}
                    </span>
                  </span>
                  <input
                    type="file"
                    multiple={false}
                    onChange={(e) => {
                      if (e.target.files?.[0]) setFile(e.target.files[0])
                    }}
                    style={{ position: 'absolute', width: '1px', height: '1px', opacity: 0 }}
                  />
                  {file && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setFile(null)
                      }}
                      style={{ border: 'none', background: 'none', color: '#c0392b', fontSize: '.8rem', fontWeight: 600, cursor: 'pointer' }}
                    >
                      {isEn ? 'Remove' : 'Xoá'}
                    </button>
                  )}
                </label>

                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '.7rem', fontSize: '.82rem', color: 'var(--c-muted,#5f656d)', lineHeight: 1.5, cursor: 'pointer' }}>
                  <input
                    name="consent"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    style={{ width: '18px', height: '18px', margin: '1px 0 0', flexShrink: 0, accentColor: 'var(--c-accent,#d94f0a)' }}
                  />
                  <span>
                    {isEn
                      ? 'I agree to allow MHD to use the provided information for consultation and request handling according to personal data protection regulations.'
                      : 'Tôi đồng ý để MHD sử dụng thông tin trên nhằm liên hệ và xử lý yêu cầu, theo quy định về bảo vệ dữ liệu cá nhân.'}
                  </span>
                </label>
                {errors.consent && <span style={{ display: 'block', fontSize: '.76rem', color: '#c0392b', marginTop: '.1rem' }}>{errors.consent}</span>}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '.55rem',
                    background: 'var(--c-ink,#16181c)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '.95rem',
                    padding: '1rem 1.4rem',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all .2s cubic-bezier(.16,1,.3,1)',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z" />
                    <path d="M14 3v6h6M9 14l2 2 4-4" />
                  </svg>
                  {loading
                    ? (isEn ? 'Processing...' : 'Đang xử lý...')
                    : formType === 'tham-dinh'
                      ? (isEn ? 'Submit Valuation Request' : 'Gửi yêu cầu thẩm định')
                      : (isEn ? 'Submit Quotation Request' : 'Gửi yêu cầu báo giá')}
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                <div style={{ width: '72px', height: '72px', margin: '0 auto 1.4rem', borderRadius: '50%', background: 'var(--c-icon,#fbf7f3)', border: '1px solid var(--c-border,#e2e0da)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-accent,#d94f0a)' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '.6rem' }}>
                  {isEn ? 'Request Received Successfully' : 'Đã tiếp nhận yêu cầu'}
                </h3>
                <p style={{ fontSize: '.92rem', color: 'var(--c-muted,#5f656d)', maxWidth: '36ch', margin: '0 auto 1.2rem' }}>
                  {isEn
                    ? 'MHD will contact you directly to confirm technical dossiers and next execution steps.'
                    : 'MHD sẽ liên hệ để xác nhận thông tin, hồ sơ và các bước thực hiện.'}
                </p>
                {ticketNo && (
                  <div style={{ display: 'inline-flex', gap: '.5rem', alignItems: 'center', padding: '.55rem 1rem', borderRadius: '999px', background: 'var(--c-page,#f6f5f2)', border: '1px solid var(--c-border,#e2e0da)', fontSize: '.82rem', color: 'var(--c-muted,#5f656d)', marginBottom: '1.6rem' }}>
                    {isEn ? 'Dossier Code:' : 'Mã tiếp nhận'}{' '}
                    <strong style={{ color: 'var(--c-ink,#16181c)', fontVariantNumeric: 'tabular-nums' }}>
                      {ticketNo}
                    </strong>
                  </div>
                )}
                <div>
                  <button
                    type="button"
                    onClick={resetForm}
                    style={{ fontSize: '.86rem', fontWeight: 700, color: 'var(--c-accent,#d94f0a)', border: 'none', background: 'none', cursor: 'pointer' }}
                  >
                    {isEn ? 'Submit another request' : 'Gửi yêu cầu khác'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. BÁO GIÁ (#bao-gia) */}
      <section id="bao-gia" data-screen-label="Báo giá" style={{ scrollMarginTop: '80px', background: 'var(--c-page,#f6f5f2)', borderTop: '1px solid var(--c-border,#e2e0da)', borderBottom: '1px solid var(--c-border,#e2e0da)', padding: 'clamp(4.5rem,8vw,7.5rem) 0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem,4vw,2.5rem)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1.5rem', flexWrap: 'wrap', marginBottom: 'clamp(2.4rem,4vw,3.4rem)' }}>
            <div>
              <span style={{ display: 'block', fontSize: '.74rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)', marginBottom: '.8rem' }}>
                {isEn ? 'Fee Quotation' : 'Báo giá'}
              </span>
              <h2 style={{ fontFamily: "'Be Vietnam Pro',sans-serif", fontWeight: 600, fontSize: 'clamp(1.8rem,1.3rem + 1.3vw,2.5rem)', lineHeight: 1.28, letterSpacing: '-.012em', textWrap: 'balance' }}>
                {isEn ? 'Valuation Fee Scoped to Engagement Parameters' : 'Phí thẩm định theo phạm vi công việc'}
              </h2>
            </div>
            <p style={{ maxWidth: '48ch', color: 'var(--c-muted,#5f656d)', fontSize: '.95rem', textWrap: 'pretty' }}>
              {isEn
                ? 'Fee proposals are formulated once MHD grasps preliminary asset parameters, clearly defining statutory scope, estimated timeline, and required documentation.'
                : 'Báo giá được lập sau khi MHD nắm thông tin tài sản. Báo giá ghi rõ phạm vi, tiến độ dự kiến và hồ sơ cần cung cấp.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,max(240px,45%)),1fr))', gap: '1.4rem', marginBottom: '2rem' }}>
            <div style={{ background: '#fff', border: '1px solid var(--c-border,#e2e0da)', borderRadius: '12px', padding: '1.6rem' }}>
              <span style={{ display: 'block', fontSize: '2rem', fontWeight: 700, letterSpacing: '-.02em', color: 'var(--c-border,#e2e0da)', lineHeight: 1, margin: '0 0 1rem' }}>
                01
              </span>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '.4rem' }}>
                {isEn ? 'Asset Class' : 'Loại tài sản'}
              </h4>
              <p style={{ fontSize: '.86rem', color: 'var(--c-muted,#5f656d)', textWrap: 'pretty', margin: 0 }}>
                {isEn ? 'Enterprises, real estate, machinery equipment, or intangible assets entail varying professional procedures.' : 'Doanh nghiệp, bất động sản, máy thiết bị hoặc tài sản vô hình có phạm vi công việc khác nhau.'}
              </p>
            </div>

            <div style={{ background: '#fff', border: '1px solid var(--c-border,#e2e0da)', borderRadius: '12px', padding: '1.6rem' }}>
              <span style={{ display: 'block', fontSize: '2rem', fontWeight: 700, letterSpacing: '-.02em', color: 'var(--c-border,#e2e0da)', lineHeight: 1, margin: '0 0 1rem' }}>
                02
              </span>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '.4rem' }}>
                {isEn ? 'Quantity & Scale' : 'Số lượng và quy mô'}
              </h4>
              <p style={{ fontSize: '.86rem', color: 'var(--c-muted,#5f656d)', textWrap: 'pretty', margin: 0 }}>
                {isEn ? 'Asset units, total land area, item catalog count, or enterprise balance sheet complexity.' : 'Số lượng tài sản, diện tích, số hạng mục hoặc quy mô doanh nghiệp cần thẩm định.'}
              </p>
            </div>

            <div style={{ background: '#fff', border: '1px solid var(--c-border,#e2e0da)', borderRadius: '12px', padding: '1.6rem' }}>
              <span style={{ display: 'block', fontSize: '2rem', fontWeight: 700, letterSpacing: '-.02em', color: 'var(--c-border,#e2e0da)', lineHeight: 1, margin: '0 0 1rem' }}>
                03
              </span>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '.4rem' }}>
                {isEn ? 'Survey Location' : 'Địa điểm khảo sát'}
              </h4>
              <p style={{ fontSize: '.86rem', color: 'var(--c-muted,#5f656d)', textWrap: 'pretty', margin: 0 }}>
                {isEn ? 'Geographic distribution and number of mandatory on-site surveys required.' : 'Vị trí tài sản và số lần khảo sát hiện trạng cần thực hiện.'}
              </p>
            </div>

            <div style={{ background: '#fff', border: '1px solid var(--c-border,#e2e0da)', borderRadius: '12px', padding: '1.6rem' }}>
              <span style={{ display: 'block', fontSize: '2rem', fontWeight: 700, letterSpacing: '-.02em', color: 'var(--c-border,#e2e0da)', lineHeight: 1, margin: '0 0 1rem' }}>
                04
              </span>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '.4rem' }}>
                {isEn ? 'Purpose & Timeline' : 'Mục đích và thời hạn'}
              </h4>
              <p style={{ fontSize: '.86rem', color: 'var(--c-muted,#5f656d)', textWrap: 'pretty', margin: 0 }}>
                {isEn ? 'Statutory valuation purpose and urgent turnaround constraints.' : 'Mục đích sử dụng kết quả và thời điểm khách hàng cần nhận chứng thư.'}
              </p>
            </div>
          </div>

          {/* Action callout banner */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', padding: '1.6rem 1.8rem', borderRadius: '14px', background: '#fff', border: '1px solid var(--c-border,#e2e0da)', color: 'var(--c-ink,#16181c)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '.25rem' }}>
                {isEn ? 'Receive a Formal Fee Proposal for Your Asset' : 'Nhận báo giá cho tài sản của bạn'}
              </div>
              <div style={{ fontSize: '.88rem', color: 'var(--c-muted,#5f656d)' }}>
                {isEn ? 'Fill in the form above and select "Get Quotation".' : 'Điền thông tin theo mẫu, chọn "Nhận báo giá".'}
              </div>
            </div>
            <button
              type="button"
              onClick={() => scrollToForm('bao-gia')}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.5rem',
                background: 'var(--c-accent,#d94f0a)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '.92rem',
                padding: '.9rem 1.5rem',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all .2s',
              }}
            >
              {isEn ? 'Get Quotation' : 'Nhận báo giá'}{' '}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* 4. VĂN PHÒNG & BẢN ĐỒ (#van-phong) */}
      <section id="van-phong" data-screen-label="Văn phòng" style={{ scrollMarginTop: '80px', background: '#fff', padding: 'clamp(4.5rem,8vw,7.5rem) 0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem,4vw,2.5rem)' }}>
          <div style={{ marginBottom: 'clamp(2.4rem,4vw,3.4rem)' }}>
            <span style={{ display: 'block', fontSize: '.74rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)', marginBottom: '.8rem' }}>
              {isEn ? 'Office Location' : 'Văn phòng'}
            </span>
            <h2 style={{ fontFamily: "'Be Vietnam Pro',sans-serif", fontWeight: 600, fontSize: 'clamp(1.8rem,1.3rem + 1.3vw,2.5rem)', lineHeight: 1.28, letterSpacing: '-.012em', textWrap: 'balance' }}>
              {isEn ? 'Address & Operating Hours' : 'Địa chỉ và giờ làm việc'}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))', border: '1px solid var(--c-border,#e2e0da)', borderRadius: '16px', overflow: 'hidden', background: '#fff' }}>
            {/* Left Details */}
            <div style={{ padding: 'clamp(1.6rem,3vw,2.6rem)', display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
              <div>
                <span style={{ display: 'inline-block', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)', marginBottom: '.5rem' }}>
                  {isEn ? 'Headquarters' : 'Trụ sở chính'}
                </span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0 }}>
                  {isEn ? 'MHD Valuation Co., Ltd.' : 'Công ty TNHH Thẩm định giá MHD'}
                </h3>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ width: '40px', height: '40px', flexShrink: 0, borderRadius: '10px', border: '1px solid var(--c-border,#e2e0da)', background: 'var(--c-icon,#fbf7f3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-accent,#d94f0a)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 21s-7-6.5-7-12a7 7 0 0114 0c0 5.5-7 12-7 12z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                </span>
                <span>
                  <span style={{ display: 'block', fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--c-faint,#8a8f96)' }}>
                    {isEn ? 'Address' : 'Địa chỉ'}
                  </span>
                  <span style={{ display: 'block', fontSize: '.95rem', fontWeight: 600, marginTop: '.15rem', lineHeight: 1.5 }}>
                    {isEn ? 'Ho Chi Minh City, Vietnam' : 'Số 00 Đường ABC, Phường X, TP. Hồ Chí Minh'}
                  </span>
                </span>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ width: '40px', height: '40px', flexShrink: 0, borderRadius: '10px', border: '1px solid var(--c-border,#e2e0da)', background: 'var(--c-icon,#fbf7f3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-accent,#d94f0a)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </span>
                <span>
                  <span style={{ display: 'block', fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--c-faint,#8a8f96)' }}>
                    {isEn ? 'Operating Hours' : 'Giờ làm việc'}
                  </span>
                  <span style={{ display: 'block', fontSize: '.95rem', fontWeight: 600, marginTop: '.15rem', lineHeight: 1.5 }}>
                    {isEn ? 'Monday – Friday: 8:00 – 17:30' : 'Thứ 2 – Thứ 6: 8:00 – 17:30'}<br />
                    {isEn ? 'Saturday: 8:00 – 12:00' : 'Thứ 7: 8:00 – 12:00'}
                  </span>
                </span>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ width: '40px', height: '40px', flexShrink: 0, borderRadius: '10px', border: '1px solid var(--c-border,#e2e0da)', background: 'var(--c-icon,#fbf7f3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-accent,#d94f0a)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8 9.8a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.7.7a2 2 0 011.7 2z" />
                  </svg>
                </span>
                <span>
                  <span style={{ display: 'block', fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--c-faint,#8a8f96)' }}>
                    {isEn ? 'Phone' : 'Điện thoại'}
                  </span>
                  <span style={{ display: 'block', fontSize: '.95rem', fontWeight: 600, marginTop: '.15rem', lineHeight: 1.5 }}>
                    1900 000 000
                  </span>
                </span>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ width: '40px', height: '40px', flexShrink: 0, borderRadius: '10px', border: '1px solid var(--c-border,#e2e0da)', background: 'var(--c-icon,#fbf7f3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-accent,#d94f0a)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                </span>
                <span>
                  <span style={{ display: 'block', fontSize: '.72rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--c-faint,#8a8f96)' }}>
                    Email
                  </span>
                  <span style={{ display: 'block', fontSize: '.95rem', fontWeight: 600, marginTop: '.15rem', lineHeight: 1.5 }}>
                    info@mhd.com.vn
                  </span>
                </span>
              </div>

              <div style={{ display: 'flex', gap: '.7rem', flexWrap: 'wrap', marginTop: '.4rem' }}>
                <a
                  href="https://maps.google.com/?q=TP.+Ho+Chi+Minh"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '.5rem',
                    background: 'var(--c-ink,#16181c)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '.86rem',
                    padding: '.8rem 1.2rem',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    transition: 'all .2s',
                  }}
                >
                  {isEn ? 'Directions' : 'Chỉ đường'}{' '}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a
                  href="tel:1900000000"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '.5rem',
                    border: '1.5px solid var(--c-border,#e2e0da)',
                    color: 'var(--c-ink,#16181c)',
                    fontWeight: 700,
                    fontSize: '.86rem',
                    padding: '.75rem 1.2rem',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    transition: 'all .2s',
                  }}
                >
                  {isEn ? 'Call Hotline' : 'Gọi hotline'}
                </a>
              </div>
            </div>

            {/* Right Map Image */}
            <div style={{ position: 'relative', minHeight: '360px', background: 'var(--c-subtle,#eeece7)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/map-hcm.webp"
                alt="Bản đồ vị trí văn phòng MHD tại TP. Hồ Chí Minh"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(.6)' }}
              />
              <div aria-hidden="true" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-100%)' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: '-6px',
                    width: '56px',
                    height: '56px',
                    marginLeft: '-28px',
                    borderRadius: '50%',
                    background: 'rgba(var(--c-accent-rgb,217,79,10),.25)',
                    animation: 'mhdPulse 2.2s ease-in-out infinite',
                  }}
                />
                <svg width="44" height="54" viewBox="0 0 24 30" style={{ position: 'relative', filter: 'drop-shadow(0 6px 10px rgba(0,0,0,.25))' }}>
                  <path d="M12 29s-10-9.3-10-17A10 10 0 0122 12c0 7.7-10 17-10 17z" fill="#d94f0a" />
                  <circle cx="12" cy="12" r="4" fill="#fff" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CÂU HỎI THƯỜNG GẶP FAQ (#faq) */}
      <section id="faq" data-screen-label="FAQ" style={{ scrollMarginTop: '80px', background: 'var(--c-page,#f6f5f2)', borderTop: '1px solid var(--c-border,#e2e0da)', padding: 'clamp(4.5rem,8vw,7.5rem) 0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem,4vw,2.5rem)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))', gap: 'clamp(2.5rem,5vw,5rem)', alignItems: 'start' }}>
          <div>
            <span style={{ display: 'block', fontSize: '.74rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)', marginBottom: '.8rem' }}>
              FAQ
            </span>
            <h2 style={{ fontFamily: "'Be Vietnam Pro',sans-serif", fontWeight: 600, fontSize: 'clamp(1.8rem,1.3rem + 1.3vw,2.5rem)', lineHeight: 1.28, letterSpacing: '-.012em', textWrap: 'balance' }}>
              {isEn ? 'Frequently Asked Questions' : 'Câu hỏi thường gặp'}
            </h2>
            <p style={{ fontSize: '.95rem', color: 'var(--c-muted,#5f656d)', margin: '1rem 0 2rem', maxWidth: '40ch', textWrap: 'pretty' }}>
              {isEn
                ? 'Common queries regarding valuation dossiers, timelines, fee schedules, and certificate lookups.'
                : 'Các câu hỏi phổ biến về hồ sơ, thời gian, phí và tra cứu chứng thư.'}
            </p>

            <div style={{ padding: '1.5rem', borderRadius: '14px', background: '#fff', border: '1px solid var(--c-border,#e2e0da)', color: 'var(--c-ink,#16181c)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'relative', fontWeight: 700, fontSize: '1.05rem', marginBottom: '.35rem' }}>
                {isEn ? 'Did not find your answer?' : 'Chưa tìm thấy câu trả lời?'}
              </div>
              <div style={{ position: 'relative', fontSize: '.86rem', color: 'var(--c-muted,#5f656d)', marginBottom: '1.1rem' }}>
                {isEn ? 'Speak directly with our valuation specialists.' : 'Trao đổi trực tiếp với đội ngũ MHD.'}
              </div>
              <a
                href="tel:1900000000"
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '.6rem',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  color: 'var(--c-ink,#16181c)',
                  textDecoration: 'none',
                }}
              >
                <span style={{ color: 'var(--c-accent,#d94f0a)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8 9.8a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.7.7a2 2 0 011.7 2z" />
                  </svg>
                </span>
                1900 000 000
              </a>
            </div>
          </div>

          {/* Right Accordion List */}
          <div style={{ borderTop: '1px solid var(--c-border,#e2e0da)' }}>
            {faqItems.map((item, idx) => {
              const isOpen = openFaq === idx

              return (
                <div key={idx} style={{ borderBottom: '1px solid var(--c-border,#e2e0da)' }}>
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
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
                      color: isOpen ? 'var(--c-accent,#d94f0a)' : 'var(--c-ink,#16181c)',
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      transition: 'color .2s',
                    }}
                  >
                    <span>{item.q}</span>
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
                        transform: isOpen ? 'rotate(45deg)' : 'none',
                        transition: 'transform .3s cubic-bezier(.16,1,.3,1)',
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                      transition: 'grid-template-rows .35s cubic-bezier(.16,1,.3,1)',
                    }}
                  >
                    <div style={{ overflow: 'hidden' }}>
                      <p style={{ fontSize: '.92rem', color: 'var(--c-muted,#5f656d)', padding: '0 3rem 1.3rem 0', textWrap: 'pretty', lineHeight: 1.65, margin: 0 }}>
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
