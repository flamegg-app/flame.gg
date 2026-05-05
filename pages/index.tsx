import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronDown, 
  Check, 
  Globe, 
  Users, 
  HardDrive, 
  Diamond, 
  MessageSquare, 
  Mail, 
  Send, 
  Share2 
} from 'lucide-react';

export default function Home() {
  const [username, setUsername] = useState('');

  return (
    <div className="min-h-screen bg-[#050505] text-white font-['Satoshi',sans-serif] selection:bg-purple-500/30 overflow-x-hidden">
      
      {/* 1. Header Navigation - Replicating image_cbee18.jpg */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 bg-black/40 backdrop-blur-md border border-white/5 py-3 px-8 rounded-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-7 h-7 object-contain" />
          <span className="text-xl font-black tracking-tighter">flame.gg</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-[13px] font-bold text-neutral-400">
          <Link href="#" className="hover:text-white transition">Help Center</Link>
          <Link href="#" className="hover:text-white transition">Discord</Link>
          <Link href="#" className="hover:text-white transition">Leaderboard</Link>
          <Link href="#" className="hover:text-white transition">Pricing</Link>
          <Link href="/dashboard" className="bg-[#2a1a3a] text-[#d8b4fe] border border-purple-500/20 px-6 py-2 rounded-full font-black hover:bg-[#3b2a4a] transition">
            Dashboard
          </Link>
        </div>
      </nav>

      {/* 2. Hero Section - Replicating image_cbeada.jpg */}
      <header className="pt-52 pb-32 px-6 flex flex-col items-center text-center relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none flex flex-wrap justify-center gap-20 p-20 scale-150 rotate-12">
           {[...Array(20)].map((_, i) => <img key={i} src="/logo.png" className="w-20 h-20 grayscale" alt="" />)}
        </div>

        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight relative z-10">
          Everything you want, right here.
        </h1>
        <p className="text-neutral-400 text-lg md:text-xl mb-12 max-w-2xl font-medium relative z-10 leading-relaxed">
          flame.gg is your go-to for modern, feature-rich link-in-bio pages and fast, secure file hosting.
        </p>
        <div className="flex flex-wrap justify-center gap-4 relative z-10">
          <button className="bg-[#4c1d95] hover:bg-[#5b21b6] px-10 py-4 rounded-full font-black transition-all shadow-xl shadow-purple-900/20">
            Sign Up for Free
          </button>
          <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-10 py-4 rounded-full font-black transition-all">
            View Pricing
          </button>
        </div>
      </header>

      {/* 3. Stats Grid - Replicating image_cbeddf.png */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Over <span className="text-purple-500">1,740,000</span> people use flame.gg
          </h2>
          <p className="text-neutral-500 font-bold text-lg max-w-3xl mx-auto leading-relaxed">
            Create feature-rich, customizable and modern link-in-bio pages, along with fast and secure file hosting, all with flame.gg.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Profile Views', val: '67,900,000+', icon: Globe },
            { label: 'Users', val: '1,740,000+', icon: Users },
            { label: 'File Uploads', val: '600,000+', icon: HardDrive },
            { label: 'Subscribers', val: '48,100+', icon: Diamond },
          ].map((stat, i) => (
            <div key={i} className="bg-[#0c0c0c] border border-white/5 p-10 rounded-[2.5rem] relative group">
              <stat.icon className="absolute right-8 top-8 text-purple-500 opacity-20 transition" size={32} />
              <p className="text-3xl font-black mb-1 tracking-tight">{stat.val}</p>
              <p className="text-neutral-500 text-xs font-black uppercase tracking-[0.2em]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Claim Input - Replicating image_cbeddf.png */}
        <div className="mt-20 flex flex-col items-center">
          <p className="text-neutral-400 font-bold mb-6 text-sm">Claim your profile and create an account in minutes!</p>
          <div className="bg-[#0c0c0c] border border-white/10 p-1.5 rounded-2xl flex w-full max-w-md focus-within:border-purple-500/50 transition-all shadow-2xl">
            <span className="pl-5 pr-3 py-3 text-neutral-600 font-bold border-r border-white/5">flame.gg/</span>
            <input 
              type="text" 
              placeholder="username" 
              className="bg-transparent border-none outline-none flex-1 px-4 font-bold text-white placeholder:text-neutral-800"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button className="bg-[#2a1a3a] text-[#d8b4fe] px-8 py-3 rounded-xl font-black text-xs hover:bg-[#3b2a4a] transition">
              Claim Now
            </button>
          </div>
        </div>
      </section>

      {/* 4. Pricing - Replicating image_cbedbd.png */}
      <section className="py-32 px-6 bg-[#080808]">
        <h2 className="text-4xl font-black text-center mb-20 tracking-tight">
          Explore our exclusive plans and join <span className="text-purple-400">48,100+</span> subscribers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-[#0c0c0c] border border-white/5 p-12 rounded-[3rem]">
            <h3 className="text-2xl font-black mb-8">Free</h3>
            <div className="mb-8"><span className="text-5xl font-black">0€</span><span className="text-neutral-500 font-bold ml-2">/Lifetime</span></div>
            <ul className="space-y-5 mb-14">
              {['Basic Customization', 'Profile Analytics', 'Basic Effects', 'Add Your Socials'].map(item => (
                <li key={item} className="flex items-center gap-3 text-[13px] font-bold text-neutral-300">
                  <Check className="text-purple-500" size={16} /> {item}
                </li>
              ))}
            </ul>
            <button className="w-full py-4 bg-white/5 rounded-2xl font-black">Get Started</button>
          </div>

          <div className="bg-[#110c1a] border border-purple-500/20 p-12 rounded-[3rem] relative shadow-2xl">
            <div className="absolute top-6 right-8 bg-purple-500/10 text-purple-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Most Popular</div>
            <h3 className="text-2xl font-black mb-8 flex items-center gap-2">Premium</h3>
            <div className="mb-2"><span className="text-5xl font-black">7,99€</span><span className="text-neutral-500 font-bold ml-2">/Lifetime</span></div>
            <p className="text-purple-400/80 text-[11px] font-black mb-8 italic uppercase">Pay once. Keep it forever.</p>
            <ul className="space-y-5 mb-14">
              {['Exclusive Badge', 'Profile Layouts', 'Custom Fonts', 'Special Profile Effects', 'Advanced Customization'].map(item => (
                <li key={item} className="flex items-center gap-3 text-[13px] font-bold text-neutral-200">
                  <Check className="text-purple-500" size={16} /> {item}
                </li>
              ))}
            </ul>
            <button className="w-full py-4 bg-purple-600 rounded-2xl font-black shadow-lg shadow-purple-900/40">Learn More</button>
          </div>
        </div>
      </section>

      {/* 5. Footer - Replicating image_cbeada.jpg */}
      <footer className="pt-32 pb-16 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#120c1a] border border-purple-500/10 p-16 rounded-[3.5rem] mb-24 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
             <div className="relative z-10 text-center md:text-left">
               <h2 className="text-5xl font-black mb-6 leading-tight">Everything you want, <br/>right here.</h2>
               <p className="text-neutral-400 font-bold mb-10 max-w-lg">Join over 1,740,000+ people using flame.gg and become part of our large community.</p>
               <div className="flex bg-black/40 border border-white/5 p-1.5 rounded-2xl max-w-sm mx-auto md:mx-0">
                  <span className="pl-4 pr-2 py-3 text-neutral-600 font-bold text-sm">flame.gg/</span>
                  <input type="text" placeholder="username" className="bg-transparent outline-none flex-1 font-bold text-sm text-white" />
                  <button className="bg-purple-600 px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-tighter">Claim Now</button>
               </div>
             </div>
             <img src="/logo.png" className="absolute -right-16 top-0 h-full opacity-5 pointer-events-none grayscale" alt="" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20 text-left">
            <div className="col-span-2">
               <div className="flex items-center gap-2 mb-6">
                  <img src="/logo.png" className="w-7 h-7" alt="Logo" />
                  <span className="text-2xl font-black tracking-tighter">flame.gg</span>
                  <div className="flex items-center gap-2 bg-yellow-500/10 px-3 py-1 rounded-md text-[10px] text-yellow-500 font-black uppercase ml-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                    System Status
                  </div>
               </div>
               <p className="text-neutral-500 text-sm font-bold mb-8 max-w-xs leading-relaxed">Create feature-rich, customizable and modern link-in-bio pages with flame.gg.</p>
               <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl flex items-center justify-between w-48">
                 <span className="text-[11px] font-black uppercase tracking-widest">🇺🇸 English (US)</span>
                 <ChevronDown size={14} className="text-neutral-500" />
               </div>
            </div>
            
            {[
              { title: 'General', links: ['Login', 'Sign Up', 'Pricing', 'Leaderboard'] },
              { title: 'Contact', links: ['Discord Server', 'Support Email', 'Business Email'] },
              { title: 'Legal', links: ['Terms of Service', 'Privacy Policy', 'Copyright Policy'] }
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-black text-xs uppercase tracking-widest mb-8 text-neutral-300">{col.title}</h4>
                <ul className="space-y-4">
                  {col.links.map(l => (
                    <li key={l}><Link href="#" className="text-neutral-500 hover:text-white transition text-[13px] font-bold">{l}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5">
             <p className="text-neutral-600 text-[11px] font-black uppercase tracking-widest">Copyright © 2026 flame.gg - All Rights Reserved.</p>
             <div className="flex items-center gap-8 text-neutral-600 mt-8 md:mt-0">
               <MessageSquare size={20} className="hover:text-white transition cursor-pointer" />
               <Mail size={20} className="hover:text-white transition cursor-pointer" />
               <Share2 size={20} className="hover:text-white transition cursor-pointer" />
               <Send size={20} className="hover:text-white transition cursor-pointer" />
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}