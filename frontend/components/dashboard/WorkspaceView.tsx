'use client'

import { useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { Quality } from '@/lib/api'
import { Viewport } from './Viewport'

interface WorkspaceViewProps {
  activeChatId: string | null
  prompt: string
  setPrompt: (prompt: string) => void
  quality: Quality
  setQuality: (quality: Quality) => void
  duration: number
  setDuration: (duration: number) => void
  isGenerating: boolean
  status: string
  progress: number
  error: string
  videoUrl: string | null
  generatedCode: string
  handleGenerate: () => void
}

export function WorkspaceView({
  activeChatId,
  prompt,
  setPrompt,
  quality,
  setQuality,
  duration,
  setDuration,
  isGenerating,
  status,
  progress,
  error,
  videoUrl,
  generatedCode,
  handleGenerate,
}: WorkspaceViewProps) {
  const [mobileTab, setMobileTab] = useState<'chat' | 'output'>('chat')

  const qualityOptions: { value: Quality; label: string }[] = [
    { value: 'l', label: '480p' },
    { value: 'm', label: '720p' },
    { value: 'h', label: '1080p' },
    { value: 'k', label: '4K' },
  ]

  const durationOptions = [15, 30, 45]

  return (
    <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative min-h-0 bg-[#0a0a0a]">
      {/* Mobile Tabs */}
      <div className="md:hidden flex h-12 border-b border-white/5 bg-[#0a0a0a]">
        <button
          onClick={() => setMobileTab('chat')}
          className={`flex-1 text-sm font-medium transition-colors ${mobileTab === 'chat'
            ? 'text-white border-b-2 border-white'
            : 'text-white/40'
            }`}
        >
          Create
        </button>
        <button
          onClick={() => setMobileTab('output')}
          className={`flex-1 text-sm font-medium transition-colors ${mobileTab === 'output'
            ? 'text-white border-b-2 border-white'
            : 'text-white/40'
            }`}
        >
          Preview
        </button>
      </div>

      {/* Input Pane */}
      <div className={`${mobileTab === 'chat' ? 'flex' : 'hidden'} md:flex w-full md:w-[420px] border-r border-white/5 flex-col bg-[#0a0a0a]`}>

        {/* Status Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Empty state - show when not generating, no video, no error */}
          {!isGenerating && !error && !videoUrl && (
            <div className="h-full flex items-center justify-center">
              <div className="text-center space-y-4 max-w-xs">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 flex items-center justify-center">
                  <span className="text-3xl">✨</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Create Animation</h3>
                  <p className="text-sm text-white/40 mt-1">
                    Describe what you want to visualize and we'll generate an animation for you.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-5">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Success state */}
          {videoUrl && !isGenerating && !error && (
            <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <span className="text-green-400">✓</span>
                </div>
                <span className="text-sm font-medium text-green-400">Animation complete!</span>
              </div>
            </div>
          )}

          {/* Generating state - just show a simple message, loader is in preview */}
          {isGenerating && (
            <div className="h-full flex items-center justify-center">
              <div className="text-center space-y-2">
                <p className="text-sm text-white/50">Generating your animation...</p>
                <p className="text-xs text-white/30">Check the preview panel for progress</p>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-5 border-t border-white/5 space-y-5">
          {/* Settings Row */}
          <div className="flex items-center gap-6">
            {/* Duration */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/40">Duration</label>
              <div className="flex gap-1 p-1 rounded-lg bg-white/5">
                {durationOptions.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    disabled={isGenerating}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${duration === d
                      ? 'bg-white text-black'
                      : 'text-white/50 hover:text-white hover:bg-white/10'
                      } ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {d}s
                  </button>
                ))}
              </div>
            </div>

            {/* Quality */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/40">Quality</label>
              <div className="flex gap-1 p-1 rounded-lg bg-white/5">
                {qualityOptions.map((q) => (
                  <button
                    key={q.value}
                    onClick={() => setQuality(q.value)}
                    disabled={isGenerating}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${quality === q.value
                      ? 'bg-white text-black'
                      : 'text-white/50 hover:text-white hover:bg-white/10'
                      } ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="relative">
            <textarea
              id="animation-prompt"
              name="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleGenerate()
                }
              }}
              placeholder="Describe your animation..."
              aria-label="Animation description"
              disabled={isGenerating}
              className={`w-full p-4 pr-14 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder:text-white/30 focus:border-white/20 focus:ring-0 outline-none resize-none h-28 transition-colors ${isGenerating ? 'opacity-50' : ''}`}
            />
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              aria-label="Generate animation"
              title="Generate animation"
              className="absolute bottom-4 right-4 w-10 h-10 rounded-lg bg-white text-black flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/90 transition-colors"
            >
              <ArrowUp className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Viewport Pane - now receives generation state */}
      <Viewport
        videoUrl={videoUrl}
        generatedCode={generatedCode}
        mobileTab={mobileTab}
        isGenerating={isGenerating}
        status={status}
        progress={progress}
      />
    </div>
  )
}
