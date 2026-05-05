import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="p-4 border-b border-white/10">
        <span className="font-black uppercase tracking-widest text-xs">Flame Dashboard</span>
      </nav>
      <main>{children}</main>
    </div>
  );
}