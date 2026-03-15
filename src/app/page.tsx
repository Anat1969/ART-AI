export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      {/* Logo / Brand */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-bg font-bold text-xl">A</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            ART<span className="text-accent">-AI</span>
          </h1>
        </div>
        <p className="text-muted text-lg max-w-md">
          פלטפורמת תיק עבודות לאומנית AI ואדריכלית
        </p>
      </div>

      {/* Status badge */}
      <div className="neon-border rounded-full px-6 py-3 mb-12">
        <span className="text-accent text-sm font-medium">
          🚀 הפלטפורמה בבנייה — בקרוב
        </span>
      </div>

      {/* DB Schema info */}
      <div className="card p-6 max-w-lg w-full text-right">
        <h2 className="text-lg font-semibold mb-3 text-accent">סטטוס הגדרה</h2>
        <ul className="space-y-2 text-sm text-muted">
          <li className="flex items-center gap-2">
            <span className="text-accent">✓</span>
            Next.js 14 + TypeScript + Tailwind CSS
          </li>
          <li className="flex items-center gap-2">
            <span className="text-accent">✓</span>
            Supabase Client (Browser + Server)
          </li>
          <li className="flex items-center gap-2">
            <span className="text-accent">✓</span>
            DB Schema: galleries, artworks, favorites
          </li>
          <li className="flex items-center gap-2">
            <span className="text-accent">✓</span>
            RLS Policies — public read, admin write
          </li>
          <li className="flex items-center gap-2">
            <span className="text-accent">✓</span>
            RTL Hebrew — Heebo Font
          </li>
          <li className="flex items-center gap-2">
            <span className="text-muted">○</span>
            קומפוננטים — בהמתנה לאישור
          </li>
        </ul>
      </div>
    </main>
  );
}
