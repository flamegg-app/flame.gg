import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';
import { Mail, Key, EyeOff } from 'lucide-react';
import { FaDiscord, FaGoogle } from 'react-icons/fa';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // The Fix: Redirects to your Vercel callback route
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
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-[400px] bg-[#0f0f0f] border border-white/5 rounded-[2rem] p-8 flex flex-col items-center shadow-2xl">
        
        {/* LOGO: Using your logo.png file */}
        <img src="/logo.png" alt="Logo" className="w-20 h-20 mb-6 object-contain" />

        <h1 className="text-2xl font-bold text-white mb-6">Log in to your account</h1>

        {/* AUTH BUTTONS: Exact style from image_32f91a.png[cite: 1] */}
        <div className="w-full space-y-3 mb-6">
          <button 
            onClick={() => handleOAuthLogin('discord')}
            className="w-full bg-[#354191] hover:bg-[#3f4db0] text-white py-3.5 rounded-2xl flex items-center justify-center gap-3 font-bold transition-all"
          >
            <FaDiscord size={20} /> Discord
          </button>
          
          <button 
            onClick={() => handleOAuthLogin('google')}
            className="w-full bg-[#222] hover:bg-[#2a2a2a] text-white py-3.5 rounded-2xl flex items-center justify-center gap-3 font-bold border border-white/5 transition-all"
          >
            <FaGoogle size={18} /> Gmail
          </button>
        </div>

        {/* SEPARATOR */}
        <div className="w-full flex items-center gap-4 mb-6">
          <div className="flex-1 h-[1px] bg-white/10"></div>
          <span className="text-neutral-500 text-sm font-medium">Or with email</span>
          <div className="flex-1 h-[1px] bg-white/10"></div>
        </div>

        {/* FORM FIELDS[cite: 1] */}
        <form onSubmit={handleEmailLogin} className="w-full space-y-5">
          <div className="space-y-2">
            <label className="text-white text-sm font-bold ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full bg-[#151515] border-none py-4 pl-12 pr-4 rounded-2xl text-white placeholder:text-neutral-700 focus:ring-1 focus:ring-purple-500/50 outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-white text-sm font-bold ml-1">Password</label>
            <div className="relative">
              <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-[#151515] border-none py-4 pl-12 pr-12 rounded-2xl text-white placeholder:text-neutral-700 focus:ring-1 focus:ring-purple-500/50 outline-none"
              />
              <EyeOff className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-700 cursor-pointer" size={20} />
            </div>
          </div>

          <div className="text-right">
            <button type="button" className="text-neutral-500 text-sm hover:text-neutral-400 font-medium">
              Forgot password?
            </button>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#181818] hover:bg-[#222] text-white py-4 rounded-2xl font-bold border border-white/5 transition-all mt-2"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-neutral-400 text-sm font-medium">
          Are you new to guns.lol? <Link href="/register" className="text-purple-400 hover:text-purple-300 ml-1">Create an account</Link>
        </p>
      </div>
    </div>
  );
}