import React, { useState } from 'react';
import Link from 'next/link';
import { signIn } from "next-auth/react";
import { Mail, Lock, EyeOff, Eye } from 'lucide-react';
import { FaDiscord, FaGoogle } from 'react-icons/fa';
import LanguageSelector from '../components/LanguageSelector';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  // This function handles the Google Sign-In logic
  const handleGoogleLogin = async () => {
    try {
      // The callbackUrl is where the user goes AFTER successful login
      await signIn('google', { callbackUrl: '/dashboard' });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0612] text-white font-['Satoshi',sans-serif] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Main Login Card */}
      <div className="w-full max-w-[440px] z-10">
        <div className="bg-[#110c1d] border border-white/5 rounded-[3rem] p-10 md:p-12 shadow-2xl shadow-black/50">
          
          {/* Logo & Header */}
          <div className="flex flex-col items-center mb-10">
            <Link href="/">
              <img src="/logo.webp" alt="scope.gg" className="w-16 h-16 mb-6 object-contain hover:scale-110 transition-transform cursor-pointer" />
            </Link>
            <h1 className="text-2xl font-black tracking-tight text-center">Log in to your account</h1>
          </div>

          {/* Social Auth Buttons */}
          <div className="flex flex-col gap-3 mb-8">
            {/* Discord Button */}
            <button 
              type="button"
              className="w-full bg-[#5865F2] hover:bg-[#4752c4] py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-[14px] transition-all hover:shadow-[0_0_20px_rgba(88,101,242,0.25)] active:scale-[0.98]"
            >
              <FaDiscord size={20} />
              <span>Continue with Discord</span>
            </button>

            {/* Google Button - Logic Added Here */}
            <button 
              type="button"
              onClick={handleGoogleLogin}
              className="w-full bg-white hover:bg-neutral-200 py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-[14px] text-black transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-[0.98]"
            >
              <FaGoogle size={18} className="text-[#ea4335]" />
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] flex-1 bg-white/5" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600">Or use email</span>
            <div className="h-[1px] flex-1 bg-white/5" />
          </div>

          {/* Email Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-[12px] font-black uppercase tracking-widest text-neutral-500 mb-2.5 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-purple-500 transition-colors" size={18} />
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="w-full bg-black/40 border border-white/5 rounded-[1.25rem] py-4 pl-14 pr-4 outline-none focus:border-purple-500/50 focus:bg-black/60 transition-all font-bold text-[14px] placeholder:text-neutral-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-black uppercase tracking-widest text-neutral-500 mb-2.5 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-purple-500 transition-colors" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="w-full bg-black/40 border border-white/5 rounded-[1.25rem] py-4 pl-14 pr-14 outline-none focus:border-purple-500/50 focus:bg-black/60 transition-all font-bold text-[14px] placeholder:text-neutral-700"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-white transition-colors"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              <div className="flex justify-end mt-3">
                <Link href="/forgot" className="text-[12px] font-bold text-neutral-500 hover:text-purple-400 transition">Forgot password?</Link>
              </div>
            </div>

            <button type="submit" className="w-full bg-[#1a0d2d] hover:bg-[#251240] border border-purple-500/20 text-purple-100 py-4 rounded-[1.25rem] font-black text-[15px] transition-all active:scale-[0.98] mt-4 shadow-xl">
              Login to scope.gg
            </button>
          </form>

          {/* Footer Link */}
          <p className="text-center mt-10 text-[13px] font-bold text-neutral-500">
            Are you new to scope.gg? {' '}
            <Link href="/register" className="text-purple-400 hover:text-purple-300 transition underline-offset-4 hover:underline">Create an account</Link>
          </p>
        </div>

        {/* Bottom Page Footer */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 opacity-60 hover:opacity-100 transition-opacity text-center md:text-left">
          <p className="text-[11px] font-black uppercase tracking-widest text-neutral-500">
            © 2026 scope.gg
          </p>
          <LanguageSelector />
        </div>
      </div>
    </div>
  );
}