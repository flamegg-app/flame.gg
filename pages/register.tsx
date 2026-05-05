import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      alert(error.message);
    } else {
      alert('Check your email for a confirmation link!');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#161616] border border-neutral-800 p-8 rounded-3xl">
        <h2 className="text-2xl font-bold mb-6">Create your account</h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-neutral-800 p-3 rounded-xl outline-none" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-neutral-800 p-3 rounded-xl outline-none" 
          />
          <button type="submit" className="w-full bg-purple-600 py-3 rounded-xl font-bold">Sign Up</button>
        </form>
      </div>
    </div>
  );
}