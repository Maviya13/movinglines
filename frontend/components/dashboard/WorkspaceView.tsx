'use client'

import { useState } from 'react'
import { ArrowUp, Plus, ChevronDown, Image as ImageIcon } from 'lucide-react'
import { Quality } from '@/lib/api'
import { Viewport } from './Viewport'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group'

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
  credits: number | null
  useImage: boolean
  setUseImage: (val: boolean) => void
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
  credits,
  useImage,
  setUseImage,
}: WorkspaceViewProps) {
  const [mobileTab, setMobileTab] = useState<'chat' | 'output'>('chat')

  const [activeDropdown, setActiveDropdown] = useState<'duration' | 'quality' | null>(null)

  const qualityOptions: { value: Quality; label: string }[] = [
    { value: 'l', label: '480p' },
    { value: 'm', label: '720p' },
    { value: 'h', label: '1080p' },
    { value: 'k', label: '4K' },
  ]

  const durationOptions = [15, 30, 45]

  return (
    <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative min-h-0 bg-[#0a0a0a]" onClick={() => setActiveDropdown(null)}>
      {/* Mobile Tabs */}
      <div className="md:hidden flex h-12 border-b border-white/5 bg-[#0a0a0a]">
        <button
          onClick={(e) => { e.stopPropagation(); setMobileTab('chat'); }}
          className={`flex-1 text-sm font-medium transition-colors ${mobileTab === 'chat'
            ? 'text-white border-b-2 border-white'
            : 'text-white/40'
            }`}
        >
          Create
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); setMobileTab('output'); }}
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
          {/* ... existing content ... */}
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

        {/* Controls - Integrated into InputGroup */}
        <div className="p-5 border-t border-white/5">
          <InputGroup className="flex-col">
            <textarea
              data-slot="input-group-control"
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
              className={`w-full min-h-20 resize-none bg-transparent px-4 pt-4 pb-14 text-sm text-white placeholder:text-white/30 outline-none ${isGenerating ? 'opacity-50' : ''}`}
            />
            <InputGroupAddon align="block-end">
              {/* Left side - Duration & Quality Dropdowns */}
              <div className="flex items-center gap-2">
                {/* Duration Dropdown */}
                <div className="relative">
                  <InputGroupButton
                    className="gap-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDropdown(activeDropdown === 'duration' ? null : 'duration');
                    }}
                  >
                    {duration}s
                    <ChevronDown className={`h-3 w-3 transition-transform ${activeDropdown === 'duration' ? 'rotate-180' : ''}`} />
                  </InputGroupButton>
                  {activeDropdown === 'duration' && (
                    <div className="absolute bottom-full left-0 mb-2 flex flex-col gap-1 p-1.5 rounded-lg bg-[#1a1a1a] border border-white/10 shadow-xl z-50">
                      {durationOptions.map((d) => (
                        <button
                          key={d}
                          onClick={(e) => { e.stopPropagation(); setDuration(d); setActiveDropdown(null); }}
                          disabled={isGenerating}
                          className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all ${duration === d
                            ? 'bg-white text-black'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                            }`}
                        >
                          {d} seconds
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {/* Quality Dropdown */}
                <div className="relative">
                  <InputGroupButton
                    className="gap-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDropdown(activeDropdown === 'quality' ? null : 'quality');
                    }}
                  >
                    {qualityOptions.find(q => q.value === quality)?.label || '720p'}
                    <ChevronDown className={`h-3 w-3 transition-transform ${activeDropdown === 'quality' ? 'rotate-180' : ''}`} />
                  </InputGroupButton>
                  {activeDropdown === 'quality' && (
                    <div className="absolute bottom-full left-0 mb-2 flex flex-col gap-1 p-1.5 rounded-lg bg-[#1a1a1a] border border-white/10 shadow-xl z-50">
                      {qualityOptions.map((q) => (
                        <button
                          key={q.value}
                          onClick={(e) => { e.stopPropagation(); setQuality(q.value); setActiveDropdown(null); }}
                          disabled={isGenerating}
                          className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all ${quality === q.value
                            ? 'bg-white text-black'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                            }`}
                        >
                          {q.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="h-4 w-px bg-white/10 mx-1" />

                {/* AI Image Toggle (Beta) - Inline Version */}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setUseImage(!useImage); }}
                  disabled={isGenerating}
                  title={useImage ? "AI Images: ON (Imagen 3)" : "AI Images: OFF (Auto Mode)"}
                  className={`group relative flex items-center gap-2 px-2 py-1 rounded-md border transition-all duration-300 ${useImage
                      ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                      : 'bg-white/5 border-white/5 text-white/40 hover:border-white/10 hover:bg-white/10'
                    }`}
                >
                  <div className="flex items-center gap-1.5">
                    <ImageIcon className={`h-3 w-3 transition-transform duration-300 ${useImage ? 'scale-110' : 'scale-100 opacity-60'}`} />
                    <span className="text-[10px] font-bold tracking-tight uppercase">AI Image</span>
                    <span className={`text-[7px] font-black px-1 py-0.5 rounded-[2px] tracking-widest leading-none ${useImage ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/40'}`}>BETA</span>
                  </div>

                  {/* Smaller Inline Switch */}
                  <div className={`relative w-5 h-2.5 rounded-full ml-1 transition-colors duration-300 ${useImage ? 'bg-blue-500' : 'bg-white/10'}`}>
                    <div className={`absolute top-0.5 left-0.5 w-1.5 h-1.5 rounded-full bg-white transition-all duration-300 ${useImage ? 'translate-x-2.5 shadow-[0_0_4px_white]' : 'translate-x-0'}`} />
                  </div>
                </button>
              </div>
              {/* Right side - Send button only (Credits removed as requested) */}
              <div className="flex items-center gap-3">
                <InputGroupButton
                  variant="default"
                  size="icon-sm"
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim() || credits === 0}
                  aria-label="Generate animation"
                  title={credits === 0 ? 'No credits remaining' : 'Generate animation'}
                >
                  <ArrowUp className="h-4 w-4" />
                </InputGroupButton>
              </div>
            </InputGroupAddon>
          </InputGroup>
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
