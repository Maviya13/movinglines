'use client'

import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t-2 border-border bg-secondary-background mt-8">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-semibold">MovingLines</span>
        </div>
        <div className="flex items-center gap-4 text-sm font-semibold uppercase tracking-tight">
          <Link href="/features">Features</Link>
          <Link href="/showcase">Showcase</Link>
          <Link href="/api/docs">Docs</Link>
        </div>
        <p className="text-xs text-foreground/70">Built with Bun + Next.js</p>
      </div>
    </footer>
  )
}
