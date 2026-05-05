import React from 'react';
import { useSession, signOut } from "next-auth/react";
import { 
  User, Hash, Eye, Edit3, Settings, 
  LogOut, CheckCircle2, AlertCircle, ChevronRight 
} from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';

export default function DashboardOverview() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-[#0a0612] text-white p-4 md:p-8 font-['Satoshi',sans-serif]">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section: Account Overview */}
        <section className="mb-10">
          <h2 className="text-[15px] font-bold mb-5 text-neutral-400">Account Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Username" 
              value={session?.user?.name || "invxder"} 
              sub="Change available now" 
              icon={<Edit3 size={18}/>} 
            />
            <StatCard 
              title="Alias" 
              value="0 Aliases Used" 
              sub="1 Alias Slots Remaining" 
              icon={<User size={18}/>} 
            />
            <StatCard 
              title="UID" 
              value="777,544" 
              sub="Among the first 45%" 
              icon={<Hash size={18}/>} 
            />
            <StatCard 
              title="Profile Views" 
              value="26" 
              sub="+1 views since last 7 days" 
              icon={<Eye size={18}/>} 
            />
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Account Statistics */}
          <div className="lg:col-span-8 space-y-8">
            <section>
              <h2 className="text-[15px] font-bold mb-5 text-neutral-400">Account Statistics</h2>
              <div className="bg-[#0f0a1a] border border-white/5 rounded-[2rem] p-8">
                
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-sm">Profile Completion</span>
                    <span className="text-neutral-500 text-sm font-bold">80% completed</span>
                  </div>
                  <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-purple-600 h-full w-[80%] shadow-[0_0_20px_rgba(147,51,234,0.4)]" />
                  </div>
                </div>

                {/* Warning Box */}
                <div className="bg-amber-500/5 border border-amber-500/10 p-5 rounded-2xl flex items-start gap-4 mb-8">
                  <div className="bg-amber-500/20 p-2 rounded-full">
                    <AlertCircle className="text-amber-500" size={18} />
                  </div>
                  <div>
                    <p className="font-black text-[14px] text-amber-200">Your profile isn't complete yet!</p>
                    <p className="text-xs font-bold text-neutral-500 mt-1">Complete your profile to make it more discoverable and appealing.</p>
                  </div>
                </div>

                {/* Completion Badges */}
                <div className="flex flex-wrap gap-3">
                  <CompletionBadge text="Upload An Avatar" active={false} hasArrow />
                  <CompletionBadge text="Add A Description" active={true} />
                  <CompletionBadge text="Link Discord Account" active={true} />
                  <CompletionBadge text="Add Socials" active={true} />
                  <CompletionBadge text="Reach 10 profile views" active={true} />
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Manage & Connections */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0f0a1a] border border-white/5 rounded-[2rem] p-7">
              <h3 className="font-black text-lg mb-1">Manage your account</h3>
              <p className="text-neutral-500 text-[13px] font-bold mb-6">Change your email, username and more.</p>
              
              <div className="space-y-2.5">
                <MenuButton icon={<Edit3 size={16}/>} label="Change Username" />
                <MenuButton icon={<User size={16}/>} label="Change Display Name" />
                <MenuButton icon={<Hash size={16}/>} label="Manage Aliases" />
                <MenuButton icon={<Settings size={16}/>} label="Account Settings" />
              </div>

              <div className="mt-10">
                <h3 className="font-black text-[11px] uppercase tracking-[0.15em] text-neutral-500 mb-4">Connections</h3>
                <p className="text-[12px] font-bold text-neutral-600 mb-4 text-center lg:text-left">Link your Discord account to guns.lol</p>
                <div className="flex items-center gap-2">
                  <button className="flex-1 bg-[#5865F2]/10 border border-[#5865F2]/20 text-[#5865F2] py-3.5 rounded-xl flex items-center justify-center gap-3 text-sm font-black transition-all hover:bg-[#5865F2]/20">
                    <FaDiscord size={18}/> Discord Connected
                  </button>
                  <button 
                    onClick={() => signOut()}
                    className="bg-red-500/10 border border-red-500/20 text-red-500 p-3.5 rounded-xl hover:bg-red-500/20 transition-all"
                  >
                    <LogOut size={18} />
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

// Sub-components to keep the layout clean
function StatCard({ title, value, sub, icon }: any) {
  return (
    <div className="bg-[#150f24] border border-white/5 p-7 rounded-[2rem] relative group hover:border-purple-500/20 transition-all cursor-default">
      <div className="absolute right-6 top-7 text-neutral-700 group-hover:text-purple-500 transition-colors">
        {icon}
      </div>
      <p className="text-neutral-500 text-[11px] font-black uppercase tracking-widest mb-3">{title}</p>
      <p className="text-2xl font-black mb-1">{value}</p>
      <p className="text-neutral-600 text-[11px] font-bold tracking-tight">{sub}</p>
    </div>
  );
}

function CompletionBadge({ text, active, hasArrow }: { text: string; active: boolean; hasArrow?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border text-[13px] font-bold transition-all ${
      active 
      ? 'bg-green-500/5 border-green-500/10 text-green-500' 
      : 'bg-white/5 border-white/5 text-neutral-400 hover:bg-white/10 cursor-pointer'
    }`}>
      {active ? <CheckCircle2 size={16} className="shrink-0" /> : <User size={16} className="shrink-0 text-neutral-600" />}
      <span className="flex-1">{text}</span>
      {hasArrow && <ChevronRight size={14} className="text-neutral-700" />}
    </div>
  );
}

function MenuButton({ icon, label }: any) {
  return (
    <button className="w-full flex items-center gap-3 bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 py-3.5 px-5 rounded-2xl transition-all text-[14px] font-black text-neutral-300">
      <span className="text-neutral-500">{icon}</span>
      {label}
    </button>
  );
}