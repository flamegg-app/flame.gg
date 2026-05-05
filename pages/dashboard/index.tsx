import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Flame, Search, ChevronRight } from 'lucide-react';

export default function Home() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/register?username=${username}`);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['Satoshi'] selection:bg-purple-500/30">
      {/* Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl bg-[#161616]/80 backdrop-blur-xl border border-white/5 px-6 py-3 rounded-full flex items-center justify-between z-50">
        <div className="flex items-center gap-2">
          <Flame className="text-purple-500" size={20} fill="currentColor" />
          <span className="font-black text-lg tracking-tighter">flame.gg</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-xs font-bold text-neutral-400">
          <Link href="/help" className="hover:text-white transition">Help Center</Link>
          <Link href="/discord" className="hover:text-white transition">Discord</Link>
          <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
          <Link href="/leaderboard" className="hover:text-white transition">Leaderboard</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-xs font-bold text-neutral-400 hover:text-white transition">Login</Link>
          <Link href="/register" className="bg-purple-600 hover:bg-purple-700 px-5 py-2.5 rounded-full text-xs font-black transition shadow-lg shadow-purple-600/20">
            Sign Up Free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-6">
            Everything you want, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">right here.</span>
          </h1>
          <p className="text-neutral-500 text-lg max-w-xl mb-10 leading-relaxed">
            flame.gg is your go-to for modern, feature-rich link-in-bio pages and fast, secure file hosting.
          </p>
          
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-12">
            <div className="text-center bg-[#161616] border border-white/5 px-6 py-3 rounded-2xl">
              <p className="text-2xl font-black">12</p>
              <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Users</p>
            </div>
            <div className="text-center bg-[#161616] border border-white/5 px-6 py-3 rounded-2xl">
              <p className="text-2xl font-black">452</p>
              <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Profile Views</p>
            </div>
          </div>

          <form onSubmit={handleClaim} className="relative max-w-md group">
            <div className="absolute inset-y-0 left-5 flex items-center text-neutral-500 text-sm">
              flame.gg/
            </div>
            <input 
              type="text" 
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#161616] border border-white/10 rounded-2xl py-5 pl-24 pr-32 text-sm font-bold focus:outline-none focus:border-purple-600 transition"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-purple-600 hover:bg-purple-700 px-6 rounded-xl text-xs font-black transition">
              Claim Now
            </button>
          </form>
        </div>

        {/* Phone Mockup Area */}
        <div className="flex-1 relative w-full max-w-md h-[500px]">
          <div className="absolute top-0 right-0 w-64 h-[450px] bg-neutral-900 rounded-[3rem] border-[8px] border-[#161616] shadow-2xl rotate-12 z-20 overflow-hidden">
             <div className="w-full h-full bg-gradient-to-b from-purple-900/20 to-black p-4">
                <div className="w-12 h-12 rounded-full bg-neutral-800 mx-auto mt-8 mb-4" />
                <div className="w-20 h-2 bg-neutral-800 mx-auto rounded-full mb-8" />
                <div className="space-y-3">
                  {[1,2,3].map(i => <div key={i} className="w-full h-10 bg-neutral-800/50 rounded-xl" />)}
                </div>
             </div>
          </div>
          <div className="absolute top-10 left-0 w-64 h-[450px] bg-neutral-900 rounded-[3rem] border-[8px] border-[#161616] shadow-2xl -rotate-12 z-10 overflow-hidden opacity-50">
             {/* Mock Content */}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 pt-20 pb-10 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="text-purple-500" size={24} fill="currentColor" />
              <span className="font-black text-xl tracking-tighter">flame.gg</span>
            </div>
            <p className="text-neutral-500 text-sm">The ultimate link-in-bio platform.</p>
          </div>
          
          <div>
            <h4 className="font-bold text-sm mb-6 text-purple-400 uppercase tracking-widest">General</h4>
            <ul className="space-y-4 text-sm text-neutral-500 font-medium">
              <li><Link href="/login">Login</Link></li>
              <li><Link href="/register">Sign Up</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-6 text-purple-400 uppercase tracking-widest">Resources</h4>
            <ul className="space-y-4 text-sm text-neutral-500 font-medium">
              <li><Link href="/help">Help Center</Link></li>
              <li><Link href="/changelog">Changelog</Link></li>
              <li><Link href="/status">Website Status</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-6 text-purple-400 uppercase tracking-widest">Contact</h4>
            <ul className="space-y-4 text-sm text-neutral-500 font-medium">
              <li><Link href="/discord">Discord Server</Link></li>
              <li><Link href="/email">Email</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="text-center text-neutral-600 text-[10px] font-bold uppercase tracking-[0.2em]">
          © 2026 flame.gg — All rights reserved.
        </div>
      </footer>
    </div>
  );
}