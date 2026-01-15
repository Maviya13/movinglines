'use client'

import { useState, useMemo } from 'react'
import { Box, Download, Code2, Play, Loader2 } from 'lucide-react'
import CodeViewer from './CodeViewer'

interface ViewportProps {
  videoUrl: string | null
  generatedCode: string
  mobileTab?: 'chat' | 'output'
  isGenerating?: boolean
  status?: string
  progress?: number
}

// Loading states for animation generation


export function Viewport({
  videoUrl,
  generatedCode,
  mobileTab,
  isGenerating = false,
  status = '',
  progress = 0,
}: ViewportProps) {
  const [activeTab, setActiveTab] = useState<'viewport' | 'source'>('viewport')



  const handleDownload = async (url: string) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = downloadUrl
      a.download = `animation.mp4`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(downloadUrl)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download failed:', error)
      window.open(url, '_blank')
    }
  }

  return (
    <div className={`${mobileTab === 'output' ? 'flex' : 'hidden'} md:flex flex-1 flex-col bg-[#0a0a0a] min-h-0 relative`}>
      {/* Tab Bar */}
      <div className="h-12 border-b border-white/5 flex px-6 items-center gap-6 flex-shrink-0">
        <button
          onClick={() => setActiveTab('viewport')}
          className={`text-sm font-medium h-full flex items-center gap-2 transition-colors ${activeTab === 'viewport'
            ? 'border-b-2 border-white text-white'
            : 'text-white/40 hover:text-white'
            }`}
        >
          <Play className="h-4 w-4" />
          Preview
        </button>
        <button
          onClick={() => setActiveTab('source')}
          className={`text-sm font-medium h-full flex items-center gap-2 transition-colors ${activeTab === 'source'
            ? 'border-b-2 border-white text-white'
            : 'text-white/40 hover:text-white'
            }`}
        >
          <Code2 className="h-4 w-4" />
          Code
        </button>
      </div>



      {activeTab === 'viewport' ? (
        <div className="flex-1 flex items-center justify-center p-6 lg:p-8 bg-[#111] overflow-hidden">
          {isGenerating ? (
            <div className="w-full max-w-2xl aspect-video rounded-xl border border-white/10 bg-white/5 flex flex-col items-center justify-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full border-2 border-white/5 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                </div>
                <div className="absolute inset-0 rounded-full border-t-2 border-blue-500 animate-[spin_2s_linear_infinite]" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm font-medium text-white/70 animate-pulse uppercase tracking-widest">
                  {status.replace(/_/g, ' ') || 'Processing'}
                </span>
                <span className="text-[10px] text-white/30 tabular-nums">
                  {Math.round(progress)}% Complete
                </span>
              </div>
            </div>
          ) : videoUrl ? (
            <div className="w-full max-w-4xl aspect-video rounded-xl border border-white/10 overflow-hidden relative group bg-black">
              <video src={videoUrl} controls className="w-full h-full object-contain" />
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleDownload(videoUrl)}
                  className="p-2 rounded-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
                  title="Download animation"
                  aria-label="Download animation"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-2xl aspect-video rounded-xl border border-white/10 bg-white/5 flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
                <Box className="h-8 w-8 text-white/20" />
              </div>
              <span className="text-sm text-white/30">No preview available</span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 relative min-h-0 bg-[#111]">
          <div className="absolute inset-0 p-4">
            <CodeViewer code={generatedCode} filename="animation.py" />
          </div>
        </div>
      )}
    </div>
  )
}
