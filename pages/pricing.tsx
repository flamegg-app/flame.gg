import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Flame, Check, X, Zap, Crown, Shield, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Pricing() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handlePlanSelection = async (plan: string) => {
    setLoading(plan);
    
    // 1. Check if user is logged in
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      // If not logged in, send them to register with the plan selected
      router.push(`/register?plan=${plan}`);
      return;
    }

    if (plan === 'free') {
      router.push('/dashboard');
      return;
    }

    // 2. This is where you would normally trigger Stripe
    // For now, it will simulate a redirect to your checkout system
    console.log(`Redirecting to ${plan} checkout...`);
    
    // Simulate API call delay
    setTimeout(() => {
      setLoading(null);
      alert(`Payment integration for the ${plan} plan is ready. Link your Stripe account to .env.local to go live!`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['Satoshi'] selection:bg-purple-500/30">
      {/* Navbar */}
      <nav className="p-8 max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Flame className="text-purple-500" size={24} fill="currentColor" />
          <span className="font-black text-xl tracking-tighter">flame.gg</span>
        </Link>
        <div className="flex gap-6 items-center">
          <Link href="/dashboard" className="text-sm font-bold text-neutral-400 hover:text-white transition">Dashboard</Link>
          <Link href="/login" className="bg-white/5 border border-white/10 px-5 py-2 rounded-xl text-xs font-bold hover:bg-white/10 transition">Login</Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
            Choose your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">power.</span>
          </h1>
          <p className="text-neutral-500 max-w-xl mx-auto text-lg leading-relaxed">
            Unlock the full potential of flame.gg with premium effects, custom domains, and verified status.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Free Tier */}
          <PriceCard 
            tier="Basic"
            price="0"
            desc="Standard identity for everyone."
            isLoading={loading === 'free'}
            onClick={() => handlePlanSelection('free')}
            features={[
              { text: "Standard Link-in-bio", included: true },
              { text: "Basic Social Links", included: true },
              { text: "Standard Analytics", included: true },
              { text: "Custom Themes", included: false },
              { text: "Animated Effects", included: false },
              { text: "Premium Badges", included: false },
            ]}
            buttonText="Get Started"
            highlight={false}
          />

          {/* Premium Tier */}
          <PriceCard 
            tier="Premium"
            price="4.99"
            desc="The choice for power users."
            isLoading={loading === 'premium'}
            onClick={() => handlePlanSelection('premium')}
            icon={<Zap className="text-purple-500" size={24} fill="currentColor" />}
            features={[
              { text: "All Basic Features", included: true },
              { text: "Animated Backgrounds", included: true },
              { text: "Exclusive Profile Effects", included: true },
              { text: "Premium Member Badge", included: true },
              { text: "Priority Support", included: true },
              { text: "Zero flame.gg Branding", included: false },
            ]}
            buttonText="Upgrade to Premium"
            highlight={true}
          />

          {/* Legendary Tier */}
          <PriceCard 
            tier="Legendary"
            price="14.99"
            desc="For the ultimate creators."
            isLoading={loading === 'legendary'}
            onClick={() => handlePlanSelection('legendary')}
            icon={<Crown className="text-yellow-500" size={24} fill="currentColor" />}
            features={[
              { text: "All Premium Features", included: true },
              { text: "Custom Domain Support", included: true },
              { text: "Verified Badge Access", included: true },
              { text: "Zero flame.gg Branding", included: true },
              { text: "Early Access to Effects", included: true },
              { text: "Dedicated Manager", included: true },
            ]}
            buttonText="Go Legendary"
            highlight={false}
          />
        </div>

        {/* Security Footer */}
        <div className="mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-60">
           <div className="flex items-center gap-8">
              <div className="flex items-center gap-2"><Shield size={16} className="text-purple-500"/> <span className="text-[10px] font-black uppercase tracking-widest">Encrypted Payments</span></div>
              <div className="flex items-center gap-2"><Zap size={16} className="text-purple-500"/> <span className="text-[10px] font-black uppercase tracking-widest">Instant Delivery</span></div>
           </div>
           <div className="text-neutral-500 text-[10px] font-bold">
             Trusted by 12+ users worldwide.
           </div>
        </div>
      </main>
    </div>
  );
}

function PriceCard({ tier, price, desc, features, buttonText, highlight, icon, onClick, isLoading }: any) {
  return (
    <div className={`relative flex flex-col p-10 rounded-[3rem] border transition-all duration-500 ${
      highlight 
      ? 'bg-[#161616] border-purple-600 shadow-[0_0_50px_rgba(139,92,246,0.15)] scale-105 z-10' 
      : 'bg-[#0e0e0e] border-neutral-800 hover:border-neutral-700'
    }`}>
      {highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-[0.2em] shadow-lg">
          Most Popular
        </div>
      )}
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-black mb-1">{tier}</h3>
          <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest">{desc}</p>
        </div>
        <div className="p-3 bg-black/40 rounded-2xl border border-white/5">
          {icon || <Flame size={20} className="text-neutral-600" />}
        </div>
      </div>

      <div className="flex items-baseline gap-1 mb-10">
        <span className="text-5xl font-black tracking-tighter">${price}</span>
        <span className="text-neutral-500 text-sm font-bold">/month</span>
      </div>

      <div className="space-y-5 mb-12 flex-1">
        {features.map((f: any, i: number) => (
          <div key={i} className="flex items-center gap-3 text-sm">
            <div className={`p-1 rounded-full ${f.included ? 'bg-purple-500/10' : 'bg-neutral-800'}`}>
              {f.included ? (
                <Check size={14} className="text-purple-500" />
              ) : (
                <X size={14} className="text-neutral-700" />
              )}
            </div>
            <span className={`font-medium ${f.included ? 'text-neutral-200' : 'text-neutral-600'}`}>{f.text}</span>
          </div>
        ))}
      </div>

      <button 
        onClick={onClick}
        disabled={isLoading}
        className={`w-full py-5 rounded-2xl font-black text-sm transition flex items-center justify-center gap-2 group ${
        highlight 
        ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-xl shadow-purple-600/20' 
        : 'bg-[#1a1a1a] hover:bg-[#222] text-white border border-white/5'
      }`}>
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            {buttonText}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
          </>
        )}
      </button>
    </div>
  );
}