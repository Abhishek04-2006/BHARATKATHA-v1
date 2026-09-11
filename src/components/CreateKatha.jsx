// src/components/CreateKatha.jsx
import React, { useState } from 'react';
import { Sparkles, BookOpen, Compass, Feather, Play, CheckCircle2 } from 'lucide-react';
import { KATHA_THEMES, KATHA_SETTINGS, STORY_STYLES, generateMockKatha } from '../data/kathaPresets';

export default function CreateKatha({ onAwardPoints, onLaunchLiveKatha }) {
  const [theme, setTheme] = useState(KATHA_THEMES[0].id);
  const [setting, setSetting] = useState(KATHA_SETTINGS[0].id);
  const [style, setStyle] = useState(STORY_STYLES[0]);
  const [customNotes, setCustomNotes] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedKatha, setGeneratedKatha] = useState(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const katha = generateMockKatha({ theme, setting, style, customNotes });
      setGeneratedKatha(katha);
      setIsGenerating(false);
      if (onAwardPoints) onAwardPoints(40);
    }, 1000);
  };

  return (
    <section id="create" className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <span className="text-xs font-bold tracking-widest text-amber-400 uppercase flex items-center justify-center gap-1.5">
          <Feather className="w-3.5 h-3.5" /> AI Story Studio
        </span>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mt-2">
          Create & Immortalize Your Katha
        </h2>
        <p className="text-neutral-400 text-sm mt-2 max-w-xl mx-auto">
          Combine historical eras, verified geographical settings, and narrative genres into walkable immersive chronicles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Config Studio (7 Cols) */}
        <div className="lg:col-span-7 glass-panel p-6 md:p-8 rounded-3xl border border-white/10 space-y-6">
          {/* 1. Theme Choice */}
          <div>
            <label className="text-xs font-semibold text-amber-300 uppercase tracking-wider block mb-3">
              1. Choose Narrative Arc
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {KATHA_THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                    theme === t.id
                      ? 'border-amber-400 bg-amber-500/10 text-white'
                      : 'border-white/5 bg-neutral-900/40 text-neutral-400 hover:border-amber-400/30'
                  }`}
                >
                  <span className="text-xl">{t.icon}</span>
                  <span className="text-xs font-medium">{t.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Setting Selection */}
          <div>
            <label className="text-xs font-semibold text-amber-300 uppercase tracking-wider block mb-3">
              2. Setting & Era
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {KATHA_SETTINGS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSetting(s.id)}
                  className={`px-4 py-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                    setting === s.id
                      ? 'border-amber-400 bg-amber-500/10 text-white font-medium'
                      : 'border-white/5 bg-neutral-900/40 text-neutral-400 hover:border-amber-400/30'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Style Selection & Modifier */}
          <div>
            <label className="text-xs font-semibold text-amber-300 uppercase tracking-wider block mb-3">
              3. Literary Style & Details
            </label>
            <div className="flex gap-2 mb-3">
              {STORY_STYLES.map((st) => (
                <button
                  key={st}
                  onClick={() => setStyle(st)}
                  className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer ${
                    style === st
                      ? 'border-amber-400 bg-amber-500/15 text-amber-300'
                      : 'border-white/5 text-neutral-400'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="e.g. Include the scent of cedar incense and night rain over stone..."
              className="w-full bg-neutral-900/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all transform active:scale-95 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" /> Weaving Historical Manuscript...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Synthesize Katha (+40 XP)
              </>
            )}
          </button>
        </div>

        {/* Right Output Terminal (5 Cols) */}
        <div className="lg:col-span-5 glass-panel p-6 md:p-8 rounded-3xl border border-white/10 flex flex-col justify-between min-h-[440px]">
          {generatedKatha ? (
            <div className="space-y-5 animate-fade-in flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-[10px] text-amber-400 uppercase tracking-widest font-mono">
                    Manuscript Generated
                  </span>
                  <span className="text-[10px] text-neutral-400">{generatedKatha.style}</span>
                </div>

                <h3 className="text-xl font-serif font-bold text-white mt-3">
                  {generatedKatha.title}
                </h3>
                <p className="text-xs text-amber-300/80 mt-0.5">{generatedKatha.settingLabel}</p>

                <div className="mt-5 space-y-3">
                  {generatedKatha.chapters.map((chap, i) => (
                    <div key={i} className="text-xs text-neutral-300 leading-relaxed pl-3 border-l border-amber-500/30">
                      <span className="text-[10px] font-mono text-amber-400 mr-1.5">§{i + 1}</span>
                      {chap}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 border-t border-white/5 mt-4">
                <button
                  onClick={() => onLaunchLiveKatha && onLaunchLiveKatha(generatedKatha)}
                  className="w-full py-3 rounded-xl bg-amber-500/10 border border-amber-500/40 hover:bg-amber-500/20 text-amber-300 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Play className="w-4 h-4" /> Live This Katha in 3D
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500 p-8 space-y-3">
              <BookOpen className="w-12 h-12 text-neutral-700 stroke-1" />
              <p className="text-xs">Configure your narrative parameters and click "Synthesize Katha" to generate the historical chronicle.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}