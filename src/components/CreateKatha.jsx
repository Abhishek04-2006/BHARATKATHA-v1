// src/components/CreateKatha.jsx
import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Feather, 
  Play, 
  UploadCloud, 
  Heart, 
  CheckCircle2, 
  Loader2, 
  Clock, 
  User, 
  Share2 
} from 'lucide-react';
import { KATHA_THEMES, KATHA_SETTINGS, STORY_STYLES, generateMockKatha } from '../data/kathaPresets';
import { fetchChronicles, saveChronicle, toggleChronicleLike } from '../services/api';

export default function CreateKatha({ onAwardPoints, onLaunchLiveKatha }) {
  const [theme, setTheme] = useState(KATHA_THEMES[0].id);
  const [setting, setSetting] = useState(KATHA_SETTINGS[0].id);
  const [style, setStyle] = useState(STORY_STYLES[0]);
  const [customNotes, setCustomNotes] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedKatha, setGeneratedKatha] = useState(null);

  // Persistence & Feed States
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedSuccess, setPublishedSuccess] = useState(false);
  const [feedChronicles, setFeedChronicles] = useState([]);
  const [loadingFeed, setLoadingFeed] = useState(true);
  const [publishError, setPublishError] = useState('');

  const currentUser = localStorage.getItem('bharatkatha_user')
    ? JSON.parse(localStorage.getItem('bharatkatha_user'))
    : null;

  // Load Community Feed on Mount
  const loadCommunityFeed = async () => {
    try {
      setLoadingFeed(true);
      const data = await fetchChronicles();
      setFeedChronicles(data);
    } catch (err) {
      console.error('Failed to load showcase chronicles:', err);
    } finally {
      setLoadingFeed(false);
    }
  };

  useEffect(() => {
    loadCommunityFeed();
  }, []);

  const handleGenerate = () => {
    setIsGenerating(true);
    setPublishedSuccess(false);
    setPublishError('');
    
    setTimeout(() => {
      const katha = generateMockKatha({ theme, setting, style, customNotes });
      setGeneratedKatha(katha);
      setIsGenerating(false);
      if (onAwardPoints) onAwardPoints(40);
    }, 1000);
  };

  // Publish Generated Katha to MongoDB Atlas
  const handlePublish = async () => {
    if (!currentUser) {
      alert('Please log in via the Explorer Portal to immortalize your katha.');
      return;
    }

    try {
      setIsPublishing(true);
      setPublishError('');

      // Format chapters for schema: [{ chapterTitle, content }]
      const formattedChapters = generatedKatha.chapters.map((chap, idx) => ({
        chapterTitle: `Chapter ${idx + 1}`,
        content: chap
      }));

      const payload = {
        title: generatedKatha.title,
        era: generatedKatha.settingLabel || setting,
        character: generatedKatha.themeTitle || theme,
        conflict: customNotes || 'Historical Odyssey',
        summary: generatedKatha.chapters[0]?.substring(0, 140) + '...',
        chapters: formattedChapters
      };

      await saveChronicle(payload);
      setPublishedSuccess(true);

      // Award +200 XP for publishing
      if (onAwardPoints) onAwardPoints(200);
      const updatedUser = { ...currentUser, xp: (currentUser.xp || 0) + 200 };
      localStorage.setItem('bharatkatha_user', JSON.stringify(updatedUser));

      // Refresh community feed to show new story on top
      await loadCommunityFeed();
    } catch (err) {
      console.error(err);
      setPublishError(err.message || 'Failed to publish manuscript.');
    } finally {
      setIsPublishing(false);
    }
  };

  // Upvote / Like chronicle in the feed
  const handleLike = async (chronicleId) => {
    if (!currentUser) {
      alert('Log in to like public chronicles.');
      return;
    }
    try {
      await toggleChronicleLike(chronicleId);
      loadCommunityFeed();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section id="create" className="max-w-6xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-xs font-bold tracking-widest text-amber-400 uppercase flex items-center justify-center gap-1.5 font-mono">
          <Feather className="w-3.5 h-3.5" /> AI Story Studio & Codex
        </span>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mt-2">
          Create & Immortalize Your Katha
        </h2>
        <p className="text-neutral-400 text-sm mt-2 max-w-xl mx-auto">
          Weave historical chronicles with generative storytelling, publish them into the permanent community showcase, and experience them in 3D.
        </p>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Config Studio (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0f1219]/70 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/10 space-y-6 shadow-xl">
          {/* 1. Theme Choice */}
          <div>
            <label className="text-xs font-semibold text-amber-300 uppercase tracking-wider block mb-3 font-mono">
              1. Choose Narrative Arc
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {KATHA_THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                    theme === t.id
                      ? 'border-amber-400 bg-amber-500/10 text-white shadow-sm shadow-amber-500/20'
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
            <label className="text-xs font-semibold text-amber-300 uppercase tracking-wider block mb-3 font-mono">
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
            <label className="text-xs font-semibold text-amber-300 uppercase tracking-wider block mb-3 font-mono">
              3. Literary Style & Details
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {STORY_STYLES.map((st) => (
                <button
                  key={st}
                  onClick={() => setStyle(st)}
                  className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition ${
                    style === st
                      ? 'border-amber-400 bg-amber-500/15 text-amber-300'
                      : 'border-white/5 text-neutral-400 hover:text-neutral-200'
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
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all transform active:scale-95 disabled:opacity-50 shadow-lg shadow-amber-950/40"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Weaving Historical Manuscript...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Synthesize Katha (+40 XP)
              </>
            )}
          </button>
        </div>

        {/* Right Output Terminal (5 Cols) */}
        <div className="lg:col-span-5 bg-[#0f1219]/70 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/10 flex flex-col justify-between min-h-[440px] shadow-xl">
          {generatedKatha ? (
            <div className="space-y-5 animate-fade-in flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-[10px] text-amber-400 uppercase tracking-widest font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Manuscript Synthesized
                  </span>
                  <span className="text-[10px] text-neutral-400">{generatedKatha.style}</span>
                </div>

                <h3 className="text-xl font-serif font-bold text-white mt-3">
                  {generatedKatha.title}
                </h3>
                <p className="text-xs text-amber-300/80 mt-0.5">{generatedKatha.settingLabel}</p>

                <div className="mt-5 space-y-3 max-h-60 overflow-y-auto pr-1">
                  {generatedKatha.chapters.map((chap, i) => (
                    <div key={i} className="text-xs text-neutral-300 leading-relaxed pl-3 border-l-2 border-amber-500/40">
                      <span className="text-[10px] font-mono text-amber-400 mr-1.5 font-bold">§{i + 1}</span>
                      {chap}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons: 3D + Community Publish */}
              <div className="pt-5 border-t border-white/10 mt-4 space-y-2">
                {publishError && (
                  <p className="text-xs text-red-400 text-center">{publishError}</p>
                )}

                {publishedSuccess ? (
                  <div className="py-2.5 px-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-center text-xs text-emerald-300 flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Inscribed into Permanent Codex (+200 XP)</span>
                  </div>
                ) : (
                  <button
                    onClick={handlePublish}
                    disabled={isPublishing}
                    className="w-full py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-200 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition disabled:opacity-50"
                  >
                    {isPublishing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Inscribing to Archives...
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-4 h-4" /> Publish to Community Codex (+200 XP)
                      </>
                    )}
                  </button>
                )}

                <button
                  onClick={() => onLaunchLiveKatha && onLaunchLiveKatha(generatedKatha)}
                  className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition border border-white/5"
                >
                  <Play className="w-4 h-4 text-amber-400" /> Live This Katha in 3D
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500 p-8 space-y-3">
              <BookOpen className="w-12 h-12 text-neutral-700 stroke-1" />
              <p className="text-xs leading-relaxed">
                Configure your historical parameters and click <span className="text-amber-400">"Synthesize Katha"</span> to weave the chronicle.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* --- Public Community Showcase Feed --- */}
      <div className="mt-20 pt-12 border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Public Codex Gallery
            </span>
            <h3 className="text-2xl font-serif font-bold text-white mt-1">
              Immortalized Community Chronicles
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Read and applaud historical epics synthesized and preserved by fellow explorers.
            </p>
          </div>
          <div className="text-xs font-mono text-neutral-400 bg-neutral-900/60 border border-white/5 px-3 py-1.5 rounded-lg w-fit">
            Total Inscriptions: {feedChronicles.length}
          </div>
        </div>

        {loadingFeed ? (
          <div className="py-16 text-center text-xs font-mono text-neutral-500 flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
            Loading Community Chronicles from Atlas...
          </div>
        ) : feedChronicles.length === 0 ? (
          <div className="py-16 text-center border border-dashed border-white/10 rounded-3xl p-8">
            <BookOpen className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
            <p className="text-sm text-neutral-400">No chronicles published yet.</p>
            <p className="text-xs text-neutral-500 mt-1">Synthesize your katha above and be the first to inscribe!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedChronicles.map((c) => (
              <div 
                key={c._id}
                className="bg-[#0f1219]/80 border border-white/10 hover:border-amber-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all group shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300">
                      {c.era}
                    </span>
                    <button
                      onClick={() => handleLike(c._id)}
                      className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-rose-400 transition cursor-pointer"
                    >
                      <Heart className={`w-4 h-4 ${c.likes?.includes(currentUser?._id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                      <span>{c.likes?.length || 0}</span>
                    </button>
                  </div>

                  <h4 className="text-base font-serif font-bold text-white group-hover:text-amber-200 transition line-clamp-1">
                    {c.title}
                  </h4>
                  <p className="text-[11px] text-amber-400/80 font-mono mt-0.5">
                    Arc: {c.character}
                  </p>

                  <div className="mt-3 text-xs text-neutral-300/80 line-clamp-4 leading-relaxed font-serif bg-black/20 p-3 rounded-xl border border-white/5">
                    "{c.chapters?.[0]?.content || c.summary}"
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-400">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3 text-amber-400" />
                    <span className="truncate max-w-[110px]">{c.authorName}</span>
                  </span>
                  <span className="font-mono text-[10px] text-neutral-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(c.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}