import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Globe, MessageSquare, Mail, Save, Share2 } from 'lucide-react';

export default function SocialLinks() {
  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto font-['Satoshi']">
        <h1 className="text-3xl font-black tracking-tighter mb-2">Social Links</h1>
        <p className="text-neutral-500 mb-8 font-medium">Connect your socials to your profile.</p>
        
        <div className="space-y-4">
          {/* X / Twitter Replacement */}
          <div className="bg-[#111] border border-white/10 p-6 rounded-2xl flex items-center gap-4">
            <Share2 className="text-blue-400" size={20} />
            <input 
              type="text" 
              placeholder="X (Twitter) Username" 
              className="bg-transparent border-none outline-none flex-1 text-sm font-bold text-white"
            />
          </div>

          {/* Discord Replacement */}
          <div className="bg-[#111] border border-white/10 p-6 rounded-2xl flex items-center gap-4">
            <MessageSquare className="text-indigo-400" size={20} />
            <input 
              type="text" 
              placeholder="Discord Username" 
              className="bg-transparent border-none outline-none flex-1 text-sm font-bold text-white"
            />
          </div>
          
          <button className="w-full py-4 bg-purple-600 hover:bg-purple-700 rounded-2xl font-bold flex items-center justify-center gap-2 transition text-white">
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}