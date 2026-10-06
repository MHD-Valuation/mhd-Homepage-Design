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
      const scrollPosition = window.scrollY + 180

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
    <aside
      style={{
        position: 'sticky',
        top: 100,
        display: 'flex',
        flexDirection: 'column',
        fontSize: '.92rem',
        borderLeft: '1px solid #e2e0da',
        paddingLeft: '0',
      }}
    >
      <span
        style={{
          fontSize: '.72rem',
          fontWeight: 700,
          letterSpacing: '.08em',
          textTransform: 'uppercase',
          color: 'var(--c-faint, #8a8f96)',
          paddingLeft: '1.2rem',
          marginBottom: '.85rem',
        }}
      >
        {title}
      </span>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
        {items.map((item) => {
          const id = item.href.replace('#', '')
          const isActive = activeId === id

          return (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                const target = document.getElementById(id)
                if (target) {
                  const offset = 100
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
              style={{
                position: 'relative',
                display: 'block',
                paddingLeft: '1.2rem',
                paddingTop: '.35rem',
                paddingBottom: '.35rem',
                color: isActive ? 'var(--c-ink, #16181c)' : '#5f656d',
                fontWeight: isActive ? 700 : 500,
                textDecoration: 'none',
                transition: 'all .18s ease',
                lineHeight: 1.45,
                borderLeft: isActive ? '3px solid #d94f0a' : '3px solid transparent',
                marginLeft: '-2px', // align indicator with the left border
              }}
            >
              {item.label}
            </a>
          )
        })}
      </div>
    </aside>
  )
}
