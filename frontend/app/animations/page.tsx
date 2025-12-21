'use client'

import { VideoGallery } from '@/components/VideoGallery'
import { Layers } from 'lucide-react'

export default function AnimationsPage() {
    return (
        <div className="min-h-screen bg-brand-black/50 p-6 lg:p-12 lg:pl-80">
            <div className="max-w-7xl mx-auto space-y-8">
                <header>
                    <div
                        className="space-y-1"
                    >
                        <h1 className="text-3xl font-sans font-bold flex items-center gap-3">
                            <Layers className="w-8 h-8 text-brand-blue" />
                            My Animations
                        </h1>
                        <p className="text-dark-400">Manage and download your generated videos</p>
                    </div>
                </header>

                <div className="border-t border-white/5 pt-8">
                    <VideoGallery />
                </div>
            </div>
        </div>
    )
}
