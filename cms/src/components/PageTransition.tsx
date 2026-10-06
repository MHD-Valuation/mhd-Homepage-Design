'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isNavigating, setIsNavigating] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)

  useEffect(() => {
    // When pathname changes or children update
    setIsNavigating(true)
    const t = setTimeout(() => {
      setDisplayChildren(children)
      setIsNavigating(false)
    }, 120)

    return () => clearTimeout(t)
  }, [pathname, children])

  return (
    <div
      key={pathname}
      className="mhd-page-transition"
      style={{
        opacity: isNavigating ? 0.88 : 1,
        transform: isNavigating ? 'translateY(4px)' : 'translateY(0)',
        transition: 'opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1), transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity, transform',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {displayChildren}
    </div>
  )
}
