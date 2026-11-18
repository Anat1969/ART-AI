'use client'

import { useState } from 'react'
import { Artwork } from '@/types/database'

interface ShareExportProps {
  artwork: Artwork
}

export function ShareExport({ artwork }: ShareExportProps) {
  const [copied, setCopied] = useState(false)

  async function copyLink() {
    const url = `${window.location.origin}/artworks/${artwork.id}`
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copyLink}
      className="btn-ghost min-h-0 h-9 px-3 text-sm"
      title="העתק קישור"
    >
      {copied ? '✓ הועתק' : '🔗 שתפי'}
    </button>
  )
}
