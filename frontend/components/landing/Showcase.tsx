'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const showcases = [
  {
    title: 'Complex plane morphs',
    description: 'Render conformal maps with synchronized labels and easing curves.',
    accent: 'Real-time preview',
  },
  {
    title: 'Physics simulations',
    description: 'Animate rigid body orbits with collision highlights and overlays.',
    accent: 'Collision aware',
  },
  {
    title: 'Interactive explainers',
    description: 'Export crisp assets for docs, decks, or interactive demos.',
    accent: 'Multi-format export',
  },
]

import { ArrowRight, Play, Sparkles } from 'lucide-react'

export function Showcase() {
  return (
    <section id="showcase" className="w-full px-6 py-24 md:py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 text-left">
          <div className="space-y-4">
            <p className="text-[11px] font-medium tracking-[0.2em] text-white/30 uppercase">In Action</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white/90">
              Scenes you can ship today.
            </h2>
          </div>
          <p className="text-sm text-white/40 max-w-sm">
            High-fidelity mathematical visualizations, optimized for the browser and ready for production.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {showcases.map((item) => (
            <div key={item.title} className="dark-card p-1 group">
              <div className="aspect-video bg-black/50 overflow-hidden relative border border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <Play className="h-4 w-4 fill-white text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-[15px] font-medium text-white/90">{item.title}</h3>
                  <span className="text-[10px] text-white/30 font-mono">{item.accent}</span>
                </div>
                <p className="text-sm text-white/40 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
