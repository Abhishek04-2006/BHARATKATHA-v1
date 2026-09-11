// src/components/WarRoom.jsx
import React, { useState } from 'react';
import { WAR_ROOM_SCENARIOS } from '../data/warRoomData';
import { Swords, ShieldAlert, Award, ChevronRight, RotateCcw, Quote, CheckCircle2 } from 'lucide-react';

export default function WarRoom({ onAwardPoints }) {
  const [currentScenarioIdx, setCurrentScenarioIdx] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [evaluated, setEvaluated] = useState(false);

  const scenario = WAR_ROOM_SCENARIOS[currentScenarioIdx];

  const handleSelect = (choice) => {
    if (evaluated) return;
    setSelectedChoice(choice);
    setEvaluated(true);
    if (onAwardPoints) onAwardPoints(choice.score >= 80 ? 35 : 15);
  };

  const handleNext = () => {
    setSelectedChoice(null);
    setEvaluated(false);
    setCurrentScenarioIdx((prev) => (prev + 1) % WAR_ROOM_SCENARIOS.length);
  };

  const handleReset = () => {
    setSelectedChoice(null);
    setEvaluated(false);
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-16 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="text-xs font-bold tracking-widest text-amber-400 uppercase flex items-center justify-center gap-1.5">
          <Swords className="w-3.5 h-3.5" /> Tactical Dilemma Engine
        </span>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mt-2">
          Chanakya’s War Room
        </h2>
        <p className="text-neutral-400 text-sm mt-2 max-w-xl mx-auto">
          Step into the imperial council of Pataliputra. Face high-stakes crises and be judged by the realpolitik of the Arthashastra.
        </p>
      </div>

      {/* Main Tactical Chamber */}
      <div className="glass-panel p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl space-y-8 relative overflow-hidden">
        {/* Subtle background insignia */}
        <div className="absolute -right-12 -bottom-12 text-9xl text-amber-500/5 font-serif pointer-events-none select-none">
          कौ
        </div>

        {/* Scenario Header */}
        <div className="border-b border-white/10 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">
              Case {currentScenarioIdx + 1} of {WAR_ROOM_SCENARIOS.length} • {scenario.era}
            </span>
            <h3 className="text-2xl font-serif font-bold text-white mt-1">{scenario.title}</h3>
          </div>
          <span className="self-start sm:self-auto text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono">
            Up to +35 XP
          </span>
        </div>

        {/* Crisis Briefing */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-300 uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-amber-400" /> State Intelligence Briefing
          </div>
          <p className="text-sm md:text-base text-neutral-200 leading-relaxed bg-neutral-950/60 p-4 rounded-2xl border border-white/5">
            "{scenario.dilemma}"
          </p>
          <p className="text-xs text-neutral-400 italic">Strategic Constraint: {scenario.context}</p>
        </div>

        {/* Tactical Choices */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
            Choose Your Directive:
          </h4>
          <div className="grid grid-cols-1 gap-3">
            {scenario.choices.map((c) => {
              const isChosen = selectedChoice?.id === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => handleSelect(c)}
                  disabled={evaluated}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3.5 ${
                    isChosen
                      ? 'bg-amber-500/20 border-amber-500 gold-glow text-white'
                      : evaluated
                      ? 'opacity-50 border-white/5 bg-neutral-900/30 text-neutral-400'
                      : 'bg-neutral-900/50 border-white/5 hover:border-amber-500/30 hover:bg-neutral-900 text-neutral-300'
                  }`}
                >
                  <span className="w-7 h-7 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-amber-400 shrink-0 mt-0.5">
                    {c.id}
                  </span>
                  <span className="text-xs md:text-sm leading-relaxed">{c.action}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Evaluation Stage */}
        {evaluated && selectedChoice && (
          <div className="p-6 rounded-2xl bg-neutral-950/80 border border-amber-500/30 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏛️</span>
                <div>
                  <h5 className="text-xs font-bold text-white font-serif">Acharya Chanakya’s Verdict</h5>
                  <span className={`text-xs font-mono font-bold ${selectedChoice.score >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {selectedChoice.verdict} • Rating: {selectedChoice.score}/100
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono text-amber-300">
                +{selectedChoice.score >= 80 ? 35 : 15} XP Earned
              </span>
            </div>

            <p className="text-xs md:text-sm text-neutral-200 leading-relaxed pl-3 border-l-2 border-amber-500/60">
              {selectedChoice.chanakyaComment}
            </p>

            <div className="bg-amber-500/5 p-3.5 rounded-xl border border-amber-500/20 flex items-start gap-2.5 text-xs text-amber-300 italic">
              <Quote className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Arthashastra Maxim: "{selectedChoice.neetiQuote}"</span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl text-xs text-neutral-400 hover:text-white border border-white/10 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Re-evaluate Options
              </button>
              <button
                onClick={handleNext}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                Next Scenario <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}