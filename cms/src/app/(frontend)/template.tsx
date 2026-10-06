import React from 'react'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="mhd-page-enter" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {children}
    </div>
  )
}
