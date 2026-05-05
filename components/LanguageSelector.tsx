import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const languages = [
  { code: 'US', name: 'English (US)' },
  { code: 'UK', name: 'English (UK)' },
  { code: 'FR', name: 'Français' },
  { code: 'DE', name: 'Deutsch' },
];

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(languages[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl flex items-center justify-between w-52 hover:bg-white/10 transition-all active:scale-95"
      >
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black text-neutral-500 uppercase">{selected.code}</span>
          <span className="text-[11px] font-black uppercase tracking-widest text-neutral-300">
            {selected.name}
          </span>
        </div>
        <ChevronDown 
          size={14} 
          className={`text-neutral-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute bottom-full mb-3 left-0 w-full bg-[#160d21] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setSelected(lang);
                setIsOpen(false);
              }}
              className="w-full px-5 py-3 flex items-center justify-between hover:bg-purple-600/20 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-neutral-600 uppercase group-hover:text-purple-400">
                  {lang.code}
                </span>
                <span className="text-[11px] font-black uppercase tracking-widest text-neutral-400 group-hover:text-white">
                  {lang.name}
                </span>
              </div>
              {selected.code === lang.code && <Check size={12} className="text-purple-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}