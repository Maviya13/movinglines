'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Cta({ onLaunchAction }: { onLaunchAction: () => void }) {
  return (
    <section className="w-full px-6 py-24 md:py-32 bg-black">
      <div className="max-w-5xl mx-auto dark-card p-10 md:p-16 text-center space-y-8 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

        <div className="space-y-4 relative z-10">
          <p className="text-[11px] font-medium tracking-[0.2em] text-blue-400 uppercase">Ready to Start?</p>
          <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-white/90">
            Create your first scene <br className="hidden md:block" /> in under a minute.
          </h3>
          <p className="text-sm md:text-lg text-white/40 max-w-xl mx-auto leading-relaxed">
            Join the new wave of technical creators using generative AI to skip the boilerplate and ship the vibe.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <button
            className="btn-primary h-12 px-10 text-[15px]"
            onClick={onLaunchAction}
          >
            Launch Studio
          </button>
          <Link
            href="mailto:team@movinglines.app"
            className="btn-ghost h-12 px-10 text-[15px]"
          >
            Contact Team
          </Link>
        </div>

        {/* Subtle Decorative Glow */}
        <div className="absolute -bottom-24 -right-24 w-64 h-64 glow-effect transition-transform group-hover:scale-110 duration-700" />
      </div>
    </section>
  )
}
