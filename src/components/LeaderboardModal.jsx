import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Crown, Sparkles, X, Shield, Compass } from 'lucide-react';
import { fetchLeaderboard } from '../services/api';

export default function LeaderboardModal({ isOpen, onClose }) {
  const [explorers, setExplorers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetchLeaderboard()
        .then((data) => setExplorers(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getRankBadgeColor = (tier) => {
    switch (tier) {
      case 'Codex Master':
        return 'text-amber-300 border-amber-500/40 bg-amber-500/10';
      case 'Imperial Historian':
        return 'text-purple-300 border-purple-500/40 bg-purple-500/10';
      case 'Nalanda Scholar':
        return 'text-cyan-300 border-cyan-500/40 bg-cyan-500/10';
      default:
        return 'text-slate-400 border-slate-700 bg-slate-800/40';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0e1118] border border-amber-500/30 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative">
        
        {/* Header */}
        <div className="p-6 border-b border-amber-500/20 flex items-center justify-between bg-gradient-to-r from-amber-950/30 to-transparent">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-amber-200">
                BharatKatha Leaderboard
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                Honoring the master chroniclers and relic preservers
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Explorers List */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3">
          {loading ? (
            <div className="py-12 text-center text-xs font-mono text-slate-500">
              Retrieving scroll ranks from MongoDB Atlas...
            </div>
          ) : explorers.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              No registered chroniclers found.
            </div>
          ) : (
            explorers.map((exp, index) => {
              const isTopThree = index < 3;
              return (
                <div
                  key={exp._id}
                  className={`p-4 rounded-2xl border flex items-center justify-between transition ${
                    index === 0
                      ? 'bg-amber-950/20 border-amber-500/40 shadow-md shadow-amber-950/30'
                      : 'bg-[#141824]/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Position Indicator */}
                    <div className="w-7 text-center font-serif font-bold text-sm">
                      {index === 0 && <Crown className="w-5 h-5 text-amber-400 mx-auto" />}
                      {index === 1 && <Medal className="w-5 h-5 text-slate-300 mx-auto" />}
                      {index === 2 && <Medal className="w-5 h-5 text-amber-600 mx-auto" />}
                      {index > 2 && <span className="text-slate-500 font-mono">#{index + 1}</span>}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-slate-100 font-serif">
                          {exp.name}
                        </span>
                        <span
                          className={`text-[9px] font-mono px-2 py-0.5 rounded-md border ${getRankBadgeColor(
                            exp.rankTier
                          )}`}
                        >
                          {exp.rankTier}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                        🏺 {exp.relicsCount} Relics Unlocked
                      </p>
                    </div>
                  </div>

                  {/* XP */}
                  <div className="text-right">
                    <span className="text-sm font-bold font-mono text-amber-400">
                      ⚡ {exp.xp}
                    </span>
                    <span className="text-[10px] text-slate-500 block font-mono">XP</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Tier Guide Footer */}
        <div className="p-4 bg-[#090b10] border-t border-slate-800 text-[11px] flex flex-wrap justify-around text-slate-400 font-mono">
          <span>Tier Thresholds:</span>
          <span>Scholar: 250+ XP</span>
          <span>Historian: 500+ XP</span>
          <span>Master: 1000+ XP</span>
        </div>
      </div>
    </div>
  );
}