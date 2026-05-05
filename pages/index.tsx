import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Check, Globe, Users, HardDrive, Diamond, MessageSquare, Twitter, Instagram, Send } from 'lucide-react';

export default function Home() {
  const [username, setUsername] = useState('');

  return (
    <div className="min-h-screen bg-[#050505] text-white font-['Satoshi'] scroll-smooth">
      
      {/* Header / Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 bg-black/60 backdrop-blur-xl border border-white/5 py-3 px-6 rounded-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Flame Logo" className="w-8 h-8 object-contain" />
          <span className="text-xl font-black tracking-tighter">flame.gg</span>
        </div>
        
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-400">
          <Link href="#" className="hover:text-white transition">Help Center</Link>
          <Link href="#" className="hover:text-white transition">Discord</Link>
          <Link href="#" className="hover:text-white transition">Leaderboard</Link>
          <Link href="#" className="hover:text-white transition">Pricing</Link>
          <Link href="/dashboard" className="bg-[#2a1a3a] text-[#d8b4fe] border border-purple-500/30 px-5 py-2 rounded-full font-bold hover:bg-[#3b2a4a] transition">Dashboard</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-48 pb-20 px-6 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">Everything you want, right here.</h1>
        <p className="text-neutral-400 text-lg mb-10 max-w-2xl font-medium">
          flame.gg is your go-to for modern, feature-rich link-in-bio pages and fast, secure file hosting.
        </p>
        <div className="flex gap-4">
          <button className="bg-[#4c1d95] hover:bg-[#5b21b6] px-8 py-3 rounded-full font-bold transition shadow-lg shadow-purple-900/20">Sign Up for Free</button>
          <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-3 rounded-full font-bold transition">View Pricing</button>
        </div>
        
        {/* Mockup Preview Area */}
        <div className="mt-16 w-full max-w-6xl relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
          <img src="/mockup_dashboard.png" alt="Dashboard Preview" className="relative rounded-3xl border border-white/5 shadow-2xl" />
        </div>
      </header>

      {/* Stats Bar */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Over <span className="text-purple-400">1,740,000</span> people use flame.gg</h2>
          <p className="text-neutral-500 font-medium leading-relaxed max-w-3xl mx-auto">
            Create feature-rich, customizable and modern link-in-bio pages, along with fast and secure file hosting, all with flame.gg.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Profile Views', val: '67,900,000+', icon: Globe },
            { label: 'Users', val: '1,740,000+', icon: Users },
            { label: 'File Uploads', val: '600,000+', icon: HardDrive },
            { label: 'Subscribers', val: '48,100+', icon: Diamond },
          ].map((stat, i) => (
            <div key={i} className="bg-[#0c0c0c] border border-white/5 p-8 rounded-3xl relative overflow-hidden group">
              <stat.icon className="absolute right-6 top-6 text-purple-500/20 group-hover:text-purple-500/40 transition" size={40} />
              <p className="text-2xl font-black mb-1 tracking-tight">{stat.val}</p>
              <p className="text-neutral-500 text-sm font-bold uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Claim Input Section */}
        <div className="mt-16 flex flex-col items-center">
          <p className="text-neutral-400 font-bold mb-4">Claim your profile and create an account in minutes!</p>
          <div className="bg-[#0c0c0c] border border-white/5 p-1 rounded-2xl flex w-full max-w-md focus-within:border-purple-500/50 transition">
            <span className="px-4 py-3 text-neutral-500 font-bold border-r border-white/5">flame.gg/</span>
            <input 
              type="text" 
              placeholder="username" 
              className="bg-transparent border-none outline-none flex-1 px-4 font-bold"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button className="bg-[#2a1a3a] text-[#d8b4fe] px-6 py-3 rounded-xl font-black text-sm">Claim Now</button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6 bg-[#080808]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-16 tracking-tight">Explore our exclusive plans and join <span className="text-purple-400">48,100+</span> subscribers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-[#0c0c0c] border border-white/5 p-10 rounded-[2.5rem] text-left flex flex-col">
              <h3 className="text-2xl font-black mb-6">Free</h3>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-black">0€</span>
                <span className="text-neutral-500 font-bold">/Lifetime</span>
              </div>
              <p className="text-neutral-500 font-medium mb-8">For beginners, link all your socials in one place.</p>
              <ul className="space-y-4 mb-12 flex-1">
                {['Basic Customization', 'Profile Analytics', 'Basic Effects', 'Add Your Socials'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm font-bold text-neutral-300">
                    <Check className="text-purple-500" size={16} /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-black transition">Get Started</button>
            </div>

            {/* Premium Plan */}
            <div className="bg-[#120c1a] border border-purple-500/20 p-10 rounded-[2.5rem] text-left relative overflow-hidden shadow-2xl shadow-purple-900/10">
              <div className="absolute top-4 right-6 bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Most Popular</div>
              <h3 className="text-2xl font-black mb-6 flex items-center gap-2"><Diamond size={20} className="text-purple-400" /> Premium</h3>
              <div className="mb-1 flex items-baseline gap-1">
                <span className="text-4xl font-black">7,99€</span>
                <span className="text-neutral-500 font-bold">/Lifetime</span>
              </div>
              <p className="text-purple-400/80 text-xs font-bold mb-6 italic">Pay once. Keep it forever.</p>
              <p className="text-neutral-400 font-medium mb-8 text-sm leading-relaxed">The perfect plan to discover your creativity & unlock more features.</p>
              <ul className="space-y-4 mb-12">
                {['Exclusive Badge', 'Profile Layouts', 'Custom Fonts', 'Typewriter Animation', 'Special Profile Effects', 'Advanced Customization', 'Metadata & SEO Customization'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm font-bold text-neutral-200">
                    <Check className="text-purple-500" size={16} /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 bg-purple-600 hover:bg-purple-500 rounded-2xl font-black transition shadow-lg shadow-purple-900/40">Learn More</button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-12 tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {[
            'What is flame.gg?',
            'Is flame.gg free?',
            'What can I do with flame.gg?',
            'Why use flame.gg over other link-in-bio tools?',
            'Is flame.gg safe?',
            'How long does setup take?'
          ].map((q, i) => (
            <div key={i} className="bg-[#0c0c0c] border border-white/5 p-6 rounded-2xl flex items-center justify-between group cursor-pointer hover:border-white/10 transition">
              <span className="font-bold text-neutral-300">{q}</span>
              <ChevronDown className="text-neutral-600 group-hover:text-white transition" size={20} />
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-24 pb-12 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          {/* Footer Call to Action Banner */}
          <div className="bg-[#120c1a] border border-purple-500/20 p-12 rounded-[2.5rem] mb-20 flex flex-col md:flex-row items-center justify-between text-left relative overflow-hidden">
             <div className="relative z-10">
               <h2 className="text-4xl font-black mb-4">Everything you want, right here.</h2>
               <p className="text-neutral-400 font-bold mb-8 max-w-lg">Join over 1,740,000+ people using flame.gg and become part of our large community.</p>
               <div className="flex bg-black/40 p-1 rounded-2xl max-w-sm">
                  <span className="px-4 py-3 text-neutral-500 font-bold">flame.gg/</span>
                  <input type="text" placeholder="username" className="bg-transparent outline-none flex-1 font-bold text-sm" />
                  <button className="bg-purple-600 px-6 py-2 rounded-xl text-xs font-black">Claim Now</button>
               </div>
             </div>
             {/* Large faded logo in footer background */}
             <img src="/logo.png" className="absolute -right-10 top-0 h-full opacity-5 pointer-events-none" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
            <div className="col-span-2">
               <div className="flex items-center gap-2 mb-4">
                  <img src="/logo.png" className="w-6 h-6" />
                  <span className="text-xl font-black tracking-tighter">flame.gg</span>
                  <div className="flex items-center gap-2 bg-yellow-500/10 px-2 py-0.5 rounded text-[10px] text-yellow-500 font-bold">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                    System Status
                  </div>
               </div>
               <p className="text-neutral-500 text-sm font-medium mb-6 max-w-xs">Create feature-rich, customizable and modern link-in-bio pages with flame.gg.</p>
               <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center justify-between w-40">
                 <span className="text-xs font-bold">🇺🇸 English (US)</span>
                 <ChevronDown size={14} />
               </div>
            </div>
            
            {[
              { title: 'General', links: ['Login', 'Sign Up', 'Pricing', 'Reset Password', 'Leaderboard', 'Website Status'] },
              { title: 'Resources', links: ['Help Center', 'Changelog', 'Redeem Code', 'Salad.com Product', 'Hone.gg Partner'] },
              { title: 'Contact', links: ['Discord Server', 'Support Email', 'Business Email', 'Legal Email'] },
              { title: 'Legal', links: ['Terms of Service', 'Privacy Policy', 'Copyright Policy'] }
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-bold text-sm mb-6 text-white">{col.title}</h4>
                <ul className="space-y-4">
                  {col.links.map(l => (
                    <li key={l}><Link href="#" className="text-neutral-500 hover:text-white transition text-xs font-bold">{l}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5">
             <p className="text-neutral-600 text-xs font-bold">Copyright © 2026 flame.gg - All Rights Reserved.</p>
             <div className="flex items-center gap-6 text-neutral-600 mt-6 md:mt-0">
               <MessageSquare size={18} className="hover:text-white transition cursor-pointer" />
               <Instagram size={18} className="hover:text-white transition cursor-pointer" />
               <Twitter size={18} className="hover:text-white transition cursor-pointer" />
               <Send size={18} className="hover:text-white transition cursor-pointer" />
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}