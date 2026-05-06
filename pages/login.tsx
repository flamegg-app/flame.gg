import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';
import { Flame, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { FaDiscord, FaGoogle } from 'react-icons/fa';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Check if there was an error passed back from the callback route
  useEffect(() => {
    if (router.query.error) {
      setErrorMessage("Authentication failed. Please try again.");
    }
  }, [router.query]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMessage(null);
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // Dynamically uses https://flame-gg-puz3.vercel.app/api/auth/callback
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['Satoshi'] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        
        {/* Brand Section */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="bg-purple-600 p-3 rounded-2xl mb-4 shadow-xl shadow-purple-600/20">
            <Flame size={28} fill="white" className="text-white" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter">Welcome back</h1>
          <p className="text-neutral-500 font-bold mt-2">Log in to manage your scope.gg profile</p>
        </div>

        {/* Error Callout */}
        {errorMessage && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3 text-red-500 text-sm font-bold">
            <AlertCircle size={18} />
            {errorMessage}
          </div>
        )}

        {/* OAuth Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-4 rounded-2xl hover:bg-white/10 transition-all font-black text-sm disabled:opacity-50"
          >
            <FaGoogle size={18} /> Google
          </button>
          <button 
            disabled 
            className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-4 rounded-2xl opacity-30 cursor-not-allowed font-black text-sm"
          >
            <FaDiscord size={18} /> Discord
          </button>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
          <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
            <span className="bg-[#0a0a0a] px-4 text-neutral-600 font-black">Or use credentials</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em] ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-700" size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-[#111] border border-white/5 py-4 pl-12 pr-4 rounded-2xl focus:outline-none focus:border-purple-600/50 transition-all font-bold text-sm placeholder:text-neutral-800"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em] ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-700" size={18} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#111] border border-white/5 py-4 pl-12 pr-4 rounded-2xl focus:outline-none focus:border-purple-600/50 transition-all font-bold text-sm placeholder:text-neutral-800"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-500 py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 group shadow-xl shadow-purple-600/10 disabled:opacity-50 disabled:cursor-wait"
          >
            {loading ? 'Authenticating...' : 'Sign In'} 
            {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <p className="mt-10 text-center text-neutral-600 text-xs font-bold">
          New to scope.gg? <Link href="/register" className="text-purple-500 hover:text-purple-400 transition-colors">Create account</Link>
        </p>
      </div>
    </div>
  );
}