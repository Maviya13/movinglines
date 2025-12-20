'use client'

import { useAuth } from '@/components/providers/AuthProvider'
import { Sparkles, History, LayoutDashboard, Settings, LogOut, X } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type SidebarProps = {
    isOpen: boolean
    onCloseAction: () => void
}

export function Sidebar({ isOpen, onCloseAction }: SidebarProps) {
    const { user, signOut } = useAuth()
    const pathname = usePathname()

    const menuItems = [
        { icon: LayoutDashboard, label: 'Generator', href: '/' },
        { icon: History, label: 'My Animations', href: '/animations' },
        { icon: Settings, label: 'Settings', href: '/settings' },
    ]

    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onCloseAction}
                />
            )}

            <motion.aside
                initial={false}
                animate={{
                    x: isOpen ? 0 : -300,
                    opacity: isOpen ? 1 : 0
                }}
                className={`fixed top-0 left-0 bottom-0 w-72 bg-brand-black/95 backdrop-blur-xl border-r border-white/10 z-50 
                   flex flex-col transition-all lg:!translate-x-0 lg:!opacity-100 font-body`}
            >
                {/* Logo Section */}
                <div className="p-8 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3" onClick={onCloseAction}>
                        <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center shadow-lg shadow-brand-blue/20">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold font-sans tracking-tight">MovingLines</span>
                    </Link>
                    <button onClick={onCloseAction} className="lg:hidden p-2 hover:bg-white/5 rounded-lg">
                        <X className="w-5 h-5 text-dark-400" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-4 space-y-2">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onCloseAction}
                                className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group
                  ${isActive
                                        ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20'
                                        : 'text-dark-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-dark-500 group-hover:text-brand-orange'}`} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                {/* User Section */}
                <div className="p-6 border-t border-white/10 space-y-4">
                    {user && (
                        <div className="flex items-center gap-3 px-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-orange to-orange-300" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">{user.email?.split('@')[0]}</p>
                                <p className="text-xs text-dark-500 truncate">{user.email}</p>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={() => signOut()}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-dark-400 
                       hover:bg-red-500/10 hover:text-red-400 transition-all group"
                    >
                        <LogOut className="w-5 h-5 text-dark-500 group-hover:text-red-400" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </motion.aside>
        </>
    )
}
