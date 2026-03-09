'use client'

import Link from 'next/link'
import React from 'react'

export const BulkUploadNavLink: React.FC = () => {
  return (
    <Link
      href='/admin/bulk-upload'
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '4px 16px',
        fontSize: 13,
        color: 'var(--theme-elevation-400)',
        textDecoration: 'none',
        transition: 'color 0.15s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--theme-text)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--theme-elevation-400)'
      }}
    >
      ↑ Bulk Upload
    </Link>
  )
}
