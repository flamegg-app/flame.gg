import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase'; // Updated path for dashboard subfolder
import Sidebar from '../../components/Sidebar';
import { 
  Edit3, User, Hash, Eye, MessageSquare, X, Check, Loader2,
  Camera, FileText, Share2, TrendingUp, Settings, ChevronRight, AlertCircle
} from 'lucide-react';

export default function DashboardOverview() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  
  // States for modals (logic wired next step)
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

  // Placeholder functions for next step
  const handleUpdateProfile = async (field: string) => {};
  const handleDiscordAction = async () => {};

  if (loading) return <div className="h-screen bg-[#0a0a0a] flex items-center justify-center"><Loader2 className="animate-spin text-purple-500" /></div>;

  return (
    // Applied fonts: Inter for clean text, Poppins for bold headers to match guns.lol
    <div className="flex h-screen bg-[#0a0a0a] text-white font-inter overflow-hidden select-none">
      <Sidebar />
      
      {/* Increased padding (p-12) to match the larger, spaced-out layout */}
      <main className="flex-1 p-12 overflow-y-auto scrollbar-hide">
        {/* Maximum width increased to max-w-[1300px] to make the content take up the whole page */}
        <div className="max-w-[1300px] mx-auto">
          
          <h2 className="text-[15px] font-extrabold font-poppins mb-7 text-white">Account Overview</h2>
          
          {/* STATS GRID - Increased gap and base size */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-12">
            <StatCard title="Username" value={profile?.username} sub="Change available now" icon={<Edit3 size={17}/>} />
            <StatCard title="Alias" value="0 Aliases Used" sub="1 Alias Slots Remaining" icon={<User size={17}/>} />
            <StatCard title="UID" value={profile?.id_count ? profile.id_count.toLocaleString() : "777,544"} sub="Among the first 44%" icon={<Hash size={17}/>} />
            <StatCard title="Profile Views" value={profile?.views || 0} sub="+0 views since last 7 days" icon={<Eye size={17}/>} />
          </div>

          <h2 className="text-[15px] font-extrabold font-poppins mb-7 text-white">Account Statistics</h2>

          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* LEFT: PROFILE COMPLETION - Increased padding */}
            <div className="flex-1 bg-[#111111] border border-white/5 rounded-[1.5rem] p-8">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-[14px] font-bold font-poppins text-white">Profile Completion</h3>
                <span className="text-[13px] font-medium text-neutral-500">80% completed</span>
              </div>
              
              <div className="w-full bg-white/5 h-2.5 rounded-full mb-7 overflow-hidden">
                <div className="bg-purple-600 h-full w-[80%] rounded-full shadow-[0_0_12px_rgba(147,51,234,0.6)]"></div>
              </div>

              <div className="bg-amber-500/5 border border-amber-500/10 p-5 rounded-xl flex gap-4 mb-7">
                <AlertCircle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[13.5px] font-bold text-white">Your profile isn't complete yet!</p>
                  <p className="text-[12px] font-medium text-neutral-500 leading-relaxed">Complete your profile to make it more discoverable and appealing.</p>
                </div>
              </div>

              {/* Badges slightly larger to match scaled-up design */}
              <div className="flex flex-wrap gap-4">
                <CompletionButton label="Upload An Avatar" icon={<User size={15}/>} completed={!!profile?.avatar_url} path="/dashboard/customize" />
                <CompletionButton label="Add A Description" icon={<Check size={15}/>} completed={!!profile?.description} path="/dashboard/customize" />
                <CompletionButton label="Link Discord Account" icon={<Check size={15}/>} completed={!!profile?.discord_id} path="#connections" />
                <CompletionButton label="Add Socials" icon={<Check size={15}/>} completed={false} path="/dashboard/links" />
                <CompletionButton label="Reach 10 profile views" icon={<Check size={15}/>} completed={(profile?.views || 0) >= 10} fullWidth />
              </div>
            </div>

            {/* RIGHT: MANAGE & CONNECTIONS */}
            <div className="w-full lg:w-[400px] space-y-8">
              <div className="bg-[#111111] border border-white/5 rounded-[1.5rem] p-8">
                <h3 className="text-[14px] font-bold font-poppins text-white mb-1.5">Manage your account</h3>
                <p className="text-[12px] font-medium text-neutral-500 mb-5">Change your email, username and more.</p>
                
                <div className="space-y-2.5">
                  <ManageLink icon={<Edit3 size={17}/>} label="Change Username" />
                  <ManageLink icon={<User size={17}/>} label="Change Display Name" />
                  <ManageLink icon={<Share2 size={17}/>} label="Manage Aliases" />
                  <ManageLink icon={<Settings size={17}/>} label="Account Settings" />
                </div>

                <div id="connections" className="mt-10 pt-10 border-t border-white/5">
                  <h3 className="text-[14px] font-bold font-poppins text-white mb-1.5">Connections</h3>
                  {/* Updated wording: scope.gg */}
                  <p className="text-[12px] font-medium text-neutral-500 mb-5">Link your Discord account to scope.gg</p>
                  
                  <div className="flex gap-2.5">
                    {/* Placeholder action; logic next step */}
                    <button 
                      onClick={handleDiscordAction}
                      disabled={profile?.discord_id}
                      className={`flex-1 flex items-center justify-center gap-3 py-3.5 rounded-xl text-[13px] font-bold transition-all ${
                        profile?.discord_id 
                        ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20' 
                        : 'bg-[#5865F2] text-white hover:bg-[#4752C4]'
                      }`}
                    >
                      {/* Replaced chat icon with the actual Discord icon */}
                      <DiscordIcon size={18} fill={profile?.discord_id ? "none" : "currentColor"} />
                      {profile?.discord_id ? 'Discord Connected' : 'Connect Discord'}
                    </button>
                    {profile?.discord_id && (
                      <button 
                        onClick={handleDiscordAction}
                        className="p-3.5 bg-red-500/15 text-red-500 rounded-xl hover:bg-red-500/25 border border-red-500/20 transition-all"
                      >
                        <X size={20} />
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
    <div className="bg-[#111111] border border-white/5 p-6 rounded-2xl hover:border-purple-500/20 transition-all group">
      <div className="flex justify-between items-start mb-5">
        <div>
          <p className="text-[12px] font-medium text-neutral-500 mb-1.5">{title}</p>
          <p className="text-xl font-extrabold font-poppins text-white">{value || "---"}</p>
        </div>
        <div className="text-neutral-600 group-hover:text-purple-500 transition-colors pt-0.5">{icon}</div>
      </div>
      <p className="text-[11px] text-neutral-700 font-medium tracking-tight uppercase">{sub}</p>
    </div>
  );
}

function CompletionButton({ label, icon, completed, path, fullWidth }: any) {
  return (
    <a 
      href={path}
      className={`flex items-center gap-3 px-5 py-3 rounded-full border text-[11.5px] font-bold transition-all ${
        fullWidth ? 'w-full mt-1.5' : ''
      } ${
        completed 
        ? 'bg-green-500/5 border-green-500/20 text-white' 
        : 'bg-white/5 border-white/5 text-neutral-400 hover:bg-white/10'
      }`}
    >
      <div className={`w-4.5 h-4.5 rounded-full flex items-center justify-center flex-shrink-0 ${completed ? 'bg-green-500 text-black' : 'bg-neutral-800'}`}>
        {completed ? <Check size={11} strokeWidth={4} /> : icon}
      </div>
      {label}
      {!completed && !fullWidth && <ChevronRight size={15} className="ml-auto text-neutral-600" />}
    </a>
  );
}

function ManageLink({ icon, label }: any) {
  return (
    <button className="w-full flex items-center gap-3.5 px-5 py-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all group">
      <span className="text-neutral-500 group-hover:text-white transition-colors">{icon}</span>
      <span className="text-[13px] font-bold text-neutral-300 group-hover:text-white transition-colors">{label}</span>
    </button>
  );
}

// Discord Icon Component replacing MessageSquare
function DiscordIcon({ size = 18, fill = 'currentColor' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 127.14 96.36" 
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83,97.68,97.68,0,0,0-29.11,0A72.06,72.06,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.71,32.65-1.78,56.63.48,80.1a107.4,107.4,0,0,0,32.17,16.19c2.73-3.71,5.14-7.66,7.18-11.83a68.6,68.6,0,0,1-11.37-5.43c.96-.69,1.89-1.42,2.79-2.18,21.07,9.76,43.91,9.76,64.66,0,.9.76,1.83,1.49,2.79,2.18a68.73,68.73,0,0,1-11.41,5.43c2.04,4.17,4.45,8.12,7.18,11.83a107.1,107.1,0,0,0,32.17-16.19C129.21,50.63,124.72,26.65,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5.07-12.69,11.45-12.69S53.9,46,53.9,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.23,60,73.23,53s5.07-12.69,11.45-12.69S96.14,46,96.14,53,91,65.69,84.69,65.69Z"/>
    </svg>
  );
}