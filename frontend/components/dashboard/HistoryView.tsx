'use client'

import { VideoGallery } from '@/components/VideoGallery'

export function HistoryView() {
  return (
    <div className="flex-1 overflow-y-auto p-12">
      <h2 className="text-3xl font-bold mb-8">Your History</h2>
      <VideoGallery />
    </div>
  )
}
