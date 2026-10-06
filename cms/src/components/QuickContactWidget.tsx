'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const MhdAssistantModal = dynamic(() => import('./MhdAssistantModal'), {
  ssr: false,
})

interface QuickContactWidgetProps {
  hotline?: string
  zaloNumber?: string
  zaloUrl?: string
  workingHours?: string
  title?: string
  phoneLabel?: string
  zaloLabel?: string
  currentLocale?: string
}

export default function QuickContactWidget({
  hotline = '028 3515 3516',
  zaloNumber = '3920702626611603828',
  zaloUrl = 'https://zalo.me/3920702626611603828',
  workingHours,
  title,
  phoneLabel,
  zaloLabel,
  currentLocale = 'vi',
}: QuickContactWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isAssistantOpen, setIsAssistantOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const isEn = currentLocale === 'en'

  // If in English mode, ensure English text even if CMS database retained Vietnamese default values
  const displayTitle = isEn
    ? (!title || title.toUpperCase().includes('LIÊN HỆ') ? 'CONTACT MHD' : title)
    : (title || 'LIÊN HỆ MHD')

  const displayPhoneLabel = isEn
    ? (!phoneLabel || phoneLabel.toLowerCase().includes('gọi') ? 'Call Hotline' : phoneLabel)
    : (phoneLabel || 'Gọi điện thoại')

  const displayZaloLabel = isEn
    ? (!zaloLabel || zaloLabel.toLowerCase().includes('nhắn') ? 'Message Zalo' : zaloLabel)
    : (zaloLabel || 'Zalo Oauth')

  const displayHours = isEn
    ? (!workingHours || workingHours.toLowerCase().includes('thứ') ? '8:00 – 17:30, Monday – Saturday' : workingHours)
    : (workingHours || '8:00 – 17:30, thứ Hai – thứ Bảy')

  const cleanHotline = hotline.replace(/\s+/g, '')
  const finalZaloHref = zaloUrl || `https://zalo.me/${zaloNumber.replace(/\s+/g, '')}`

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 250)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <aside
      aria-label={displayTitle}
      style={{
        position: 'fixed',
        right: '24px',
        bottom: '24px',
        zIndex: 9990,
        display: 'flex',
        alignItems: 'flex-end',
        gap: '12px',
        fontFamily: "'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* 1. MHD Assistant Modal */}
      <MhdAssistantModal
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        currentLocale={currentLocale}
      />

      {/* 2. Contact Card Popup */}
      {isOpen && !isAssistantOpen && (
        <div
          role="dialog"
          aria-label={displayTitle}
          style={{
            width: '268px',
            background: '#ffffff',
            borderRadius: '16px',
            padding: '18px 20px',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.14), 0 2px 8px rgba(0, 0, 0, 0.06)',
            border: '1px solid rgba(0, 0, 0, 0.07)',
            animation: 'mhdPopupFadeIn .28s cubic-bezier(0.16, 1, 0.3, 1) both',
            transformOrigin: 'bottom right',
          }}
        >
          {/* Card Header */}
          <div
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#71767e',
              marginBottom: '14px',
            }}
          >
            {displayTitle}
          </div>

          {/* Contact Actions List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Phone Hotline Link */}
            <a
              href={`tel:${cleanHotline}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textDecoration: 'none',
                padding: '6px 8px',
                borderRadius: '10px',
                margin: '-6px -8px',
                transition: 'background-color 0.18s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f7f6f4')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: '#16181c',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    color: '#16181c',
                    lineHeight: 1.25,
                  }}
                >
                  {displayPhoneLabel}
                </span>
                <span
                  style={{
                    fontSize: '0.84rem',
                    color: '#555960',
                    lineHeight: 1.35,
                    marginTop: '2px',
                  }}
                >
                  {hotline}
                </span>
              </div>
            </a>

            {/* Zalo Link */}
            <a
              href={finalZaloHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textDecoration: 'none',
                padding: '6px 8px',
                borderRadius: '10px',
                margin: '-6px -8px',
                transition: 'background-color 0.18s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f7f6f4')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: '#0068ff',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.72rem',
                  letterSpacing: '-0.02em',
                  flexShrink: 0,
                }}
              >
                Zalo
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    color: '#16181c',
                    lineHeight: 1.25,
                  }}
                >
                  {displayZaloLabel}
                </span>
              </div>
            </a>
          </div>

          {/* Working Hours Footnote */}
          <div
            style={{
              marginTop: '16px',
              paddingTop: '12px',
              borderTop: '1px solid #f0eee9',
              fontSize: '0.76rem',
              color: '#777c84',
              lineHeight: 1.4,
            }}
          >
            {displayHours}
          </div>
        </div>
      )}

      {/* Vertical Action Buttons Stack */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        {/* 1. Scroll-To-Top Button */}
        {showScrollTop && (
          <button
            type="button"
            onClick={scrollToTop}
            aria-label={isEn ? 'Scroll to top' : 'Cuộn lên đầu trang'}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              color: '#16181c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'transform 0.18s ease, box-shadow 0.18s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.12)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)'
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </button>
        )}

        {/* 2. Orange Assistant Chat Button */}
        <button
          type="button"
          onClick={() => {
            setIsAssistantOpen((prev) => !prev)
            if (isOpen) setIsOpen(false)
          }}
          aria-label={isEn ? 'MHD Assistant' : 'Trợ lý MHD'}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'var(--c-accent, #d94f0a)',
            color: '#ffffff',
            border: 'none',
            boxShadow: '0 4px 14px rgba(217, 79, 10, 0.42)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'transform 0.18s ease, filter 0.18s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.06)'
            e.currentTarget.style.filter = 'brightness(1.08)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.filter = 'brightness(1)'
          }}
        >
          {/* Chat bubble with 3 dots inside matching screenshot exactly */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <circle cx="9" cy="10" r="1" fill="currentColor" />
            <circle cx="12" cy="10" r="1" fill="currentColor" />
            <circle cx="15" cy="10" r="1" fill="currentColor" />
          </svg>
        </button>

        {/* 3. Dark Phone Call Button with concentric rings matching screenshot */}
        <button
          type="button"
          onClick={() => {
            setIsOpen((prev) => !prev)
            if (isAssistantOpen) setIsAssistantOpen(false)
          }}
          aria-label={isOpen ? (isEn ? 'Close contact menu' : 'Đóng liên hệ') : (isEn ? 'Open contact menu' : 'Mở liên hệ')}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: '#16181c',
            color: '#ffffff',
            border: '2px solid rgba(255, 255, 255, 0.95)',
            outline: '2px solid rgba(22, 24, 28, 0.35)',
            outlineOffset: '2px',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'transform 0.18s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {isOpen ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          )}
        </button>
      </div>

      <style jsx global>{`
        @keyframes mhdPopupFadeIn {
          from {
            opacity: 0;
            transform: scale(0.92) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </aside>
  )
}
