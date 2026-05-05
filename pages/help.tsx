import React from 'react';
import Link from 'next/link';
import { 
  Search, 
  BookOpen, 
  ShieldCheck, 
  MessageCircle, 
  Zap, 
  ArrowLeft,
  ExternalLink
} from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';

export default function HelpCenter() {
  return (
    <div className="min-h-screen bg-[#0a0612] text-white font-['Satoshi',sans-serif] p-6 md:p-12 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Navigation Top Bar */}
        <div className="flex items-center justify-between mb-16">
          <Link href="/dashboard" className="flex items-center gap-2 text-neutral-500 hover:text-white transition-all font-bold group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
          <img src="/logo.webp" alt="scope.gg" className="w-10 h-10 opacity-50" />
        </div>

        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-black mb-6 tracking-tight">Help Center</h1>
          <p className="text-neutral-500 font-bold text-lg max-w-2xl mx-auto mb-10">
            Everything you need to know about managing your scope.gg profile, analytics, and community connections.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-600" size={22} />
            <input 
              type="text" 
              placeholder="Search for articles, guides, or FAQs..." 
              className="w-full bg-[#110c1d] border border-white/5 rounded-[2rem] py-5 pl-16 pr-8 outline-none focus:border-purple-500/40 focus:bg-[#150f24] transition-all font-bold shadow-2xl"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <HelpCard 
            icon={<Zap className="text-purple-500" size={24} />}
            title="Getting Started"
            description="New to scope.gg? Learn how to claim your UID and set up your first profile."
          />
          <HelpCard 
            icon={<ShieldCheck className="text-blue-500" size={24} />}
            title="Account & Security"
            description="Manage your Google/Discord linked accounts and update your privacy settings."
          />
          <HelpCard 
            icon={<BookOpen className="text-pink-500" size={24} />}
            title="Customization"
            description="A deep dive into templates, custom CSS, and choosing the perfect alias."
          />
        </div>

        {/* Support Section */}
        <div className="bg-[#110c1d] border border-white/5 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-600/5 to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#5865F2]/10 rounded-3xl mb-8">
              <FaDiscord className="text-[#5865F2]" size={40} />
            </div>
            <h2 className="text-3xl font-black mb-4">Still need assistance?</h2>
            <p className="text-neutral-500 font-bold text-lg mb-10 max-w-xl mx-auto">
              Our support team and community are active 24/7 on Discord. Get real-time help with technical issues or feature requests.
            </p>
            
            <Link 
              href="https://discord.gg/QFnZFWZ25R" 
              target="_blank"
              className="inline-flex items-center gap-3 bg-[#5865F2] hover:bg-[#4752c4] text-white px-10 py-5 rounded-2xl font-black text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(88,101,242,0.3)]"
            >
              Join Our Discord
              <ExternalLink size={20} />
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 border-t border-white/5 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 opacity-40">
          <p className="text-[12px] font-black uppercase tracking-widest text-neutral-500">
            © 2026 scope.gg — Built for the community.
          </p>
          <div className="flex gap-8 text-[12px] font-black uppercase tracking-widest text-neutral-500">
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
          </div>
        </div>

      </div>
    </div>
  );
}

function HelpCard({ icon, title, description }: any) {
  return (
    <div className="bg-[#110c1d] border border-white/5 p-10 rounded-[2.5rem] hover:border-purple-500/20 transition-all cursor-pointer group hover:bg-[#150f24]">
      <div className="mb-6 p-4 bg-white/[0.03] w-fit rounded-2xl group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-black mb-3 group-hover:text-purple-400 transition-colors">{title}</h3>
      <p className="text-neutral-500 text-sm font-bold leading-relaxed">{description}</p>
    </div>
  );
}