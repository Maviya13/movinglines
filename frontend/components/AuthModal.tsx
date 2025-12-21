'use client'

import { useState } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import { X, Mail, Lock, Loader2, Sparkles } from 'lucide-react'

type AuthModalProps = {
  onCloseAction: () => void
}

export function AuthModal({ onCloseAction }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isSignUp) {
        await signUp(email, password)
      } else {
        await signIn(email, password)
      }
      
      // Close modal after successful auth (auth state will be updated by AuthProvider)
      setError('')
      // Add small delay to ensure auth state is updated before closing
      setTimeout(() => {
        onCloseAction()
      }, 100)
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred'

      if (errorMessage.includes('Refresh Token Not Found') ||
        errorMessage.includes('Invalid Refresh Token')) {
        console.warn('Token refresh issue (will retry automatically):', errorMessage)
        return
      }

      setError(errorMessage)
      console.error('Auth error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onCloseAction}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-brand-black border border-white/10 w-full max-w-[420px] rounded-[32px] overflow-hidden shadow-2xl relative"
      >
          {/* Decorative background */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-brand-blue/20 to-transparent pointer-events-none" />

          <div className="p-10 relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <h2 className="text-2xl font-sans font-bold tracking-tight">
                  {isSignUp ? 'Create account' : 'Welcome back'}
                </h2>
                <p className="text-dark-400 text-sm font-body">
                  {isSignUp ? 'Start your journey with MovingLines' : 'Continue your animation adventure'}
                </p>
              </div>
              <button
                onClick={onCloseAction}
                className="p-3 rounded-2xl hover:bg-white/5 transition-colors text-dark-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500 group-focus-within:text-brand-blue transition-colors" />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field input-with-icon"
                    required
                  />
                </div>

                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500 group-focus-within:text-brand-blue transition-colors" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field input-with-icon"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              {error && (
                <p
                  className="text-red-400 text-sm font-medium px-2"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-3 py-4 text-base"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                {isSignUp ? 'Get Started' : 'Sign In'}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/5 text-center">
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setError('')
                  setEmail('')
                  setPassword('')
                }}
                className="text-dark-400 hover:text-white transition-all text-sm font-medium hover:underline underline-offset-4"
              >
                {isSignUp
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign up"}
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}

