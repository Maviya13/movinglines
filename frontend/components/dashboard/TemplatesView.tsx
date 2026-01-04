'use client'

import { Copy, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

const templates = [
  {
    id: 1,
    title: 'Fourier Expansion',
    description: 'Animate rotating vectors constructing a square wave.',
    prompt: 'Create an animation showing rotating vectors in the complex plane that sum to form a square wave through Fourier series expansion',
  },
  {
    id: 2,
    title: 'Physics Simulation',
    description: 'Visualize a double pendulum with chaotic motion.',
    prompt: 'Animate a double pendulum system showing chaotic motion with trails tracking the end point',
  },
  {
    id: 3,
    title: 'Mathematical Transform',
    description: 'Show the transformation from a circle to an ellipse.',
    prompt: 'Create a smooth transformation animation morphing a circle into an ellipse with grid lines showing the deformation',
  },
]

export function TemplatesView() {
  const handleCopyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt)
    // You could add a toast notification here
  }

  return (
    <div className="flex-1 overflow-y-auto p-12">
      <div className="mb-8">
        <p className="bru-badge inline-block mb-3">Templates</p>
        <h2 className="text-3xl font-bold">Get started with examples</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        {templates.map((template) => (
          <div key={template.id} className="bru-card p-6 hover:translate-x-[2px] hover:translate-y-[2px] transition-transform">
            <div className="h-12 w-12 rounded-md border-2 border-border bru-shadow bg-main flex items-center justify-center mb-6">
              <Sparkles className="h-6 w-6 text-background" />
            </div>
            <h3 className="font-bold text-lg mb-2">{template.title}</h3>
            <p className="text-muted-foreground text-sm mb-6">{template.description}</p>
            <Button
              onClick={() => handleCopyPrompt(template.prompt)}
              className="w-full bru-button gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy Prompt
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
