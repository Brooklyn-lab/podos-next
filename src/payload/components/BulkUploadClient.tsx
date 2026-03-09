'use client'

import React, { useState, useCallback, useRef } from 'react'
import type { DragEvent, ChangeEvent } from 'react'

type UploadStatus = 'pending' | 'uploading' | 'success' | 'error'

type FileItem = {
  file: File
  status: UploadStatus
  error?: string
  preview?: string
}

const styles = {
  wrapper: {
    maxWidth: 960,
    margin: '0 auto',
    padding: '40px 20px',
  } as React.CSSProperties,
  heading: {
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 24,
    color: 'var(--theme-text)',
  } as React.CSSProperties,
  controls: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
    marginBottom: 24,
  } as React.CSSProperties,
  label: {
    display: 'block',
    fontSize: 13,
    fontWeight: 500,
    marginBottom: 6,
    color: 'var(--theme-text)',
  } as React.CSSProperties,
  hint: {
    fontSize: 12,
    color: 'var(--theme-elevation-500)',
    marginTop: 4,
  } as React.CSSProperties,
  input: {
    width: '100%',
    height: 'var(--theme-input-height, 40px)',
    padding: '0 12px',
    border: '1px solid var(--theme-elevation-150)',
    borderRadius: 4,
    backgroundColor: 'var(--theme-input-bg, var(--theme-elevation-50))',
    color: 'var(--theme-text)',
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box' as const,
  } as React.CSSProperties,
  dropzone: {
    border: '2px dashed var(--theme-elevation-150)',
    borderRadius: 8,
    padding: '40px 20px',
    textAlign: 'center' as const,
    cursor: 'pointer',
    transition: 'border-color 0.15s, background-color 0.15s',
    backgroundColor: 'var(--theme-elevation-50)',
    marginBottom: 24,
  } as React.CSSProperties,
  dropzoneActive: {
    borderColor: 'var(--theme-success-500)',
    backgroundColor: 'var(--theme-elevation-100)',
  } as React.CSSProperties,
  dropzoneText: {
    fontSize: 15,
    color: 'var(--theme-elevation-400)',
    margin: 0,
  } as React.CSSProperties,
  fileList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: 12,
    marginBottom: 24,
  } as React.CSSProperties,
  fileCard: {
    position: 'relative' as const,
    border: '1px solid var(--theme-elevation-150)',
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: 'var(--theme-elevation-50)',
  } as React.CSSProperties,
  fileThumb: {
    width: '100%',
    height: 140,
    objectFit: 'cover' as const,
    display: 'block',
    backgroundColor: 'var(--theme-elevation-100)',
  } as React.CSSProperties,
  fileInfo: {
    padding: '8px 10px',
    fontSize: 12,
    color: 'var(--theme-text)',
    wordBreak: 'break-all' as const,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as React.CSSProperties,
  removeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--theme-error-500)',
    cursor: 'pointer',
    fontSize: 16,
    lineHeight: 1,
    padding: '2px 4px',
    flexShrink: 0,
  } as React.CSSProperties,
  statusOverlay: {
    position: 'absolute' as const,
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 28,
    pointerEvents: 'none' as const,
  } as React.CSSProperties,
  actions: {
    display: 'flex',
    gap: 12,
    alignItems: 'center',
  } as React.CSSProperties,
  btn: {
    padding: '10px 20px',
    borderRadius: 4,
    border: 'none',
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'opacity 0.15s',
  } as React.CSSProperties,
  btnPrimary: {
    backgroundColor: 'var(--theme-text)',
    color: 'var(--theme-bg)',
  } as React.CSSProperties,
  btnSecondary: {
    backgroundColor: 'var(--theme-elevation-150)',
    color: 'var(--theme-text)',
  } as React.CSSProperties,
  progress: {
    fontSize: 14,
    color: 'var(--theme-elevation-400)',
  } as React.CSSProperties,
}

