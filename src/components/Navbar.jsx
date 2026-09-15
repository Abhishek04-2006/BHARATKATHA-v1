import React, { useState, useEffect } from 'react';
import { Sparkles, User, LogOut, Trophy } from 'lucide-react';
import AuthModal from './AuthModal';
import LeaderboardModal from './LeaderboardModal';

export default function Navbar({ activeTab, setActiveTab }) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

  // Load saved session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('bharatkatha_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse user session', e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('bharatkatha_token');
    localStorage.removeItem('bharatkatha_user');
    setCurrentUser(null);
  };

  // Exactly matching App.jsx keys!
  const navItems = [
    { id: '3d-nalanda', label: '3D Nalanda' },
    { id: 'explore', label: 'Timeline' },
    { id: 'relics', label: 'Relics' },
    { id: 'characters', label: 'Characters' },
    { id: 'create', label: 'AI Katha' },
    { id: 'roots', label: 'Oral Roots' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0b0c10]/90 backdrop-blur-md border-b border-amber-500/20 px-4 md:px-8 py-3.5 flex items-center justify-between transition-all">
        {/* Brand Logo -> Goes to Home */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 font-serif font-bold text-lg shadow-sm shadow-amber-500/20 group-hover:scale-105 transition">
            भ
          </div>
          <div>
            <span className="text-base font-serif font-bold tracking-wide text-amber-200 group-hover:text-amber-300 transition">
              BharatKatha
            </span>
            <span className="hidden sm:inline-block text-[10px] text-amber-500/70 font-mono ml-2 uppercase tracking-widest border-l border-amber-500/30 pl-2">
              Metaverse
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-[#12151c]/70 p-1 rounded-xl border border-slate-800/80">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                activeTab === item.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm shadow-amber-950'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Action Controls: Leaderboard & Auth */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Grand Codex Leaderboard Trigger */}
          <button
            onClick={() => setIsLeaderboardOpen(true)}
            title="BharatKatha Leaderboard"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141824]/90 border border-amber-500/30 hover:border-amber-400 text-amber-400 hover:text-amber-300 transition-all cursor-pointer shadow-sm hover:scale-105"
          >
            <Trophy className="w-4 h-4" />
            <span className="text-xs font-mono hidden sm:inline">Ranks</span>
          </button>

          {/* Profile / Login */}
          {currentUser ? (
            <div className="flex items-center gap-3 bg-[#131722]/80 border border-amber-500/30 px-3 py-1.5 rounded-xl shadow-inner">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                  <User className="w-3.5 h-3.5" />
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-semibold text-amber-200 leading-tight">
                    {currentUser.name}
                  </p>
                  <p className="text-[10px] text-amber-400/80 font-mono leading-tight">
                    ⚡ {currentUser.xp || 0} XP
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                title="Logout"
                className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition cursor-pointer ml-1"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthOpen(true)}
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black shadow-md shadow-amber-950/40 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explorer Login</span>
            </button>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(userData) => setCurrentUser(userData)}
      />

      {/* Codex Leaderboard Modal */}
      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
      />
    </>
  );
}