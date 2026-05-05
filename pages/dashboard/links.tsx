import DashboardLayout from '../../components/DashboardLayout';
import { Twitter, Disc, Globe, Mail, Save } from 'lucide-react';

export default function SocialLinks() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-8">Social Links</h1>
      
      <div className="max-w-2xl bg-[#161616] border border-neutral-800 p-8 rounded-2xl">
        <p className="text-sm text-neutral-400 mb-6">These will appear as icons on your profile card.</p>
        
        <div className="space-y-6">
          <LinkInput icon={<Twitter size={18}/>} label="Twitter / X" placeholder="https://x.com/yourname" />
          <LinkInput icon={<Disc size={18}/>} label="Discord" placeholder="https://discord.gg/invite" />
          <LinkInput icon={<Globe size={18}/>} label="Website" placeholder="https://flame-gg.lovable.app/" />
          <LinkInput icon={<Mail size={18}/>} label="Email" placeholder="you@example.com" />
        </div>

        <button className="mt-8 w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition">
          <Save size={18}/> Save Social Links
        </button>
      </div>
    </DashboardLayout>
  );
}

function LinkInput({ icon, label, placeholder }: { icon: any, label: string, placeholder: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2 text-neutral-400">
        {icon} <label className="text-xs font-bold uppercase tracking-tight">{label}</label>
      </div>
      <input 
        type="text" 
        placeholder={placeholder} 
        className="w-full bg-[#0a0a0a] border border-neutral-800 p-3 rounded-xl text-sm focus:border-purple-600 outline-none transition"
      />
    </div>
  );
}