'use client'

import { useAuth } from '@/components/providers/AuthProvider'
import { AuthModal } from '@/components/AuthModal'
import { Generator } from '@/components/Generator'
import { VideoGallery } from '@/components/VideoGallery'
import { Navbar } from '@/components/Navbar'
import { useState } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { Menu, Play, Sparkles, CheckCircle2, ArrowRight, Layers, Zap, MousePointer2 } from 'lucide-react'

export default function Home() {
  const { user, loading } = useAuth()
  const [showAuth, setShowAuth] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [refreshGallery, setRefreshGallery] = useState(0)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-black">
        <div className="w-10 h-10 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-black text-white selection:bg-brand-blue/30 font-body">
      {user && (
        <Sidebar
          isOpen={isSidebarOpen}
          onCloseAction={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Floating Navbar */}
      {!user && (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-5xl">
          <div className="glass px-6 py-4 rounded-full flex items-center justify-between shadow-2xl shadow-brand-blue/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-sans font-bold tracking-tight">MovingLines</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-dark-400">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
              <a href="#showcase" className="hover:text-white transition-colors">Showcase</a>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowAuth(true)}
                className="text-sm font-medium hover:text-brand-blue transition-colors px-4 py-2"
              >
                Sign In
              </button>
              <button
                onClick={() => setShowAuth(true)}
                className="btn-primary py-2.5 px-6 text-sm"
              >
                Get Started
              </button>
            </div>
          </div>
        </nav>
      )}

      <main className={`${user ? 'lg:pl-72' : ''}`}>
        {/* Mobile Header for Logged In */}
        {user && (
          <header className="lg:hidden flex items-center justify-between p-6 border-b border-white/5 bg-brand-black/50 backdrop-blur-md sticky top-0 z-40">
            <span className="text-lg font-sans font-bold tracking-tight">MovingLines</span>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10"
            >
              <Menu className="w-5 h-5" />
            </button>
          </header>
        )}

        <div className={`${user ? 'max-w-7xl mx-auto px-6 lg:px-12 py-10 lg:py-12' : ''}`}>
          {!user ? (
            /* Logged Out Flow */
            <div className="space-y-32 pb-32">
              {/* Hero Section */}
              <section className="relative pt-48 pb-20 px-6 text-center overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-blue/10 blur-[120px] rounded-full pointer-events-none" />

                <div
                  className="max-w-4xl mx-auto space-y-8 relative z-10"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-semibold mb-6">
                    <Zap className="w-3.5 h-3.5" />
                    <span>The Future of Mathematical Visuals</span>
                  </div>

                  <h1 className="text-5xl md:text-7xl font-sans font-bold tracking-tight leading-[1.1]">
                    Math in <span className="gradient-text">Motion</span>,
                    <br />Powered by AI.
                  </h1>

                  <p className="text-lg md:text-xl text-dark-400 font-body max-w-2xl mx-auto leading-relaxed">
                    Transform complex concepts into stunning Manim animations.
                    Professional educational content created in seconds.
                  </p>

                  <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      onClick={() => setShowAuth(true)}
                      className="btn-primary text-base px-10 py-5 group"
                    >
                      Start Creating Now
                      <ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="btn-secondary text-base px-10 py-5">
                      Explore Examples
                    </button>
                  </div>
                </div>

                {/* Main Feature Preview */}
                <div
                  className="mt-20 max-w-6xl mx-auto aspect-video bg-white/5 rounded-[40px] border border-white/10 overflow-hidden shadow-2xl relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-5 rounded-full bg-brand-blue/20 backdrop-blur-xl border border-brand-blue/30 group-hover:scale-110 transition-transform">
                      <Play className="w-10 h-10 text-white fill-white shadow-xl shadow-brand-blue/50" />
                    </div>
                  </div>
                </div>
              </section>

              {/* Features Grid */}
              <section id="features" className="px-6 container mx-auto">
                <div className="text-center mb-20 space-y-4">
                  <h2 className="text-3xl md:text-4xl font-sans font-bold">Built for Educators & Students</h2>
                  <p className="text-dark-400 font-body">Powerful tools to make math intuitive and visual.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "AI Script Generation",
                      desc: "Our LLM understands complex math and generates perfect Manim code for you.",
                      icon: <Sparkles className="w-6 h-6" />
                    },
                    {
                      title: "High Fidelity Rendering",
                      desc: "From 480p to 4K, export your animations in professional quality.",
                      icon: <Layers className="w-6 h-6" />
                    },
                    {
                      title: "One-Click Preview",
                      desc: "Instant playback of your animations right in the browser.",
                      icon: <MousePointer2 className="w-6 h-6" />
                    }
                  ].map((feature, i) => (
                    <div key={i} className="card hover:border-brand-blue/30 transition-colors group">
                      <div className="w-12 h-12 bg-brand-blue/10 rounded-2xl flex items-center justify-center mb-6 text-brand-blue group-hover:scale-110 transition-transform">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-sans font-bold mb-4">{feature.title}</h3>
                      <p className="text-dark-500 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* How it Works */}
              <section id="how-it-works" className="px-6 py-20 bg-white/[0.02] border-y border-white/5">
                <div className="container mx-auto">
                  <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8">
                      <h2 className="text-4xl font-sans font-bold leading-tight">From Prompt to <br />Production in Seconds</h2>
                      <div className="space-y-6">
                        {[
                          "Describe the concept in plain English",
                          "Select your desired render quality",
                          "AI generates the Manim script automatically",
                          "Render, watch, and download your animation"
                        ].map((step, i) => (
                          <div key={i} className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-brand-blue/20 flex items-center justify-center text-brand-blue text-sm font-bold border border-brand-blue/20">
                              {i + 1}
                            </div>
                            <span className="text-dark-300 font-medium">{step}</span>
                          </div>
                        ))}
                      </div>
                      <button className="btn-primary mt-4">Get Started for Free</button>
                    </div>
                    <div className="relative">
                      <div className="aspect-square bg-gradient-to-br from-brand-blue/20 to-transparent rounded-[60px] blur-3xl absolute inset-0 -z-10" />
                      <div className="card aspect-[4/5] flex items-center justify-center overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                        <div className="text-center space-y-4">
                          <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto">
                            <Zap className="w-8 h-8 text-brand-blue" />
                          </div>
                          <p className="text-dark-400 text-sm italic">"Explain the Euler project..."</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* CTA Section */}
              <section className="px-6">
                <div className="max-w-5xl mx-auto card bg-gradient-to-br from-brand-blue/20 via-blue-900/10 to-transparent border-brand-blue/20 p-16 text-center space-y-10">
                  <h2 className="text-4xl md:text-5xl font-sans font-bold leading-tight">Ready to visualize <br />the impossible?</h2>
                  <p className="text-dark-400 text-lg max-w-xl mx-auto">Join thousands of educators and students using MovingLines to make math beautiful.</p>
                  <button
                    onClick={() => setShowAuth(true)}
                    className="btn-primary text-lg px-12 py-5 shadow-2xl shadow-brand-blue/40"
                  >
                    Create Your Account
                  </button>
                  <div className="flex items-center justify-center gap-8 text-sm text-dark-500 font-medium">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-blue" />
                      No CC required
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-blue" />
                      Free trial credits
                    </div>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <footer className="pt-20 text-center text-dark-600 text-sm px-6">
                <div className="border-t border-white/5 pt-10 flex flex-col items-center gap-6">
                  <div className="flex items-center gap-2 opacity-50">
                    <Sparkles className="w-5 h-5" />
                    <span className="font-sans font-bold">MovingLines</span>
                  </div>
                  <p>© 2025 MovingLines AI. Beautiful math for everyone.</p>
                </div>
              </footer>
            </div>
          ) : (
            /* Logged In: Studio Dashboard */
            <section className="min-h-[80vh] flex flex-col items-center justify-center relative">
              {/* Background Gradient Spotlights */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/20 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-screen" />
              <div className="absolute top-[calc(50%+5rem)] left-[calc(50%+5rem)] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none -z-10 mix-blend-screen" />

              <div className="w-full max-w-4xl space-y-12 text-center pb-20 pt-20">
                <div
                  className="space-y-4"
                >
                  <h1 className="text-4xl md:text-5xl font-sans font-bold tracking-tight">
                    Time to create, <span className="gradient-text">{user.email?.split('@')[0] || 'Creator'}</span>
                  </h1>
                </div>

                <div className="w-full">
                  <Generator onVideoGeneratedAction={() => setRefreshGallery(r => r + 1)} />
                </div>
              </div>

              {/* Projects Grid Section */}
              <div className="w-full pt-10 border-t border-white/5">
                <div className="flex items-center justify-between mb-8 px-4">
                  <h2 className="text-xl font-sans font-bold flex items-center gap-2">
                    <Layers className="w-5 h-5 text-brand-blue" />
                    Recent Animations
                  </h2>
                  <button className="text-xs font-medium text-dark-400 hover:text-white transition-colors">
                    View All
                  </button>
                </div>
                <VideoGallery key={refreshGallery} />
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Auth Modal */}
      {showAuth && <AuthModal onCloseAction={() => setShowAuth(false)} />}
    </div>
  )
}

