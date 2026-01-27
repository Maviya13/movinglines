'use client'

import { Trash2, X, Loader2 } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface DeleteConfirmProps {
    onConfirm: () => void
    onCancel: () => void
    chatTitle: string
    isLoading?: boolean
    className?: string
}

export function DeleteConfirm({
    onConfirm,
    onCancel,
    chatTitle,
    isLoading = false,
    className = '',
}: DeleteConfirmProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                onCancel()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [onCancel])

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onCancel}
            />

            {/* Modal Content */}
            <div
                ref={containerRef}
                className={`relative w-full max-w-sm bg-[#171717] border border-white/10 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in-95 duration-200 ${className}`}
            >
                <div className="space-y-4">
                    <h3 className="text-base font-semibold text-white">Delete chat?</h3>

                    <p className="text-sm text-white/80 leading-relaxed">
                        This will delete <span className="font-bold text-white">{chatTitle}</span>.
                    </p>

                    <p className="text-xs text-white/40">
                        Associated task history and rendered videos will be permanently removed.
                    </p>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                onCancel()
                            }}
                            disabled={isLoading}
                            className="px-5 py-2 rounded-full bg-[#2f2f2f] hover:bg-[#3f3f3f] text-white text-sm font-medium transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                onConfirm()
                            }}
                            disabled={isLoading}
                            className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            {isLoading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
