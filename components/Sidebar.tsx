import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  Flame, 
  LayoutDashboard, 
  User, 
  Settings, 
  Shield, 
  LogOut, 
  CreditCard,
  MessageCircle
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import NotificationBell from './NotificationBell';

export default function Sidebar() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPermissions = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();
        
        if (data?.is_admin) {
          setIsAdmin(true);
        }
      }
      setLoading(false);
    };

    getPermissions();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const navItems = [
    // Updated path to ensure it correctly routes to your internal dashboard overview
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Customize', icon: User, path: '/dashboard/customize' },
    { name: 'Billing', icon: CreditCard, path: '/pricing' },
    { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ];

  return (
    <aside className="w-72 bg-[#0a0a0a] border-r border-neutral-800 flex flex-col p-6 min-h-screen font-['Satoshi']">
      
      {/* Brand Header with Live Notifications */}
      <div className="flex items-center justify-between px-4 mb-12">
        <div className="flex items-center gap-3">
          <div className="bg-purple-600 p-2 rounded-xl shadow-lg shadow-purple-600/20">
            <Flame size={20} fill="white" className="text-white" />
          </div>
          <span className="font-black text-xl tracking-tighter text-white">scope.gg</span>
        </div>
        
        {/* Real-time Notification Component */}
        <NotificationBell />
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          // Fix for active state when visiting the dashboard index
          const isActive = router.pathname === item.path;
          return (
            <Link 
              key={item.name} 
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 ${
                isActive 
                ? 'bg-purple-600/10 text-purple-500 shadow-sm' 
                : 'text-neutral-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          );
        })}

        {/* Community Section */}
        <div className="pt-4 mt-4 border-t border-neutral-900">
          <p className="px-4 text-[10px] font-black uppercase tracking-widest text-neutral-600 mb-2">Community</p>
          <a 
            href="https://discord.gg/QFnZFWZ25R" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-[#5865F2] hover:bg-[#5865F2]/10 transition-all duration-200"
          >
            <MessageCircle size={18} fill="currentColor" />
            Join Discord
          </a>
        </div>

        {/* Secure Staff Section */}
        {!loading && isAdmin && (
          <div className="pt-4 mt-2">
            <p className="px-4 text-[10px] font-black uppercase tracking-widest text-red-500/60 mb-2">Staff Only</p>
            <Link 
              href="/admin"
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 ${
                router.pathname.startsWith('/admin') 
                ? 'bg-red-500/10 text-red-500' 
                : 'text-neutral-500 hover:text-red-400 hover:bg-red-500/5'
              }`}
            >
              <Shield size={18} />
              Admin Panel
            </Link>
          </div>
        )}
      </nav>

      {/* Footer Actions */}
      <div className="pt-6 border-t border-neutral-900">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-neutral-500 hover:text-white hover:bg-white/5 transition-all"
        >
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </aside>
  );
}