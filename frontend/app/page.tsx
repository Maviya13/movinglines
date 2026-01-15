'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/AuthProvider'
import { useAuthModal } from '@/hooks/use-auth-modal'
import { AuthModal } from '@/components/AuthModal'
import { Header } from '@/components/landing/Header'
import { Hero } from '@/components/landing/Hero'
import { Features } from '@/components/landing/Features'
import { Showcase } from '@/components/landing/Showcase'
import { Cta } from '@/components/landing/Cta'
import { Footer } from '@/components/landing/Footer'

export default function LandingPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const { open: openAuthModal } = useAuthModal()

  const onLaunch = () => {
    if (user) {
      router.push('/dashboard')
    } else {
      openAuthModal()
    }
  }



  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Header onLaunchAction={onLaunch} />

      <main className="relative">
        <Hero onLaunchAction={onLaunch} />
        <Features />
        <Showcase />
        <Cta onLaunchAction={onLaunch} />
      </main>

      <Footer />

      <AuthModal />
    </div>
  )
}
