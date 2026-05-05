import React from 'react';
import { Eye, MousePointer2, TrendingUp, Calendar } from 'lucide-react';

export default function Analytics() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black tracking-tighter mb-8">Analytics</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Simple Stat Cards */}
          <div className="bg-[#111] border border-white/10 p-6 rounded-2xl">
            <div className="flex items-center gap-4 mb-2 text-neutral-400">
              <Eye size={20} />
              <span className="text-sm font-bold uppercase tracking-wider">Total Views</span>
            </div>
            <p className="text-2xl font-black">0</p>
          </div>
          {/* Add more cards as needed */}
        </div>
      </div>
    </div>
  );
}