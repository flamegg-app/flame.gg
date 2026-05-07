import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  User, Hash, Eye, Edit3, Settings, 
  LogOut, CheckCircle2, AlertCircle, X,
  LayoutDashboard, Palette, Link as LinkIcon, Crown, Image as ImageIcon, FileText
} from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';
import { useRouter } from 'next/router';

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
        const completionPercentage = (completedCount / criteria.length) * 100;

        setStats({
          completion: completionPercentage,
          uid: formattedUID,
          views: profileData.views || 0
        });
      }
      setLoading(false);
    };

    fetchDashboardData();
  }, [router]);

  if (loading) return <div className="min-h-screen bg-[#0a0612] flex items-center justify-center text-white font-bold">Loading Stats...</div>;

  return (
    <div className="flex min-h-screen bg-[#0a0612] text-white font-['Satoshi',sans-serif]">
      
      {/* Sidebar - Inspired by guns.lol UI */}
      <aside className="w-72 border-r border-white/5 bg-[#0f0a1a] p-6 hidden lg:flex flex-col gap-8">
        <div className="flex items-center gap-2 px-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="font-black text-xs text-white">F</span>
          </div>
          <span className="font-black text-xl tracking-tighter">flame.gg</span>
        </div>

        <nav className="space-y-1">
          <SidebarLink icon={<LayoutDashboard size={18}/>} label="Overview" active />
          <SidebarLink icon={<Palette size={18}/>} label="Customize" onClick={() => router.push('/dashboard/customize')} />
          <SidebarLink icon={<LinkIcon size={18}/>} label="Links" />
          <SidebarLink icon={<Crown size={18}/>} label="Premium" />
          <SidebarLink icon={<ImageIcon size={18}/>} label="Image Host" />
          <SidebarLink icon={<FileText size={18}/>} label="Templates" />
        </nav>

        <div className="mt-auto bg-white/5 p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 overflow-hidden">
              <img src={profile?.avatar_url || '/logo.webp'} className="w-full h-full object-cover" alt="pfp" />
            </div>
            <div className="overflow-hidden">
              <p className="font-black text-sm truncate">{profile?.username || "Guest"}</p>
              <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">UID {stats.uid}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto p-4 md:p-8">
          
          <section className="mb-10">
            <h2 className="text-[15px] font-bold mb-5 text-neutral-400">Account Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Username" value={profile?.username || "Guest"} sub="Custom URL active" icon={<Edit3 size={18}/>} />
              <StatCard title="Alias" value={profile?.alias || "None Set"} sub="Primary display name" icon={<User size={18}/>} />
              <StatCard title="UID" value={stats.uid} sub="Unique Member ID" icon={<Hash size={18}/>} />
              <StatCard title="Profile Views" value={stats.views.toLocaleString()} sub="Total unique visitors" icon={<Eye size={18}/>} />
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <section>
                <h2 className="text-[15px] font-bold mb-5 text-neutral-400">Account Statistics</h2>
                <div className="bg-[#0f0a1a] border border-white/5 rounded-[2rem] p-8 shadow-2xl">
                  
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-bold text-sm">Profile Completion</span>
                      <span className="text-neutral-500 text-sm font-bold">{stats.completion}% completed</span>
                    </div>
                    <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-purple-600 h-full transition-all duration-700 shadow-[0_0_20px_rgba(147,51,234,0.4)]" style={{ width: `${stats.completion}%` }} />
                    </div>
                  </div>

                  {stats.completion < 100 && (
                    <div className="bg-amber-500/5 border border-amber-500/10 p-5 rounded-2xl flex items-start gap-4 mb-8">
                      <div className="bg-amber-500/20 p-2 rounded-full">
                        <AlertCircle className="text-amber-500" size={18} />
                      </div>
                      <div>
                        <p className="font-black text-[14px] text-amber-200">Your profile isn't complete yet!</p>
                        <p className="text-xs font-bold text-neutral-500 mt-1">Complete the tasks below to reach 100%.</p>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3">
                    <CompletionBadge text="Upload An Avatar" active={!!profile?.avatar_url} onClick={() => router.push('/dashboard/customize')} />
                    <CompletionBadge text="Add A Description" active={!!profile?.description} onClick={() => router.push('/dashboard/customize')} />
                    <CompletionBadge text="Link Discord Account" active={!!profile?.discord_id} />
                    <CompletionBadge text="Add Socials" active={!!profile?.socials} onClick={() => router.push('/dashboard/settings')} />
                    <CompletionBadge text="Reach 10 profile views" active={stats.views >= 10} />
                  </div>
                </div>
              </section>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#0f0a1a] border border-white/5 rounded-[2rem] p-7">
                <h3 className="font-black text-lg mb-1 text-white">Manage account</h3>
                <p className="text-neutral-500 text-[13px] font-bold mb-6">Modify your identity and settings.</p>
                
                <div className="space-y-2.5">
                  <MenuButton icon={<Edit3 size={16}/>} label="Change Username" onClick={() => setIsUsernameOpen(true)} />
                  <MenuButton icon={<User size={16}/>} label="Change Display Name" onClick={() => setIsAliasOpen(true)} />
                  <MenuButton icon={<Settings size={16}/>} label="Account Settings" onClick={() => router.push('/dashboard/settings')} />
                </div>

                <div className="mt-10">
                  <h3 className="font-black text-[11px] uppercase tracking-[0.15em] text-neutral-500 mb-4 text-center lg:text-left">Connections</h3>
                  <div className="flex flex-col gap-2">
                    <button className={`w-full py-3.5 rounded-xl flex items-center justify-center gap-3 text-sm font-black transition-all ${
                      profile?.discord_id 
                      ? 'bg-[#5865F2]/10 border border-[#5865F2]/20 text-[#5865F2]' 
                      : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                    }`}>
                      <FaDiscord size={18}/> {profile?.discord_id ? 'Discord Connected' : 'Connect Discord'}
                    </button>
                    <button onClick={async () => { await supabase.auth.signOut(); router.push('/login'); }} className="w-full bg-red-500/10 border border-red-500/20 text-red-500 py-3.5 rounded-xl font-black text-sm hover:bg-red-500/20 transition-all flex items-center justify-center gap-2">
                      <LogOut size={18} /> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popups (Modals) */}
      <Modal isOpen={isUsernameOpen} onClose={() => setIsUsernameOpen(false)} title="Change Username" placeholder="New username..." />
      <Modal isOpen={isAliasOpen} onClose={() => setIsAliasOpen(false)} title="Change Display Name" placeholder="New display name..." />
    </div>
  );
}

