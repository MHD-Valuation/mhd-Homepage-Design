'use client'

import React, { useEffect, useState } from 'react'

interface TocItem {
  href: string
  label: string
}

interface ProcessTocProps {
  items: TocItem[]
  title?: string
}

export default function ProcessToc({ items, title = 'MỤC LỤC' }: ProcessTocProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.href.replace('#', '') || '')

  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.innerWidth < 1024
      const scrollPosition = window.scrollY + (isMobile ? 130 : 180)

      for (let i = items.length - 1; i >= 0; i--) {
        const id = items[i].href.replace('#', '')
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          if (scrollPosition >= top) {
            setActiveId(id)
            return
          }
        }
      }
      if (items.length > 0) {
        setActiveId(items[0].href.replace('#', ''))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [items])

  return (
    <>
      <style>{`
        /* Desktop: Vertical Sticky Sidebar with Indicator Bar */
        .mhd-process-toc-aside {
          position: sticky;
          top: 100px;
          display: flex;
          flex-direction: column;
          font-size: .92rem;
          border-left: 1px solid var(--c-border, #e2e0da);
          padding-left: 0;
          width: 100%;
        }
        .mhd-process-toc-title {
          font-size: .72rem;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: var(--c-faint, #8a8f96);
          padding-left: 1.2rem;
          margin-bottom: .85rem;
          display: block;
        }
        .mhd-process-toc-nav {
          display: flex;
          flex-direction: column;
          gap: .4rem;
        }
        .mhd-process-toc-link {
          position: relative;
          display: block;
          padding-left: 1.2rem;
          padding-top: .35rem;
          padding-bottom: .35rem;
          color: #5f656d;
          font-weight: 500;
          text-decoration: none;
          transition: all .18s ease;
          line-height: 1.45;
          border-left: 3px solid transparent;
          margin-left: -2px;
          white-space: nowrap;
        }
        .mhd-process-toc-link:hover {
          color: var(--c-ink, #16181c);
        }
        .mhd-process-toc-link.active {
          color: var(--c-ink, #16181c);
          font-weight: 700;
          border-left-color: var(--c-accent, #d94f0a);
        }

        /* Mobile & Tablet (< 1024px): Underline subnav with guaranteed horizontal touch scroll */
        @media (max-width: 1023px) {
          .mhd-process-toc-aside {
            position: sticky;
            top: 68px;
            z-index: 25;
            background: #ffffff;
            border-left: none;
            border-bottom: 1px solid var(--c-border, #e2e0da);
            padding: 0;
            margin-left: calc(clamp(1rem, 4vw, 2.5rem) * -1);
            margin-right: calc(clamp(1rem, 4vw, 2.5rem) * -1);
            margin-bottom: 1.5rem;
            width: calc(100% + (clamp(1rem, 4vw, 2.5rem) * 2));
            max-width: 100vw !important;
            min-width: 0 !important;
            overflow: hidden !important;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
          }
          .mhd-process-toc-title {
            display: none;
          }
          .mhd-process-toc-nav {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            gap: clamp(0.9rem, 2.5vw, 1.6rem) !important;
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
            ms-overflow-style: none !important;
            padding: 0 clamp(1rem, 4vw, 2.5rem) !important;
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            touch-action: pan-x !important;
            overscroll-behavior-x: contain !important;
          }
          .mhd-process-toc-nav::-webkit-scrollbar {
            display: none !important;
            height: 0 !important;
            width: 0 !important;
          }
          .mhd-process-toc-link {
            flex-shrink: 0 !important;
            white-space: nowrap !important;
            text-wrap: nowrap !important;
            font-size: clamp(0.76rem, 0.72rem + 0.16vw, 0.84rem) !important;
            font-weight: 500;
            border-radius: 0;
            padding: 0.78rem 0.15rem 0.68rem !important;
            border-left: none !important;
            margin-left: 0;
            margin-bottom: -1px;
            background: transparent;
            color: var(--c-muted, #5f656d);
            line-height: 1.35;
            border-bottom: 2.5px solid transparent !important;
          }
          .mhd-process-toc-link.active {
            color: var(--c-ink, #16181c) !important;
            font-weight: 700;
            border-bottom: 2.5px solid var(--c-accent, #d94f0a) !important;
            border-left: none !important;
            background: transparent !important;
            box-shadow: none !important;
          }
        }
      `}</style>

      <aside className="mhd-process-toc-aside" aria-label={title}>
        <span className="mhd-process-toc-title">{title}</span>

        <nav className="mhd-process-toc-nav">
          {items.map((item) => {
            const id = item.href.replace('#', '')
            const isActive = activeId === id

            return (
              <a
                key={item.href}
                href={item.href}
                className={`mhd-process-toc-link ${isActive ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  const target = document.getElementById(id)
                  if (target) {
                    const isMobile = window.innerWidth < 1024
                    const offset = isMobile ? 120 : 100
                    const bodyRect = document.body.getBoundingClientRect().top
                    const elementRect = target.getBoundingClientRect().top
                    const elementPosition = elementRect - bodyRect
                    const offsetPosition = elementPosition - offset

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth',
                    })
                    setActiveId(id)
                  }
                }}
              >
                {item.label}
              </a>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
