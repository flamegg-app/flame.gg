import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { supabase } from '../lib/supabase';
import { Flame, Twitter, Youtube, AlertTriangle, Instagram, Github } from 'lucide-react';

export default function UserProfile() {
  const router = useRouter();
  const { username } = router.query;
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (username) fetchProfile();
  }, [username]);

  async function fetchProfile() {
    // We look up the user by their display_name (case insensitive)
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .ilike('display_name', username as string)
      .single();

    if (error || !data) {
      setProfile(null);
    } else {
      setProfile(data);
    }
    setLoading(false);
  }

  if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><Flame className="text-purple-600 animate-pulse" size={48} fill="currentColor" /></div>;

  // BAN CHECK: If you banned them in the Admin Panel, their page won't show
  if (!profile || profile.is_banned) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 text-center">
        <AlertTriangle size={64} className="text-red-500 mb-6" />
        <h1 className="text-4xl font-black tracking-tighter mb-2">Account Unavailable</h1>
        <p className="text-neutral-500 max-w-sm">This account has been suspended or does not exist.</p>
        <button onClick={() => router.push('/')} className="mt-8 text-purple-500 font-bold text-sm hover:underline tracking-widest uppercase">Return to flame.gg</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['Satoshi'] relative overflow-hidden flex flex-col items-center justify-center p-6">
      <Head>
        <title>{profile.display_name} | flame.gg</title>
        <meta name="description" content={profile.bio} />
      </Head>

      {/* BACKGROUND EFFECTS (Locked to Premium/Legendary) */}
      {profile.effect === 'matrix' && (
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJndnY3ZzR2ZzR2ZzR2ZzR2ZzR2ZzR2ZzR2ZzR2ZzR2ZzR2/3o7TKSjP8SOTFvP3K8/giphy.gif')] bg-cover mix-blend-screen" />
      )}
      
      {profile.effect === 'stars' && (
        <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:50px_50px]" />
      )}

      {/* PROFILE CARD */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-[#111111]/80 backdrop-blur-3xl border border-white/10 rounded-[3.5rem] p-10 flex flex-col items-center text-center shadow-2xl">
          
          {/* Avatar Circle */}
          <div 
            className="w-32 h-32 rounded-full mb-8 border-4 shadow-lg flex items-center justify-center bg-neutral-900 overflow-hidden"
            style={{ borderColor: profile.primary_color }}
          >
             <span className="text-4xl font-black opacity-20">{profile.display_name?.charAt(0).toUpperCase()}</span>
          </div>

          {/* Name & Badge */}
          <div className="flex items-center gap-2 mb-4">
            <h1 className="text-4xl font-black tracking-tighter">{profile.display_name}</h1>
            {profile.subscription_tier === 'legendary' && (
              <div className="bg-gradient-to-tr from-yellow-400 to-orange-500 p-1 rounded-full shadow-lg" title="Legendary Member">
                <Flame size={14} className="text-black" fill="currentColor" />
              </div>
            )}
          </div>

          {/* Bio */}
          <p className="text-neutral-400 leading-relaxed mb-10 text-sm font-medium">
            {profile.bio || "No bio yet."}
          </p>

          {/* Buttons/Links (Simplified for remaking guns.lol style) */}
          <div className="w-full space-y-4">
            <button 
               className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition font-bold text-sm tracking-wide"
               style={{ color: profile.primary_color }}
            >
              Contact Me
            </button>

            {/* Social Icons */}
            <div className="flex gap-6 mt-8">
              <Instagram size={20} className="text-neutral-600 hover:text-white transition cursor-pointer" />
              <Twitter size={20} className="text-neutral-600 hover:text-white transition cursor-pointer" />
              <Github size={20} className="text-neutral-600 hover:text-white transition cursor-pointer" />
              <Youtube size={20} className="text-neutral-600 hover:text-white transition cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Branding Footer */}
        <div className="mt-10 flex flex-col items-center opacity-40">
           <div className="flex items-center gap-2 mb-1">
              <Flame size={12} fill="currentColor" className="text-purple-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">flame.gg</span>
           </div>
           <p className="text-[10px] font-bold">Create your own profile today.</p>
        </div>
      </div>
    </div>
  );
}