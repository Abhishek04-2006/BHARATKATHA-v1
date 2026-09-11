// src/components/Navbar.jsx
import React from 'react';
import { Compass, Box, Sparkles, BookOpen, Award } from 'lucide-react';
import AudioPlayer from './AudioPlayer';

export default function Navbar({ activeTab, setActiveTab, points = 150 }) {
  // Sirf aur sirf 4 core pillars
  const pillars = [
    { id: 'explore', label: 'Discover', icon: Compass },
    { id: '3d-nalanda', label: 'Experience', icon: Box },
    { id: 'create', label: 'Create', icon: Sparkles },
    { id: 'roots', label: 'Preserve', icon: BookOpen },
  ];

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-4xl glass-panel rounded-2xl px-6 py-2.5 flex items-center justify-between shadow-2xl border border-white/10 backdrop-blur-xl">
      
      {/* Brand / Logo (Clicking returns to Sanctum Home) */}
      <div 
        onClick={() => setActiveTab('home')}
        className="flex items-center gap-2.5 cursor-pointer group shrink-0"
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-300 flex items-center justify-center font-bold text-black text-sm shadow-md group-hover:scale-105 transition-transform">
          भ
        </div>
        <span className="font-bold text-sm tracking-widest text-white">
          BHARAT<span className="text-amber-400 font-serif italic">KATHA</span>
        </span>
      </div>

      {/* 4 Core Pillars Only */}
      <div className="flex items-center gap-1 sm:gap-2 px-2 py-1 bg-neutral-950/60 rounded-xl border border-white/5">
        {pillars.map((p) => {
          const Icon = p.icon;
          const isActive = activeTab === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setActiveTab(p.id)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-black shadow-lg'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{p.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right Side: Soundscape + XP Score */}
      <div className="flex items-center gap-3 shrink-0">
        <AudioPlayer />

        <div className="flex items-center gap-1.5 bg-neutral-950/70 border border-white/10 px-3 py-1.5 rounded-xl text-xs">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-mono text-amber-300 font-bold">{points} <span className="text-neutral-500 text-[10px] font-normal">XP</span></span>
        </div>
      </div>

    </nav>
  );
}