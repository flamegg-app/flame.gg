import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';
import { Flame, Mail, Lock, ArrowRight } from 'lucide-react';
import { FaDiscord, FaGoogle } from 'react-icons/fa';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Fixed: Reusable handler for both Google and Discord that points to your callback route
  const handleOAuthLogin = async (provider: 'google' | 'discord') => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        // Points to pages/api/auth/callback.ts
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (error) {
      console.error(`${provider} Auth Error:`, error.message);
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['Satoshi'] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        
        {/* Brand Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="bg-purple-600 p-3 rounded-2xl mb-4 shadow-xl shadow-purple-600/20">
            <Flame size={28} fill="white" className="text-white" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter">Welcome back</h1>
          <p className="text-neutral-500 font-bold mt-2">Log in to manage your scope.gg profile</p>
        </div>

        {/* OAuth Options */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button 
            onClick={() => handleOAuthLogin('google')}
            disabled={loading}
            className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-4 rounded-2xl hover:bg-white/10 transition-all font-bold text-sm"
          >
            <FaGoogle size={18} /> Google
          </button>
          <button 
            onClick={() => handleOAuthLogin('discord')}
            disabled={loading}
            className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-4 rounded-2xl hover:bg-white/10 transition-all font-bold text-sm"
          >
            <FaDiscord size={18} /> Discord
          </button>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
          <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
            <span className="bg-[#0a0a0a] px-4 text-neutral-600">Or continue with email</span>
          </div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-black text-neutral-500 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 rounded-2xl focus:outline-none focus:border-purple-500/50 transition-all font-medium text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-black text-neutral-500 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 rounded-2xl focus:outline-none focus:border-purple-500/50 transition-all font-medium text-sm"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-500 py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 group"
          >
            {loading ? 'Processing...' : 'Sign In'} 
            {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <p className="mt-8 text-center text-neutral-500 text-sm font-bold">
          Don't have an account? <Link href="/register" className="text-purple-500 hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
}