import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  User, Hash, Eye, Edit3, Settings, 
  LogOut, CheckCircle2, AlertCircle, ChevronRight 
} from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';
import { useRouter } from 'next/router';

export default function DashboardOverview() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState({
    completion: 0,
    uid: "000,000",
    views: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push('/login');

      // 1. Fetch Profile Data
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileData) {
        setProfile(profileData);

        // 2. Calculate Live UID (Formatting row ID as 000,000)
        // Note: Assumes your profiles table has a numeric 'id_seq' or uses created_at order
        const formattedUID = String(profileData.id_count || "0").padStart(6, '0').replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        // 3. Calculate Profile Completion %
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
    <div className="min-h-screen bg-[#0a0612] text-white p-4 md:p-8 font-['Satoshi',sans-serif]">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section: Account Overview */}
        <section className="mb-10">
          <h2 className="text-[15px] font-bold mb-5 text-neutral-400">Account Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Username" 
              value={profile?.username || "Guest"} 
              sub="Custom URL active" 
              icon={<Edit3 size={18}/>} 
            />
            <StatCard 
              title="Alias" 
              value={profile?.alias || "None Set"} 
              sub="Primary display name" 
              icon={<User size={18}/>} 
            />
            <StatCard 
              title="UID" 
              value={stats.uid} 
              sub="Unique Member ID" 
              icon={<Hash size={18}/>} 
            />
            <StatCard 
              title="Profile Views" 
              value={stats.views.toLocaleString()} 
              sub="Total unique visitors" 
              icon={<Eye size={18}/>} 
            />
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Account Statistics */}
          <div className="lg:col-span-8 space-y-8">
            <section>
              <h2 className="text-[15px] font-bold mb-5 text-neutral-400">Account Statistics</h2>
              <div className="bg-[#0f0a1a] border border-white/5 rounded-[2rem] p-8 shadow-2xl">
                
                {/* Live Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-sm">Profile Completion</span>
                    <span className="text-neutral-500 text-sm font-bold">{stats.completion}% completed</span>
                  </div>
                  <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-purple-600 h-full transition-all duration-700 shadow-[0_0_20px_rgba(147,51,234,0.4)]" 
                      style={{ width: `${stats.completion}%` }}
                    />
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

                {/* Live Completion Badges */}
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

          {/* Right Column: Manage & Connections */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0f0a1a] border border-white/5 rounded-[2rem] p-7">
              <h3 className="font-black text-lg mb-1 text-white">Manage account</h3>
              <p className="text-neutral-500 text-[13px] font-bold mb-6">Modify your identity and settings.</p>
              
              <div className="space-y-2.5">
                <MenuButton icon={<Edit3 size={16}/>} label="Change Username" onClick={() => router.push('/dashboard/settings')} />
                <MenuButton icon={<User size={16}/>} label="Change Alias" onClick={() => router.push('/dashboard/customize')} />
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
                  <button 
                    onClick={async () => { await supabase.auth.signOut(); router.push('/login'); }}
                    className="w-full bg-red-500/10 border border-red-500/20 text-red-500 py-3.5 rounded-xl font-black text-sm hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <LogOut size={18} /> Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Keep sub-components simple
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

function CompletionBadge({ text, active }: { text: string; active: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border text-[13px] font-bold transition-all ${
      active 
      ? 'bg-green-500/5 border-green-500/10 text-green-500' 
      : 'bg-white/5 border-white/5 text-neutral-400'
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