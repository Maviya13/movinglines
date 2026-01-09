'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [message, setMessage] = useState('Finalizing sign-in…')

  useEffect(() => {
    let mounted = true

    const finalizeAuth = async () => {
      try {
        // Check for email confirmation code
        const code = searchParams.get('code')
        
        if (code) {
          setMessage('Confirming your email...')
          const { error } = await supabase.auth.exchangeCodeForSession(code)
          if (error) {
            console.error('Code exchange error:', error)
            setMessage('Could not confirm email. Please try again.')
            return
          }
        }

        // Get the current session (either from code exchange or from URL hash)
        const { data: { session }, error } = await supabase.auth.getSession()

        // Clean up URL so the code/tokens aren't visible
        if (typeof window !== 'undefined') {
          const cleanUrl = window.location.origin + window.location.pathname
          window.history.replaceState({}, document.title, cleanUrl)
        }

        if (error) {
          console.error('Auth callback error:', error)
          setMessage('Could not complete sign-in. Please try again.')
          return
        }

        if (session) {
          setMessage('Email confirmed! Signing you in…')
          // Small delay to show message
          setTimeout(() => router.replace('/'), 500)
        } else {
          setMessage('Email confirmed! You can now sign in.')
          setTimeout(() => router.replace('/'), 2000)
        }
      } catch (err) {
        console.error('Unexpected auth callback error:', err)
        setMessage('Unexpected error occurred. Please try again.')
      }
    }

    finalizeAuth()
    return () => { mounted = false }
  }, [router, searchParams])

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="card max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-2">Authentication</h1>
        <p className="text-dark-400">{message}</p>
      </div>
    </main>
  )
}