export const BulkUploadClient: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([])
  const [folder, setFolder] = useState('')
  const [altPattern, setAltPattern] = useState('{filename}')
  const [isUploading, setIsUploading] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const addFiles = useCallback((selected: FileList | null) => {
    if (!selected) return
    const items: FileItem[] = Array.from(selected).map((file) => ({
      file,
      status: 'pending' as const,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
    }))
    setFiles((prev) => [...prev, ...items])
  }, [])

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragOver(false)
      addFiles(e.dataTransfer.files)
    },
    [addFiles]
  )

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback(() => setIsDragOver(false), [])

  const handleFileInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      addFiles(e.target.files)
      if (inputRef.current) inputRef.current.value = ''
    },
    [addFiles]
  )

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => {
      const item = prev[index]
      if (item?.preview) URL.revokeObjectURL(item.preview)
      return prev.filter((_, i) => i !== index)
    })
  }, [])

  const uploadAll = useCallback(async () => {
    setIsUploading(true)

    for (let i = 0; i < files.length; i++) {
      if (files[i].status === 'success') continue

      setFiles((prev) => prev.map((f, idx) => (idx === i ? { ...f, status: 'uploading' } : f)))

      try {
        const item = files[i]
        const formData = new FormData()
        formData.append('file', item.file)

        const alt = altPattern
          .replace('{filename}', item.file.name.replace(/\.[^.]+$/, ''))
          .replace('{index}', String(i + 1))

        const payload: Record<string, string> = { alt }
        if (folder.trim()) payload.folder = folder.trim()
        formData.append('_payload', JSON.stringify(payload))

        const res = await fetch('/api/media', {
          method: 'POST',
          body: formData,
          credentials: 'include',
        })

        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data?.errors?.[0]?.message || `HTTP ${res.status}`)
        }

        setFiles((prev) => prev.map((f, idx) => (idx === i ? { ...f, status: 'success' } : f)))
      } catch (error) {
        setFiles((prev) => prev.map((f, idx) => (idx === i ? { ...f, status: 'error', error: String(error) } : f)))
      }
    }

    setIsUploading(false)
  }, [files, folder, altPattern])

  const clearCompleted = useCallback(() => {
    setFiles((prev) => {
      for (const f of prev) {
        if (f.status === 'success' && f.preview) URL.revokeObjectURL(f.preview)
      }
      return prev.filter((f) => f.status !== 'success')
    })
  }, [])

  const clearAll = useCallback(() => {
    for (const f of files) {
      if (f.preview) URL.revokeObjectURL(f.preview)
    }
    setFiles([])
  }, [files])

  const pending = files.filter((f) => f.status === 'pending' || f.status === 'error').length
  const done = files.filter((f) => f.status === 'success').length

  const statusBg: Record<UploadStatus, string> = {
    pending: 'transparent',
    uploading: 'rgba(0,0,0,0.35)',
    success: 'rgba(37,175,96,0.25)',
    error: 'rgba(220,53,69,0.25)',
  }

  const statusIcon: Record<UploadStatus, string> = {
    pending: '',
    uploading: '⏳',
    success: '✓',
    error: '✗',
  }

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.heading}>Bulk Upload</h1>

      <div style={styles.controls}>
        <div>
          <label style={styles.label}>Folder</label>
          <input
            type='text'
            placeholder='e.g. certificates'
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            style={styles.input}
            disabled={isUploading}
          />
          <p style={styles.hint}>Leave empty for root /media/</p>
        </div>
        <div>
          <label style={styles.label}>Alt text pattern</label>
          <input
            type='text'
            value={altPattern}
            onChange={(e) => setAltPattern(e.target.value)}
            style={styles.input}
            disabled={isUploading}
          />
          <p style={styles.hint}>
            {'{filename}'} = file name, {'{index}'} = number
          </p>
        </div>
      </div>

      <div
        style={{ ...styles.dropzone, ...(isDragOver ? styles.dropzoneActive : {}) }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
      >
        <p style={styles.dropzoneText}>{isDragOver ? 'Drop files here' : 'Drag & drop images or click to select'}</p>
        <input
          ref={inputRef}
          type='file'
          multiple
          accept='image/*'
          onChange={handleFileInput}
          style={{ display: 'none' }}
        />
      </div>

      {files.length > 0 && (
        <>
          <div style={styles.fileList}>
            {files.map((item, idx) => (
              <div key={`${item.file.name}-${idx}`} style={styles.fileCard}>
                {item.preview ? (
                  <img src={item.preview} alt='' style={styles.fileThumb} />
                ) : (
                  <div
                    style={{
                      ...styles.fileThumb,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--theme-elevation-300)',
                      fontSize: 13,
                    }}
                  >
                    No preview
                  </div>
                )}
                <div
                  style={{
                    ...styles.statusOverlay,
                    backgroundColor: statusBg[item.status],
                    color:
                      item.status === 'success'
                        ? 'var(--theme-success-500)'
                        : item.status === 'error'
                          ? 'var(--theme-error-500)'
                          : '#fff',
                  }}
                >
                  {statusIcon[item.status]}
                </div>
                <div style={styles.fileInfo}>
                  <span>{item.file.name}</span>
                  {item.status !== 'uploading' && (
                    <button type='button' style={styles.removeBtn} onClick={() => removeFile(idx)} title='Remove'>
                      ×
                    </button>
                  )}
                </div>
                {item.status === 'error' && item.error && (
                  <div style={{ padding: '0 10px 8px', fontSize: 11, color: 'var(--theme-error-500)' }}>
                    {item.error}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={styles.actions}>
            <button
              type='button'
              style={{ ...styles.btn, ...styles.btnPrimary, opacity: isUploading || !pending ? 0.5 : 1 }}
              disabled={isUploading || !pending}
              onClick={uploadAll}
            >
              Upload {pending} file{pending !== 1 ? 's' : ''}
            </button>
            {done > 0 && (
              <button
                type='button'
                style={{ ...styles.btn, ...styles.btnSecondary }}
                onClick={clearCompleted}
                disabled={isUploading}
              >
                Clear completed ({done})
              </button>
            )}
            <button
              type='button'
              style={{ ...styles.btn, ...styles.btnSecondary }}
              onClick={clearAll}
              disabled={isUploading}
            >
              Clear all
            </button>
            {isUploading && <span style={styles.progress}>Uploading…</span>}
          </div>
        </>
      )}
    </div>
  )
}
