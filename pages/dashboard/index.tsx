import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Sidebar from '../components/Sidebar';
import { 
  Edit3, User, Hash, Eye, 
  MessageSquare, X, Check, Loader2,
  Camera, FileText, Share2, TrendingUp
} from 'lucide-react';

export default function DashboardOverview() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  
  // Input States
  const [newUsername, setNewUsername] = useState('');
  const [newDisplayName, setNewDisplayName] = useState('');
  const [newAlias, setNewAlias] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (data) {
        setProfile(data);
        setNewUsername(data.username || '');
        setNewDisplayName(data.display_name || ''); // Added Display Name
        setNewAlias(data.alias || '');
      }
    }
    setLoading(false);
  }

  // SAVE CHANGES HANDLER
  const handleUpdateProfile = async (field: string) => {
    setIsUpdating(true);
    let value = '';
    if (field === 'username') value = newUsername;
    if (field === 'display_name') value = newDisplayName;
    if (field === 'alias') value = newAlias;

    const { error } = await supabase
      .from('profiles')
      .update({ [field]: value })
      .eq('id', profile.id);

    if (!error) {
      await fetchProfile(); // This refreshes the Overview boxes immediately
    }
    setIsUpdating(false);
  };

  const handleDiscordAction = async () => {
    if (profile?.discord_id) {
      const { error } = await supabase.from('profiles').update({ discord_id: null }).eq('id', profile.id);
      if (!error) fetchProfile();
    } else {
      await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: { redirectTo: window.location.origin + '/dashboard' }
      });
    }
  };

  if (loading) return <div className="h-screen bg-[#0a0612] flex items-center justify-center"><Loader2 className="animate-spin text-purple-500" /></div>;

  return (
    <div className="flex h-screen bg-[#0a0612] text-white font-sans overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-y-auto scrollbar-hide">
        <div className="max-w-[1100px] mx-auto">
          
          <h2 className="text-[11px] font-black mb-4 text-neutral-600 uppercase tracking-widest">Account Overview</h2>
          
          {/* STATS GRID - Values here update instantly via fetchProfile() */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard title="Username" value={profile?.username} sub="URL Active" icon={<Edit3 size={14}/>} />
            <StatCard title="Display Name" value={profile?.display_name || "None"} sub="Public Name" icon={<User size={14}/>} />
            <StatCard title="UID" value={profile?.id_count ? String(profile.id_count).padStart(6, '0') : "000000"} sub="Unique ID" icon={<Hash size={14}/>} />
            <StatCard title="Views" value={profile?.views || 0} sub="Total Profile Views" icon={<Eye size={14}/>} />
          </div>

          {/* REDIRECTIVE COMPLETION CHECKLIST */}
          <div className="flex flex-wrap gap-3 mb-10">
            <CompletionBadge label="Upload An Avatar" icon={<Camera size={14}/>} path="/dashboard/customize" completed={!!profile?.avatar_url} />
            <CompletionBadge label="Add A Description" icon={<FileText size={14}/>} path="/dashboard/customize" completed={!!profile?.description} />
            <CompletionBadge label="Link Discord Account" icon={<MessageSquare size={14}/>} path="#connections" completed={!!profile?.discord_id} />
            <CompletionBadge label="Add Socials" icon={<Share2 size={14}/>} path="/dashboard/links" completed={false} />
            <CompletionBadge label="Reach 10 profile views" icon={<TrendingUp size={14}/>} path="#" completed={(profile?.views || 0) >= 10} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* EDIT SECTION */}
            <section className="space-y-6">
              <div className="bg-[#111111] border border-white/5 p-6 rounded-[2rem]">
                <h3 className="text-lg font-bold mb-4">Change Username</h3>
                <div className="space-y-4">
                  <InputGroup label="New Username" value={newUsername} onChange={setNewUsername} />
                  <button onClick={() => handleUpdateProfile('username')} className="w-full bg-purple-600 hover:bg-purple-700 py-4 rounded-2xl font-black text-sm transition-all">
                    Save Changes
                  </button>
                </div>
              </div>

              {/* Added Display Name Box */}
              <div className="bg-[#111111] border border-white/5 p-6 rounded-[2rem]">
                <h3 className="text-lg font-bold mb-4">Change Display Name</h3>
                <div className="space-y-4">
                  <InputGroup label="New Display Name" value={newDisplayName} onChange={setNewDisplayName} />
                  <button onClick={() => handleUpdateProfile('display_name')} className="w-full bg-purple-600 hover:bg-purple-700 py-4 rounded-2xl font-black text-sm transition-all">
                    Save Changes
                  </button>
                </div>
              </div>
            </section>

            {/* CONNECTIONS SECTION */}
            <section id="connections">
              <div className="bg-[#111111] border border-white/5 p-6 rounded-[2rem]">
                <h3 className="text-lg font-bold mb-1">Connections</h3>
                <p className="text-sm text-neutral-500 mb-6">Link your Discord account to scope.gg</p>
                <div className="flex items-center gap-2">
                  <button onClick={handleDiscordAction} className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-bold transition-all ${profile?.discord_id ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/10' : 'bg-[#5865F2] text-white hover:bg-[#4752C4]'}`}>
                    <MessageSquare size={18} fill={profile?.discord_id ? "none" : "currentColor"} />
                    {profile?.discord_id ? 'Discord Connected' : 'Connect Discord'}
                  </button>
                  {profile?.discord_id && (
                    <button onClick={handleDiscordAction} className="p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500/20 border border-red-500/10 transition-all"><X size={20} /></button>
                  )}
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}

// HELPER COMPONENTS
function InputGroup({ label, value, onChange }: any) {
  return (
    <div>
      <label className="text-[10px] font-black text-neutral-500 uppercase mb-2 block">{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-black border border-white/5 p-4 rounded-xl text-sm focus:outline-none focus:border-purple-500/50 transition-all" />
    </div>
  );
}

function CompletionBadge({ label, icon, path, completed }: any) {
  return (
    <a href={path} className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border text-[12px] font-bold transition-all ${completed ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-white/5 border-white/5 text-neutral-500 hover:bg-white/10'}`}>
      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${completed ? 'bg-green-500 border-green-500 text-black' : 'border-neutral-700'}`}>
        {completed ? <Check size={10} strokeWidth={4} /> : <div className="w-1.5 h-1.5 rounded-full bg-neutral-700" />}
      </div>
      {label}
    </a>
  );
}

function StatCard({ title, value, sub, icon }: any) {
  return (
    <div className="bg-[#111111] border border-white/5 p-5 rounded-3xl group">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">{title}</span>
        <div className="p-2 bg-white/5 rounded-lg group-hover:text-purple-500 transition-colors">{icon}</div>
      </div>
      <p className="text-xl font-bold truncate mb-1">{value || "---"}</p>
      <p className="text-[10px] font-bold text-neutral-700 uppercase tracking-tighter">{sub}</p>
    </div>
  );
}