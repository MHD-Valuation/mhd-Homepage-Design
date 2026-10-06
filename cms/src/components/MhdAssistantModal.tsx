'use client'

import React, { useState, useEffect, useRef } from 'react'

interface Message {
  id: string
  sender: 'bot' | 'user'
  badge?: string // e.g. "Mục đích: Góp ý, phản ánh"
  text: string
  actionBtn?: {
    label: string
    href?: string
    onClickType?: string
  }
}

interface QuickOption {
  id: string
  label: string
  badgePrefix?: string
  replyText: string
  actionBtn?: {
    label: string
    href: string
  }
}

const QUICK_OPTIONS_VI: QuickOption[] = [
  {
    id: 'bao-gia',
    label: 'Báo giá thẩm định',
    badgePrefix: 'Mục đích: Báo giá thẩm định',
    replyText:
      'Để nhận báo giá chính xác, quý khách vui lòng cung cấp thông tin loại tài sản (Bất động sản, DN, Máy thiết bị...) và mục đích thẩm định (vay vốn, M&A, báo cáo...). Đội ngũ MHD sẽ gửi báo phí trong vòng 2-4 giờ làm việc.',
    actionBtn: {
      label: 'Gửi yêu cầu báo giá →',
      href: '/contact',
    },
  },
  {
    id: 'ho-so',
    label: 'Hồ sơ cần chuẩn bị',
    badgePrefix: 'Mục đích: Hồ sơ cần chuẩn bị',
    replyText:
      'Tuỳ loại tài sản thẩm định, hồ sơ cơ bản gồm: Giấy tờ pháp lý chủ sở hữu, Giấy chứng nhận quyền sở hữu/sử dụng, Báo cáo tài chính hoặc hóa đơn/hợp đồng mua bán. Chi tiết danh mục hồ sơ từng dịch vụ được niêm yết tại các chuyên trang dịch vụ của MHD.',
    actionBtn: {
      label: 'Xem danh mục dịch vụ →',
      href: '/#services',
    },
  },
  {
    id: 'kiem-tra-chung-thu',
    label: 'Kiểm tra chứng thư',
    badgePrefix: 'Mục đích: Kiểm tra chứng thư',
    replyText:
      'Quý khách có thể quét mã QR in trên góc chứng thư hoặc nhập trực tiếp Số chứng thư và Mã tra cứu tại Cổng tra cứu trực tuyến chính thức của MHD.',
    actionBtn: {
      label: 'Đến cổng tra cứu chứng thư →',
      href: '/phap-ly/tra-cuu',
    },
  },
  {
    id: 'tien-do',
    label: 'Tiến độ hồ sơ của tôi',
    badgePrefix: 'Mục đích: Tiến độ hồ sơ của tôi',
    replyText:
      'Để tra cứu tiến độ xử lý hồ sơ thẩm định giá, quý khách vui lòng nhập Mã hồ sơ hoặc liên hệ trực tiếp với Thẩm định viên phụ trách được ghi trên Phiếu tiếp nhận yêu cầu.',
    actionBtn: {
      label: 'Liên hệ chuyên viên phụ trách →',
      href: '/contact',
    },
  },
  {
    id: 'tuyen-dung',
    label: 'Tuyển dụng',
    badgePrefix: 'Mục đích: Tuyển dụng',
    replyText:
      'MHD liên tục tuyển dụng Thẩm định viên về giá có thẻ hành nghề của Bộ Tài chính, Chuyên viên phân tích tài chính/M&A và Thực tập sinh thẩm định giá tại TP.HCM & Hà Nội.',
    actionBtn: {
      label: 'Xem vị trí đang tuyển →',
      href: '/tuyen-dung',
    },
  },
  {
    id: 'gop-y',
    label: 'Góp ý, phản ánh',
    badgePrefix: 'Mục đích: Góp ý, phản ánh',
    replyText:
      'MHD ghi nhận mọi góp ý. Vui lòng gửi nội dung kèm số hợp đồng (nếu có) về phapche@mhd.com.vn, bộ phận Pháp chế sẽ phản hồi bằng văn bản.',
    actionBtn: {
      label: 'Gửi email Pháp chế →',
      href: 'mailto:phapche@mhd.com.vn?subject=G%C3%B3p%20%C3%BD%20ph%E1%BA%A3n%20%C3%A1nh%20d%E1%BB%8Bch%20v%E1%BB%A5%20MHD',
    },
  },
]

