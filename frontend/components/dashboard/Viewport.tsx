'use client'

import dynamic from 'next/dynamic'
import { useState, useMemo } from 'react'
import { Box, Download, Code2, Play, Loader2 } from 'lucide-react'
import 'plyr/dist/plyr.css'
import CodeViewer from './CodeViewer'

const Plyr = dynamic(() => import('plyr-react').then((mod) => mod.Plyr), {
  ssr: false,
})

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
      <div className="h-12 border-b border-white/5 flex px-6 items-center flex-shrink-0">
        <div className="flex items-center gap-6 flex-1 h-full">
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

        {videoUrl && (
          <button
            onClick={() => handleDownload(videoUrl)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 text-dark-300 hover:bg-white/10 hover:text-white transition-all text-xs font-medium"
            title="Download animation"
          >
            <Download className="h-3.5 w-3.5" />
            Download
          </button>
        )}
      </div>



      {activeTab === 'viewport' ? (
        <div className="flex-1 flex items-center justify-center p-6 lg:p-8 bg-[#111] overflow-hidden min-h-[400px]">
          {isGenerating ? (
            <div className="w-full max-w-4xl aspect-video rounded-xl border border-white/10 bg-white/5 flex flex-col items-center justify-center gap-6">
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
            <div key={videoUrl} className="w-full max-w-4xl aspect-video rounded-xl border border-white/10 overflow-hidden relative group bg-black">
              <Plyr
                source={{
                  type: 'video',
                  sources: [
                    {
                      src: videoUrl as string,
                      type: 'video/mp4',
                    },
                  ],
                }}
                options={{
                  controls: [
                    'play-large',
                    'play',
                    'progress',
                    'current-time',
                    'mute',
                    'volume',
                    'fullscreen',
                  ],
                }}
              />
            </div>
          ) : (
            <div className="w-full max-w-4xl aspect-video rounded-xl border border-white/10 bg-white/5 flex flex-col items-center justify-center gap-4">
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
