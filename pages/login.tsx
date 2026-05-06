import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';
import { Mail, Lock, EyeOff } from 'lucide-react';
import { FaDiscord, FaGoogle } from 'react-icons/fa';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Fixed OAuth logic for Vercel
  const handleOAuthLogin = async (provider: 'google' | 'discord') => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a14] flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-[440px] bg-[#0f0f1b] border border-white/5 rounded-[40px] p-10 flex flex-col items-center shadow-2xl">
        
        {/* LOGO BOX: Updated to logo.webp[cite: 1] */}
        <div className="w-16 h-16 bg-[#1a1a2e] rounded-lg mb-8 overflow-hidden border border-white/10 flex items-center justify-center">
          <img src="/logo.webp" alt="Scope Logo" className="w-10 h-10 object-contain opacity-80" />
        </div>

        <h1 className="text-[32px] font-black text-white mb-10 tracking-tight">Log in to your account</h1>

        {/* OAUTH BUTTONS[cite: 1] */}
        <div className="w-full space-y-4 mb-10">
          <button 
            onClick={() => handleOAuthLogin('discord')}
            className="w-full bg-[#5865F2] hover:bg-[#4752c4] text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-bold text-[15px] transition-all"
          >
            <FaDiscord size={20} /> Continue with Discord
          </button>
          
          <button 
            onClick={() => handleOAuthLogin('google')}
            className="w-full bg-white hover:bg-neutral-100 text-black py-4 rounded-2xl flex items-center justify-center gap-3 font-bold text-[15px] transition-all shadow-lg"
          >
            <FaGoogle size={18} className="text-[#DB4437]" /> Continue with Google
          </button>
        </div>

        {/* SEPARATOR */}
        <div className="w-full flex items-center gap-4 mb-10">
          <div className="flex-1 h-[1px] bg-white/5"></div>
          <span className="text-neutral-600 text-[10px] font-black uppercase tracking-[0.2em]">Or use email</span>
          <div className="flex-1 h-[1px] bg-white/5"></div>
        </div>

        {/* FORM[cite: 1] */}
        <form onSubmit={handleEmailLogin} className="w-full space-y-6">
          <div className="space-y-3">
            <label className="text-neutral-500 text-[11px] font-black uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-700" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-[#0a0a14] border border-white/5 py-5 pl-14 pr-6 rounded-2xl text-white placeholder:text-neutral-800 focus:outline-none focus:border-purple-500/30 transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-neutral-500 text-[11px] font-black uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-700" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0a0a14] border border-white/5 py-5 pl-14 pr-14 rounded-2xl text-white placeholder:text-neutral-800 focus:outline-none focus:border-purple-500/30 transition-all font-medium"
              />
              <EyeOff className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-700 cursor-pointer" size={18} />
            </div>
          </div>

          <div className="text-right">
            <button type="button" className="text-neutral-500 text-sm hover:text-neutral-400 font-bold transition-colors">
              Forgot password?
            </button>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#1a1a2e]/50 border border-purple-500/20 hover:bg-[#1a1a2e] text-white py-5 rounded-2xl font-black text-lg transition-all mt-4"
          >
            Login to scope.gg
          </button>
        </form>

        <p className="mt-10 text-neutral-500 text-sm font-bold">
          Are you new to scope.gg? <Link href="/register" className="text-purple-500 hover:text-purple-400 ml-1">Create an account</Link>
        </p>
      </div>

      {/* FOOTER */}
      <div className="mt-12 w-full max-w-4xl flex items-center justify-between text-neutral-700 text-[11px] font-black tracking-widest uppercase">
        <p>© 2026 SCOPE.GG</p>
        <div className="bg-[#0f0f1b] border border-white/5 px-4 py-2 rounded-xl flex items-center gap-3 cursor-pointer">
          <span>US English (US)</span>
          <div className="w-2 h-2 border-r border-b border-neutral-700 rotate-45 mb-1"></div>
        </div>
      </div>
    </div>
  );
}