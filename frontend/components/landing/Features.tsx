'use client'

import Link from 'next/link'
import { ArrowRight, Cpu, ShieldCheck, Sparkles, Wand2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    icon: Sparkles,
    title: 'Prompt-first creation',
    body: 'Describe your idea and ship a Manim-ready animation with precise camera moves and timings.',
  },
  {
    icon: Cpu,
    title: 'Optimized rendering',
    body: 'GPU-friendly defaults and queued render jobs keep your workflow smooth.',
  },
  {
    icon: ShieldCheck,
    title: 'Team-safe access',
    body: 'Role-aware auth, audit trails, and project-scoped secrets out of the box.',
  },
  {
    icon: Wand2,
    title: 'Autofix + iterate',
    body: 'Guided repair flows catch syntax hiccups and suggest better camera paths automatically.',
  },
]

export function Features() {
  return (
    <section id="features" className="w-full px-6 py-24 md:py-32 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <p className="text-[11px] font-medium tracking-[0.2em] text-blue-400 uppercase">Capabilities</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white/90">
              Built for precision, <br /> designed for the vibe.
            </h2>
          </div>
          <Link
            href="/showcase"
            className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-2 group"
          >
            Explore all features
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-sm overflow-hidden">
          {features.map((feature) => (
            <div key={feature.title} className="bg-black p-8 md:p-10 space-y-6 transition-colors hover:bg-white/2">
              <div className="h-10 w-10 rounded-xs bg-white/5 border border-white/10 flex items-center justify-center">
                <feature.icon className="h-5 w-5 text-white/70" />
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-white/90">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-white/40">{feature.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
