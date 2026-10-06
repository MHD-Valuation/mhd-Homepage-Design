'use client'

import React, { useEffect, useState, useTransition } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function NavigationProgressBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // When route finishes changing, complete the bar smoothly
    if (loading) {
      setProgress(100)
      const timer = setTimeout(() => {
        setLoading(false)
        setProgress(0)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [pathname, searchParams])

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a')
      if (!target) return

      const href = target.getAttribute('href')
      if (!href) return

      // Ignore external links, hash anchors, mailto, tel, target="_blank", or download
      if (
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('#') ||
        target.getAttribute('target') === '_blank' ||
        target.hasAttribute('download')
      ) {
        return
      }

      // Check if it's the current path with identical hash
      const currentUrl = window.location.pathname + window.location.search
      if (href === currentUrl) return

      // Start the smooth loading indicator
      setLoading(true)
      setProgress(25)

      // Trickle progress
      const trickle1 = setTimeout(() => setProgress(65), 150)
      const trickle2 = setTimeout(() => setProgress(85), 400)

      return () => {
        clearTimeout(trickle1)
        clearTimeout(trickle2)
      }
    }

    document.addEventListener('click', handleAnchorClick, { capture: true })
    return () => document.removeEventListener('click', handleAnchorClick, { capture: true })
  }, [])

  if (!loading && progress === 0) return null

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        zIndex: 99999,
        pointerEvents: 'none',
        background: 'transparent',
      }}
    >
      <div
        style={{
          position: 'relative',
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, transparent 0%, var(--c-accent, #d94f0a) 40%, #ff8c5a 100%)',
          boxShadow: '0 0 14px rgba(217, 79, 10, 0.9), 0 0 6px rgba(255, 140, 90, 0.6)',
          transition: progress === 100 ? 'width 0.22s ease-out, opacity 0.3s ease-out' : 'width 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          opacity: progress === 100 ? 0 : 1,
        }}
      >
        {/* Leading bright glowing head */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '-2px',
            bottom: '-2px',
            width: '100px',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.9))',
            boxShadow: '0 0 16px rgba(255, 150, 90, 1), 0 0 8px #fff',
            borderRadius: '9999px',
            opacity: progress === 100 ? 0 : 1,
            transition: 'opacity 0.2s ease-out',
          }}
        />
      </div>
    </div>
  )
}
