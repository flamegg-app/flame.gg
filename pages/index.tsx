import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LanguageSelector from '../components/LanguageSelector';
import { 
  Check, 
  Globe, 
  Users, 
  HardDrive, 
  Diamond, 
  Mail, 
  Instagram,
  Send,
  MessageSquare,
  // Use 'X' instead of 'Twitter'
  X 
} from 'lucide-react';

export default function Home() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleClaim = (e: React.FormEvent, customUser?: string) => {
    e.preventDefault();
    const userToClaim = customUser || username;
    if (userToClaim) {
      router.push(`/register?username=${encodeURIComponent(userToClaim)}`);
    } else {
      router.push('/register');
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const discordUrl = "https://discord.gg/QFnZFWZ25R";

  return (
    <div className="min-h-screen bg-[#0a0612] text-white font-['Satoshi',sans-serif] selection:bg-purple-500/30 overflow-x-hidden">
      
      {/* 1. Header Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 bg-[#160d21]/60 backdrop-blur-xl border border-white/10 py-3 px-8 rounded-full flex items-center justify-between shadow-2xl shadow-purple-900/20">
        <div className="flex items-center gap-2">
          <img src="/logo.webp" alt="Logo" className="w-7 h-7 object-contain" />
          <span className="text-xl font-black tracking-tighter">scope.gg</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-[13px] font-bold text-neutral-300">
          <Link href="/help" className="hover:text-white transition">Help Center</Link>
          <a href={discordUrl} target="_blank" rel="noreferrer" className="hover:text-white transition">Discord</a>
          <Link href="/leaderboard" className="hover:text-white transition">Leaderboard</Link>
          <button onClick={() => scrollToSection('pricing')} className="hover:text-white transition">Pricing</button>
          <Link href="/dashboard" className="bg-purple-600/20 text-purple-200 border border-purple-500/30 px-6 py-2 rounded-full font-black hover:bg-purple-600/40 transition">
            Dashboard
          </Link>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header className="pt-52 pb-20 px-6 flex flex-col items-center text-center relative overflow-hidden bg-gradient-to-b from-[#1a0b2e] to-[#0a0612]">
        
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <img src="/logo.webp" className="absolute top-10 left-[10%] w-32 h-32 opacity-[0.07] -rotate-12 grayscale" alt="" />
          <img src="/logo.webp" className="absolute top-20 right-[15%] w-40 h-40 opacity-[0.08] rotate-12 grayscale" alt="" />
          <img src="/logo.webp" className="absolute bottom-40 right-[10%] w-28 h-28 opacity-[0.05] -rotate-45 grayscale" alt="" />
          <img src="/logo.webp" className="absolute top-1/2 -left-10 w-44 h-44 opacity-[0.03] rotate-12 grayscale" alt="" />
        </div>

        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight relative z-10 drop-shadow-2xl">
          Everything you want, right here.
        </h1>
        <p className="text-purple-100/60 text-lg md:text-xl mb-12 max-w-2xl font-medium relative z-10 leading-relaxed">
          scope.gg is your go-to for modern, feature-rich link-in-bio pages and fast, secure file hosting.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 relative z-10 mb-20">
          <button onClick={() => router.push('/register')} className="bg-purple-600 hover:bg-purple-500 px-10 py-4 rounded-full font-black transition-all shadow-xl shadow-purple-600/30 active:scale-95">
            Sign Up for Free
          </button>
          <button onClick={() => scrollToSection('pricing')} className="bg-white/10 hover:bg-white/15 border border-white/20 px-10 py-4 rounded-full font-black transition-all active:scale-95 backdrop-blur-sm">
            View Pricing
          </button>
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 perspective-1000">
           <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 mt-10">
              <div className="relative z-20 w-full md:w-[60%] transform md:-rotate-y-12 md:rotate-x-6 md:hover:rotate-0 transition-transform duration-700">
                <img 
                  src="/dashboard-mockup.png" 
                  alt="Dashboard Preview" 
                  className="rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#130b21]" 
                />
              </div>

              <div className="relative z-10 w-full md:w-[40%] flex justify-center -mt-10 md:mt-0 md:-ml-20">
                 <img 
                   src="/profile-mockup.png" 
                   alt="Profile Preview" 
                   className="w-[280px] rounded-[2.5rem] border border-white/10 shadow-2xl transform rotate-6 md:rotate-12 translate-y-10" 
                 />
                 <img 
                   src="/profile-mockup.png" 
                   alt="Profile Preview 2" 
                   className="w-[280px] rounded-[2.5rem] border border-white/10 shadow-2xl absolute -bottom-10 -right-4 md:right-0 transform -rotate-3 md:-rotate-6" 
                 />
              </div>
           </div>
           <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0612] to-transparent z-30" />
        </div>
      </header>

      {/* 4. Stats Grid */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Over <span className="text-purple-400">1,740,000</span> people use scope.gg
          </h2>
          <p className="text-neutral-400 font-bold text-lg max-w-3xl mx-auto leading-relaxed">
            Create feature-rich, customizable and modern link-in-bio pages, along with fast and secure file hosting, all with scope.gg.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Profile Views', val: '67,900,000+', icon: Globe },
            { label: 'Users', val: '1,740,000+', icon: Users },
            { label: 'File Uploads', val: '600,000+', icon: HardDrive },
            { label: 'Subscribers', val: '48,100+', icon: Diamond },
          ].map((stat, i) => (
            <div key={i} className="bg-[#130b21] border border-white/10 p-10 rounded-[2.5rem] relative group hover:border-purple-500/40 transition-all shadow-lg">
              <stat.icon className="absolute right-8 top-8 text-purple-500 opacity-20 transition group-hover:opacity-40" size={32} />
              <p className="text-3xl font-black mb-1 tracking-tight text-purple-50">{stat.val}</p>
              <p className="text-neutral-500 text-xs font-black uppercase tracking-[0.2em]">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center">
          <p className="text-neutral-400 font-bold mb-6 text-sm">Claim your profile and create an account in minutes!</p>
          <form 
            onSubmit={(e) => handleClaim(e)}
            className="bg-[#1a0d2d] border border-white/10 p-1.5 rounded-2xl flex w-full max-w-md focus-within:border-purple-500/50 transition-all shadow-2xl"
          >
            <span className="pl-5 pr-3 py-3 text-neutral-500 font-bold border-r border-white/5">scope.gg/</span>
            <input 
              type="text" 
              placeholder="username" 
              className="bg-transparent border-none outline-none flex-1 px-4 font-bold text-white placeholder:text-neutral-700"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button type="submit" className="bg-purple-600 text-white px-8 py-3 rounded-xl font-black text-xs hover:bg-purple-500 transition">
              Claim Now
            </button>
          </form>
        </div>
      </section>

      {/* 5. Pricing */}
      <section id="pricing" className="py-32 px-6 bg-[#0c0716]">
        <h2 className="text-4xl font-black text-center mb-20 tracking-tight">
          Explore our exclusive plans and join <span className="text-purple-400">48,100+</span> subscribers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-[#130b21] border border-white/5 p-12 rounded-[3rem] hover:border-white/10 transition">
            <h3 className="text-2xl font-black mb-8">Free</h3>
            <div className="mb-8"><span className="text-5xl font-black">0€</span><span className="text-neutral-500 font-bold ml-2">/Lifetime</span></div>
            <ul className="space-y-5 mb-14">
              {['Basic Customization', 'Profile Analytics', 'Basic Effects', 'Add Your Socials'].map(item => (
                <li key={item} className="flex items-center gap-3 text-[13px] font-bold text-neutral-300">
                  <Check className="text-purple-500" size={16} /> {item}
                </li>
              ))}
            </ul>
            <button onClick={() => router.push('/register')} className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-black transition">Get Started</button>
          </div>

          <div className="bg-[#1a0d2d] border border-purple-500/30 p-12 rounded-[3rem] relative shadow-2xl shadow-purple-900/20">
            <div className="absolute top-6 right-8 bg-purple-500/20 text-purple-300 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Most Popular</div>
            <h3 className="text-2xl font-black mb-8 flex items-center gap-2 text-purple-50">Premium</h3>
            <div className="mb-2"><span className="text-5xl font-black">7,99€</span><span className="text-neutral-500 font-bold ml-2">/Lifetime</span></div>
            <p className="text-purple-400 text-[11px] font-black mb-8 italic uppercase">Pay once. Keep it forever.</p>
            <ul className="space-y-5 mb-14">
              {['Exclusive Badge', 'Profile Layouts', 'Custom Fonts', 'Special Profile Effects', 'Advanced Customization'].map(item => (
                <li key={item} className="flex items-center gap-3 text-[13px] font-bold text-neutral-200">
                  <Check className="text-purple-500" size={16} /> {item}
                </li>
              ))}
            </ul>
            <button onClick={() => router.push('/premium')} className="w-full py-4 bg-purple-600 hover:bg-purple-500 rounded-2xl font-black shadow-lg shadow-purple-900/40 transition">Learn More</button>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="pt-32 pb-16 px-6 border-t border-white/5 bg-[#0a0612]">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-[#1a0d2d] to-[#120c1a] border border-purple-500/20 p-16 rounded-[3.5rem] mb-24 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-2xl">
             <div className="relative z-10 text-center md:text-left">
               <h2 className="text-5xl font-black mb-6 leading-tight">Everything you want, <br/>right here.</h2>
               <p className="text-purple-100/50 font-bold mb-10 max-w-lg">Join over 1,740,000+ people using scope.gg and become part of our large community.</p>
               <div className="flex bg-black/40 border border-white/10 p-1.5 rounded-2xl max-w-sm mx-auto md:mx-0 backdrop-blur-md">
                  <span className="pl-4 pr-2 py-3 text-neutral-600 font-bold text-sm">scope.gg/</span>
                  <input type="text" placeholder="username" className="bg-transparent outline-none flex-1 font-bold text-sm text-white" />
                  <button onClick={(e) => handleClaim(e)} className="bg-purple-600 px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-tighter hover:bg-purple-500 transition">Claim Now</button>
               </div>
             </div>
             <img src="/logo.webp" className="absolute -right-16 top-0 h-full opacity-5 pointer-events-none grayscale -rotate-12" alt="" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20 text-left">
            <div className="col-span-2">
               <div className="flex items-center gap-2 mb-6">
                  <img src="/logo.webp" className="w-7 h-7" alt="Logo" />
                  <span className="text-2xl font-black tracking-tighter">scope.gg</span>
                  <div className="flex items-center gap-2 bg-yellow-500/10 px-3 py-1 rounded-md text-[10px] text-yellow-500 font-black uppercase ml-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                    System Status
                  </div>
               </div>
               <p className="text-neutral-500 text-sm font-bold mb-8 max-w-xs leading-relaxed">Create feature-rich, customizable and modern link-in-bio pages with scope.gg.</p>
               <LanguageSelector />
            </div>
            
            {[
              { title: 'General', links: [{ n: 'Login', h: '/login' }, { n: 'Sign Up', h: '/register' }, { n: 'Help Center', h: '/help' }, { n: 'Leaderboard', h: '/leaderboard' }] },
              { title: 'Contact', links: [{ n: 'Discord Server', h: discordUrl }, { n: 'Support Email', h: 'mailto:support@scope.gg' }] },
              { title: 'Legal', links: [{ n: 'Terms of Service', h: '/tos' }, { n: 'Privacy Policy', h: '/privacy' }] }
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-black text-xs uppercase tracking-widest mb-8 text-neutral-300">{col.title}</h4>
                <ul className="space-y-4">
                  {col.links.map(l => (
                    <li key={l.n}>
                      {l.h.startsWith('#') ? (
                        <button onClick={() => scrollToSection(l.h.substring(1))} className="text-neutral-500 hover:text-white transition text-[13px] font-bold">{l.n}</button>
                      ) : (
                        <Link href={l.h} className="text-neutral-500 hover:text-white transition text-[13px] font-bold">{l.n}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5">
             <p className="text-neutral-600 text-[11px] font-black uppercase tracking-widest">Copyright © 2026 scope.gg - All Rights Reserved.</p>
             
             {/* Icons updated to match image_bea4b6.png order and companies */}
             <div className="flex items-center gap-8 text-neutral-600 mt-8 md:mt-0">
               <a href={discordUrl} target="_blank" rel="noreferrer">
                  <MessageSquare size={20} className="hover:text-white transition cursor-pointer" />
               </a>
               <a href="https://instagram.com/scope.gg" target="_blank" rel="noreferrer">
                  <Instagram size={20} className="hover:text-white transition cursor-pointer" />
               </a>
               <a href="https://twitter.com/scope_gg" target="_blank" rel="noreferrer">
                  <Twitter size={20} className="hover:text-white transition cursor-pointer" />
               </a>
               <a href="https://t.me/scope_gg" target="_blank" rel="noreferrer">
                  <Send size={20} className="hover:text-white transition cursor-pointer" />
               </a>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}