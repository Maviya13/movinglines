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

export function Showcase() {
  return (
    <section id="showcase" className="max-w-6xl mx-auto px-4 md:px-6 py-16 space-y-10">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <p className="bru-badge">Showcase</p>
          <h2 className="text-3xl md:text-4xl mt-3">Scenes you can ship today.</h2>
        </div>
        <Badge className="bru-badge">Works with Manim</Badge>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {showcases.map((item) => (
          <Card key={item.title} className="bru-card h-full bg-secondary">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {item.title}
                <span className="text-xs uppercase font-bold">{item.accent}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="aspect-video rounded-md border-2 border-border bg-gradient-to-br from-background to-secondary flex items-center justify-center text-sm font-semibold">
                Preview placeholder
              </div>
              <p className="text-sm leading-relaxed text-foreground/80">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
