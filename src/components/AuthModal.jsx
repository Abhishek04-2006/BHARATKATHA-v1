import React, { useState } from 'react';
import { X, Lock, Mail, User, Sparkles } from 'lucide-react';
import { login, register } from '../services/api';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let data;
      if (isLogin) {
        data = await login(formData.email, formData.password);
      } else {
        data = await register(formData.name, formData.email, formData.password);
      }

      // Save credentials locally
      localStorage.setItem('bharatkatha_token', data.token);
      localStorage.setItem('bharatkatha_user', JSON.stringify(data));

      if (onAuthSuccess) onAuthSuccess(data);
      onClose();
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-[#0d0f14] border border-amber-500/30 rounded-2xl p-6 md:p-8 shadow-2xl shadow-amber-950/40 text-slate-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800/60 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-amber-300">
            {isLogin ? 'Explorer Portal' : 'Join BharatKatha'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isLogin
              ? 'Enter your credentials to access preserved archives'
              : 'Become a verified preserver of regional historical lore'}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-950/50 border border-red-500/40 text-red-300 text-xs text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs uppercase tracking-wider text-amber-200/70 mb-1">
                Explorer Name
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Arya Sen"
                  className="w-full bg-[#161922] border border-slate-700/60 focus:border-amber-500/60 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs uppercase tracking-wider text-amber-200/70 mb-1">
              Scroll ID / Email
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="explorer@bharatkatha.in"
                className="w-full bg-[#161922] border border-slate-700/60 focus:border-amber-500/60 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-amber-200/70 mb-1">
              Cipher / Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-[#161922] border border-slate-700/60 focus:border-amber-500/60 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-semibold rounded-xl text-sm transition-all duration-200 shadow-lg shadow-amber-900/30 disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Authenticating with Archives...' : isLogin ? 'Access Portal' : 'Establish Codex Profile'}
          </button>
        </form>

        {/* Toggle Login/Register */}
        <div className="mt-5 text-center text-xs text-slate-400">
          {isLogin ? "Haven't inscribed your name yet?" : 'Already hold a chronicler scroll?'}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="ml-1 text-amber-400 hover:underline font-medium cursor-pointer"
          >
            {isLogin ? 'Register now' : 'Log in here'}
          </button>
        </div>
      </div>
    </div>
  );
}