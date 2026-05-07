import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Sidebar from '../../components/Sidebar';
import { 
  Edit3, User, Hash, Eye, MessageSquare, X, Check, Loader2,
  Camera, FileText, Share2, TrendingUp, Settings, ChevronRight, AlertCircle
} from 'lucide-react';

export default function DashboardOverview() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  
  // Input States for Modals/Boxes
  const [newUsername, setNewUsername] = useState('');
  const [newDisplayName, setNewDisplayName] = useState('');
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
        setNewDisplayName(data.display_name || ''); 
      }
    }
    setLoading(false);
  }

  const handleUpdateProfile = async (field: string) => {
    setIsUpdating(true);
    const value = field === 'username' ? newUsername : newDisplayName;
    const { error } = await supabase.from('profiles').update({ [field]: value }).eq('id', profile.id);
    if (!error) await fetchProfile();
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

  if (loading) return <div className="h-screen bg-[#0a0a0a] flex items-center justify-center"><Loader2 className="animate-spin text-purple-500" /></div>;

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-y-auto scrollbar-hide">
        <div className="max-w-[1200px] mx-auto">
          
          <h2 className="text-sm font-bold mb-6 text-white">Account Overview</h2>
          
          {/* TOP STATS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
            <StatCard title="Username" value={profile?.username} sub="Change available now" icon={<Edit3 size={16}/>} />
            <StatCard title="Alias" value="0 Aliases Used" sub="1 Alias Slots Remaining" icon={<User size={16}/>} />
            <StatCard title="UID" value={profile?.id_count ? profile.id_count.toLocaleString() : "777,544"} sub="Among the first 44%" icon={<Hash size={16}/>} />
            <StatCard title="Profile Views" value={profile?.views || 0} sub="+0 views since last 7 days" icon={<Eye size={16}/>} />
          </div>

          <h2 className="text-sm font-bold mb-6 text-white">Account Statistics</h2>

          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* LEFT: PROFILE COMPLETION */}
            <div className="flex-1 bg-[#111111] border border-white/5 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold">Profile Completion</h3>
                <span className="text-xs text-neutral-500">80% completed</span>
              </div>
              
              <div className="w-full bg-white/5 h-2 rounded-full mb-6 overflow-hidden">
                <div className="bg-purple-600 h-full w-[80%] rounded-full shadow-[0_0_10px_rgba(147,51,234,0.5)]"></div>
              </div>

              <div className="bg-amber-500/5 border border-amber-500/10 p-4 rounded-xl flex gap-3 mb-6">
                <AlertCircle size={18} className="text-amber-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-white">Your profile isn't complete yet!</p>
                  <p className="text-xs text-neutral-500">Complete your profile to make it more discoverable and appealing.</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <CompletionButton label="Upload An Avatar" icon={<User size={14}/>} completed={!!profile?.avatar_url} path="/dashboard/customize" />
                <CompletionButton label="Add A Description" icon={<Check size={14}/>} completed={!!profile?.description} path="/dashboard/customize" />
                <CompletionButton label="Link Discord Account" icon={<Check size={14}/>} completed={!!profile?.discord_id} path="#connections" />
                <CompletionButton label="Add Socials" icon={<Check size={14}/>} completed={false} path="/dashboard/links" />
                <CompletionButton label="Reach 10 profile views" icon={<Check size={14}/>} completed={(profile?.views || 0) >= 10} fullWidth />
              </div>
            </div>

            {/* RIGHT: MANAGE & CONNECTIONS */}
            <div className="w-full lg:w-[350px] space-y-6">
              <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
                <h3 className="text-sm font-bold mb-1">Manage your account</h3>
                <p className="text-xs text-neutral-500 mb-4">Change your email, username and more.</p>
                
                <div className="space-y-2">
                  <ManageLink icon={<Edit3 size={16}/>} label="Change Username" onClick={() => {/* Open Modal */}} />
                  <ManageLink icon={<User size={16}/>} label="Change Display Name" onClick={() => {/* Open Modal */}} />
                  <ManageLink icon={<Share2 size={16}/>} label="Manage Aliases" />
                  <ManageLink icon={<Settings size={16}/>} label="Account Settings" />
                </div>

                <div id="connections" className="mt-8">
                  <h3 className="text-sm font-bold mb-1">Connections</h3>
                  <p className="text-xs text-neutral-500 mb-4">Link your Discord account to guns.lol</p>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={handleDiscordAction}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all ${
                        profile?.discord_id 
                        ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/20' 
                        : 'bg-[#5865F2] text-white hover:bg-[#4752C4]'
                      }`}
                    >
                      <MessageSquare size={16} fill={profile?.discord_id ? "none" : "currentColor"} />
                      {profile?.discord_id ? 'Discord Connected' : 'Connect Discord'}
                    </button>
                    {profile?.discord_id && (
                      <button 
                        onClick={handleDiscordAction}
                        className="p-3 bg-red-500/20 text-red-500 rounded-xl hover:bg-red-500/30 border border-red-500/20 transition-all"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

// UI COMPONENTS
function StatCard({ title, value, sub, icon }: any) {
  return (
    <div className="bg-[#111111] border border-white/5 p-5 rounded-2xl">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-xs text-neutral-500 mb-1">{title}</p>
          <p className="text-lg font-bold text-white">{value || "---"}</p>
        </div>
        <div className="text-neutral-500">{icon}</div>
      </div>
      <p className="text-[10px] text-neutral-600 font-medium">{sub}</p>
    </div>
  );
}

function CompletionButton({ label, icon, completed, path, fullWidth }: any) {
  return (
    <a 
      href={path}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[11px] font-bold transition-all ${
        fullWidth ? 'w-full mt-1' : ''
      } ${
        completed 
        ? 'bg-green-500/5 border-green-500/20 text-white' 
        : 'bg-white/5 border-white/5 text-neutral-400 hover:bg-white/10'
      }`}
    >
      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${completed ? 'bg-green-500 text-black' : 'bg-neutral-800'}`}>
        {completed ? <Check size={10} strokeWidth={4} /> : icon}
      </div>
      {label}
      {!completed && !fullWidth && <ChevronRight size={14} className="ml-auto text-neutral-600" />}
    </a>
  );
}

function ManageLink({ icon, label, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all group"
    >
      <span className="text-neutral-500 group-hover:text-white transition-colors">{icon}</span>
      <span className="text-xs font-bold text-neutral-300 group-hover:text-white transition-colors">{label}</span>
    </button>
  );
}