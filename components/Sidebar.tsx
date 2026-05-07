import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  LayoutDashboard, User, Settings, Shield, 
  LogOut, Palette, Link as LinkIcon, 
  Crown, ImageIcon, FileText, ChevronDown, 
  HelpCircle, ExternalLink, Share2, MoreHorizontal, 
  BarChart3, Award 
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import NotificationBell from './NotificationBell';

export default function Sidebar() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [isAccountOpen, setIsAccountOpen] = useState(true);

  useEffect(() => {
    const getProfileAndPermissions = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('username, avatar_url, id_count, is_admin')
          .eq('id', user.id)
          .single();
        
        if (data) {
          setProfile(data);
          if (data.is_admin) setIsAdmin(true);
        }
      }
      setLoading(false);
    };
    getProfileAndPermissions();
  }, []);

  const formattedUID = profile?.id_count 
    ? `UID ${String(profile.id_count).padStart(6, '0').replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` 
    : "UID 000,000";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <aside className="w-[280px] bg-[#0a0a0a] border-r border-white/5 flex flex-col h-screen sticky top-0 overflow-y-auto font-['Satoshi'] scrollbar-hide">
      
      {/* Brand Header with scope.gg Branding */}
      <div className="flex items-center justify-between p-7">
        <div className="flex items-center gap-3">
          <div className="bg-[#1a1a2e] p-2 rounded-xl border border-white/10 shadow-lg shadow-purple-600/10">
            <img src="/logo.webp" alt="Scope Logo" className="w-6 h-6 object-contain opacity-90" />
          </div>
          <span className="font-black text-xl tracking-tighter text-white">scope.gg</span>
        </div>
        <NotificationBell />
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        
        {/* Account Collapsible Section */}
        <div>
          <button 
            onClick={() => setIsAccountOpen(!isAccountOpen)}
            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 ${
              isAccountOpen ? 'bg-white/5 text-white' : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <div className="flex items-center gap-3 font-bold text-[15px]">
              <User size={20} /> Account
            </div>
            <ChevronDown size={18} className={`transition-transform duration-300 ${isAccountOpen ? '' : '-rotate-90'}`} />
          </button>
          
          {isAccountOpen && (
            <div className="mt-2 ml-4 space-y-1 border-l border-white/5">
              <SubNavLink label="Overview" icon={<LayoutDashboard size={16}/>} path="/dashboard" active={router.pathname === '/dashboard'} />
              <SubNavLink label="Analytics" icon={<BarChart3 size={16}/>} path="/dashboard/analytics" />
              <SubNavLink label="Badges" icon={<Award size={16}/>} path="/dashboard/badges" />
              <SubNavLink label="Settings" icon={<Settings size={16}/>} path="/dashboard/settings" active={router.pathname === '/dashboard/settings'} />
            </div>
          )}
        </div>

        {/* Core Links */}
        <SidebarMainLink label="Customize" icon={<Palette size={20}/>} path="/dashboard/customize" active={router.pathname === '/dashboard/customize'} />
        <SidebarMainLink label="Links" icon={<LinkIcon size={20}/>} path="/dashboard/links" />
        <SidebarMainLink label="Premium" icon={<Crown size={20} className="text-amber-400"/>} path="/pricing" />
        <SidebarMainLink label="Image Host" icon={<ImageIcon size={20}/>} path="/dashboard/host" />
        <SidebarMainLink label="Templates" icon={<FileText size={20}/>} path="/dashboard/templates" />

        {/* Support & Action Card */}
        <div className="mt-8 bg-[#111111] border border-white/5 rounded-[2rem] p-5 space-y-4">
          <p className="text-[13px] font-bold text-neutral-400 px-1">Have a question or need support?</p>
          <button className="w-full bg-[#1c1c2e] hover:bg-[#252545] py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-white transition-all border border-white/5 cursor-pointer">
            <HelpCircle size={18} className="text-indigo-400" /> Help Center
          </button>
          
          <div className="pt-3 border-t border-white/5">
            <p className="text-[11px] font-black text-neutral-600 uppercase tracking-widest mb-3 px-1">Check out your page</p>
            <button className="w-full bg-purple-600/10 hover:bg-purple-600/20 text-purple-400 py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all border border-purple-500/10 cursor-pointer">
              <ExternalLink size={18} /> My Page
            </button>
          </div>
        </div>

        {/* Share Button */}
        <button className="w-full bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 py-4 mt-4 rounded-2xl flex items-center justify-center gap-3 font-black text-sm transition-all shadow-lg shadow-purple-900/10 cursor-pointer">
          <Share2 size={18} /> Share Your Profile
        </button>

        {/* Staff Section */}
        {!loading && isAdmin && (
          <div className="pt-4 mt-2">
            <p className="px-4 text-[10px] font-black uppercase tracking-widest text-red-500/60 mb-2">Staff Only</p>
            <SidebarMainLink label="Admin Panel" icon={<Shield size={20}/>} path="/admin" active={router.pathname.startsWith('/admin')} colorClass="text-red-500/80 hover:bg-red-500/5 hover:text-red-400" />
          </div>
        )}
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-white/5">
        <div className="bg-[#111111] p-4 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-[#161616] transition-all">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={profile?.avatar_url || '/logo.webp'} 
                className="w-10 h-10 rounded-full border border-white/10 object-cover" 
                alt="avatar" 
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-[#111111] rounded-full"></div>
            </div>
            <div className="overflow-hidden">
              <p className="font-black text-[14px] text-white truncate w-28">{profile?.username || "Guest"}</p>
              <p className="text-[10px] text-neutral-600 font-bold tracking-tight">{formattedUID}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="p-1 hover:bg-white/5 rounded-lg transition-colors">
            <MoreHorizontal size={18} className="text-neutral-700 group-hover:text-neutral-400" />
          </button>
        </div>
      </div>
    </aside>
  );
}

// Helper Components
function SidebarMainLink({ label, icon, path, active, colorClass }: any) {
  return (
    <Link 
      href={path}
      className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[15px] font-bold transition-all duration-200 ${
        active 
        ? 'bg-purple-600/10 text-purple-500 shadow-sm' 
        : colorClass || 'text-neutral-500 hover:text-white hover:bg-white/5'
      }`}
    >
      {icon} {label}
    </Link>
  );
}

function SubNavLink({ label, path, active }: any) {
  return (
    <Link 
      href={path}
      className={`flex items-center gap-3 px-10 py-2.5 rounded-xl text-[14px] font-bold transition-all duration-200 ${
        active ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
      }`}
    >
      {label}
    </Link>
  );
}