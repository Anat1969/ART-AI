import Link from 'next/link'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-bg/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* App name — links home */}
        <Link
          href="/"
          className="text-lg font-bold text-accent hover:text-accent-dim transition-colors shrink-0"
        >
          ART-AI
        </Link>

        {/* Content navigation */}
        <nav className="flex items-center gap-1 text-sm">
          <Link href="/" className="px-3 py-2 rounded text-muted hover:text-foreground hover:bg-surface transition-colors">
            גלריות
          </Link>
          <Link href="/favorites" className="px-3 py-2 rounded text-muted hover:text-foreground hover:bg-surface transition-colors">
            מועדפים
          </Link>
        </nav>

        {/* A&I logo button — all editing/dev actions live here */}
        <ai-menu />
      </div>
    </header>
  )
}
