'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    })

    if (error) setError(error.message)
    else setSent(true)
    setLoading(false)
  }

  async function handleGoogleLogin() {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  if (sent) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="card p-8 max-w-md w-full text-center space-y-4">
          <span className="text-5xl">📧</span>
          <h1 className="text-xl font-bold text-foreground">בדקי את המייל שלך</h1>
          <p className="text-muted text-sm">
            שלחנו לינק כניסה לכתובת <strong className="text-foreground">{email}</strong>
          </p>
          <button onClick={() => setSent(false)} className="btn-ghost w-full">
            חזרי
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="card p-8 max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">כניסה</h1>
          <p className="text-muted text-sm mt-1">כדי לשמור מועדפות ולנהל גלריות</p>
        </div>

        <button onClick={handleGoogleLogin} className="btn-ghost w-full gap-3">
          <span>G</span> כניסה עם Google
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <span className="text-muted text-xs">או</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <form onSubmit={handleLogin} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="כתובת אימייל"
            className="input"
            required
            dir="ltr"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'שולחת...' : 'שלחי קישור כניסה'}
          </button>
        </form>
      </div>
    </main>
  )
}
