import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Flame, Shield, Zap, Star } from 'lucide-react';

export default function Home() {
  const [claimName, setClaimName] = useState('');

  return (
    <div className="min-h-screen bg-[#050505] text-white font-['Satoshi'] selection:bg-purple-500/30">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Flame size={20} fill="white" />
          </div>
          <span className="text-2xl font-black tracking-tighter">flame.gg</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-neutral-400">
          <Link href="/explore" className="hover:text-white transition">Explore</Link>
          <Link href="/upgrade" className="hover:text-white transition text-purple-400">Premium</Link>
          <Link href="/login" className="hover:text-white transition">Login</Link>
          <Link href="/register" className="bg-white text-black px-5 py-2.5 rounded-full hover:bg-neutral-200 transition">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center pt-20 pb-32 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8">
          <Star size={14} className="text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-bold tracking-widest uppercase">The #1 Bio-Link for Gamers</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tightest mb-6 leading-tight">
          Your profile, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 animate-gradient">elevated.</span>
        </h1>

        <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mb-12 font-medium">
          The most customizable bio-link platform. Showcase your socials, share your stats, and flex your rare assets with a professional touch.
        </p>

        {/* Claim Input (The guns.lol style) */}
        <div className="w-full max-w-xl bg-[#0f0f0f] border border-white/10 p-2 rounded-2xl flex flex-col md:flex-row items-center gap-2 shadow-2xl shadow-purple-500/5">
          <div className="flex items-center px-4 py-3 md:py-0 text-neutral-500 font-bold border-b md:border-b-0 md:border-r border-white/10 w-full md:w-auto">
            flame.gg/
          </div>
          <input 
            type="text" 
            placeholder="username" 
            value={claimName}
            onChange={(e) => setClaimName(e.target.value)}
            className="bg-transparent border-none outline-none flex-1 py-3 px-4 text-lg font-bold text-white placeholder:text-neutral-700"
          />
          <button className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-black flex items-center justify-center gap-2 transition group">
            Claim Now
            <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
          <div className="flex flex-col items-center gap-3">
            <Zap className="text-purple-500" />
            <h3 className="font-bold">Instant Setup</h3>
            <p className="text-sm text-neutral-500">Go live in under 60 seconds.</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Shield className="text-blue-500" />
            <h3 className="font-bold">Secure Trading</h3>
            <p className="text-sm text-neutral-500">Verified links for your assets.</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Flame className="text-orange-500" />
            <h3 className="font-bold">Total Control</h3>
            <p className="text-sm text-neutral-500">Customize every pixel of your page.</p>
          </div>
        </div>
      </main>
    </div>
  );
}