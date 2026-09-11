// src/components/TimelineExplorer.jsx
import React, { useState } from 'react';
import { TIMELINE_EPOCHS } from '../data/timelineData';
import { Calendar, MapPin, Sparkles, ArrowRight, Video } from 'lucide-react';

export default function TimelineExplorer({ onAwardPoints }) {
  const [selectedEpoch, setSelectedEpoch] = useState(TIMELINE_EPOCHS[0]);

  const handleEpochChange = (epoch) => {
    setSelectedEpoch(epoch);
    if (onAwardPoints) onAwardPoints(10);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* 1. Dynamic Background Video Player */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          key={selectedEpoch.id} // key change causes instant smooth re-render
          src={selectedEpoch.videoLoop}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 filter brightness-[0.75] contrast-125 transition-all duration-700"
        />

        {/* Cinematic Vignette & Obsidian Mesh Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-black/60 to-black/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-[#0b0c10]" />
      </div>

      {/* 2. Interactive Foreground Content */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20">
        
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-widest text-amber-400 uppercase flex items-center justify-center gap-1.5 font-mono">
            <Sparkles className="w-3.5 h-3.5" /> Pillar I • Discover
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mt-2 drop-shadow-lg">
            2,500 Years of Subcontinental Lore
          </h2>
          <p className="text-neutral-300 text-xs md:text-sm mt-3 max-w-xl mx-auto drop-shadow">
            Scrub through distinct epochs to reveal pivotal architectural, intellectual, and revolutionary milestones.
          </p>
        </div>

        {/* 4 Epoch Selection Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12">
          {TIMELINE_EPOCHS.map((epoch) => {
            const isSelected = selectedEpoch.id === epoch.id;
            return (
              <button
                key={epoch.id}
                onClick={() => handleEpochChange(epoch)}
                className={`p-4 md:p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer backdrop-blur-xl relative overflow-hidden group ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 text-white shadow-[0_0_30px_rgba(212,175,55,0.25)] ring-1 ring-amber-400/50'
                    : 'bg-neutral-950/60 border-white/10 hover:border-amber-500/30 text-neutral-400 hover:text-white hover:bg-neutral-900/60'
                }`}
              >
                {/* Active Indicator Strip */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600" />
                )}

                <span className="text-[10px] md:text-[11px] font-mono font-semibold tracking-wider text-amber-400/90 block mb-1">
                  {epoch.range}
                </span>
                <h4 className="text-sm md:text-base font-bold font-serif text-white group-hover:text-amber-300 transition-colors">
                  {epoch.name}
                </h4>

                <div className="mt-2 flex items-center gap-1 text-[10px] text-neutral-400 font-mono">
                  <Video className={`w-3 h-3 ${isSelected ? 'text-amber-400' : 'text-neutral-500'}`} />
                  <span>{isSelected ? 'Live Ambience Active' : 'Switch Era'}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Milestone Cards for Selected Epoch */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {selectedEpoch.events.map((event, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 md:p-8 rounded-3xl border border-white/15 bg-neutral-950/70 backdrop-blur-2xl hover:border-amber-400/40 hover:shadow-[0_0_30px_rgba(212,175,55,0.12)] transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Meta Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                  <span className="flex items-center gap-1.5 text-amber-400 font-mono font-bold">
                    <Calendar className="w-3.5 h-3.5" /> {event.year}
                  </span>
                  <span className="flex items-center gap-1.5 text-neutral-400">
                    <MapPin className="w-3.5 h-3.5 text-amber-400/70" /> {event.location}
                  </span>
                </div>

                {/* Event Headline */}
                <h3 className="text-xl md:text-2xl font-serif font-bold text-white mt-4 group-hover:text-amber-300 transition-colors">
                  {event.title}
                </h3>

                {/* Event Description */}
                <p className="text-xs md:text-sm text-neutral-300 leading-relaxed mt-3">
                  {event.desc}
                </p>
              </div>

              {/* Action Pill */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
                  {event.tag}
                </span>

                <button
                  onClick={() => onAwardPoints && onAwardPoints(15)}
                  className="text-xs font-semibold text-neutral-300 hover:text-amber-400 flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span>Inspect Sources</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
}