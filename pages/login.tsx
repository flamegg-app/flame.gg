import React from 'react';
import { supabase } from '../lib/supabase';
import { Flame, MessageCircle, Mail } from 'lucide-react';

export default function Login() {
  
  const handleDiscordLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        // Redirects to your dashboard after authorization
        redirectTo: `${window.location.origin}/dashboard`, 
      },
    });

    if (error) {
      console.error('Error logging in with Discord:', error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center font-['Satoshi'] p-6">
      <div className="w-full max-w-md">
        {/* Branding */}
        <div className="flex flex-col items-center mb-10">
          <div className="bg-purple-600 p-4 rounded-3xl shadow-2xl shadow-purple-600/20 mb-6">
            <Flame size={40} fill="white" className="text-white" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter">Welcome to flame.gg</h1>
          <p className="text-neutral-500 mt-2 text-center">
            Connect your identity and start building your legacy.
          </p>
        </div>

        {/* Login Container */}
        <div className="bg-[#161616] border border-neutral-800 p-8 rounded-[2.5rem] shadow-2xl space-y-4">
          
          {/* Discord Button */}
          <button 
            onClick={handleDiscordLogin}
            className="w-full flex items-center justify-center gap-3 bg-[#5865F2] hover:bg-[#4752C4] text-white py-4 rounded-2xl font-black transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageCircle fill="currentColor" size={20} />
            Continue with Discord
          </button>

          <div className="relative py-4 flex items-center">
            <div className="flex-grow border-t border-neutral-800"></div>
            <span className="flex-shrink mx-4 text-neutral-600 text-[10px] font-black uppercase tracking-widest">or</span>
            <div className="flex-grow border-t border-neutral-800"></div>
          </div>

          {/* Email Placeholder (for future use) */}
          <button 
            disabled
            className="w-full flex items-center justify-center gap-3 bg-neutral-800/50 border border-neutral-800 text-neutral-500 py-4 rounded-2xl font-bold cursor-not-allowed"
          >
            <Mail size={18} />
            Email Login (Coming Soon)
          </button>
        </div>

        {/* Footer Info */}
        <p className="text-center text-neutral-600 text-xs mt-8">
          By continuing, you agree to the flame.gg Terms of Service.
        </p>
      </div>
    </div>
  );
}