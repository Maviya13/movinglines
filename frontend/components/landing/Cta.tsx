'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Cta({ onLaunch }: { onLaunch: () => void }) {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-16">
      <div className="bru-card p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3">
          <p className="bru-badge">Ready to build</p>
          <h3 className="text-3xl font-black">Launch a scene in under a minute.</h3>
          <p className="text-sm md:text-base text-foreground/80 max-w-2xl">
            Sign in, drop a prompt, and watch the renderer queue your first cut. The brutalist UI keeps every control obvious and auditable.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button className="bru-button" onClick={onLaunch}>
            Launch now
          </Button>
          <Button variant="outline" className="bru-ghost" asChild>
            <Link href="mailto:team@movinglines.app">Book a demo</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
