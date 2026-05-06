import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { FaDiscord, FaGoogle } from 'react-icons/fa';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // FIXED LOGIC: Sends user to the callback API route
  const handleGoogleLogin = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: 'google',
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
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 font-['Satoshi']">
      <div className="w-full max-w-[440px] flex flex-col items-center">
        
        {/* ICON BOX: Exact Match to image_bcd7f1.png */}
        <div className="w-16 h-16 bg-[#9333ea] rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(147,51,234,0.3)]">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
            <path d="M12 2c0 0-3 3.5-3 5.5s1.5 3.5 3 3.5 3-1.5 3-3.5S12 2 12 2z" />
            <path d="M12 22c4.418 0 8-3.582 8-8 0-4.418-3.582-8-8-8s-8 3.582-8 8c0 4.418 3.582 8 8 8z" opacity="0.5" />
          </svg>
        </div>

        {/* HEADING: Serif + Italic Match */}
        <h1 className="text-[42px] font-serif font-bold tracking-tight mb-2 italic">Welcome back</h1>
        <p className="text-neutral-500 font-medium mb-10 text-[15px]">Log in to manage your scope.gg profile</p>

        {/* OAUTH GRID */}
        <div className="grid grid-cols-2 gap-4 w-full mb-10">
          <button 
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 bg-[#111] border border-white/5 py-4 rounded-2xl hover:bg-white/5 transition-all font-bold text-[15px]"
          >
            <FaGoogle size={18} /> Google
          </button>
          <button className="flex items-center justify-center gap-3 bg-[#111] border border-white/5 py-4 rounded-2xl opacity-20 cursor-not-allowed font-bold text-[15px]">
            <FaDiscord size={18} /> Discord
          </button>
        </div>

        {/* SEPARATOR */}
        <div className="relative w-full mb-10">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/[0.03]"></div></div>
          <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600">
            <span className="bg-[#050505] px-4">Or use credentials</span>
          </div>
        </div>

        {/* INPUTS */}
        <form onSubmit={handleEmailLogin} className="w-full space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-700" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-[#0f0f0f] border border-white/5 py-5 pl-14 pr-6 rounded-2xl focus:outline-none focus:border-[#9333ea]/50 transition-all text-sm font-medium placeholder:text-neutral-800"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-700" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0f0f0f] border border-white/5 py-5 pl-14 pr-6 rounded-2xl focus:outline-none focus:border-[#9333ea]/50 transition-all text-sm font-medium placeholder:text-neutral-800"
              />
            </div>
          </div>

          {/* THE BIG PURPLE BUTTON */}
          <button 
            type="submit"
            className="w-full bg-[#9333ea] hover:bg-[#a855f7] py-5 rounded-2xl font-black text-[15px] transition-all flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(147,51,234,0.2)] mt-4"
          >
            Sign In <ArrowRight size={20} />
          </button>
        </form>

        <p className="mt-12 text-center text-neutral-600 text-[13px] font-bold">
          New to scope.gg? <Link href="/register" className="text-[#9333ea] hover:underline ml-1">Create account</Link>
        </p>
      </div>
    </div>
  );
}