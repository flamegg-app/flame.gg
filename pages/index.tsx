import React from 'react';
import Link from 'next/link';
import { Flame, Shield, Zap, Target } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['Satoshi'] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-600/10 blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-10 py-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="bg-purple-600 p-2 rounded-xl shadow-lg shadow-purple-600/20">
            <Flame size={24} fill="white" />
          </div>
          <span className="font-black text-2xl tracking-tighter">flame.gg</span>
        </div>
        <Link 
          href="/login" 
          className="bg-white text-black px-8 py-3 rounded-2xl font-black hover:bg-neutral-200 transition-all active:scale-95"
        >
          Get Started
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center pt-24 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8">
          <Zap size={14} className="text-purple-500 fill-purple-500" />
          <span className="text-xs font-black uppercase tracking-widest text-neutral-400">The Future of Profile Customization</span>
        </div>
        
        <h1 className="text-7xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9]">
          OWN YOUR <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-purple-400 to-purple-700">IDENTITY.</span>
        </h1>
        
        <p className="max-w-2xl text-neutral-400 text-lg md:text-xl font-medium mb-12">
          The ultimate dashboard for creators and players. Link your Discord, 
          track your stats, and build a profile that stands out from the noise.
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <Link 
            href="/login" 
            className="bg-purple-600 hover:bg-purple-500 text-white px-12 py-5 rounded-[2rem] font-black text-xl shadow-2xl shadow-purple-600/20 transition-all hover:-translate-y-1"
          >
            Claim Your Username
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 max-w-6xl w-full">
          {[
            { icon: Shield, title: "Verified Identity", desc: "Link your accounts securely with OAuth." },
            { icon: Target, title: "Custom Stat Tracking", desc: "Show off what matters most to your audience." },
            { icon: Flame, title: "Live Notifications", desc: "Never miss a beat with real-time site alerts." }
          ].map((feature, i) => (
            <div key={i} className="bg-[#111] border border-neutral-800 p-8 rounded-[2.5rem] text-left hover:border-purple-500/50 transition-colors">
              <feature.icon className="text-purple-500 mb-4" size={32} />
              <h3 className="text-xl font-black mb-2">{feature.title}</h3>
              <p className="text-neutral-500 font-medium leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="mt-40 py-20 border-t border-neutral-900 text-center">
        <p className="text-neutral-600 font-bold uppercase tracking-[0.3em] text-[10px]">© 2026 Flame.gg — All Rights Reserved</p>
      </footer>
    </div>
  );
}