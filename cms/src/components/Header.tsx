'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { cleanNavHref } from '@/lib/cleanUrl'

interface HeaderProps {
  data?: any
  active?: string
  ctaHref?: string
  currentLocale?: string
}

export default function Header({
  data,
  active = '',
  ctaHref = '/contact',
  currentLocale = 'vi',
}: HeaderProps) {
  const [progress, setProgress] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [menuOpen, setMobileMenuOpen] = useState(false)
  const [mega, setMega] = useState<string | null>(null)
  const [lastMega, setLastMega] = useState<string>('about')
  const [vw, setVw] = useState(1400)
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth
      const m = w < 1200
      setIsMobile(m)
      setVw(w)
      if (m) {
        setMega(null)
      }
    }
    onResize()
    window.addEventListener('resize', onResize)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMega(null)
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)

    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const h = document.documentElement
        const y = window.scrollY || h.scrollTop
        const max = h.scrollHeight - h.clientHeight
        const p = max > 0 ? Math.min(100, (y / max) * 100) : 0
        const sc = y > 8
        setProgress(p)
        setScrolled(sc)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll)
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [])

  const ids = ['about', 'services', 'projects', 'insight', 'legal', 'contact']

  // Open mega menu
  const openMega = (k: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setMega(k)
    setLastMega(k)
  }

  // Close immediately
  const closeMega = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    if (mega) setMega(null)
  }

  // DELAY mega menu closing: 400ms for generous and smooth interaction
  const closeMegaSoon = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    closeTimerRef.current = setTimeout(() => {
      setMega(null)
    }, 400)
  }

  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  const toggleMenu = () => setMobileMenuOpen(!menuOpen)
  const closeMenu = () => setMobileMenuOpen(false)

  const isDesktop = !isMobile
  const showVerifyBtn = vw >= 640
  const headerShadow = scrolled ? '0 10px 30px rgba(var(--c-ink-rgb,22,24,28),.08)' : 'none'

  const megaOpacity = mega ? 1 : 0
  const megaPE: 'auto' | 'none' = mega ? 'auto' : 'none'
  const megaHidden = mega ? 'false' : 'true'
  const megaTransform = mega ? 'translateY(0)' : 'translateY(-14px)'
  const megaClip = mega ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)'

  const megaShown: Record<string, boolean> = Object.fromEntries(
    ids.map((k) => [k, (mega || lastMega) === k])
  )
  const navUl: Record<string, string> = Object.fromEntries(
    ids.map((k) => [k, mega === k ? 'scaleX(1)' : 'scaleX(0)'])
  )
  const navRot: Record<string, string> = Object.fromEntries(
    ids.map((k) => [k, mega === k ? 'rotate(180deg)' : 'none'])
  )
  const navColor: Record<string, string> = Object.fromEntries(
    ids.map((k) => [
      k,
      mega === k || (!mega && active === k) ? 'var(--c-ink,#16181c)' : 'var(--c-muted2,#4a5058)',
    ])
  )

  const navItemsList = data?.navItems || []
  const isEn = currentLocale === 'en'

  const getNavItem = (key: string, defaultTitle: string) => {
    const item = navItemsList.find((n: any) => n.menuKey === key)
    return {
      title: item?.title || defaultTitle,
      tagline: item?.tagline,
      subItems: item?.subItems,
      ctaCard: item?.ctaCard,
    }
  }

  const itemAbout = getNavItem('about', isEn ? 'About MHD' : 'Về MHD')
  const itemServices = getNavItem('services', isEn ? 'Services' : 'Dịch vụ')
  const itemProjects = getNavItem('projects', isEn ? 'Projects' : 'Dự án')
  const itemInsight = getNavItem('insight', isEn ? 'Data & Insights' : 'Dữ liệu & Insight')
  const itemLegal = getNavItem('legal', isEn ? 'Legal & Standards' : 'Pháp lý')
  const itemContact = getNavItem('contact', isEn ? 'Contact' : 'Liên hệ')

  const defaultAboutSubs = isEn
    ? [
      { title: 'About MHD', description: 'Operations, vision, and professional standards', href: '/about' },
      { title: 'Credentials & Profile', description: 'Legal standing, personnel, and credentials', href: '/about/phap-ly' },
      { title: 'Partners & Clients', description: 'Commercial banks, corporations, and institutions', href: '/about/doi-tac' },
      { title: 'Careers', description: 'Career opportunities at MHD Valuation', href: '/tuyen-dung' },
    ]
    : [
      { title: 'Giới thiệu MHD', description: 'Quá trình hoạt động, định hướng và nguyên tắc nghề nghiệp', href: '/about' },
      { title: 'Hồ sơ năng lực', description: 'Pháp lý, nhân sự và kinh nghiệm thực hiện', href: '/about/phap-ly' },
      { title: 'Đối tác & khách hàng', description: 'Ngân hàng, doanh nghiệp và cơ quan nhà nước', href: '/about/doi-tac' },
      { title: 'Tuyển dụng', description: 'Vị trí đang tuyển tại MHD', href: '/tuyen-dung' },
    ]

  const defaultServicesSubs = isEn
    ? [
      { title: 'Enterprise Valuation', description: 'M&A, equitization, and strategic restructuring', href: '/services/Dich-vu-Doanh-nghiep' },
      { title: 'Real Estate Valuation', description: 'Land, houses, and industrial property', href: '/services/Dich-vu-Bat-dong-san' },
      { title: 'Plant & Equipment', description: 'Machinery, production lines, and vehicles', href: '/services/Dich-vu-May-thiet-bi' },
      { title: 'Brands & Intangibles', description: 'Trademarks, patents, and intellectual property', href: '/services/Dich-vu-Thuong-hieu' },
      { title: 'Investment Projects', description: 'Financial feasibility and efficacy analysis', href: '/services/Dich-vu-Du-an-dau-tu' },
      { title: 'Financial Proof', description: 'Valuation for study abroad and settlement dossiers', href: '/services/Dich-vu-Chung-minh-tai-chinh' },
    ]
    : [
      { title: 'Thẩm định giá trị DN', description: 'M&A, cổ phần hoá, tái cấu trúc vốn', href: '/services/Dich-vu-Doanh-nghiep' },
      { title: 'Thẩm định giá bất động sản', description: 'Đất, nhà và công trình', href: '/services/Dich-vu-Bat-dong-san' },
      { title: 'Động sản & máy thiết bị', description: 'Dây chuyền, máy móc và phương tiện', href: '/services/Dich-vu-May-thiet-bi' },
      { title: 'Thương hiệu & tài sản vô hình', description: 'Thương hiệu, sáng chế và quyền sở hữu trí tuệ', href: '/services/Dich-vu-Thuong-hieu' },
      { title: 'Thẩm định dự án đầu tư', description: 'Phân tích hiệu quả và tính khả thi tài chính', href: '/services/Dich-vu-Du-an-dau-tu' },
      { title: 'Chứng minh tài chính', description: 'Thẩm định giá tài sản phục vụ hồ sơ du học, định cư', href: '/services/Dich-vu-Chung-minh-tai-chinh' },
    ]

  const defaultProjectsSubs = isEn
    ? [
      { title: 'Featured Engagements', description: 'Publicly disclosable credentials', href: '/projects' },
      { title: 'Enterprise', description: 'Corporate enterprise and equity valuation', href: '/projects/doanh-nghiep' },
      { title: 'Real Estate', description: 'Townships, commercial, and complex assets', href: '/projects/bat-dong-san' },
      { title: 'Machinery & Equipment', description: 'Production lines, vehicles, and plant assets', href: '/projects/may-thiet-bi' },
      { title: 'Intangible Assets', description: 'Trademarks, IP, and proprietary rights', href: '/projects/tai-san-vo-hinh' },
    ]
    : [
      { title: 'Dự án tiêu biểu', description: 'Các hồ sơ được phép công bố', href: '/projects' },
      { title: 'Doanh nghiệp', description: 'Thẩm định giá doanh nghiệp và phần vốn', href: '/projects/doanh-nghiep' },
      { title: 'Bất động sản', description: 'Dự án, khu đô thị và công trình', href: '/projects/bat-dong-san' },
      { title: 'Máy móc thiết bị', description: 'Dây chuyền sản xuất và phương tiện', href: '/projects/may-thiet-bi' },
      { title: 'Tài sản vô hình', description: 'Thương hiệu và quyền sở hữu trí tuệ', href: '/projects/tai-san-vo-hinh' },
    ]

  const defaultInsightSubs = isEn
    ? [
      { title: 'Market News', description: 'Regional price movements and trends', href: '/insights?category=thi-truong' },
      { title: 'Knowledge', description: 'Valuation methodologies and standards', href: '/insights?category=kien-thuc' },
      { title: 'Policies', description: 'Newly enacted legal documents and decrees', href: '/insights?category=chinh-sach' },
      { title: 'Case Study', description: 'Anonymized case studies and analyses', href: '/insights?category=case-study' },
      { title: 'Reports', description: 'Periodic comprehensive market reports', href: '/insights?category=bao-cao' },
    ]
    : [
      { title: 'Tin thị trường', description: 'Diễn biến giá theo khu vực', href: '/insights?category=thi-truong' },
      { title: 'Kiến thức', description: 'Phương pháp và nghiệp vụ thẩm định giá', href: '/insights?category=kien-thuc' },
      { title: 'Chính sách', description: 'Văn bản pháp luật mới ban hành', href: '/insights?category=chinh-sach' },
      { title: 'Case study', description: 'Phân tích hồ sơ đã ẩn thông tin bảo mật', href: '/insights?category=case-study' },
      { title: 'Báo cáo', description: 'Báo cáo thị trường định kỳ', href: '/insights?category=bao-cao' },
    ]

  const defaultLegalSubs = isEn
    ? [
      { title: 'Legal Dossier & Valuers', description: 'Operating license and registered practicing valuer list', href: '/about/phap-ly' },
      { title: 'Procedures & Standards', description: 'Vietnam valuation standards under Circular 30, 31 & 36/2024', href: '/phap-ly/quy-trinh' },
      { title: 'Certificate Verification', description: 'Verify certificate parameters via QR code or serial number', href: '/phap-ly/tra-cuu' },
      { title: 'Policies', description: 'Confidentiality, independence, and conflict of interest control', href: '/phap-ly/chinh-sach' },
    ]
    : [
      { title: 'Hồ sơ pháp lý & thẩm định viên', description: 'Giấy chứng nhận và danh sách thẩm định viên về giá', href: '/about/phap-ly' },
      { title: 'Quy trình & tiêu chuẩn', description: 'Chuẩn mực thẩm định giá Việt Nam theo Thông tư 30, 31 và 36/2024', href: '/phap-ly/quy-trinh' },
      { title: 'Kiểm tra chứng thư', description: 'Đối chiếu thông tin bằng mã QR hoặc số chứng thư', href: '/phap-ly/tra-cuu' },
      { title: 'Chính sách', description: 'Bảo mật, độc lập và kiểm soát xung đột lợi ích', href: '/phap-ly/chinh-sach' },
    ]

  const defaultContactSubs = isEn
    ? [
      { title: 'Valuation Request', description: 'Submit information for assets requiring valuation', href: '/contact#yeu-cau' },
      { title: 'Quotations', description: 'Receive quotation based on engagement scope', href: '/contact#bao-gia' },
      { title: 'Office Network', description: 'Address and working hours', href: '/contact#van-phong' },
      { title: 'FAQ', description: 'Frequently asked questions', href: '/contact#faq' },
    ]
    : [
      { title: 'Yêu cầu thẩm định', description: 'Gửi thông tin tài sản cần thẩm định', href: '/contact#yeu-cau' },
      { title: 'Báo giá', description: 'Nhận báo giá theo phạm vi công việc', href: '/contact#bao-gia' },
      { title: 'Văn phòng', description: 'Địa chỉ và giờ làm việc', href: '/contact#van-phong' },
      { title: 'FAQ', description: 'Câu hỏi thường gặp', href: '/contact#faq' },
    ]

  const sanitizeSubs = (list: any[]) =>
    list.map((s) => ({
      ...s,
      href: cleanNavHref(s.href),
    }))

  // Always enforce the exact canonical structure from the design screenshots
  const aboutSubs = sanitizeSubs(defaultAboutSubs)
  const servicesSubs = sanitizeSubs(defaultServicesSubs)
  const projectsSubs = sanitizeSubs(defaultProjectsSubs)
  const insightSubs = sanitizeSubs(defaultInsightSubs)
  const legalSubs = sanitizeSubs(defaultLegalSubs)
  const contactSubs = sanitizeSubs(defaultContactSubs)

  const verifyBtnLabel = data?.verifyButton?.label || data?.verifyCertBtn?.label || (isEn ? 'Verify Certificate' : 'Tra cứu chứng thư')
  const verifyBtnUrl = cleanNavHref(data?.verifyButton?.href || data?.verifyCertBtn?.url || '/phap-ly/tra-cuu')
  const requestBtnLabel = data?.requestButton?.label || data?.contactCta?.label || (isEn ? 'Request Valuation' : 'Yêu cầu thẩm định')
  const requestBtnUrl = cleanNavHref(data?.requestButton?.href || data?.contactCta?.url || '/contact')

  return (
    <>
      {/* Top scroll progress indicator */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '2px',
          background: 'var(--c-accent,#d94f0a)',
          zIndex: 300,
          width: `${progress.toFixed(1)}%`,
          transition: 'width .1s linear',
        }}
      />

      <header
        onMouseLeave={closeMegaSoon}
        onMouseEnter={cancelClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          boxShadow: headerShadow,
          transition: 'box-shadow .3s ease',
          background: 'rgba(255,255,255,.94)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--c-border2,#e6e3dc)',
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            padding: '0 clamp(1rem,4vw,2.5rem)',
            minHeight: '72px',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="MHD trang chủ"
            onMouseEnter={closeMegaSoon}
            style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
          >
            <img src="/assets/logomhd.png" alt="MHD Valuation" style={{ height: '42px', width: 'auto' }} />
          </Link>

          {/* Desktop Navigation */}
          {isDesktop && (
            <nav
              aria-label="Điều hướng chính"
              style={{ display: 'flex', gap: '1.6rem', alignSelf: 'stretch', alignItems: 'center' }}
            >
              <button
                type="button"
                onMouseEnter={() => openMega('about')}
                onFocus={() => openMega('about')}
                onClick={() => openMega('about')}
                aria-haspopup="true"
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '.3rem',
                  padding: '1.55rem 0',
                  fontSize: '.88rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  color: navColor['about'],
                  transition: 'color .18s',
                }}
              >
                {itemAbout.title}{' '}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  style={{ transition: 'transform .2s', transform: navRot['about'] }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: '-1px',
                    height: '2px',
                    background: 'var(--c-accent,#d94f0a)',
                    transformOrigin: 'left',
                    transition: 'transform .3s cubic-bezier(.16,1,.3,1)',
                    transform: navUl['about'],
                  }}
                />
              </button>

              <button
                type="button"
                onMouseEnter={() => openMega('services')}
                onFocus={() => openMega('services')}
                onClick={() => openMega('services')}
                aria-haspopup="true"
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '.3rem',
                  padding: '1.55rem 0',
                  fontSize: '.88rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  color: navColor['services'],
                  transition: 'color .18s',
                }}
              >
                {itemServices.title}{' '}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  style={{ transition: 'transform .2s', transform: navRot['services'] }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: '-1px',
                    height: '2px',
                    background: 'var(--c-accent,#d94f0a)',
                    transformOrigin: 'left',
                    transition: 'transform .3s cubic-bezier(.16,1,.3,1)',
                    transform: navUl['services'],
                  }}
                />
              </button>

              <button
                type="button"
                onMouseEnter={() => openMega('projects')}
                onFocus={() => openMega('projects')}
                onClick={() => openMega('projects')}
                aria-haspopup="true"
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '.3rem',
                  padding: '1.55rem 0',
                  fontSize: '.88rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  color: navColor['projects'],
                  transition: 'color .18s',
                }}
              >
                {itemProjects.title}{' '}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  style={{ transition: 'transform .2s', transform: navRot['projects'] }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: '-1px',
                    height: '2px',
                    background: 'var(--c-accent,#d94f0a)',
                    transformOrigin: 'left',
                    transition: 'transform .3s cubic-bezier(.16,1,.3,1)',
                    transform: navUl['projects'],
                  }}
                />
              </button>

              <button
                type="button"
                onMouseEnter={() => openMega('insight')}
                onFocus={() => openMega('insight')}
                onClick={() => openMega('insight')}
                aria-haspopup="true"
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '.3rem',
                  padding: '1.55rem 0',
                  fontSize: '.88rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  color: navColor['insight'],
                  transition: 'color .18s',
                }}
              >
                {itemInsight.title}{' '}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  style={{ transition: 'transform .2s', transform: navRot['insight'] }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: '-1px',
                    height: '2px',
                    background: 'var(--c-accent,#d94f0a)',
                    transformOrigin: 'left',
                    transition: 'transform .3s cubic-bezier(.16,1,.3,1)',
                    transform: navUl['insight'],
                  }}
                />
              </button>

              <button
                type="button"
                onMouseEnter={() => openMega('legal')}
                onFocus={() => openMega('legal')}
                onClick={() => openMega('legal')}
                aria-haspopup="true"
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '.3rem',
                  padding: '1.55rem 0',
                  fontSize: '.88rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  color: navColor['legal'],
                  transition: 'color .18s',
                }}
              >
                {itemLegal.title}{' '}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  style={{ transition: 'transform .2s', transform: navRot['legal'] }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: '-1px',
                    height: '2px',
                    background: 'var(--c-accent,#d94f0a)',
                    transformOrigin: 'left',
                    transition: 'transform .3s cubic-bezier(.16,1,.3,1)',
                    transform: navUl['legal'],
                  }}
                />
              </button>

              <button
                type="button"
                onMouseEnter={() => openMega('contact')}
                onFocus={() => openMega('contact')}
                onClick={() => openMega('contact')}
                aria-haspopup="true"
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '.3rem',
                  padding: '1.55rem 0',
                  fontSize: '.88rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  color: navColor['contact'],
                  transition: 'color .18s',
                }}
              >
                {itemContact.title}{' '}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  style={{ transition: 'transform .2s', transform: navRot['contact'] }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: '-1px',
                    height: '2px',
                    background: 'var(--c-accent,#d94f0a)',
                    transformOrigin: 'left',
                    transition: 'transform .3s cubic-bezier(.16,1,.3,1)',
                    transform: navUl['contact'],
                  }}
                />
              </button>
            </nav>
          )}

          {/* Right Action Buttons */}
          <div onMouseEnter={closeMegaSoon} style={{ display: 'flex', alignItems: 'center', gap: '.6rem', flexShrink: 0 }}>
            {showVerifyBtn && (
              <Link
                href={verifyBtnUrl}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '.5rem',
                  border: '1.5px solid var(--c-border3,#d9d6cf)',
                  color: 'var(--c-ink,#16181c)',
                  fontSize: '.84rem',
                  fontWeight: 700,
                  padding: '.6rem 1rem',
                  borderRadius: '6px',
                  whiteSpace: 'nowrap',
                  transition: 'all .2s cubic-bezier(.16,1,.3,1)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2M7 12h10" />
                </svg>
                {verifyBtnLabel}
              </Link>
            )}

            {/* Language Switcher [VI | EN] */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.35rem',
                fontSize: '.82rem',
                padding: '.45rem .65rem',
                borderRadius: '6px',
                border: '1px solid var(--c-border3,#d9d6cf)',
                background: '#fff',
              }}
            >
              <button
                type="button"
                onClick={() => {
                  document.cookie = 'mhd_locale=vi; path=/; max-age=31536000'
                  if (typeof window !== 'undefined') {
                    const url = new URL(window.location.href)
                    url.searchParams.set('locale', 'vi')
                    window.location.href = url.pathname + url.search
                  }
                }}
                style={{
                  fontWeight: currentLocale === 'vi' ? 700 : 400,
                  color: currentLocale === 'vi' ? 'var(--c-accent,#d94f0a)' : 'var(--c-muted,#5f656d)',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                VI
              </button>
              <span style={{ color: 'var(--c-border3,#d9d6cf)' }}>|</span>
              <button
                type="button"
                onClick={() => {
                  document.cookie = 'mhd_locale=en; path=/; max-age=31536000'
                  if (typeof window !== 'undefined') {
                    const url = new URL(window.location.href)
                    url.searchParams.set('locale', 'en')
                    window.location.href = url.pathname + url.search
                  }
                }}
                style={{
                  fontWeight: currentLocale === 'en' ? 700 : 400,
                  color: currentLocale === 'en' ? 'var(--c-accent,#d94f0a)' : 'var(--c-muted,#5f656d)',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                EN
              </button>
            </div>

            <Link
              href={requestBtnUrl}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.5rem',
                background: 'var(--c-ink,#16181c)',
                color: '#fff',
                fontSize: '.84rem',
                fontWeight: 700,
                padding: '.68rem 1.15rem',
                border: '1.5px solid var(--c-ink,#16181c)',
                borderRadius: '6px',
                whiteSpace: 'nowrap',
                transition: 'all .2s cubic-bezier(.16,1,.3,1)',
              }}
            >
              {requestBtnLabel}
            </Link>

            {isMobile && (
              <button
                type="button"
                onClick={toggleMenu}
                aria-label="Mở menu"
                style={{
                  width: '40px',
                  height: '40px',
                  border: '1px solid var(--c-border3,#d9d6cf)',
                  borderRadius: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                }}
              >
                <span style={{ display: 'block', width: '16px', height: '2px', background: 'var(--c-ink,#16181c)' }} />
                <span style={{ display: 'block', width: '16px', height: '2px', background: 'var(--c-ink,#16181c)' }} />
                <span style={{ display: 'block', width: '16px', height: '2px', background: 'var(--c-ink,#16181c)' }} />
              </button>
            )}
          </div>
        </div>

        {/* Desktop Mega Menus */}
        {isDesktop && (
          <>
            {/* Backdrop blur overlay */}
            <div
              onClick={closeMega}
              onMouseEnter={closeMegaSoon}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                height: '100vh',
                background: 'rgba(var(--c-hero-rgb,20,22,26),.42)',
                backdropFilter: 'blur(3px)',
                WebkitBackdropFilter: 'blur(3px)',
                opacity: megaOpacity,
                pointerEvents: megaPE,
                transition: 'opacity .45s cubic-bezier(.16,1,.3,1)',
              }}
            />

            {/* Mega Menu Panel */}
            <div
              aria-hidden={megaHidden}
              onMouseEnter={cancelClose}
              onMouseLeave={closeMegaSoon}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                overflow: 'hidden',
                background: '#fff',
                borderTop: '1px solid rgba(var(--c-ink-rgb,22,24,28),.08)',
                boxShadow: '0 40px 80px rgba(var(--c-ink-rgb,22,24,28),.18)',
                opacity: megaOpacity,
                pointerEvents: megaPE,
                transform: megaTransform,
                clipPath: megaClip,
                transition: 'clip-path .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1), opacity .35s ease',
              }}
            >
              {/* Decorative backgrounds */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  backgroundImage:
                    'linear-gradient(rgba(var(--c-ink-rgb,22,24,28),.05) 1px,transparent 1px),linear-gradient(90deg,rgba(var(--c-ink-rgb,22,24,28),.05) 1px,transparent 1px)',
                  backgroundSize: '36px 36px',
                  maskImage: 'linear-gradient(100deg,transparent 0%,#000 45%,#000 70%,transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(100deg,transparent 0%,#000 45%,#000 70%,transparent 100%)',
                }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  backgroundImage: 'radial-gradient(rgba(var(--c-accent-rgb,217,79,10),.28) 1.2px,transparent 1.4px)',
                  backgroundSize: '36px 36px',
                  backgroundPosition: '18px 18px',
                  maskImage: 'radial-gradient(ellipse at 85% 20%,#000 0%,transparent 55%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at 85% 20%,#000 0%,transparent 55%)',
                }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  right: '-120px',
                  top: '-160px',
                  width: '520px',
                  height: '520px',
                  borderRadius: '50%',
                  pointerEvents: 'none',
                  background: 'radial-gradient(circle,rgba(var(--c-accent-rgb,217,79,10),.14),transparent 65%)',
                }}
              />
              <svg
                aria-hidden="true"
                viewBox="0 0 200 200"
                fill="none"
                style={{
                  position: 'absolute',
                  left: '-40px',
                  bottom: '-60px',
                  width: '260px',
                  height: '260px',
                  pointerEvents: 'none',
                  opacity: 0.5,
                }}
              >
                <g style={{ transformOrigin: '100px 100px', animation: 'mhdSpin 60s linear infinite' }}>
                  <polygon
                    points="100,20 169,60 169,140 100,180 31,140 31,60"
                    stroke="rgba(217,79,10,.35)"
                    strokeWidth=".8"
                  />
                  <polygon
                    points="100,50 143,75 143,125 100,150 57,125 57,75"
                    stroke="rgba(22,24,28,.15)"
                    strokeWidth=".8"
                  />
                </g>
              </svg>

              {/* 1. MEGA MENU: VỀ MHD */}
              {megaShown['about'] && (
                <div
                  style={{
                    position: 'relative',
                    maxWidth: '1240px',
                    margin: '0 auto',
                    padding: '2.2rem clamp(1rem,4vw,2.5rem)',
                    display: 'grid',
                    gridTemplateColumns: '230px minmax(0,1fr) 320px',
                    gap: '2.5rem',
                  }}
                >
                  <div
                    style={{
                      paddingRight: '1.5rem',
                      borderRight: '1px solid rgba(var(--c-ink-rgb,22,24,28),.1)',
                      animation: 'mhdMenuIn .5s cubic-bezier(.16,1,.3,1) both',
                    }}
                  >
                    <span
                      style={{
                        display: 'block',
                        fontSize: '.7rem',
                        fontWeight: 700,
                        letterSpacing: '.1em',
                        textTransform: 'uppercase',
                        color: 'var(--c-accent,#d94f0a)',
                        marginBottom: '.7rem',
                      }}
                    >
                      {itemAbout.title}
                    </span>
                    <p
                      style={{
                        fontFamily: "'Be Vietnam Pro',sans-serif",
                        fontSize: '1.45rem',
                        lineHeight: 1.22,
                        color: 'var(--c-ink,#16181c)',
                        textWrap: 'balance',
                      }}
                    >
                      {itemAbout.tagline || (isEn ? 'Valuation enterprise providing transparent information on legal standing, personnel, and credentials.' : 'Doanh nghiệp thẩm định giá cung cấp thông tin rõ ràng về pháp lý, nhân sự và kinh nghiệm.')}
                    </p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: '.3rem .8rem', alignContent: 'start' }}>
                    {aboutSubs.map((sub: any, sIdx: number) => (
                      <Link
                        key={sIdx}
                        href={sub.href}
                        onClick={closeMega}
                        className="mhd-mega-sublink"
                        style={{
                          display: 'block',
                          padding: '.85rem 1rem',
                          borderRadius: '8px',
                          color: 'var(--c-ink,#16181c)',
                          border: '1px solid transparent',
                          transition: 'background .18s, border-color .18s',
                          animation: `mhdMenuIn .5s cubic-bezier(.16,1,.3,1) ${(0.06 + sIdx * 0.04).toFixed(2)}s both`,
                        }}
                      >
                        <span style={{ display: 'block', fontWeight: 700, fontSize: '.9rem', lineHeight: 1.35, textWrap: 'balance' }}>
                          {sub.title}
                        </span>
                        {sub.description && (
                          <span style={{ display: 'block', fontSize: '.78rem', color: 'var(--c-muted3,#6b7178)', lineHeight: 1.45, marginTop: '.2rem' }}>
                            {sub.description}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                  <div
                    style={{
                      animation: 'mhdMenuSide .6s cubic-bezier(.16,1,.3,1) .12s both',
                      background: 'var(--c-ink,#16181c)',
                      color: '#fff',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        right: '-50px',
                        top: '-50px',
                        width: '160px',
                        height: '160px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle,rgba(var(--c-accent-rgb,217,79,10),.4),transparent 70%)',
                        pointerEvents: 'none',
                      }}
                    />
                    <span
                      style={{
                        position: 'relative',
                        display: 'block',
                        fontSize: '.68rem',
                        fontWeight: 700,
                        letterSpacing: '.08em',
                        textTransform: 'uppercase',
                        color: 'var(--c-accent-dark,#f0956a)',
                        marginBottom: '.6rem',
                      }}
                    >
                      {itemAbout.ctaCard?.tag || (isEn ? 'Credentials 2026' : 'Hồ sơ năng lực 2026')}
                    </span>
                    <h4 style={{ position: 'relative', fontFamily: "'Be Vietnam Pro',sans-serif", fontWeight: 600, fontSize: '1.3rem', lineHeight: 1.2, marginBottom: '.5rem', color: '#fff' }}>
                      {itemAbout.ctaCard?.title || (isEn ? 'Documents for partner verification' : 'Tài liệu phục vụ thẩm tra đối tác')}
                    </h4>
                    <p style={{ position: 'relative', fontSize: '.82rem', color: 'var(--c-ondark-muted,#b9bcc3)', marginBottom: '1.2rem', textWrap: 'pretty' }}>
                      {itemAbout.ctaCard?.description || (isEn ? 'Legal standing, certified appraisers, and authorized public credentials.' : 'Thông tin pháp lý, thẩm định viên về giá và hồ sơ tiêu biểu được phép công bố.')}
                    </p>
                    <div style={{ position: 'relative' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '.8rem' }}>
                        <Link href={cleanNavHref(itemAbout.ctaCard?.buttonHref || '/about#phap-ly')}
                          data-cta-dark="1"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '.5rem',
                            background: 'var(--c-accent,#d94f0a)',
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: '.86rem',
                            padding: '.8rem 1.2rem',
                            borderRadius: '6px',
                            transition: 'all .2s cubic-bezier(.16,1,.3,1)',
                          }}
                        >
                          {itemAbout.ctaCard?.buttonLabel ? itemAbout.ctaCard.buttonLabel.replace('→', '').trim() : (isEn ? 'Download profile' : 'Tải hồ sơ')}{' '}
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        </Link>
                        <a
                          href="/about"
                          style={{
                            fontSize: '.84rem',
                            fontWeight: 700,
                            color: 'var(--c-accent-dark,#f0956a)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '.4rem',
                            transition: 'color .2s',
                          }}
                        >
                          {isEn ? 'Learn about MHD' : 'Tìm hiểu MHD'}{' '}
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. MEGA MENU: DỊCH VỤ */}
              {megaShown['services'] && (
                <div
                  style={{
                    position: 'relative',
                    maxWidth: '1240px',
                    margin: '0 auto',
                    padding: '2.2rem clamp(1rem,4vw,2.5rem)',
                    display: 'grid',
                    gridTemplateColumns: '230px minmax(0,1fr) 320px',
                    gap: '2.5rem',
                  }}
                >
                  <div style={{ paddingRight: '1.5rem', borderRight: '1px solid rgba(var(--c-ink-rgb,22,24,28),.1)', animation: 'mhdMenuIn .5s cubic-bezier(.16,1,.3,1) both' }}>
                    <span style={{ display: 'block', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)', marginBottom: '.7rem' }}>
                      {itemServices.title}
                    </span>
                    <p style={{ fontFamily: "'Be Vietnam Pro',sans-serif", fontSize: '1.45rem', lineHeight: 1.22, color: 'var(--c-ink,#16181c)', textWrap: 'balance' }}>
                      {itemServices.tagline || (isEn ? 'Valuation solutions by asset class and intended use of valuation report.' : 'Dịch vụ thẩm định giá theo loại tài sản và mục đích sử dụng kết quả.')}
                    </p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: '.3rem .8rem', alignContent: 'start' }}>
                    {servicesSubs.map((sub: any, sIdx: number) => (
                      <Link
                        key={sIdx}
                        href={sub.href}
                        onClick={closeMega}
                        className="mhd-mega-sublink"
                        style={{
                          display: 'block',
                          padding: '.85rem 1rem',
                          borderRadius: '8px',
                          color: 'var(--c-ink,#16181c)',
                          border: '1px solid transparent',
                          transition: 'background .18s, border-color .18s',
                          animation: `mhdMenuIn .5s cubic-bezier(.16,1,.3,1) ${(0.06 + sIdx * 0.04).toFixed(2)}s both`,
                        }}
                      >
                        <span style={{ display: 'block', fontWeight: 700, fontSize: '.9rem', lineHeight: 1.35, textWrap: 'balance' }}>{sub.title}</span>
                        {sub.description && (
                          <span style={{ display: 'block', fontSize: '.78rem', color: 'var(--c-muted3,#6b7178)', lineHeight: 1.45, marginTop: '.2rem' }}>{sub.description}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                  <div style={{ animation: 'mhdMenuSide .6s cubic-bezier(.16,1,.3,1) .12s both', background: 'var(--c-ink,#16181c)', color: '#fff', borderRadius: '12px', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', right: '-50px', top: '-50px', width: '160px', height: '160px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(var(--c-accent-rgb,217,79,10),.4),transparent 70%)', pointerEvents: 'none' }} />
                    <span style={{ position: 'relative', display: 'block', fontSize: '.68rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--c-accent-dark,#f0956a)', marginBottom: '.6rem' }}>
                      {itemServices.ctaCard?.tag || (isEn ? 'INITIAL CONSULTATION' : 'TRAO ĐỔI BAN ĐẦU')}
                    </span>
                    <h4 style={{ position: 'relative', fontFamily: "'Be Vietnam Pro',sans-serif", fontWeight: 600, fontSize: '1.3rem', lineHeight: 1.2, marginBottom: '.5rem', color: '#fff' }}>
                      {itemServices.ctaCard?.title || (isEn ? 'Get Valuation Quotation' : 'Nhận báo giá thẩm định')}
                    </h4>
                    <p style={{ position: 'relative', fontSize: '.82rem', color: 'var(--c-ondark-muted,#b9bcc3)', marginBottom: '1.2rem', textWrap: 'pretty' }}>
                      {itemServices.ctaCard?.description || (isEn ? 'Submit asset information. MHD confirms engagement requirements within 24 working hours.' : 'Gửi thông tin tài sản. MHD xác nhận yêu cầu trong 24 giờ làm việc.')}
                    </p>
                    <div style={{ position: 'relative' }}>
                      <Link href={cleanNavHref(itemServices.ctaCard?.buttonHref || '/contact#yeu-cau')} data-cta-dark="1" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem', background: 'var(--c-accent,#d94f0a)', color: '#fff', fontWeight: 700, fontSize: '.86rem', padding: '.8rem 1.2rem', borderRadius: '6px', transition: 'all .2s cubic-bezier(.16,1,.3,1)' }}>
                        {itemServices.ctaCard?.buttonLabel ? itemServices.ctaCard.buttonLabel.replace('→', '').trim() : (isEn ? 'Get quotation' : 'Nhận báo giá')} <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. MEGA MENU: DỰ ÁN */}
              {megaShown['projects'] && (
                <div style={{ position: 'relative', maxWidth: '1240px', margin: '0 auto', padding: '2.2rem clamp(1rem,4vw,2.5rem)', display: 'grid', gridTemplateColumns: '230px minmax(0,1fr) 320px', gap: '2.5rem' }}>
                  <div style={{ paddingRight: '1.5rem', borderRight: '1px solid rgba(var(--c-ink-rgb,22,24,28),.1)', animation: 'mhdMenuIn .5s cubic-bezier(.16,1,.3,1) both' }}>
                    <span style={{ display: 'block', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)', marginBottom: '.7rem' }}>
                      {itemProjects.title}
                    </span>
                    <p style={{ fontFamily: "'Be Vietnam Pro',sans-serif", fontSize: '1.45rem', lineHeight: 1.22, color: 'var(--c-ink,#16181c)', textWrap: 'balance' }}>
                      {itemProjects.tagline || (isEn ? 'Representative valuation projects categorized by asset class.' : 'Hồ sơ tiêu biểu được sắp xếp theo từng nhóm tài sản.')}
                    </p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: '.3rem .8rem', alignContent: 'start' }}>
                    {projectsSubs.map((sub: any, sIdx: number) => (
                      <Link
                        key={sIdx}
                        href={sub.href}
                        onClick={closeMega}
                        className="mhd-mega-sublink"
                        style={{
                          display: 'block',
                          padding: '.85rem 1rem',
                          borderRadius: '8px',
                          color: 'var(--c-ink,#16181c)',
                          border: '1px solid transparent',
                          transition: 'background .18s, border-color .18s',
                          animation: `mhdMenuIn .5s cubic-bezier(.16,1,.3,1) ${(0.06 + sIdx * 0.04).toFixed(2)}s both`,
                        }}
                      >
                        <span style={{ display: 'block', fontWeight: 700, fontSize: '.9rem', lineHeight: 1.35, textWrap: 'balance' }}>{sub.title}</span>
                        {sub.description && (
                          <span style={{ display: 'block', fontSize: '.78rem', color: 'var(--c-muted3,#6b7178)', lineHeight: 1.45, marginTop: '.2rem' }}>{sub.description}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                  <div style={{ animation: 'mhdMenuSide .6s cubic-bezier(.16,1,.3,1) .12s both', display: 'flex', flexDirection: 'column', gap: '.9rem' }}>
                    <Link href={cleanNavHref(itemProjects.ctaCard?.buttonHref || '/projects')}
                      style={{
                        display: 'block',
                        background: '#fff',
                        border: '1px solid var(--c-border,#e2e0da)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        color: 'var(--c-ink,#16181c)',
                        transition: 'all .2s',
                      }}
                    >
                      <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: 'var(--c-subtle,#eeece7)' }}>
                        <img
                          src={itemProjects.ctaCard?.image?.url || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'}
                          alt={itemProjects.ctaCard?.title || (isEn ? 'Featured Case Study' : 'Hồ sơ chuyên đề')}
                          loading="lazy"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div style={{ padding: '1rem 1.1rem 1.1rem' }}>
                        <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)' }}>
                          {itemProjects.ctaCard?.tag || (isEn ? 'CASE STUDY' : 'HỒ SƠ CHUYÊN ĐỀ')}
                        </span>
                        <div style={{ fontWeight: 700, fontSize: '.95rem', lineHeight: 1.35, margin: '.35rem 0 .35rem', textWrap: 'balance' }}>
                          {itemProjects.ctaCard?.title || (isEn ? 'Enterprise Valuation for Capital Restructuring' : 'Thẩm định giá doanh nghiệp phục vụ tái cấu trúc vốn')}
                        </div>
                        <div style={{ fontSize: '.76rem', color: 'var(--c-faint,#8a8f96)' }}>
                          {itemProjects.ctaCard?.subtitle || (isEn ? 'Corporate · Case Study' : 'Doanh nghiệp · Hồ sơ chuyên đề')}
                        </div>
                      </div>
                    </Link>
                    <Link href={cleanNavHref(itemProjects.ctaCard?.buttonHref || '/projects')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '.5rem',
                        border: '1.5px solid var(--c-ink,#16181c)',
                        background: '#fff',
                        color: 'var(--c-ink,#16181c)',
                        fontWeight: 700,
                        fontSize: '.86rem',
                        padding: '.75rem 1.1rem',
                        borderRadius: '6px',
                        transition: 'all .2s',
                      }}
                    >
                      {itemProjects.ctaCard?.buttonLabel ? itemProjects.ctaCard.buttonLabel.replace('→', '').trim() : (isEn ? 'View projects' : 'Xem dự án')}{' '}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              )}

              {/* 4. MEGA MENU: DỮ LIỆU & INSIGHT */}
              {megaShown['insight'] && (
                <div style={{ position: 'relative', maxWidth: '1240px', margin: '0 auto', padding: '2.2rem clamp(1rem,4vw,2.5rem)', display: 'grid', gridTemplateColumns: '230px minmax(0,1fr) 320px', gap: '2.5rem' }}>
                  <div style={{ paddingRight: '1.5rem', borderRight: '1px solid rgba(var(--c-ink-rgb,22,24,28),.1)', animation: 'mhdMenuIn .5s cubic-bezier(.16,1,.3,1) both' }}>
                    <span style={{ display: 'block', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)', marginBottom: '.7rem' }}>
                      {itemInsight.title}
                    </span>
                    <p style={{ fontFamily: "'Be Vietnam Pro',sans-serif", fontSize: '1.45rem', lineHeight: 1.22, color: 'var(--c-ink,#16181c)', textWrap: 'balance' }}>
                      {itemInsight.tagline || (isEn ? 'Market updates, methodologies, and legal regulations in valuation.' : 'Thông tin thị trường, nghiệp vụ và quy định liên quan đến thẩm định giá.')}
                    </p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: '.3rem .8rem', alignContent: 'start' }}>
                    {insightSubs.map((sub: any, sIdx: number) => (
                      <Link
                        key={sIdx}
                        href={sub.href}
                        onClick={closeMega}
                        className="mhd-mega-sublink"
                        style={{
                          display: 'block',
                          padding: '.85rem 1rem',
                          borderRadius: '8px',
                          color: 'var(--c-ink,#16181c)',
                          border: '1px solid transparent',
                          transition: 'background .18s, border-color .18s',
                          animation: `mhdMenuIn .5s cubic-bezier(.16,1,.3,1) ${(0.06 + sIdx * 0.04).toFixed(2)}s both`,
                        }}
                      >
                        <span style={{ display: 'block', fontWeight: 700, fontSize: '.9rem', lineHeight: 1.35, textWrap: 'balance' }}>{sub.title}</span>
                        {sub.description && (
                          <span style={{ display: 'block', fontSize: '.78rem', color: 'var(--c-muted3,#6b7178)', lineHeight: 1.45, marginTop: '.2rem' }}>{sub.description}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                  <div style={{ animation: 'mhdMenuSide .6s cubic-bezier(.16,1,.3,1) .12s both', display: 'flex', flexDirection: 'column', gap: '.9rem' }}>
                    <Link href={cleanNavHref(itemInsight.ctaCard?.buttonHref || '/insights')}
                      style={{
                        display: 'block',
                        background: '#fff',
                        border: '1px solid var(--c-border,#e2e0da)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        color: 'var(--c-ink,#16181c)',
                        transition: 'all .2s',
                      }}
                    >
                      <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: 'var(--c-subtle,#eeece7)' }}>
                        <img
                          src={itemInsight.ctaCard?.image?.url || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'}
                          alt={itemInsight.ctaCard?.title || (isEn ? 'Market News' : 'Tin thị trường')}
                          loading="lazy"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div style={{ padding: '1rem 1.1rem 1.1rem' }}>
                        <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)' }}>
                          {itemInsight.ctaCard?.tag || (isEn ? 'MARKET NEWS' : 'TIN THỊ TRƯỜNG')}
                        </span>
                        <div style={{ fontWeight: 700, fontSize: '.95rem', lineHeight: 1.35, margin: '.35rem 0 .35rem', textWrap: 'balance' }}>
                          {itemInsight.ctaCard?.title || (isEn ? 'Central HCMC Real Estate Price Movements Q3' : 'Biến động giá bất động sản khu vực trung tâm TP.HCM quý 3')}
                        </div>
                        <div style={{ fontSize: '.76rem', color: 'var(--c-faint,#8a8f96)' }}>
                          {itemInsight.ctaCard?.date || (isEn ? 'September 05, 2026' : '05 Tháng 9, 2026')}
                        </div>
                      </div>
                    </Link>
                    <Link href={cleanNavHref(itemInsight.ctaCard?.buttonHref || '/insights')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '.5rem',
                        border: '1.5px solid var(--c-ink,#16181c)',
                        background: '#fff',
                        color: 'var(--c-ink,#16181c)',
                        fontWeight: 700,
                        fontSize: '.86rem',
                        padding: '.75rem 1.1rem',
                        borderRadius: '6px',
                        transition: 'all .2s',
                      }}
                    >
                      {itemInsight.ctaCard?.buttonLabel ? itemInsight.ctaCard.buttonLabel.replace('→', '').trim() : (isEn ? 'Download report' : 'Tải báo cáo')}{' '}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              )}

              {/* 5. MEGA MENU: PHÁP LÝ */}
              {megaShown['legal'] && (
                <div style={{ position: 'relative', maxWidth: '1240px', margin: '0 auto', padding: '2.2rem clamp(1rem,4vw,2.5rem)', display: 'grid', gridTemplateColumns: '230px minmax(0,1fr) 320px', gap: '2.5rem' }}>
                  <div style={{ paddingRight: '1.5rem', borderRight: '1px solid rgba(var(--c-ink-rgb,22,24,28),.1)', animation: 'mhdMenuIn .5s cubic-bezier(.16,1,.3,1) both' }}>
                    <span style={{ display: 'block', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)', marginBottom: '.7rem' }}>
                      {itemLegal.title}
                    </span>
                    <p style={{ fontFamily: "'Be Vietnam Pro',sans-serif", fontSize: '1.45rem', lineHeight: 1.22, color: 'var(--c-ink,#16181c)', textWrap: 'balance' }}>
                      {itemLegal.tagline || (isEn ? 'Legal standing and practicing information are published for public search.' : 'Thông tin pháp lý và hành nghề được công khai để tra cứu.')}
                    </p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: '.3rem .8rem', alignContent: 'start' }}>
                    {legalSubs.map((sub: any, sIdx: number) => (
                      <Link
                        key={sIdx}
                        href={sub.href}
                        onClick={closeMega}
                        className="mhd-mega-sublink"
                        style={{
                          display: 'block',
                          padding: '.85rem 1rem',
                          borderRadius: '8px',
                          color: 'var(--c-ink,#16181c)',
                          border: '1px solid transparent',
                          transition: 'background .18s, border-color .18s',
                          animation: `mhdMenuIn .5s cubic-bezier(.16,1,.3,1) ${(0.06 + sIdx * 0.04).toFixed(2)}s both`,
                        }}
                      >
                        <span style={{ display: 'block', fontWeight: 700, fontSize: '.9rem', lineHeight: 1.35, textWrap: 'balance' }}>{sub.title}</span>
                        {sub.description && (
                          <span style={{ display: 'block', fontSize: '.78rem', color: 'var(--c-muted3,#6b7178)', lineHeight: 1.45, marginTop: '.2rem' }}>{sub.description}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                  <div style={{ animation: 'mhdMenuSide .6s cubic-bezier(.16,1,.3,1) .12s both', background: 'var(--c-accent,#d94f0a)', color: '#fff', borderRadius: '12px', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                    <div aria-hidden="true" style={{ position: 'absolute', right: '1.2rem', top: '1.2rem', width: '56px', height: '56px', border: '1.5px solid rgba(255,255,255,.6)', borderRadius: '8px', overflow: 'hidden', backgroundImage: 'linear-gradient(rgba(255,255,255,.22) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.22) 1px,transparent 1px)', backgroundSize: '8px 8px' }}>
                      <div style={{ position: 'absolute', left: 0, right: 0, height: '2px', background: '#fff', boxShadow: '0 0 10px #fff', animation: 'mhdScan 2.8s ease-in-out infinite' }} />
                    </div>
                    <span style={{ display: 'block', fontSize: '.68rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#fff', marginBottom: '.6rem' }}>
                      {itemLegal.ctaCard?.tag || (isEn ? 'ONLINE VERIFICATION' : 'TRA CỨU TRỰC TUYẾN')}
                    </span>
                    <h4 style={{ fontFamily: "'Be Vietnam Pro',sans-serif", fontWeight: 600, fontSize: '1.3rem', lineHeight: 1.2, marginBottom: '.5rem', color: '#fff', maxWidth: '12ch' }}>
                      {itemLegal.ctaCard?.title || (isEn ? 'Verify Certificate Details' : 'Đối chiếu thông tin chứng thư')}
                    </h4>
                    <p style={{ fontSize: '.82rem', color: '#fff', marginBottom: '1.2rem', textWrap: 'pretty' }}>
                      {itemLegal.ctaCard?.description || (isEn ? 'Scan QR code or enter certificate number to verify issuance on the MHD system.' : 'Quét mã QR hoặc nhập số chứng thư để đối chiếu thông tin phát hành trên hệ thống MHD.')}
                    </p>
                    <Link href={cleanNavHref(itemLegal.ctaCard?.buttonHref || '/phap-ly/tra-cuu')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem', background: '#fff', color: 'var(--c-ink,#16181c)', fontWeight: 700, fontSize: '.86rem', padding: '.8rem 1.2rem', borderRadius: '6px', transition: 'all .2s' }}>
                      {itemLegal.ctaCard?.buttonLabel ? itemLegal.ctaCard.buttonLabel.replace('→', '').trim() : (isEn ? 'Verify certificate' : 'Tra cứu chứng thư')}{' '}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </Link>
                  </div>
                </div>
              )}

              {/* 6. MEGA MENU: LIÊN HỆ */}
              {megaShown['contact'] && (
                <div style={{ position: 'relative', maxWidth: '1240px', margin: '0 auto', padding: '2.2rem clamp(1rem,4vw,2.5rem)', display: 'grid', gridTemplateColumns: '230px minmax(0,1fr) 320px', gap: '2.5rem' }}>
                  <div style={{ paddingRight: '1.5rem', borderRight: '1px solid rgba(var(--c-ink-rgb,22,24,28),.1)', animation: 'mhdMenuIn .5s cubic-bezier(.16,1,.3,1) both' }}>
                    <span style={{ display: 'block', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-accent,#d94f0a)', marginBottom: '.7rem' }}>
                      {itemContact.title}
                    </span>
                    <p style={{ fontFamily: "'Be Vietnam Pro',sans-serif", fontSize: '1.45rem', lineHeight: 1.22, color: 'var(--c-ink,#16181c)', textWrap: 'balance' }}>
                      {itemContact.tagline || (isEn ? 'Submit information for MHD to confirm engagement scope and required dossiers.' : 'Gửi thông tin để MHD xác nhận phạm vi công việc và hồ sơ cần cung cấp.')}
                    </p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: '.3rem .8rem', alignContent: 'start' }}>
                    {contactSubs.map((sub: any, sIdx: number) => (
                      <Link
                        key={sIdx}
                        href={sub.href}
                        onClick={closeMega}
                        className="mhd-mega-sublink"
                        style={{
                          display: 'block',
                          padding: '.85rem 1rem',
                          borderRadius: '8px',
                          color: 'var(--c-ink,#16181c)',
                          border: '1px solid transparent',
                          transition: 'background .18s, border-color .18s',
                          animation: `mhdMenuIn .5s cubic-bezier(.16,1,.3,1) ${(0.06 + sIdx * 0.04).toFixed(2)}s both`,
                        }}
                      >
                        <span style={{ display: 'block', fontWeight: 700, fontSize: '.9rem', lineHeight: 1.35, textWrap: 'balance' }}>{sub.title}</span>
                        {sub.description && (
                          <span style={{ display: 'block', fontSize: '.78rem', color: 'var(--c-muted3,#6b7178)', lineHeight: 1.45, marginTop: '.2rem' }}>{sub.description}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                  <div style={{ animation: 'mhdMenuSide .6s cubic-bezier(.16,1,.3,1) .12s both', background: 'var(--c-ink,#16181c)', color: '#fff', borderRadius: '12px', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', right: '-50px', top: '-50px', width: '160px', height: '160px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(var(--c-accent-rgb,217,79,10),.4),transparent 70%)', pointerEvents: 'none' }} />
                    <span style={{ position: 'relative', display: 'block', fontSize: '.68rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--c-accent-dark,#f0956a)', marginBottom: '.6rem' }}>
                      {itemContact.ctaCard?.tag || (isEn ? 'INTAKE' : 'TIẾP NHẬN YÊU CẦU')}
                    </span>
                    <h4 style={{ position: 'relative', fontFamily: "'Be Vietnam Pro',sans-serif", fontWeight: 600, fontSize: '1.3rem', lineHeight: 1.2, marginBottom: '.5rem', color: '#fff' }}>
                      {itemContact.ctaCard?.title || (isEn ? 'Submit Valuation Request' : 'Gửi yêu cầu thẩm định')}
                    </h4>
                    <p style={{ position: 'relative', fontSize: '.82rem', color: 'var(--c-ondark-muted,#b9bcc3)', marginBottom: '1.2rem', textWrap: 'pretty' }}>
                      {itemContact.ctaCard?.description || (isEn ? 'MHD will contact you to confirm details, dossier, and execution steps.' : 'MHD sẽ liên hệ để xác nhận thông tin, hồ sơ và các bước thực hiện.')}
                    </p>
                    <div style={{ position: 'relative' }}>
                      <Link href={cleanNavHref(itemContact.ctaCard?.buttonHref || '/contact#yeu-cau')} data-cta-dark="1" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem', background: 'var(--c-accent,#d94f0a)', color: '#fff', fontWeight: 700, fontSize: '.86rem', padding: '.8rem 1.2rem', borderRadius: '6px', transition: 'all .2s cubic-bezier(.16,1,.3,1)' }}>
                        {itemContact.ctaCard?.buttonLabel ? itemContact.ctaCard.buttonLabel.replace('→', '').trim() : (isEn ? 'Submit request' : 'Gửi yêu cầu')}{' '}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom line in mega menu */}
              <div style={{ position: 'relative', background: 'var(--c-page,#f6f5f2)', borderTop: '1px solid var(--c-border2,#e6e3dc)' }}>
                <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '.8rem clamp(1rem,4vw,2.5rem)', display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', fontSize: '.76rem', color: 'var(--c-muted,#5f656d)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d94f0b" strokeWidth="2">
                      <path d="M9 12l2 2 4-4M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7z" />
                    </svg>
                    <span>
                      {data?.licenseNotice || (isEn ? 'Certified for valuation business services · Code 000/GCN-BTC' : 'Được cấp Giấy chứng nhận đủ điều kiện kinh doanh dịch vụ thẩm định giá · Mã số 000/GCN-BTC')}
                    </span>
                  </span>
                  <a href={`tel:${(data?.phone || '1900 000 000').replace(/\s+/g, '')}`} style={{ fontWeight: 700, color: 'var(--c-ink,#16181c)' }}>
                    Hotline: {data?.phone || '1900 000 000'}
                  </a>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Mobile Navigation Dropdown */}
        {menuOpen && (
          <nav
            aria-label="Menu di động"
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderTop: '1px solid var(--c-border2,#e6e3dc)',
              padding: '.5rem clamp(1rem,4vw,2.5rem) 1.2rem',
              background: '#fff',
              maxHeight: 'calc(100vh - 72px)',
              overflowY: 'auto',
            }}
          >
            <a href="/about" onClick={closeMenu} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '.9rem 0', borderBottom: '1px solid var(--c-subtle,#eeece7)', fontWeight: 700 }}>
              <span>{itemAbout.title}</span>
            </a>
            <a href="/services/Dich-vu-Doanh-nghiep" onClick={closeMenu} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '.9rem 0', borderBottom: '1px solid var(--c-subtle,#eeece7)', fontWeight: 700 }}>
              <span>{itemServices.title}</span>
            </a>
            <a href="/projects" onClick={closeMenu} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '.9rem 0', borderBottom: '1px solid var(--c-subtle,#eeece7)', fontWeight: 700 }}>
              <span>{itemProjects.title}</span>
            </a>
            <a href="/insights" onClick={closeMenu} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '.9rem 0', borderBottom: '1px solid var(--c-subtle,#eeece7)', fontWeight: 700 }}>
              <span>{itemInsight.title}</span>
            </a>
            <a href="/about/phap-ly" onClick={closeMenu} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '.9rem 0', borderBottom: '1px solid var(--c-subtle,#eeece7)', fontWeight: 700 }}>
              <span>{itemLegal.title}</span>
            </a>
            <a href="/contact" onClick={closeMenu} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '.9rem 0', borderBottom: '1px solid var(--c-subtle,#eeece7)', fontWeight: 700 }}>
              <span>{itemContact.title}</span>
            </a>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.8rem', margin: '1rem 0 .5rem', padding: '.6rem', background: 'var(--c-page,#f6f5f2)', borderRadius: '8px' }}>
              <span style={{ fontSize: '.84rem', color: 'var(--c-muted,#5f656d)', fontWeight: 600 }}>{isEn ? 'Language:' : 'Ngôn ngữ:'}</span>
              <button
                type="button"
                onClick={() => {
                  document.cookie = 'mhd_locale=vi; path=/; max-age=31536000'
                  if (typeof window !== 'undefined') {
                    const url = new URL(window.location.href)
                    url.searchParams.set('locale', 'vi')
                    window.location.href = url.pathname + url.search
                  }
                }}
                style={{
                  fontWeight: currentLocale === 'vi' ? 700 : 400,
                  color: currentLocale === 'vi' ? 'var(--c-accent,#d94f0a)' : 'var(--c-muted,#5f656d)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '.9rem',
                }}
              >
                Tiếng Việt (VI)
              </button>
              <span style={{ color: 'var(--c-border3,#d9d6cf)' }}>|</span>
              <button
                type="button"
                onClick={() => {
                  document.cookie = 'mhd_locale=en; path=/; max-age=31536000'
                  if (typeof window !== 'undefined') {
                    const url = new URL(window.location.href)
                    url.searchParams.set('locale', 'en')
                    window.location.href = url.pathname + url.search
                  }
                }}
                style={{
                  fontWeight: currentLocale === 'en' ? 700 : 400,
                  color: currentLocale === 'en' ? 'var(--c-accent,#d94f0a)' : 'var(--c-muted,#5f656d)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '.9rem',
                }}
              >
                English (EN)
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.6rem', marginTop: '.5rem' }}>
              <Link href={verifyBtnUrl} onClick={closeMenu} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid var(--c-border3,#d9d6cf)', color: 'var(--c-ink,#16181c)', fontSize: '.84rem', fontWeight: 700, padding: '.8rem', borderRadius: '6px', textAlign: 'center' }}>
                {verifyBtnLabel}
              </Link>
              <Link href={requestBtnUrl} onClick={closeMenu} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--c-ink,#16181c)', color: '#fff', fontSize: '.84rem', fontWeight: 700, padding: '.8rem', borderRadius: '6px', textAlign: 'center' }}>
                {requestBtnLabel}
              </Link>
            </div>
          </nav>
        )}
      </header>
      <div aria-hidden="true" style={{ height: '72px' }} />
    </>
  )
}
