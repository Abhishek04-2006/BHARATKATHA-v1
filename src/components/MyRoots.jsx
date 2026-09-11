// src/components/MyRoots.jsx
import React, { useState } from 'react';
import { SEEDED_ROOTS } from '../data/rootsData';
import { BookMarked, MapPin, Mic, Plus, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function MyRoots({ onAwardPoints }) {
  const [stories, setStories] = useState(SEEDED_ROOTS);
  const [search, setSearch] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Form State
  const [hometown, setHometown] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Oral History');
  const [excerpt, setExcerpt] = useState('');

  const handleAddStory = (e) => {
    e.preventDefault();
    if (!title.trim() || !hometown.trim() || !excerpt.trim()) return;

    const newEntry = {
      id: Date.now(),
      hometown,
      title,
      contributor: 'You (Archivist)',
      category,
      era: 'Family Oral Record',
      excerpt,
      tags: ['Family Archive', 'Digital Relic'],
      verified: false
    };

    setStories([newEntry, ...stories]);
    setShowAddForm(false);
    setHometown('');
    setTitle('');
    setExcerpt('');
    if (onAwardPoints) onAwardPoints(30);
  };

  const filteredStories = stories.filter(
    (s) =>
      s.hometown.toLowerCase().includes(search.toLowerCase()) ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <section id="preserve" className="max-w-6xl mx-auto px-6 py-20 border-t border-neutral-900">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-xs font-bold tracking-widest text-amber-400 uppercase flex items-center gap-1.5">
            <BookMarked className="w-3.5 h-3.5" /> Pillar IV • Preserve
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mt-2">
            My Roots: The Oral History Codex
          </h2>
          <p className="text-neutral-400 text-sm mt-1 max-w-xl">
            Digitize vanishing local folk tales, grandfather lore, and indigenous crafts before they fade from memory.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search town, festival, or craft..."
            className="bg-neutral-900/80 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 w-64"
          />
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> Preserve Story (+30 XP)
          </button>
        </div>
      </div>

      {/* Preservation Modal / Inline Form */}
      {showAddForm && (
        <form
          onSubmit={handleAddStory}
          className="mb-12 glass-panel p-6 md:p-8 rounded-3xl border border-amber-500/30 animate-fade-in space-y-4"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> Archive An Oral Memory
            </h3>
            <span className="text-[11px] text-amber-300 font-mono">+30 Points to your Codex Rank</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                Hometown / Region
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Almora, Uttarakhand"
                value={hometown}
                onChange={(e) => setHometown(e.target.value)}
                className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                Title of Tradition or Tale
              </label>
              <input
                type="text"
                required
                placeholder="e.g. The Sacred Oak Ritual of Binsar"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option>Oral History</option>
                <option>Folk Song & Music</option>
                <option>Indigenous Medicine / Food</option>
                <option>Artisan Craft Guild</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
              Oral Narrative or Grandparent's Account
            </label>
            <textarea
              rows={3}
              required
              placeholder="Recount the story as told by your family elders or village chronicles..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full bg-neutral-900 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-xs text-neutral-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs rounded-xl transition-all cursor-pointer"
            >
              Commit to Living Archive
            </button>
          </div>
        </form>
      )}

      {/* Story Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredStories.map((story) => (
          <div
            key={story.id}
            className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] mb-3">
                <span className="flex items-center gap-1 text-amber-400 font-medium">
                  <MapPin className="w-3.5 h-3.5" /> {story.hometown}
                </span>
                {story.verified ? (
                  <span className="flex items-center gap-1 text-emerald-400/90 text-[10px]">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Heritage
                  </span>
                ) : (
                  <span className="text-[10px] text-amber-300/80 font-mono">Community Submission</span>
                )}
              </div>

              <h4 className="text-lg font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                {story.title}
              </h4>
              <p className="text-[11px] text-neutral-500 mt-0.5">By {story.contributor} • {story.era}</p>

              <p className="text-xs text-neutral-300 leading-relaxed mt-4 italic bg-neutral-900/40 p-3.5 rounded-xl border border-white/5">
                "{story.excerpt}"
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
              {story.tags.map((t, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2.5 py-0.5 rounded-md bg-white/5 text-neutral-400 font-mono"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}