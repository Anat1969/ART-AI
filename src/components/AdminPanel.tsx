'use client'

import { useState } from 'react'
import { Gallery, Artwork, GalleryInsert, ArtworkInsert } from '@/types/database'
import { createGallery, deleteGallery } from '@/lib/actions/galleries'
import { createArtwork, deleteArtwork } from '@/lib/actions/artworks'

interface AdminPanelProps {
  galleries: Gallery[]
  artworks: Artwork[]
}

type Tab = 'galleries' | 'artworks'

export function AdminPanel({ galleries: initialGalleries, artworks: initialArtworks }: AdminPanelProps) {
  const [tab, setTab] = useState<Tab>('galleries')
  const [galleries, setGalleries] = useState(initialGalleries)
  const [artworks, setArtworks] = useState(initialArtworks)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Gallery form state
  const [gName, setGName] = useState('')
  const [gDesc, setGDesc] = useState('')
  const [gSlug, setGSlug] = useState('')
  const [gCat, setGCat] = useState('')

  // Artwork form state
  const [aTitle, setATitle] = useState('')
  const [aGalleryId, setAGalleryId] = useState('')
  const [aTopic, setATopic] = useState('')
  const [aImageUrl, setAImageUrl] = useState('')
  const [aStyle, setAStyle] = useState('')
  const [aTags, setATags] = useState('')
  const [aYear, setAYear] = useState('')
  const [aConcept, setAConcept] = useState('')

  async function handleCreateGallery(e: React.FormEvent) {
    e.preventDefault()
    if (!gName.trim()) return
    setBusy(true)
    setError(null)
    const payload: GalleryInsert = {
      name: gName.trim(),
      description: gDesc || null,
      slug: gSlug || gName.toLowerCase().replace(/\s+/g, '-'),
      category: gCat || null,
    }
    const { data, error } = await createGallery(payload)
    if (error) { setError(error) } else if (data) {
      setGalleries(prev => [data, ...prev])
      setGName(''); setGDesc(''); setGSlug(''); setGCat('')
    }
    setBusy(false)
  }

  async function handleDeleteGallery(id: string) {
    if (!confirm('למחוק גלריה זו ואת כל היצירות שלה?')) return
    setBusy(true)
    const { error } = await deleteGallery(id)
    if (error) setError(error)
    else setGalleries(prev => prev.filter(g => g.id !== id))
    setBusy(false)
  }

  async function handleCreateArtwork(e: React.FormEvent) {
    e.preventDefault()
    if (!aTitle.trim() || !aGalleryId) return
    setBusy(true)
    setError(null)
    const payload: ArtworkInsert = {
      title: aTitle.trim(),
      gallery_id: aGalleryId,
      topic: aTopic || null,
      image_url: aImageUrl || null,
      style: aStyle || null,
      tags: aTags ? aTags.split(',').map(t => t.trim()).filter(Boolean) : null,
      year: aYear ? parseInt(aYear) : null,
      concept: aConcept || null,
    }
    const { data, error } = await createArtwork(payload)
    if (error) { setError(error) } else if (data) {
      setArtworks(prev => [data, ...prev])
      setATitle(''); setAGalleryId(''); setATopic(''); setAImageUrl('')
      setAStyle(''); setATags(''); setAYear(''); setAConcept('')
    }
    setBusy(false)
  }

  async function handleDeleteArtwork(id: string) {
    if (!confirm('למחוק יצירה זו?')) return
    setBusy(true)
    const { error } = await deleteArtwork(id)
    if (error) setError(error)
    else setArtworks(prev => prev.filter(a => a.id !== id))
    setBusy(false)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-6">פאנל ניהול</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-border">
        {(['galleries', 'artworks'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
              tab === t ? 'border-accent text-accent' : 'border-transparent text-muted hover:text-foreground'
            }`}
          >
            {t === 'galleries' ? 'גלריות' : 'יצירות'}
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-950 border border-red-800 rounded text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Galleries tab */}
      {tab === 'galleries' && (
        <div className="space-y-6">
          <form onSubmit={handleCreateGallery} className="card p-5 space-y-3">
            <h2 className="font-semibold text-foreground">גלריה חדשה</h2>
            <input value={gName} onChange={e => setGName(e.target.value)} placeholder="שם הגלריה *" className="input" required />
            <input value={gDesc} onChange={e => setGDesc(e.target.value)} placeholder="תיאור" className="input" />
            <div className="grid grid-cols-2 gap-3">
              <input value={gSlug} onChange={e => setGSlug(e.target.value)} placeholder="slug (אוטומטי)" className="input" />
              <input value={gCat} onChange={e => setGCat(e.target.value)} placeholder="קטגוריה" className="input" />
            </div>
            <button type="submit" disabled={busy} className="btn-primary">
              {busy ? '...' : 'צרי גלריה'}
            </button>
          </form>

          <div className="space-y-2">
            {galleries.map(g => (
              <div key={g.id} className="card p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-foreground">{g.name}</p>
                  <p className="text-muted text-xs">{g.slug} · {g.category}</p>
                </div>
                <button
                  onClick={() => handleDeleteGallery(g.id)}
                  disabled={busy}
                  className="btn-danger min-h-0 h-9 px-3 text-sm"
                >
                  מחקי
                </button>
              </div>
            ))}
            {galleries.length === 0 && <p className="text-muted text-sm text-center py-6">אין גלריות</p>}
          </div>
        </div>
      )}

      {/* Artworks tab */}
      {tab === 'artworks' && (
        <div className="space-y-6">
          <form onSubmit={handleCreateArtwork} className="card p-5 space-y-3">
            <h2 className="font-semibold text-foreground">יצירה חדשה</h2>
            <div className="grid grid-cols-2 gap-3">
              <input value={aTitle} onChange={e => setATitle(e.target.value)} placeholder="כותרת *" className="input" required />
              <select value={aGalleryId} onChange={e => setAGalleryId(e.target.value)} className="input" required>
                <option value="">בחרי גלריה *</option>
                {galleries.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
              </select>
            </div>
            <input value={aImageUrl} onChange={e => setAImageUrl(e.target.value)} placeholder="URL תמונה" className="input" />
            <input value={aTopic} onChange={e => setATopic(e.target.value)} placeholder="נושא" className="input" />
            <textarea value={aConcept} onChange={e => setAConcept(e.target.value)} placeholder="קונספט" className="input h-20 resize-none" />
            <div className="grid grid-cols-3 gap-3">
              <input value={aStyle} onChange={e => setAStyle(e.target.value)} placeholder="סגנון" className="input" />
              <input value={aYear} onChange={e => setAYear(e.target.value)} placeholder="שנה" type="number" className="input" />
              <input value={aTags} onChange={e => setATags(e.target.value)} placeholder="תגיות (פסיק)" className="input" />
            </div>
            <button type="submit" disabled={busy} className="btn-primary">
              {busy ? '...' : 'צרי יצירה'}
            </button>
          </form>

          <div className="space-y-2">
            {artworks.map(a => (
              <div key={a.id} className="card p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-foreground">{a.title}</p>
                  <p className="text-muted text-xs">{a.style} · {a.year}</p>
                </div>
                <button
                  onClick={() => handleDeleteArtwork(a.id)}
                  disabled={busy}
                  className="btn-danger min-h-0 h-9 px-3 text-sm"
                >
                  מחקי
                </button>
              </div>
            ))}
            {artworks.length === 0 && <p className="text-muted text-sm text-center py-6">אין יצירות</p>}
          </div>
        </div>
      )}
    </div>
  )
}
