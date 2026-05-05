import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { supabase } from '../../lib/supabase';
import { 
  Flame, Star, Diamond, CheckCircle2, 
  Zap, Trophy, MessageCircle, Crown, 
  Eye, ShieldCheck, ZapOff 
} from 'lucide-react';

// This is our list of badges with their unique colors and icons
const AVAILABLE_BADGES = [
  { id: 'early', name: 'Early Adopter', desc: 'Joined during the beta period', icon: <Flame size={20} className="text-orange-500" /> },
  { id: 'complete', name: 'Profile Complete', desc: 'Completed all profile fields', icon: <Star size={20} className="text-yellow-400" /> },
  { id: 'premium', name: 'Premium Member', desc: 'Purchased a premium plan', icon: <Diamond size={20} className="text-purple-400" /> },
  { id: 'verified', name: 'Verified', desc: 'Verified your identity', icon: <CheckCircle2 size={20} className="text-blue-400" /> },
  { id: 'power', name: 'Power User', desc: 'Added 10+ links to your profile', icon: <Zap size={20} className="text-green-400" /> },
  { id: 'popular', name: 'Popular', desc: 'Reached 100+ profile views', icon: <Trophy size={20} className="text-indigo-400" /> },
  { id: 'discord', name: 'Discord Member', desc: 'Joined the flame.gg Discord server', icon: <MessageCircle size={20} className="text-[#5865F2]" /> },
  { id: 'owner', name: 'Owner', desc: 'flame.gg platform owner', icon: <Crown size={20} className="text-yellow-500" /> },
  { id: 'nitro', name: 'Discord Nitro', desc: 'Has Discord Nitro subscription', icon: <ShieldCheck size={20} className="text-pink-400" /> },
];

export default function Badges() {
  const [equipped, setEquipped] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Load user's badges from database on page load
  useEffect(() => {
    fetchBadges();
  }, []);

  async function fetchBadges() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      let { data } = await supabase.from('profiles').select('badges').eq('id', user.id).single();
      if (data?.badges) setEquipped(data.badges);
    }
  }

  async function toggleBadge(id: string) {
    let newBadges = [...equipped];
    if (newBadges.includes(id)) {
      newBadges = newBadges.filter(b => b !== id);
    } else {
      newBadges.push(id);
    }
    
    setEquipped(newBadges);
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from('profiles').update({ badges: newBadges }).eq('id', user?.id);
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white">
      <Sidebar />
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-black mb-2">Badges</h1>
          <p className="text-neutral-500 text-sm">Earn badges by completing achievements. Equip them to show on your profile.</p>
        </header>

        {/* Equipped Preview Bar */}
        <div className="bg-[#161616] border border-neutral-800 p-6 rounded-3xl mb-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-4">Equipped on your profile:</p>
          <div className="flex gap-4 min-h-[40px] items-center">
            {equipped.length === 0 && <span className="text-neutral-600 text-sm italic">No badges equipped...</span>}
            {equipped.map(id => {
              const badge = AVAILABLE_BADGES.find(b => b.id === id);
              return <div key={id} className="p-2 bg-[#0a0a0a] rounded-xl border border-white/5">{badge?.icon}</div>;
            })}
          </div>
        </div>

        {/* Badge Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AVAILABLE_BADGES.map((badge) => {
            const isEquipped = equipped.includes(badge.id);
            return (
              <div key={badge.id} className={`bg-[#161616] border transition-all p-6 rounded-[2rem] ${isEquipped ? 'border-purple-600/50' : 'border-neutral-800'}`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-[#0a0a0a] rounded-2xl border border-white/5">
                    {badge.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">{badge.name}</h3>
                    <span className="text-[10px] font-bold text-purple-500 uppercase tracking-tighter">Earned</span>
                  </div>
                </div>
                <p className="text-xs text-neutral-500 mb-6 leading-relaxed">{badge.desc}</p>
                
                <button 
                  onClick={() => toggleBadge(badge.id)}
                  disabled={loading}
                  className={`w-full py-3 rounded-xl font-bold text-xs transition ${
                    isEquipped 
                    ? 'bg-[#0a0a0a] border border-neutral-800 text-neutral-400 hover:bg-red-950/20 hover:text-red-500 hover:border-red-900/50' 
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  {isEquipped ? 'Unequip' : 'Equip'}
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}