// Sub-components
function SidebarLink({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
      active ? 'bg-purple-600/10 text-purple-500' : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/5'
    }`}>
      {icon} {label}
    </button>
  );
}

function Modal({ isOpen, onClose, title, placeholder }: any) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#0f0a1a] border border-white/10 w-full max-w-md rounded-[2.5rem] p-8 shadow-3xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full"><X size={20}/></button>
        </div>
        <input className="w-full bg-[#0a0612] border border-white/5 p-4 rounded-2xl mb-6 focus:border-purple-500/50 outline-none transition-all font-bold text-white" placeholder={placeholder} />
        <button className="w-full bg-purple-600 py-4 rounded-2xl font-black hover:bg-purple-500 transition-all text-white">Save Changes</button>
      </div>
    </div>
  );
}

function StatCard({ title, value, sub, icon }: any) {
  return (
    <div className="bg-[#150f24] border border-white/5 p-7 rounded-[2rem] relative group hover:border-purple-500/20 transition-all">
      <div className="absolute right-6 top-7 text-neutral-700 group-hover:text-purple-500 transition-colors">
        {icon}
      </div>
      <p className="text-neutral-500 text-[11px] font-black uppercase tracking-widest mb-3">{title}</p>
      <p className="text-2xl font-black mb-1 text-white">{value}</p>
      <p className="text-neutral-600 text-[11px] font-bold tracking-tight">{sub}</p>
    </div>
  );
}

function CompletionBadge({ text, active, onClick }: { text: string; active: boolean; onClick?: () => void }) {
  return (
    <div onClick={onClick} className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border text-[13px] font-bold transition-all cursor-pointer ${
      active 
      ? 'bg-green-500/5 border-green-500/10 text-green-500' 
      : 'bg-white/5 border-white/5 text-neutral-400 hover:bg-white/10'
    }`}>
      {active ? <CheckCircle2 size={16} /> : <div className="w-4 h-4 rounded-full border-2 border-neutral-700" />}
      <span>{text}</span>
    </div>
  );
}

function MenuButton({ icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 py-3.5 px-5 rounded-2xl transition-all text-[14px] font-black text-neutral-300">
      <span className="text-neutral-500">{icon}</span>
      {label}
    </button>
  );
}