const QUICK_OPTIONS_EN: QuickOption[] = [
  {
    id: 'bao-gia',
    label: 'Fee Quotation',
    badgePrefix: 'Subject: Valuation quotation',
    replyText:
      'To receive an accurate fee quotation, please provide the asset category (Real Estate, Enterprise, Machinery...) and purpose (collateral, M&A, auditing...). Our advisory team will respond within 2-4 business hours.',
    actionBtn: {
      label: 'Request a quotation →',
      href: '/contact',
    },
  },
  {
    id: 'ho-so',
    label: 'Required Documents',
    badgePrefix: 'Subject: Required documents',
    replyText:
      'Depending on the asset type, core documents include: Legal entity certificates, ownership/land use right certificates, audited financial reports, or purchase contracts/invoices.',
    actionBtn: {
      label: 'Explore valuation services →',
      href: '/services',
    },
  },
  {
    id: 'kiem-tra-chung-thu',
    label: 'Verify Certificate',
    badgePrefix: 'Subject: Verify certificate',
    replyText:
      'You can scan the QR code printed on the certificate corner or enter the Certificate ID directly into the official MHD Verification Portal.',
    actionBtn: {
      label: 'Open Certificate Portal →',
      href: '/phap-ly/tra-cuu',
    },
  },
  {
    id: 'tien-do',
    label: 'Track Dossier Progress',
    badgePrefix: 'Subject: Track dossier progress',
    replyText:
      'To track dossier progress, please check your receipt number or reach out directly to the certified valuer in charge stated on your intake receipt.',
    actionBtn: {
      label: 'Contact assigned specialist →',
      href: '/contact',
    },
  },
  {
    id: 'tuyen-dung',
    label: 'Careers & Hiring',
    badgePrefix: 'Subject: Careers & Hiring',
    replyText:
      'MHD is actively seeking certified MoF valuers, financial analysts, and valuation trainees in Ho Chi Minh City & Hanoi.',
    actionBtn: {
      label: 'View open positions →',
      href: '/tuyen-dung',
    },
  },
  {
    id: 'gop-y',
    label: 'Feedback & Compliance',
    badgePrefix: 'Subject: Feedback & Compliance',
    replyText:
      'MHD values all client feedback. Please send formal inquiries along with your contract number to phapche@mhd.com.vn.',
    actionBtn: {
      label: 'Email Legal & Compliance →',
      href: 'mailto:phapche@mhd.com.vn?subject=MHD%20Valuation%20Feedback',
    },
  },
]

