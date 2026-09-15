// src/components/TimelineExplorer.jsx
import React, { useState } from 'react';
import { TIMELINE_EPOCHS } from '../data/timelineData';
import { 
  Calendar, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  Video, 
  BookOpen, 
  X, 
  Volume2, 
  VolumeX, 
  Loader2 
} from 'lucide-react';
import { speakText, stopSpeech } from '../utils/speechVoice';
import { fetchTimelineInsight } from '../services/api';

export default function TimelineExplorer({ onAwardPoints, setActiveTab }) {
  const [selectedEpoch, setSelectedEpoch] = useState(TIMELINE_EPOCHS[0]);
  
  // Interactive Modal States
  const [activeModalEvent, setActiveModalEvent] = useState(null);
  const [insightText, setInsightText] = useState('');
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleEpochChange = (epoch) => {
    setSelectedEpoch(epoch);
    if (onAwardPoints) onAwardPoints(10);
  };

  const handleInspectSources = async (event) => {
    setActiveModalEvent(event);
    setInsightText('');
    setIsLoadingInsight(true);
    stopSpeech();
    setIsSpeaking(false);

    // Award +50 XP for deep-dive inspection
    if (onAwardPoints) {
      onAwardPoints(50, `timeline-${event.year}-${event.title.replace(/\s+/g, '-').toLowerCase()}`);
    }

    try {
      const payload = {
        title: event.title,
        era: event.year,
        location: event.location,
        summary: event.desc
      };
      const data = await fetchTimelineInsight(payload, 'en');
      setInsightText(data.insight);
    } catch (err) {
      console.warn('Falling back to archival record:', err);
      setInsightText(event.desc);
    } finally {
      setIsLoadingInsight(false);
    }
  };

  const handleToggleVoice = () => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const narration = insightText || activeModalEvent?.desc || '';
      speakText(narration, 'en', () => setIsSpeaking(false));
    }
  };

  const closeModal = () => {
    stopSpeech();
    setIsSpeaking(false);
    setActiveModalEvent(null);
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
                  onClick={() => handleInspectSources(event)}
                  className="text-xs font-semibold text-neutral-300 hover:text-amber-400 flex items-center gap-1.5 cursor-pointer transition-colors group/btn"
                >
                  <span>Inspect Sources</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 3. AI Historical Deep-Dive Modal */}
      {activeModalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#0e1118] border border-amber-500/40 rounded-3xl w-full max-w-xl p-6 sm:p-8 shadow-2xl relative">
            
            {/* Modal Top Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-amber-400 font-serif font-bold">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <span className="text-sm md:text-base">Imperial Codex Archives • {activeModalEvent.year}</span>
              </div>
              <button 
                onClick={closeModal} 
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="my-5 space-y-3">
              <h2 className="text-xl md:text-2xl font-bold font-serif text-white">
                {activeModalEvent.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-amber-400/90 font-mono">
                <MapPin className="w-3.5 h-3.5" />
                <span>{activeModalEvent.location}</span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">+50 XP Archived</span>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-900/90 border border-amber-500/20 text-xs md:text-sm leading-relaxed text-neutral-200 min-h-[110px] flex items-center">
                {isLoadingInsight ? (
                  <div className="flex items-center gap-2 text-xs text-amber-400 font-mono py-4">
                    <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                    <span>Unrolling historical palm-leaf manuscripts...</span>
                  </div>
                ) : (
                  <p className="font-serif italic text-neutral-200">
                    "{insightText}"
                  </p>
                )}
              </div>
            </div>

            {/* Modal Action Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                onClick={handleToggleVoice}
                disabled={isLoadingInsight}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-amber-500/30 text-amber-300 text-xs hover:bg-amber-500/10 cursor-pointer disabled:opacity-40 transition"
              >
                {isSpeaking ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
                <span>{isSpeaking ? 'Stop Narration' : 'Listen Narration'}</span>
              </button>

              {setActiveTab && (
                <button
                  onClick={() => {
                    closeModal();
                    setActiveTab('characters');
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-amber-950/50"
                >
                  <Sparkles className="w-3.5 h-3.5" /> 
                  <span>Consult Scholars</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}