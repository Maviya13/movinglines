'use client'

import { useState, useRef, useEffect } from 'react'
import { Copy, Check, Heart, X } from 'lucide-react'

export function SponsorButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleCopyUPI = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText('piyushdhoka007@okhdfcbank')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
      const textArea = document.createElement('textarea')
      textArea.value = 'piyushdhoka007@okhdfcbank'
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (e) {
        console.error('Fallback copy failed:', e)
      }
      document.body.removeChild(textArea)
    }
  }

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div ref={containerRef} className="fixed bottom-8 right-8 z-40">
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        title="Support us"
      >
        <Heart className="w-6 h-6" fill="white" />
      </button>

      {/* Popup Card */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 rounded-xl bg-[#111] border border-white/10 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* Header */}
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Support MovingLines</h3>
                <p className="text-sm text-white/50 mt-0.5">Help us keep building amazing tools</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="p-4 space-y-3">
            {/* Buy Me Coffee */}
            <a
              href="https://buymeacoffee.com/piyushdhoka"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center gap-4 p-3 rounded-lg bg-[#1a1a1a] border border-white/5 hover:border-white/10 hover:bg-[#222] transition-all"
            >
              <div className="h-11 w-11 rounded-lg bg-yellow-400 flex items-center justify-center flex-shrink-0">
                <svg className="h-6 w-6 text-yellow-900" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="font-medium text-white">Buy Me Coffee</p>
                <p className="text-xs text-white/40">One-time donation</p>
              </div>
            </a>

            {/* UPI Payment */}
            <div className="p-3 rounded-lg bg-[#1a1a1a] border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0">
                    <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-white">UPI Payment</p>
                    <p className="text-xs text-white/40">Scan or copy</p>
                  </div>
                </div>
                <button
                  onClick={handleCopyUPI}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors flex-shrink-0"
                  title="Copy UPI ID"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4 text-white/40" />
                  )}
                </button>
              </div>

              {/* UPI ID Display */}
              <div className="bg-[#0d0d0d] rounded-lg p-3 border border-white/5">
                <p className="text-[10px] font-medium text-white/40 uppercase tracking-wider mb-1">UPI ID</p>
                <p className="text-sm font-mono text-white/80 break-all">
                  piyushdhoka007@okhdfcbank
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 py-4 bg-[#0d0d0d] border-t border-white/5 text-center">
            <p className="text-sm text-white/40">Every support helps us improve 💙</p>
          </div>
        </div>
      )}
    </div>
  )
}
