'use client'

import { Box, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ViewportProps {
  videoUrl: string | null
  mobileTab?: 'chat' | 'output'
}

export function Viewport({ videoUrl, mobileTab }: ViewportProps) {
  const handleDownload = async (url: string) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = downloadUrl
      a.download = `generated-animation.mp4`
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
    <div className={`${mobileTab === 'output' ? 'flex' : 'hidden'} md:flex flex-1 flex-col bg-background`}>
      <div className="h-12 border-b-2 border-border flex px-6 items-center gap-8">
        <span className="text-xs font-black uppercase border-b-2 border-main h-full flex items-center">Viewport</span>
        <span className="text-xs font-black uppercase text-muted-foreground">Source</span>
      </div>
      <div className="flex-1 flex items-center justify-center p-8 bg-secondary">
        {videoUrl ? (
          <div className="w-full max-w-4xl aspect-video bru-card overflow-hidden relative group">
            <video src={videoUrl} controls className="w-full h-full object-contain bg-black" />
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                onClick={() => handleDownload(videoUrl)}
                className="bru-button p-2"
                title="Download Video"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-2xl aspect-video bru-card flex flex-col items-center justify-center text-muted-foreground gap-4">
            <Box className="h-12 w-12" />
            <span className="text-sm font-medium">No output generated</span>
          </div>
        )}
      </div>
    </div>
  )
}
