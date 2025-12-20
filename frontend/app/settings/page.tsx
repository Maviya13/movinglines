'use client'

import { Settings, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '@/components/providers/AuthProvider'

export default function SettingsPage() {
    const { user } = useAuth()

    return (
        <div className="min-h-screen bg-brand-black/50 p-6 lg:p-12 lg:pl-80">
            <div className="max-w-3xl mx-auto space-y-8">
                <header>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-1"
                    >
                        <h1 className="text-3xl font-sans font-bold flex items-center gap-3">
                            <Settings className="w-8 h-8 text-brand-blue" />
                            Settings
                        </h1>
                        <p className="text-dark-400">Manage your account preferences</p>
                    </motion.div>
                </header>

                <div className="card p-8 space-y-6">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-blue to-brand-orange flex items-center justify-center text-white font-bold text-2xl">
                            {user?.email?.[0].toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-lg font-bold">{user?.email?.split('@')[0]}</h2>
                            <p className="text-dark-500 text-sm">{user?.email}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-dark-300 uppercase tracking-wider">Account</h3>
                        <div className="space-y-2">
                            <p className="text-sm text-dark-400">Plan: <span className="text-white font-medium">Free Tier</span></p>
                            <p className="text-sm text-dark-400">Credits Remaining: <span className="text-brand-blue font-medium">50</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
