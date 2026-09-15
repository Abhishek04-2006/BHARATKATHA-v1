import React, { useState, useEffect } from 'react';
import { BookOpen, ThumbsUp, Send, MapPin, Feather, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { fetchOralRoots, submitOralRoot, toggleUpvote } from '../services/api';

export default function MyRoots({ onAwardPoints }) {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    region: '',
    eraTag: 'Folk Tradition',
    story: ''
  });

  const currentUser = localStorage.getItem('bharatkatha_user')
    ? JSON.parse(localStorage.getItem('bharatkatha_user'))
    : null;

  const loadStories = async () => {
    try {
      setLoading(true);
      const data = await fetchOralRoots();
      setStories(data);
    } catch (err) {
      console.error(err);
      setError('Could not connect to archive codex.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('Please login via Explorer Portal to record folk lore.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      await submitOralRoot(formData);
      
      // Reset form
      setFormData({ title: '', region: '', eraTag: 'Folk Tradition', story: '' });
      
      // Award XP in UI & local state
      if (onAwardPoints) onAwardPoints(150);
      const updatedUser = { ...currentUser, xp: (currentUser.xp || 0) + 150 };
      localStorage.setItem('bharatkatha_user', JSON.stringify(updatedUser));

      await loadStories();
    } catch (err) {
      setError(err.message || 'Submission failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpvote = async (id) => {
    if (!currentUser) {
      alert('Login to upvote community chronicles.');
      return;
    }
    try {
      await toggleUpvote(id);
      loadStories();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Heading */}
      <div className="text-center mb-10">
        <span className="text-xs font-mono tracking-widest text-amber-500 uppercase">
          Living Oral Codex
        </span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-amber-200 mt-1">
          Oral Roots Archives
        </h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2">
          Preserve untold regional legends and ancestral traditions directly into the permanent historical ledger.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Story Form */}
        <div className="lg:col-span-1 bg-[#0e1117] border border-amber-500/20 rounded-2xl p-6 h-fit shadow-xl">
          <div className="flex items-center gap-2 mb-4 text-amber-300 font-serif font-semibold">
            <Feather className="w-5 h-5 text-amber-400" />
            <span>Inscribe Tradition</span>
          </div>

          {!currentUser && (
            <div className="mb-4 p-3 bg-amber-950/30 border border-amber-500/30 rounded-xl flex items-center gap-2 text-xs text-amber-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Login to record lore & unlock +150 XP.</span>
            </div>
          )}

          {error && (
            <div className="mb-4 p-2.5 bg-red-950/40 border border-red-500/30 rounded-lg text-red-300 text-xs text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                Story / Lore Title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., The Lost Baoli of Bundelkhand"
                className="w-full bg-[#161a23] border border-slate-700/60 rounded-xl px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Region
                </label>
                <input
                  type="text"
                  required
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  placeholder="e.g., Bundelkhand, MP"
                  className="w-full bg-[#161a23] border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Era
                </label>
                <select
                  value={formData.eraTag}
                  onChange={(e) => setFormData({ ...formData, eraTag: e.target.value })}
                  className="w-full bg-[#161a23] border border-slate-700/60 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="Ancient">Ancient</option>
                  <option value="Medieval">Medieval</option>
                  <option value="Colonial">Colonial</option>
                  <option value="Freedom">Freedom Movement</option>
                  <option value="Folk Tradition">Folk Tradition</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                Oral Narration
              </label>
              <textarea
                rows={5}
                required
                value={formData.story}
                onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                placeholder="Tell the legend as passed down by ancestors..."
                className="w-full bg-[#161a23] border border-slate-700/60 rounded-xl px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 transition cursor-pointer disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Archiving to MongoDB...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Archive to Codex (+150 XP)</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Stories List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-mono uppercase text-slate-400 tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              Preserved Chronicles ({stories.length})
            </h2>
          </div>

          {loading ? (
            <div className="p-8 text-center text-slate-500 font-mono text-xs flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
              Retrieving live scrolls from Atlas...
            </div>
          ) : stories.length === 0 ? (
            <div className="p-12 text-center border border-dashed border-slate-800 rounded-2xl">
              <Sparkles className="w-8 h-8 text-amber-500/40 mx-auto mb-2" />
              <p className="text-slate-400 text-sm">Codex is empty.</p>
              <p className="text-xs text-slate-500 mt-1">Submit the first community lore using the form.</p>
            </div>
          ) : (
            stories.map((item) => (
              <div
                key={item._id}
                className="bg-[#0e1117] border border-slate-800 hover:border-amber-500/30 rounded-2xl p-5 transition shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400/80 bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded-md">
                      {item.eraTag}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-amber-200 mt-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3 h-3 text-amber-500/70" />
                      <span>{item.region}</span>
                      <span className="text-slate-600">•</span>
                      <span>By {item.contributorName}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => handleUpvote(item._id)}
                    className="flex items-center gap-1.5 bg-[#161a23] hover:bg-amber-500/10 border border-slate-700/60 hover:border-amber-500/40 px-3 py-1.5 rounded-xl text-xs text-slate-300 hover:text-amber-300 transition cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{item.upvotes?.length || 0}</span>
                  </button>
                </div>

                <p className="text-sm text-slate-300/90 font-serif leading-relaxed mt-4 bg-[#141822]/60 p-4 rounded-xl border border-slate-800/60">
                  "{item.story}"
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}