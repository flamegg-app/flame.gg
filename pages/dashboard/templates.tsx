import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { supabase } from '../../lib/supabase';
import { Layout, Palette, Sparkles, Check } from 'lucide-react';

const TEMPLATES = [
  { id: 'midnight', name: 'Midnight Violet', font: 'Satoshi', effect: 'fade', primary: '#8b5cf6', bg: 'bg-[#0a0a0a]', border: 'border-purple-500/20' },
  { id: 'ocean', name: 'Ocean Drift', font: 'Space Grotesk', effect: 'bubbles', primary: '#0ea5e9', bg: 'bg-[#081521]', border: 'border-blue-500/20' },
  { id: 'sunset', name: 'Magma Glow', font: 'Outfit', effect: 'embers', primary: '#f97316', bg: 'bg-[#1a0f0a]', border: 'border-orange-500/20' },
  { id: 'forest', name: 'Emerald Mist', font: 'Inter', effect: 'fireflies', primary: '#10b981', bg: 'bg-[#06120e]', border: 'border-emerald-500/20' },
  { id: 'sakura', name: 'Sakura Dream', font: 'Satoshi', effect: 'sakura', primary: '#ec4899', bg: 'bg-[#1a0b14]', border: 'border-pink-500/20' },
  { id: 'cyber', name: 'Cyber Matrix', font: 'Fira Code', effect: 'matrix', primary: '#22c55e', bg: 'bg-[#020617]', border: 'border-green-500/20' },
  { id: 'starfield', name: 'Deep Space', font: 'JetBrains Mono', effect: 'stars', primary: '#a78bfa', bg: 'bg-[#020205]', border: 'border-violet-500/20' },
  { id: 'arctic', name: 'Arctic Frost', font: 'Inter', effect: 'snow', primary: '#94a3b8', bg: 'bg-[#0f172a]', border: 'border-slate-500/20' },
  { id: 'bloom', name: 'Neon Bloom', font: 'Poppins', effect: 'confetti', primary: '#f43f5e', bg: 'bg-[#110508]', border: 'border-rose-500/20' },
];

export default function Templates() {
  const [activeTheme, setActiveTheme] = useState('midnight');
  const [loading, setLoading] = useState(false);

  const applyTemplate = async (theme: any) => {
    setLoading(true);
    setActiveTheme(theme.id);

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from('profiles').update({
        theme: theme.id,
        primary_color: theme.primary,
        font: theme.font,
        effect: theme.effect
      }).eq('id', user.id);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white font-['Satoshi']">
      <Sidebar />
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Layout className="text-purple-500" size={24} />
            <h1 className="text-3xl font-black">Templates</h1>
          </div>
          <p className="text-neutral-500 text-sm">Apply a complete theme to your profile including colors, effects, fonts, and animations.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEMPLATES.map((t) => (
            <div 
              key={t.id}
              onClick={() => applyTemplate(t)}
              className={`group cursor-pointer relative overflow-hidden rounded-[2.5rem] border-2 transition-all duration-300 ${
                activeTheme === t.id ? 'border-purple-600 scale-[1.02]' : 'border-neutral-800 hover:border-neutral-600'
              }`}
            >
              {/* Preview Box */}
              <div className={`h-48 ${t.bg} relative flex flex-col items-center justify-center gap-3 p-6`}>
                <div className={`w-14 h-14 rounded-full shadow-2xl`} style={{ backgroundColor: t.primary, boxShadow: `0 0 20px ${t.primary}44` }} />
                <div className="w-24 h-3 rounded-full bg-white/10" />
                <div className="w-16 h-8 rounded-xl bg-white/5 border border-white/10" />
                
                {/* Floating Badge for Effect Type */}
                <span className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-neutral-400 border border-white/5">
                  {t.effect}
                </span>

                {activeTheme === t.id && (
                  <div className="absolute inset-0 bg-purple-600/10 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="bg-purple-600 p-2 rounded-full shadow-lg">
                      <Check size={20} />
                    </div>
                  </div>
                )}
              </div>

              {/* Info Box */}
              <div className="bg-[#161616] p-6">
                <h3 className="font-bold text-lg mb-1">{t.name}</h3>
                <p className="text-xs text-neutral-500 font-medium">
                  {t.font} / <span className="capitalize">{t.effect}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}