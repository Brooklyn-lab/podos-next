'use client'

import { useState } from 'react'

export const SyncBooksyButton = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSync = async () => {
    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/reviews/sync-booksy', {
        method: 'POST',
        credentials: 'include',
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage(data.message)
      } else {
        setStatus('error')
        setMessage(data.error || 'Sync failed')
      }
    } catch {
      setStatus('error')
      setMessage('Network error')
    }
  }

  return (
    <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
      <button
        type='button'
        onClick={handleSync}
        disabled={status === 'loading'}
        style={{
          padding: '8px 16px',
          background: 'var(--theme-elevation-150)',
          border: '1px solid var(--theme-elevation-300)',
          borderRadius: 4,
          cursor: status === 'loading' ? 'wait' : 'pointer',
          color: 'var(--theme-text)',
          fontSize: 13,
        }}
      >
        {status === 'loading' ? 'Syncing...' : 'Sync from Booksy'}
      </button>
      {message && (
        <span
          style={{ fontSize: 13, color: status === 'error' ? 'var(--theme-error-500)' : 'var(--theme-success-500)' }}
        >
          {message}
        </span>
      )}
    </div>
  )
}