export default function MhdAssistantModal({
  isOpen,
  onClose,
  currentLocale = 'vi',
}: {
  isOpen: boolean
  onClose: () => void
  currentLocale?: string
}) {
  const isEn = currentLocale === 'en'
  const quickOptions = isEn ? QUICK_OPTIONS_EN : QUICK_OPTIONS_VI
  
  const initialBotMsg: Message = {
    id: 'init',
    sender: 'bot',
    text: isEn
      ? 'Hello, I am the automated assistant of MHD Valuation. How can I assist you today? Select a topic below or type your inquiry.'
      : 'Xin chào, tôi là trợ lý tự động của MHD. Bạn cần hỗ trợ về vấn đề gì? Chọn một mục bên dưới hoặc nhập câu hỏi.',
  }

  const [messages, setMessages] = useState<Message[]>([initialBotMsg])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  // Reset initial message when locale changes
  useEffect(() => {
    setMessages([
      {
        id: 'init',
        sender: 'bot',
        text: isEn
          ? 'Hello, I am the automated assistant of MHD Valuation. How can I assist you today? Select a topic below or type your inquiry.'
          : 'Xin chào, tôi là trợ lý tự động của MHD. Bạn cần hỗ trợ về vấn đề gì? Chọn một mục bên dưới hoặc nhập câu hỏi.',
      },
    ])
  }, [isEn])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100)
    }
  }, [isOpen, messages])

  const handleReset = () => {
    setMessages([initialBotMsg])
    setInputText('')
  }

  const handleSelectOption = (opt: QuickOption) => {
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      badge: opt.badgePrefix,
      text: opt.label,
    }
    setMessages((prev) => [...prev, userMsg])
    setIsTyping(true)

    setTimeout(() => {
      const botMsg: Message = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: opt.replyText,
        actionBtn: opt.actionBtn,
      }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 450)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    const q = inputText.trim()
    if (!q) return

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: q,
    }
    setMessages((prev) => [...prev, userMsg])
    setInputText('')
    setIsTyping(true)

    setTimeout(() => {
      const qLower = q.toLowerCase()
      let matched = quickOptions.find((opt) =>
        opt.label.toLowerCase().includes(qLower) || qLower.includes(opt.label.toLowerCase())
      )

      let reply = isEn
        ? 'Thank you for your inquiry. Your request has been logged. You may also contact our hotline directly or choose from the quick topics.'
        : 'Cảm ơn câu hỏi của bạn. Yêu cầu của bạn đã được chuyển tới chuyên viên tư vấn của MHD. Bạn cũng có thể liên hệ trực tiếp hotline hoặc chọn các mục hỗ trợ nhanh.'
      let actionBtn = {
        label: isEn ? 'Contact advisor →' : 'Liên hệ tư vấn viên →',
        href: '/contact',
      }

      if (matched) {
        reply = matched.replyText
        actionBtn = matched.actionBtn || actionBtn
      } else if (
        qLower.includes('giá') ||
        qLower.includes('phí') ||
        qLower.includes('quote') ||
        qLower.includes('fee') ||
        qLower.includes('price')
      ) {
        reply = quickOptions[0].replyText
        actionBtn = quickOptions[0].actionBtn!
      } else if (
        qLower.includes('chứng thư') ||
        qLower.includes('tra cứu') ||
        qLower.includes('verify') ||
        qLower.includes('certificate')
      ) {
        reply = quickOptions[2].replyText
        actionBtn = quickOptions[2].actionBtn!
      } else if (
        qLower.includes('hồ sơ') ||
        qLower.includes('document') ||
        qLower.includes('file')
      ) {
        reply = quickOptions[1].replyText
        actionBtn = quickOptions[1].actionBtn!
      } else if (
        qLower.includes('tuyển') ||
        qLower.includes('hiring') ||
        qLower.includes('job') ||
        qLower.includes('career')
      ) {
        reply = quickOptions[4].replyText
        actionBtn = quickOptions[4].actionBtn!
      } else if (
        qLower.includes('góp ý') ||
        qLower.includes('phản ánh') ||
        qLower.includes('feedback') ||
        qLower.includes('complain')
      ) {
        reply = quickOptions[5].replyText
        actionBtn = quickOptions[5].actionBtn!
      }

      const botMsg: Message = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: reply,
        actionBtn,
      }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 550)
  }

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={isEn ? 'MHD Assistant' : 'Trợ lý MHD'}
      style={{
        width: 'min(380px, calc(100vw - 32px))',
        height: 'min(580px, calc(100vh - 120px))',
        background: '#f6f5f3',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow:
          '0 24px 60px rgba(0, 0, 0, 0.22), 0 8px 24px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        animation: 'mhdAssistantPop .28s cubic-bezier(0.16, 1, 0.3, 1) both',
        position: 'relative',
        zIndex: 9999,
      }}
    >
      {/* 1. Header with subtle warm mesh gradient */}
      <div
        style={{
          background: 'radial-gradient(ellipse at 85% 15%, rgba(217, 79, 10, 0.45) 0%, rgba(26, 24, 23, 0.98) 70%)',
          backgroundColor: '#161719',
          color: '#ffffff',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Orange round avatar with 3-dot chat bubble */}
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: '#d94f0a',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(217, 79, 10, 0.4)',
            }}
          >
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
              <path d="M20 2H4C2.9 2 2 2.9 2 4v14c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2z" />
              <circle cx="8" cy="11" r="1.3" fill="currentColor" />
              <circle cx="12" cy="11" r="1.3" fill="currentColor" />
              <circle cx="16" cy="11" r="1.3" fill="currentColor" />
            </svg>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.05rem', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.25 }}>
              {isEn ? 'MHD Assistant' : 'Trợ lý MHD'}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#22c55e',
                  display: 'inline-block',
                }}
              />
              <span style={{ fontSize: '0.78rem', color: '#b3b7bd', lineHeight: 1 }}>
                {isEn ? 'Automated 24/7 Response' : 'Trả lời tự động 24/7'}
              </span>
            </div>
          </div>
        </div>

        {/* Action icons: Restart & Close */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={handleReset}
            title={isEn ? 'Reset chat' : 'Làm mới cuộc trò chuyện'}
            aria-label={isEn ? 'Reset chat' : 'Làm mới'}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'transparent',
              border: 'none',
              color: '#d0d3d8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.15s ease, color 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
              e.currentTarget.style.color = '#ffffff'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#d0d3d8'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>

          <button
            type="button"
            onClick={onClose}
            title={isEn ? 'Close assistant' : 'Đóng trợ lý'}
            aria-label={isEn ? 'Close assistant' : 'Đóng'}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'transparent',
              border: 'none',
              color: '#d0d3d8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.15s ease, color 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
              e.currentTarget.style.color = '#ffffff'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#d0d3d8'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* 2. Messages List Body */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '18px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        {messages.map((m) => {
          if (m.sender === 'user') {
            return (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '6px',
                }}
              >
                {m.badge && (
                  <span
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: '#d94f0a',
                      background: '#ffffff',
                      border: '1px solid #f2cfbd',
                      borderRadius: '999px',
                      padding: '3px 12px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <span style={{ fontSize: '0.65rem' }}>●</span>
                    {m.badge}
                  </span>
                )}
                {/* User Bubble */}
                <div
                  style={{
                    maxWidth: '82%',
                    background: '#16181c',
                    color: '#ffffff',
                    padding: '11px 16px',
                    borderRadius: '16px 16px 4px 16px',
                    fontSize: '0.9rem',
                    lineHeight: 1.45,
                    fontWeight: 500,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    wordBreak: 'break-word',
                  }}
                >
                  {m.text}
                </div>
              </div>
            )
          }

          // Bot message
          return (
            <div
              key={m.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '10px',
              }}
            >
              {/* Bot Bubble */}
              <div
                style={{
                  maxWidth: '88%',
                  background: '#ffffff',
                  color: '#1d2129',
                  padding: '14px 16px',
                  borderRadius: '16px 16px 16px 4px',
                  fontSize: '0.91rem',
                  lineHeight: 1.55,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                }}
              >
                {m.text}
              </div>

              {/* Action Button inside bot response if any */}
              {m.actionBtn && (
                <a
                  href={m.actionBtn.href || '#'}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#16181c',
                    color: '#ffffff',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    padding: '10px 18px',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    boxShadow: '0 3px 10px rgba(0,0,0,0.12)',
                    transition: 'all 0.18s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#d94f0a'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#16181c'
                  }}
                >
                  {m.actionBtn.label}
                </a>
              )}

              {/* Show initial quick chips ONLY right below initial message */}
              {m.id === 'init' && (
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginTop: '2px',
                    maxWidth: '100%',
                  }}
                >
                  {quickOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption(opt)}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #e5e3dc',
                        borderRadius: '999px',
                        padding: '8px 16px',
                        fontSize: '0.86rem',
                        fontWeight: 600,
                        color: '#1a1c20',
                        cursor: 'pointer',
                        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)',
                        transition: 'all 0.18s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#d94f0a'
                        e.currentTarget.style.color = '#d94f0a'
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(217, 79, 10, 0.15)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#e5e3dc'
                        e.currentTarget.style.color = '#1a1c20'
                        e.currentTarget.style.boxShadow = '0 1px 4px rgba(0, 0, 0, 0.04)'
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '10px 14px',
              background: '#ffffff',
              borderRadius: '14px',
              width: 'fit-content',
              border: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#9da3af', animation: 'mhdDot 1.2s infinite ease-in-out' }} />
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#9da3af', animation: 'mhdDot 1.2s infinite ease-in-out 0.2s' }} />
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#9da3af', animation: 'mhdDot 1.2s infinite ease-in-out 0.4s' }} />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. Footer Input & Disclaimer */}
      <div
        style={{
          background: '#ffffff',
          borderTop: '1px solid #ebe9e3',
          padding: '14px 16px 12px',
          flexShrink: 0,
        }}
      >
        <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isEn ? 'Type your inquiry here...' : 'Nhập câu hỏi của bạn...'}
            style={{
              flex: 1,
              background: '#f6f5f3',
              border: '1px solid #e5e3dc',
              borderRadius: '12px',
              padding: '10px 14px',
              fontSize: '0.88rem',
              color: '#16181c',
              outline: 'none',
              transition: 'border-color 0.18s ease',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#d94f0a')}
            onBlur={(e) => (e.target.style.borderColor = '#e5e3dc')}
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            aria-label={isEn ? 'Send' : 'Gửi'}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: inputText.trim() ? '#d94f0a' : '#dedcd6',
              color: '#ffffff',
              border: 'none',
              cursor: inputText.trim() ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.18s ease',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>

        <p
          style={{
            margin: '8px 0 0',
            textAlign: 'center',
            fontSize: '0.71rem',
            color: '#8c919a',
            lineHeight: 1.3,
          }}
        >
          {isEn
            ? 'For reference only. Does not replace accredited valuer consultation.'
            : 'Thông tin tham khảo, không thay thế tư vấn của thẩm định viên.'}
        </p>
      </div>

      <style jsx global>{`
        @keyframes mhdAssistantPop {
          from {
            opacity: 0;
            transform: scale(0.94) translateY(16px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes mhdDot {
          0%, 80%, 100% {
            transform: scale(0.7);
            opacity: 0.4;
          }
          40% {
            transform: scale(1.1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
