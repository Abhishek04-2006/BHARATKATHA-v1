// src/components/Pillars.jsx
import React from 'react';
import { Compass, Box, Sparkles, Heart, ArrowRight } from 'lucide-react';

export default function Pillars({ onSelectPillar }) {
  const pillars = [
    {
      id: 'explore',
      icon: Compass,
      tag: 'INTERACTIVE TIMELINE',
      title: 'Discover',
      desc: 'Scrub across 2,500 years from 500 BCE to 1947 CE with curated architectural & cultural lore.',
      actionLabel: 'Launch Timeline',
      color: 'hover:border-amber-400/60 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]',
      badge: '2,500 Yrs'
    },
    {
      id: '3d-nalanda',
      icon: Box,
      tag: 'WEBXR 3D WORLDS',
      title: 'Experience',
      desc: 'Walk first-person inside the Dharmaganja library and witness ancient scholastic debates live.',
      actionLabel: 'Enter Nalanda 3D',
      color: 'hover:border-amber-400/60 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]',
      badge: 'Walkable 3D'
    },
    {
      id: 'create',
      icon: Sparkles,
      tag: 'AI KATHA ENGINE',
      title: 'Create',
      desc: 'Craft historical narratives with LLMs and live them as walking 3D parchment corridors.',
      actionLabel: 'Synthesize Katha',
      color: 'hover:border-amber-400/60 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]',
      badge: 'Generative'
    },
    {
      id: 'roots',
      icon: Heart,
      tag: 'ORAL HISTORY CODEX',
      title: 'Preserve',
      desc: 'Crowdsource and digitize vanishing hometown traditions, folk songs, and grandfather tales.',
      actionLabel: 'Archive Tradition',
      color: 'hover:border-amber-400/60 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]',
      badge: 'Living Lore'
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
          ARCHITECTURE & IMPACT
        </span>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mt-3">
          The Four Pillars of BharatKatha
        </h2>
        <p className="text-neutral-400 text-xs md:text-sm mt-3 max-w-xl mx-auto">
          Choose a pillar below to step directly into that interactive dimension.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.id}
              onClick={() => onSelectPillar && onSelectPillar(pillar.id)}
              className={`glass-panel p-6 rounded-3xl border border-white/5 ${pillar.color} transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1.5`}
            >
              <div>
                {/* Top Icon + Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                    {pillar.badge}
                  </span>
                </div>

                {/* Subtitle Tag */}
                <span className="text-[10px] font-bold tracking-wider text-amber-400 uppercase font-mono block mb-1">
                  {pillar.tag}
                </span>

                {/* Title */}
                <h3 className="text-xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-neutral-400 leading-relaxed mt-3">
                  {pillar.desc}
                </p>
              </div>

              {/* Action Button at bottom */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-amber-300">
                <span>{pillar.actionLabel}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}