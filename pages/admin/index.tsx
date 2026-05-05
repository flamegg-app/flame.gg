import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Shield, Search, Ban, CheckCircle, Crown, UserPlus, XCircle } from 'lucide-react';

export default function AdminPanel() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [myEmail, setMyEmail] = useState('');

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return window.location.href = '/login';
    setMyEmail(user.email || '');

    const { data: profile } = await supabase.from('profiles').select('is_admin').eq('id', user.id).single();
    if (!profile?.is_admin) {
      alert("Access Denied: Admins Only");
      window.location.href = '/dashboard';
    } else {
      fetchUsers();
    }
  }

  async function fetchUsers() {
    const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
    if (data) setUsers(data);
    setLoading(false);
  }

  const toggleAction = async (userId: string, column: string, currentValue: any) => {
    const { error } = await supabase.from('profiles').update({ [column]: !currentValue }).eq('id', userId);
    if (!error) fetchUsers();
  };

  const updateTier = async (userId: string, tier: string) => {
    await supabase.from('profiles').update({ subscription_tier: tier }).eq('id', userId);
    fetchUsers();
  };

  const filteredUsers = users.filter(u => 
    u.display_name?.toLowerCase().includes(search.toLowerCase()) || 
    u.id.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-purple-500 font-black">INITIALIZING COMMAND CENTER...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['Satoshi'] p-10">
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tighter flex items-center gap-3">
            <Shield className="text-purple-500" size={32} /> Admin Control
          </h1>
          <p className="text-neutral-500 text-sm mt-1">Logged in as: <span className="text-purple-400 font-bold">{myEmail}</span></p>
        </div>
        
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
          <input 
            placeholder="Search users by name or UUID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#161616] border border-neutral-800 rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-purple-600 outline-none transition"
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        <div className="bg-[#161616] border border-neutral-800 rounded-[2.5rem] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 bg-white/5 text-[10px] font-black uppercase tracking-widest text-neutral-500">
                <th className="p-6">User</th>
                <th className="p-6">Status</th>
                <th className="p-6">Subscription</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-white/[0.02] transition">
                  <td className="p-6">
                    <div className="flex flex-col">
                      <span className="font-bold">{user.display_name || 'No Name'}</span>
                      <span className="text-[10px] text-neutral-600 font-mono">{user.id}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex gap-2">
                      {user.is_banned && <span className="bg-red-500/10 text-red-500 text-[10px] font-black px-2 py-1 rounded">BANNED</span>}
                      {user.is_admin && <span className="bg-purple-500/10 text-purple-500 text-[10px] font-black px-2 py-1 rounded">ADMIN</span>}
                      {!user.is_banned && !user.is_admin && <span className="bg-green-500/10 text-green-500 text-[10px] font-black px-2 py-1 rounded">ACTIVE</span>}
                    </div>
                  </td>
                  <td className="p-6">
                    <select 
                      value={user.subscription_tier} 
                      onChange={(e) => updateTier(user.id, e.target.value)}
                      className="bg-black border border-neutral-800 rounded-lg text-xs p-2 outline-none focus:border-purple-500"
                    >
                      <option value="free">Free</option>
                      <option value="premium">Premium</option>
                      <option value="legendary">Legendary</option>
                    </select>
                  </td>
                  <td className="p-6">
                    <div className="flex justify-end gap-3">
                      <button 
                        onClick={() => toggleAction(user.id, 'is_admin', user.is_admin)}
                        className={`p-2 rounded-xl transition ${user.is_admin ? 'bg-purple-500 text-white' : 'bg-neutral-800 text-neutral-400 hover:text-white'}`}
                        title="Toggle Admin Access"
                      >
                        <UserPlus size={18} />
                      </button>
                      <button 
                        onClick={() => toggleAction(user.id, 'is_banned', user.is_banned)}
                        className={`p-2 rounded-xl transition ${user.is_banned ? 'bg-red-500 text-white' : 'bg-neutral-800 text-neutral-400 hover:text-red-500'}`}
                        title="Ban/Unban User"
                      >
                        <Ban size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}