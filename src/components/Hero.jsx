// src/components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, ArrowRight } from 'lucide-react';

export default function Hero({ onStartExperience, onExplore }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      
      {/* 1. Cinematic Background Video Loop */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 filter brightness-[0.4] contrast-[1.1] saturate-[0.85]"
        >
          {/* Ancient Temple & Heritage Ambient Footage (High-speed Pexels CDN) */}
          <source
            src="/hero-bg.mp4"
            type="video/mp4"
          />
        </video>

        {/* 2. Dual-Layer Cinematic Gradients (Legibility + Atmosphere) */}
        {/* Top-to-Bottom Darkness */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C10]/80 via-[#0B0C10]/60 to-[#0B0C10]" />
        
        {/* Center Warm Golden Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,transparent_70%)]" />
        
        {/* Subtle Vignette Edge */}
        <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.85)]" />
      </div>

      {/* 3. Foreground Content */}
      <div className="relative z-10 max-w-5xl flex flex-col items-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md text-amber-300 text-xs font-medium mb-6 tracking-wider shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse" /> AI-Powered Cultural Metaverse & Story Studio
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-serif drop-shadow-2xl"
        >
          Don’t Just Learn India’s History. <br />
          <span className="gold-gradient-text">Step Inside It.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-6 text-neutral-300 max-w-2xl text-sm md:text-base leading-relaxed drop-shadow"
        >
          Wander the lost walkways of 5th-century Nalanda in real-time 3D, debate statecraft with Chanakya, and immortalize the oral traditions of your ancestors.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={onStartExperience}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs md:text-sm flex items-center gap-2.5 transition-all transform hover:scale-105 gold-glow cursor-pointer shadow-xl"
          >
            <Play className="w-4 h-4 fill-black" /> Enter Nalanda 3D
          </button>

          <button
            onClick={onExplore}
            className="px-8 py-3.5 rounded-xl glass-panel hover:bg-neutral-800/80 text-white font-semibold text-xs md:text-sm flex items-center gap-2 border border-white/10 hover:border-amber-400/40 transition-all cursor-pointer backdrop-blur-md"
          >
            Explore 2,500-Year Timeline <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </motion.div>

        {/* Live Metrics Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl"
        >
          {[
            { label: 'Historical Timeline', val: '2,500+ Yrs' },
            { label: '3D Walkable Sites', val: 'Nalanda 5th CE' },
            { label: 'Interactive Scholars', val: '4 AI Personas' },
            { label: 'Verified Oral Roots', val: 'Living Codex' },
          ].map((stat, i) => (
            <div key={i} className="glass-panel p-4 rounded-xl text-center border border-white/5 backdrop-blur-md">
              <div className="text-xl md:text-2xl font-bold gold-gradient-text font-serif">{stat.val}</div>
              <div className="text-[11px] text-neutral-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}