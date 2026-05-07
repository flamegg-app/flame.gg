import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  User, Hash, Eye, Edit3, Settings, 
  LogOut, CheckCircle2, AlertCircle, X 
} from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Sidebar from '../../components/Sidebar'; // Ensure this path matches your Sidebar.tsx location

export default function DashboardOverview() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  // Modal States
  const [isUsernameOpen, setIsUsernameOpen] = useState(false);
  const [isAliasOpen, setIsAliasOpen] = useState(false);

  const [stats, setStats] = useState({
    completion: 0,
    uid: "000,000",
    views: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push('/login');

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileData) {
        setProfile(profileData);

        const formattedUID = String(profileData.id_count || "0").padStart(6, '0').replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        const criteria = [
          !!profileData.avatar_url,
          !!profileData.description,
          !!profileData.discord_id,
          !!profileData.socials,
          (profileData.views >= 10)
        ];
        
        const completedCount = criteria.filter(Boolean).length;
        setStats({
          completion: (completedCount / criteria.length) * 100,
          uid: formattedUID,
          views: profileData.views || 0
        });
      }
      setLoading(false);
    };

    fetchDashboardData();
  }, [router]);

  if (loading) return <div className="min-h-screen bg-[#0a0612] flex items-center justify-center text-white font-bold tracking-tighter">Loading scope.gg...</div>;

  return (
    <div className="flex min-h-screen bg-[#0a0612] text-white font-['Satoshi',sans-serif]">
      
      {/* 1. Global Sidebar Component */}
      <Sidebar />

      {/* 2. Main Content Area */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto">
          
          {/* Section: Account Overview */}
          <section className="mb-10">
            <h2 className="text-[13px] font-black mb-5 text-neutral-500 uppercase tracking-widest">Account Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Username" value={profile?.username || "Guest"} sub="Custom URL active" icon={<Edit3 size={18}/>} />
              <StatCard title="Alias" value={profile?.alias || "None Set"} sub="Primary display name" icon={<User size={18}/>} />
              <StatCard title="UID" value={stats.uid} sub="Unique Member ID" icon={<Hash size={18}/>} />
              <StatCard title="Profile Views" value={stats.views.toLocaleString()} sub="Total unique visitors" icon={<Eye size={18}/>} />
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Account Statistics */}
            <div className="lg:col-span-8 space-y-8">
              <section>
                <h2 className="text-[13px] font-black mb-5 text-neutral-500 uppercase tracking-widest">Account Statistics</h2>
                <div className="bg-[#0f0a1a] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
                  
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-black text-[15px]">Profile Completion</span>
                      <span className="text-neutral-500 text-[13px] font-bold">{stats.completion}% completed</span>
                    </div>
                    <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden">
                      <div 
                        className="bg-purple-600 h-full transition-all duration-700 shadow-[0_0_20px_rgba(147,51,234,0.4)]" 
                        style={{ width: `${stats.completion}%` }}
                      />
                    </div>
                  </div>

                  {stats.completion < 100 && (
                    <div className="bg-[#1a1524] border border-white/5 p-6 rounded-3xl flex items-start gap-4 mb-8">
                      <div className="bg-amber-500/20 p-2 rounded-full">
                        <AlertCircle className="text-amber-500" size={18} />
                      </div>
                      <div>
                        <p className="font-black text-[15px] text-amber-200">Your profile isn't complete yet!</p>
                        <p className="text-[13px] font-bold text-neutral-500 mt-1">Complete the tasks below to reach 100%.</p>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3">
                    <CompletionBadge text="Upload An Avatar" active={!!profile?.avatar_url} />
                    <CompletionBadge text="Add A Description" active={!!profile?.description} />
                    <CompletionBadge text="Link Discord Account" active={!!profile?.discord_id} />
                    <CompletionBadge text="Add Socials" active={!!profile?.socials} />
                    <CompletionBadge text="Reach 10 profile views" active={stats.views >= 10} />
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column: Manage Account */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#0f0a1a] border border-white/5 rounded-[2.5rem] p-8">
                <h3 className="font-black text-xl mb-1 text-white">Manage account</h3>
                <p className="text-neutral-500 text-[13px] font-bold mb-8">Modify your identity and settings.</p>
                
                <div className="space-y-3">
                  <MenuButton icon={<Edit3 size={16}/>} label="Change Username" onClick={() => setIsUsernameOpen(true)} />
                  <MenuButton icon={<User size={16}/>} label="Change Display Name" onClick={() => setIsAliasOpen(true)} />
                  <MenuButton icon={<Settings size={16}/>} label="Account Settings" onClick={() => router.push('/dashboard/settings')} />
                </div>

                <div className="mt-12">
                  <h3 className="font-black text-[11px] uppercase tracking-[0.2em] text-neutral-600 mb-5 text-center lg:text-left">Connections</h3>
                  <div className="flex flex-col gap-3">
                    <button className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 text-sm font-black transition-all ${
                      profile?.discord_id 
                      ? 'bg-[#5865F2]/10 border border-[#5865F2]/20 text-[#5865F2]' 
                      : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                    }`}>
                      <FaDiscord size={18}/> {profile?.discord_id ? 'Discord Connected' : 'Connect Discord'}
                    </button>
                    <button 
                      onClick={async () => { await supabase.auth.signOut(); router.push('/login'); }}
                      className="w-full bg-red-500/5 border border-red-500/10 text-red-500/80 py-4 rounded-2xl font-black text-sm hover:bg-red-500/10 transition-all flex items-center justify-center gap-2"
                    >
                      <LogOut size={18} /> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Pop-up Modals for Username/Alias */}
      <DashboardModal isOpen={isUsernameOpen} onClose={() => setIsUsernameOpen(false)} title="Change Username" />
      <DashboardModal isOpen={isAliasOpen} onClose={() => setIsAliasOpen(false)} title="Change Display Name" />
    </div>
  );
}

// Sub-components
function StatCard({ title, value, sub, icon }: any) {
  return (
    <div className="bg-[#0f0a1a] border border-white/5 p-7 rounded-[2rem] relative group hover:border-purple-500/30 transition-all duration-300">
      <div className="absolute right-7 top-8 text-neutral-800 group-hover:text-purple-500 transition-colors">
        {icon}
      </div>
      <p className="text-neutral-500 text-[10px] font-black uppercase tracking-widest mb-4">{title}</p>
      <p className="text-2xl font-black mb-1 text-white">{value}</p>
      <p className="text-neutral-600 text-[11px] font-bold tracking-tight">{sub}</p>
    </div>
  );
}

function CompletionBadge({ text, active }: { text: string; active: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl border text-[13px] font-bold transition-all duration-300 ${
      active 
      ? 'bg-green-500/5 border-green-500/10 text-green-500' 
      : 'bg-white/5 border-white/5 text-neutral-500'
    }`}>
      {active ? <CheckCircle2 size={16} /> : <div className="w-4 h-4 rounded-full border-2 border-neutral-800" />}
      <span>{text}</span>
    </div>
  );
}

function MenuButton({ icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 py-4 px-6 rounded-2xl transition-all duration-200 text-[14px] font-black text-neutral-300">
      <span className="text-neutral-600">{icon}</span>
      {label}
    </button>
  );
}

function DashboardModal({ isOpen, onClose, title }: any) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="bg-[#0f0a1a] border border-white/10 w-full max-w-md rounded-[2.5rem] p-10 shadow-3xl">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-black text-white">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-neutral-500 transition-colors"><X size={24}/></button>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase text-neutral-500 tracking-widest ml-1">New {title}</label>
            <input className="w-full bg-[#050505] border border-white/5 p-5 rounded-2xl focus:border-purple-500/50 focus:outline-none transition-all font-bold text-white placeholder:text-neutral-800" placeholder={`Enter ${title.toLowerCase()}...`} />
          </div>
          <button className="w-full bg-purple-600 py-5 rounded-2xl font-black text-lg hover:bg-purple-500 hover:shadow-[0_0_25px_rgba(147,51,234,0.3)] transition-all text-white">Save Changes</button>
        </div>
      </div>
    </div>
  );
}