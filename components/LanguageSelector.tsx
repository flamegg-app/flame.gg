import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState({ code: 'US', name: 'English (US)' });

  const languages = [
    { code: 'US', name: 'English (US)' },
    { code: 'UK', name: 'English (UK)' },
    { code: 'FR', name: 'Français' },
    { code: 'DE', name: 'Deutsch' },
  ];

  return (
    <div className="relative inline-block text-left">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl flex items-center justify-between w-52 hover:bg-white/10 transition-all active:scale-95 group z-50"
      >
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black text-neutral-500 uppercase">{selected.code}</span>
          <span className="text-[11px] font-black uppercase tracking-widest text-neutral-300 group-hover:text-white transition-colors">
            {selected.name}
          </span>
        </div>
        <ChevronDown 
          size={14} 
          className={`text-neutral-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Menu Overlay */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute bottom-full mb-3 left-0 w-full bg-[#160d21] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setSelected(lang);
                  setIsOpen(false);
                }}
                className="w-full px-5 py-3 flex items-center justify-between hover:bg-purple-600/20 transition-colors group text-left"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-neutral-600 uppercase group-hover:text-purple-400">
                    {lang.code}
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-widest text-neutral-400 group-hover:text-white">
                    {lang.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}