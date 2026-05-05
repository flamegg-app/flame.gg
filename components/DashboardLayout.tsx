import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LayoutDashboard, Link2, BarChart3, User, LogOut } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white font-['Satoshi']">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/5 p-6 flex flex-col hidden md:flex">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="font-black text-xs">F</span>
          </div>
          <span className="font-black tracking-tighter text-xl">flame.gg</span>
        </div>

        <nav className="space-y-1 flex-1">
          <Link href="/dashboard" className={`flex items-center gap-3 p-3 rounded-xl transition ${router.pathname === '/dashboard' ? 'bg-white/10 text-white' : 'text-neutral-500 hover:bg-white/5'}`}>
            <User size={18} /> Profile
          </Link>
          <Link href="/dashboard/links" className={`flex items-center gap-3 p-3 rounded-xl transition ${router.pathname === '/dashboard/links' ? 'bg-white/10 text-white' : 'text-neutral-500 hover:bg-white/5'}`}>
            <Link2 size={18} /> Socials
          </Link>
          <Link href="/dashboard/analytics" className={`flex items-center gap-3 p-3 rounded-xl transition ${router.pathname === '/dashboard/analytics' ? 'bg-white/10 text-white' : 'text-neutral-500 hover:bg-white/5'}`}>
            <BarChart3 size={18} /> Analytics
          </Link>
        </nav>

        <button className="mt-auto flex items-center gap-3 p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition font-bold text-sm">
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}