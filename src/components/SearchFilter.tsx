'use client'

import { useState, useTransition } from 'react'

const STYLES = ['abstract', 'realistic', 'geometric', 'surrealist', 'minimalist', 'expressionist']

interface SearchFilterProps {
  onSearch: (query: string, style?: string, tags?: string[]) => void
}

export function SearchFilter({ onSearch }: SearchFilterProps) {
  const [query, setQuery] = useState('')
  const [style, setStyle] = useState('')
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    startTransition(() => onSearch(query, style || undefined))
  }

  function clearFilters() {
    setQuery('')
    setStyle('')
    startTransition(() => onSearch(''))
  }

  const hasFilters = query || style

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="חיפוש יצירות..."
          className="input flex-1"
          dir="rtl"
        />
        <button type="submit" className="btn-primary" disabled={isPending}>
          {isPending ? '...' : 'חפשי'}
        </button>
        {hasFilters && (
          <button type="button" onClick={clearFilters} className="btn-ghost">
            נקי
          </button>
        )}
      </div>

      {/* Style filter chips */}
      <div className="flex flex-wrap gap-2">
        {STYLES.map(s => (
          <button
            key={s}
            type="button"
            onClick={() => {
              const next = style === s ? '' : s
              setStyle(next)
              startTransition(() => onSearch(query, next || undefined))
            }}
            className={style === s ? 'tag-active' : 'tag hover:border-border hover:text-foreground'}
          >
            {s}
          </button>
        ))}
      </div>
    </form>
  )
}
