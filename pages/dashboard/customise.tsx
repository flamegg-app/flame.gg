import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { supabase } from '../../lib/supabase';
import { 
  Save, 
  Palette, 
  Type, 
  Sparkles, 
  Link as LinkIcon, 
  User, 
  Lock,
  Music,
  Check
} from 'lucide-react';

export default function Customize() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<any>({
    display_name: '',
    bio: '',
    primary_color: '#8b5cf6',
    font: 'Satoshi',
    effect: 'none',
    social_links: [],
    subscription_tier: 'free' // This controls the "Lock" logic
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (data) setProfile(data);
    }
    setLoading(false);
  }

  const handleSave = async () => {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from('profiles').update(profile).eq('id', user?.id);
    if (!error) alert('Profile updated successfully!');
    setSaving(false);
  };

  // Helper to check if a user can use a feature
  const isLocked = (tierRequired: string) => {
    if (profile.subscription_tier === 'legendary') return false;
    if (profile.subscription_tier === 'premium' && tierRequired !== 'legendary') return false;
    return profile.subscription_tier !== tierRequired;
  };

  if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><div className="animate-spin text-purple-600"><Sparkles /></div></div>;

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white font-['Satoshi']">
      <Sidebar />
      
      <main className="flex-1 p-10 overflow-y-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side: Inputs */}
        <section className="space-y-10">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black">Customize</h1>
              <p className="text-neutral-500 text-sm">Design your digital identity.</p>
            </div>
            <button 
              onClick={handleSave}
              disabled={saving}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-2xl flex items-center gap-2 font-black text-sm transition shadow-lg shadow-purple-600/20"
            >
              <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </header>

          {/* Identity Section */}
          <div className="bg-[#161616] border border-neutral-800 p-8 rounded-[2.5rem] space-y-6">
            <h2 className="flex items-center gap-2 font-bold text-neutral-400 text-xs uppercase tracking-widest"><User size={14}/> Identity</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-500">Display Name</label>
                <input 
                  value={profile.display_name}
                  onChange={(e) => setProfile({...profile, display_name: e.target.value})}
                  className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-xl p-4 text-sm focus:border-purple-600 outline-none transition"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-500">Bio</label>
                <textarea 
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-xl p-4 text-sm h-32 focus:border-purple-600 outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Visuals Section (Premium Checks) */}
          <div className="bg-[#161616] border border-neutral-800 p-8 rounded-[2.5rem] space-y-6">
            <h2 className="flex items-center gap-2 font-bold text-neutral-400 text-xs uppercase tracking-widest"><Palette size={14}/> Visuals</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-500">Theme Color</label>
                <input 
                  type="color"
                  value={profile.primary_color}
                  onChange={(e) => setProfile({...profile, primary_color: e.target.value})}
                  className="w-full h-12 bg-[#0a0a0a] border border-neutral-800 rounded-xl cursor-pointer"
                />
              </div>
              
              <div className="space-y-2 relative">
                <label className="text-xs font-bold text-neutral-500 flex items-center gap-1">
                  Effect {isLocked('premium') && <Lock size={10} className="text-purple-500"/>}
                </label>
                <select 
                  disabled={isLocked('premium')}
                  value={profile.effect}
                  onChange={(e) => setProfile({...profile, effect: e.target.value})}
                  className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-xl p-3 text-sm outline-none appearance-none disabled:opacity-50"
                >
                  <option value="none">None</option>
                  <option value="matrix">Matrix (Premium)</option>
                  <option value="stars">Starfield (Premium)</option>
                  <option value="embers">Embers (Legendary)</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side: Live Preview */}
        <section className="sticky top-10">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600 mb-6 text-center">Live Preview</p>
          <div className="bg-[#0a0a0a] rounded-[3rem] border-[12px] border-[#161616] aspect-[9/16] w-full max-w-sm mx-auto overflow-hidden shadow-2xl relative">
            {/* The actual profile simulation */}
            <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center">
               <div className="w-24 h-24 rounded-full bg-neutral-800 mb-6 border-4" style={{ borderColor: profile.primary_color }} />
               <h3 className="text-2xl font-black mb-2">{profile.display_name || 'Username'}</h3>
               <p className="text-neutral-500 text-sm leading-relaxed mb-8">{profile.bio || 'Your bio will appear here...'}</p>
               
               <div className="w-full space-y-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md" />
                  ))}
               </div>
            </div>
            
            {/* Effect Overlay Simulation */}
            {profile.effect !== 'none' && (
              <div className="absolute inset-0 pointer-events-none bg-purple-500/5 animate-pulse" />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}