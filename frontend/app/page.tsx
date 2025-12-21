'use client';

import React, { useState, useEffect } from 'react';
import { Zap, ArrowRight, Command, ChevronRight, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import { AuthModal } from '@/components/AuthModal';

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const router = useRouter();
  const { user, loading } = useAuth();

  const onLaunch = () => {
    if (user) {
      router.push('/dashboard');
    } else {
      setShowAuth(true);
    }
  };

  useEffect(() => {
    if (user && !loading) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-sans">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-white/[0.03] blur-[120px] rounded-full" />

      {/* Premium Navbar */}
      <nav className="fixed top-0 w-full z-50 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-12 bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-full px-5">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
              <Zap size={14} fill="black" stroke="black" />
            </div>
            <span className="font-bold tracking-tighter uppercase text-[15px]">MovingLines</span>
          </div>
          <div className="hidden md:flex gap-8 text-[12px] text-zinc-500 font-medium">
            {['Engine', 'Templates', 'Docs'].map(i => <a key={i} href="#" className="hover:text-white transition-colors">{i}</a>)}
          </div>
          <button onClick={onLaunch} className="bg-white text-black h-8 px-4 rounded-full text-[12px] font-bold flex items-center gap-2 hover:bg-zinc-200">
            {user ? 'Dashboard' : 'Launch App'} <ChevronRight size={14} strokeWidth={3} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center z-10 pt-20 animate-hero">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-8">
          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
          <span>v3.0 Early Access</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
          Visualize thoughts <br /> <span className="text-zinc-500">at the speed of code.</span>
        </h1>
        <div className="relative max-w-2xl w-full mx-auto group">
          <div className="bg-white/[0.03] border border-white/10 p-2 rounded-2xl flex flex-col md:flex-row items-center gap-2 focus-within:border-white/30 backdrop-blur-xl">
            <div className="flex items-center w-full pl-4 text-zinc-600">
              <Command size={18} />
              <input placeholder="Simulate a 3D Riemann surface..." className="bg-transparent border-none focus:ring-0 flex-1 px-3 py-4 text-white outline-none" />
            </div>
            <button onClick={onLaunch} className="w-full md:w-auto bg-white text-black h-12 px-8 rounded-xl text-sm font-black flex items-center justify-center gap-2">
              Launch <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </main>

      {showAuth && <AuthModal onCloseAction={() => setShowAuth(false)} />}
    </div>
  );
}
