// src/components/CharacterStudio.jsx
import React, { useState, useEffect } from 'react';
import { CHARACTERS } from '../data/characters';
import { Send, Sparkles, MessageSquare, Volume2, VolumeX, Mic } from 'lucide-react';
import { speakText, stopSpeech } from '../lib/speechEngine';

export default function CharacterStudio({ onAwardPoints }) {
  const [selectedChar, setSelectedChar] = useState(CHARACTERS[0]);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: CHARACTERS[0].greeting }
  ]);
  const [input, setInput] = useState('');
  const [autoVoice, setAutoVoice] = useState(true);
  const [speakingIndex, setSpeakingIndex] = useState(null);

  // Stop audio on tab switch / unmount
  useEffect(() => {
    return () => stopSpeech();
  }, []);

  const handleSelectChar = (char) => {
    stopSpeech();
    setSpeakingIndex(null);
    setSelectedChar(char);
    setMessages([{ sender: 'bot', text: char.greeting }]);

    if (autoVoice) {
      setSpeakingIndex(0);
      speakText(char.greeting, char.id, () => setSpeakingIndex(null));
    }
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    stopSpeech();
    setSpeakingIndex(null);

    const updatedMsgs = [...messages, { sender: 'user', text: query }];
    setMessages(updatedMsgs);
    setInput('');

    setTimeout(() => {
      const predefinedAnswer = selectedChar.responses[query];
      const botResponse =
        predefinedAnswer ||
        `In our era of ${selectedChar.era}, wisdom dictates that one must observe nature, virtue, and mathematics to comprehend "${query}".`;

      const nextMsgs = [...updatedMsgs, { sender: 'bot', text: botResponse }];
      setMessages(nextMsgs);
      const newBotIdx = nextMsgs.length - 1;

      if (autoVoice) {
        setSpeakingIndex(newBotIdx);
        speakText(botResponse, selectedChar.id, () => setSpeakingIndex(null));
      }

      if (onAwardPoints) onAwardPoints(15);
    }, 500);
  };

  const toggleMessageAudio = (text, idx) => {
    if (speakingIndex === idx) {
      stopSpeech();
      setSpeakingIndex(null);
    } else {
      setSpeakingIndex(idx);
      speakText(text, selectedChar.id, () => setSpeakingIndex(null));
    }
  };

  return (
    <section id="characters" className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <span className="text-xs font-bold tracking-widest text-amber-400 uppercase flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Historical Intelligence & Speech
        </span>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mt-2">
          Converse With The Architects of Thought
        </h2>
        <p className="text-neutral-400 text-sm mt-2">
          Listen to historically reconstructed perspectives voiced in first-person dialectics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Characters List */}
        <div className="space-y-4">
          {CHARACTERS.map((char) => {
            const isSelected = selectedChar.id === char.id;
            return (
              <div
                key={char.id}
                onClick={() => handleSelectChar(char)}
                className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'glass-panel border-amber-500/50 gold-glow bg-amber-500/10'
                    : 'glass-panel border-white/5 hover:border-amber-500/20 opacity-80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    {char.avatar}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-serif">{char.name}</h3>
                    <p className="text-xs text-amber-400/90">{char.role}</p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">{char.era}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Chat Interface with Voice HUD */}
        <div className="lg:col-span-2 glass-panel rounded-2xl border border-white/10 flex flex-col h-[540px] shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-white/5 bg-neutral-900/40 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">{selectedChar.avatar}</span>
              <div>
                <h4 className="text-sm font-bold text-white font-serif">{selectedChar.name}</h4>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                  ● Persona Resonance Active
                </span>
              </div>
            </div>

            {/* Voice Toggle Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  stopSpeech();
                  setSpeakingIndex(null);
                  setAutoVoice(!autoVoice);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs border transition-all cursor-pointer ${
                  autoVoice
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                    : 'bg-neutral-800 border-white/5 text-neutral-400'
                }`}
              >
                {autoVoice ? <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span className="text-[11px] font-mono">{autoVoice ? 'Voice: Live' : 'Voice: Muted'}</span>
              </button>

              <span className="hidden sm:inline text-[10px] bg-amber-500/10 border border-amber-500/30 text-amber-300 px-2.5 py-1.5 rounded-full font-mono">
                +15 XP
              </span>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 text-sm">
            {messages.map((m, idx) => {
              const isBot = m.sender === 'bot';
              const isCurrentlySpeaking = speakingIndex === idx;

              return (
                <div key={idx} className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs md:text-sm leading-relaxed relative group ${
                      isBot
                        ? 'bg-neutral-800/90 border border-neutral-700/60 text-neutral-200 rounded-tl-none'
                        : 'bg-amber-500 text-black font-medium rounded-tr-none'
                    }`}
                  >
                    <div>{m.text}</div>

                    {/* Audio Speaker Button for Bot Messages */}
                    {isBot && (
                      <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between">
                        <button
                          onClick={() => toggleMessageAudio(m.text, idx)}
                          className="flex items-center gap-1.5 text-[11px] text-amber-400/90 hover:text-amber-300 transition-colors cursor-pointer"
                        >
                          {isCurrentlySpeaking ? (
                            <>
                              <VolumeX className="w-3.5 h-3.5 text-red-400" />
                              <span className="text-red-300 font-mono">Stop Speaking</span>
                              <span className="flex items-end gap-0.5 h-2.5 ml-1">
                                <span className="w-0.5 bg-amber-400 h-2 animate-bounce" style={{ animationDelay: '0.1s' }} />
                                <span className="w-0.5 bg-amber-400 h-3 animate-bounce" style={{ animationDelay: '0.2s' }} />
                                <span className="w-0.5 bg-amber-400 h-1.5 animate-bounce" style={{ animationDelay: '0.3s' }} />
                              </span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                              <span>Listen to Voice</span>
                            </>
                          )}
                        </button>
                        <span className="text-[10px] text-neutral-500 font-mono">Voice Reconstructed</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-4 py-2 bg-neutral-900/50 border-t border-white/5 flex gap-2 overflow-x-auto text-xs scrollbar-none">
            {selectedChar.prompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(p)}
                className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-neutral-800 border border-white/10 hover:border-amber-400 text-neutral-300 text-[11px] transition-all cursor-pointer flex items-center gap-1.5"
              >
                <MessageSquare className="w-3 h-3 text-amber-400" /> {p}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-neutral-950/60 border-t border-white/5 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={`Ask ${selectedChar.name.split(' ')[0]} a question...`}
              className="flex-1 bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
            />
            <button
              onClick={() => handleSendMessage()}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-xl text-xs flex items-center justify-center transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}