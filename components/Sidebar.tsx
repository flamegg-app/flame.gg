import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  User, Palette, Link as LinkIcon, 
  Crown, ImageIcon, FileText, ChevronDown, 
  HelpCircle, ExternalLink, Share2, MoreHorizontal, Shield
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
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        if (data) {
          setProfile(data);
          if (data.is_admin) setIsAdmin(true);
        }
      }
      setLoading(false);
    };
    getProfileAndPermissions();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const formattedUID = profile?.id_count 
    ? `UID ${String(profile.id_count).padStart(6, '0').replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` 
    : "UID 000,000";

  return (
    <aside className="w-[260px] bg-[#0a0a0a] border-r border-white/5 flex flex-col h-screen sticky top-0 overflow-hidden font-sans select-none">
      
      {/* Brand Header */}
      <div className="flex items-center justify-between p-6 mb-2">
        <div className="flex items-center gap-3">
          <div className="bg-[#1a1a2e] p-2 rounded-xl border border-white/10 shadow-lg shadow-purple-600/10">
            <img src="/logo.webp" alt="Logo" className="w-5 h-5 object-contain opacity-90" />
          </div>
          <span className="font-black text-[20px] tracking-tighter text-white uppercase italic">scope.gg</span>
        </div>
        <NotificationBell />
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto scrollbar-hide">
        
        <div className="mb-2">
          <button 
            onClick={() => setIsAccountOpen(!isAccountOpen)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-200 ${
              isAccountOpen ? 'bg-white/5 text-white' : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <div className="flex items-center gap-3 font-bold text-[14px]">
              <User size={18} /> Account
            </div>
            <ChevronDown size={16} className={`transition-transform duration-300 ${isAccountOpen ? '' : '-rotate-90'}`} />
          </button>
          
          {isAccountOpen && (
            <div className="mt-1 ml-4 space-y-0.5 border-l border-white/5">
              <SubNavLink label="Overview" path="/dashboard" active={router.pathname === '/dashboard'} />
              <SubNavLink label="Analytics" path="/dashboard/analytics" active={router.pathname === '/dashboard/analytics'} />
              <SubNavLink label="Badges" path="/dashboard/badges" active={router.pathname === '/dashboard/badges'} />
              <SubNavLink label="Settings" path="/dashboard/settings" active={router.pathname === '/dashboard/settings'} />
            </div>
          )}
        </div>

        <SidebarMainLink label="Customize" icon={<Palette size={18}/>} path="/dashboard/customize" active={router.pathname === '/dashboard/customize'} />
        <SidebarMainLink label="Links" icon={<LinkIcon size={18}/>} path="/dashboard/links" active={router.pathname === '/dashboard/links'} />
        <SidebarMainLink label="Premium" icon={<Crown size={18} className="text-amber-400"/>} path="/pricing" active={router.pathname === '/pricing'} />
        <SidebarMainLink label="Image Host" icon={<ImageIcon size={18}/>} path="/dashboard/host" active={router.pathname === '/dashboard/host'} />
        <SidebarMainLink label="Templates" icon={<FileText size={18}/>} path="/dashboard/templates" active={router.pathname === '/dashboard/templates'} />

        {/* Support Section */}
        <div className="mt-8 bg-[#111111] border border-white/5 rounded-[1.5rem] p-5 space-y-4">
          <p className="text-[12px] font-bold text-neutral-500 px-1">Have a question or need support?</p>
          <button className="w-full bg-[#1c1c2e] hover:bg-[#252545] py-3 rounded-xl flex items-center justify-center gap-2 text-[13px] font-bold text-white transition-all border border-white/5 cursor-pointer">
            <HelpCircle size={16} className="text-indigo-400" /> Help Center
          </button>
          
          <div className="pt-3 border-t border-white/5">
            <p className="text-[10px] font-black text-neutral-600 uppercase tracking-widest mb-3 px-1 text-center">Check out your page</p>
            <button className="w-full bg-purple-600/10 hover:bg-purple-600/20 text-purple-400 py-3 rounded-xl flex items-center justify-center gap-2 text-[13px] font-bold transition-all border border-purple-500/10 cursor-pointer">
              <ExternalLink size={16} /> My Page
            </button>
          </div>
        </div>

        <button className="w-full bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 py-3.5 mt-4 rounded-2xl flex items-center justify-center gap-3 font-black text-[13px] transition-all cursor-pointer">
          <Share2 size={16} /> Share Your Profile
        </button>

        {!loading && isAdmin && (
          <div className="pt-4 mt-2 border-t border-white/5">
            <p className="px-4 text-[10px] font-black uppercase tracking-widest text-red-500/60 mb-2">Staff Only</p>
            <SidebarMainLink label="Admin Panel" icon={<Shield size={18}/>} path="/admin" active={router.pathname.startsWith('/admin')} colorClass="text-red-500/80 hover:bg-red-500/5" />
          </div>
        )}
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-white/5 bg-[#0a0a0a]">
        <div className="bg-[#111111] p-3.5 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-[#161616] transition-all">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="relative flex-shrink-0">
              <img src={profile?.avatar_url || '/logo.webp'} className="w-9 h-9 rounded-full border border-white/10 object-cover" alt="avatar" />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-[#111111] rounded-full"></div>
            </div>
            <div className="overflow-hidden">
              <p className="font-black text-[13px] text-white truncate">{profile?.username || "Guest"}</p>
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

function SidebarMainLink({ label, icon, path, active, colorClass }: any) {
  return (
    <Link href={path} className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-[14px] font-bold transition-all duration-200 ${
      active ? 'bg-purple-600/10 text-purple-500' : colorClass || 'text-neutral-500 hover:text-white hover:bg-white/5'
    }`}>
      {icon} {label}
    </Link>
  );
}

function SubNavLink({ label, path, active }: any) {
  return (
    <Link href={path} className={`flex items-center px-10 py-2 rounded-xl text-[13px] font-bold transition-all duration-200 ${
      active ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
    }`}>
      {label}
    </Link>
  );
}