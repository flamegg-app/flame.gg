import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Diamond, Loader2 } from 'lucide-react';

interface LeaderboardUser {
  rank: number;
  name: string;
  username: string;
  views: number;
  avatar: string;
  isPremium: boolean;
}

export default function Leaderboard() {
  const [filter, setFilter] = useState('all-time');
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  // Real data fetch logic
  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        // Replace '/api/leaderboard' with your actual backend endpoint
        const response = await fetch(`/api/leaderboard?filter=${filter}`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch real leaderboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [filter]); // Re-runs whenever you toggle 'All Time' or 'This Month'

  const discordUrl = "https://discord.gg/QFnZFWZ25R";

  return (
    <div className="min-h-screen bg-[#0a0612] text-white font-['Satoshi',sans-serif] pb-20">
      
      {/* Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 bg-[#160d21]/60 backdrop-blur-xl border border-white/10 py-3 px-8 rounded-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo.webp" alt="Logo" className="w-7 h-7" />
          <span className="text-xl font-black tracking-tighter">scope.gg</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[13px] font-bold text-neutral-300">
          <Link href="/help" className="hover:text-white transition">Help Center</Link>
          <a href={discordUrl} target="_blank" rel="noreferrer" className="hover:text-white transition">Discord</a>
          <Link href="/leaderboard" className="text-white">Leaderboard</Link>
          <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
          <Link href="/dashboard" className="bg-purple-600/20 text-purple-200 border border-purple-500/30 px-6 py-2 rounded-full font-black">
            Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero Banner Section */}
      <div className="pt-40 px-6 max-w-5xl mx-auto">
        <div className="bg-[#1a0d2d] rounded-[2.5rem] p-10 md:p-16 border border-white/5 relative overflow-hidden shadow-2xl">
          <img src="/logo.webp" className="absolute top-10 right-10 w-40 h-40 opacity-[0.03] rotate-12" alt="" />
          
          <div className="relative z-10">
            <h1 className="text-4xl font-black mb-4 tracking-tight text-white">Views Leaderboard</h1>
            <p className="text-purple-100/40 font-bold mb-8">Top 50 profiles by total views of all time.</p>
            
            <div className="flex gap-3 bg-black/20 p-1.5 rounded-2xl w-fit border border-white/5 backdrop-blur-sm">
              <button 
                onClick={() => setFilter('all-time')}
                className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${filter === 'all-time' ? 'bg-purple-600/30 text-purple-100' : 'text-neutral-500 hover:text-white'}`}
              >
                All Time
              </button>
              <button 
                onClick={() => setFilter('this-month')}
                className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${filter === 'this-month' ? 'bg-purple-600/30 text-purple-100' : 'text-neutral-500 hover:text-white'}`}
              >
                This Month
              </button>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="mt-12 bg-[#130b21]/40 border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-sm relative min-h-[400px]">
          <div className="grid grid-cols-[60px_1fr_100px] gap-4 px-8 py-6 border-b border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
            <span>#</span>
            <span>Profile</span>
            <span className="text-right">Views</span>
          </div>

          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0a0612]/40">
              <Loader2 className="text-purple-500 animate-spin" size={40} />
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {users.map((user, index) => (
                <div 
                  key={user.username} 
                  className="grid grid-cols-[60px_1fr_100px] gap-4 px-8 py-5 items-center hover:bg-white/[0.02] transition-colors group"
                >
                  <span className={`font-black text-lg ${index < 3 ? 'text-yellow-500/80' : 'text-neutral-600'}`}>
                    {index + 1}
                  </span>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-neutral-800 border border-white/10 overflow-hidden">
                      <img src={user.avatar || '/logo.webp'} className="w-full h-full object-cover" alt={user.username} />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-[15px]">{user.name}</span>
                        {user.isPremium && <Diamond size={14} className="text-purple-400 fill-purple-400/20" />}
                      </div>
                      <span className="text-neutral-500 text-xs font-bold">@{user.username}</span>
                    </div>
                  </div>

                  <div className="text-right font-black text-[15px] tabular-nums">
                    {user.views.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}