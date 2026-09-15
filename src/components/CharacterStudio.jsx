// src/components/CharacterStudio.jsx
import React, { useState, useEffect, useRef } from 'react';
import { CHARACTERS } from '../data/characters';
import { Send, Sparkles, MessageSquare, Volume2, VolumeX, Loader2, Languages, Mic, MicOff } from 'lucide-react';
import { speakText, stopSpeech, createSpeechRecognizer } from '../utils/speechVoice';
import { sendCharacterMessage } from '../services/api';

export default function CharacterStudio({ onAwardPoints }) {
  const [selectedChar, setSelectedChar] = useState(CHARACTERS[0]);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: CHARACTERS[0].greeting }
  ]);
  const [input, setInput] = useState('');
  const [autoVoice, setAutoVoice] = useState(true);
  const [speakingIndex, setSpeakingIndex] = useState(null);
  const [currentLang, setCurrentLang] = useState('en'); // 'en' | 'hi'
  const [isThinking, setIsThinking] = useState(false);
  
  // Voice Input States
  const [isListening, setIsListening] = useState(false);
  const recognizerRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll chat to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  // Clean up audio and mic on unmount
  useEffect(() => {
    return () => {
      stopSpeech();
      if (recognizerRef.current) {
        recognizerRef.current.abort();
      }
    };
  }, []);

  const handleSelectChar = (char) => {
    stopSpeech();
    if (isListening && recognizerRef.current) recognizerRef.current.abort();
    setSpeakingIndex(null);
    setSelectedChar(char);
    
    const initialGreeting = currentLang === 'hi' 
      ? `प्रणाम! मैं ${char.name} हूँ। आप मुझसे क्या विचार-विमर्श करना चाहते हैं?`
      : char.greeting;

    setMessages([{ sender: 'bot', text: initialGreeting }]);

    if (autoVoice) {
      setSpeakingIndex(0);
      speakText(initialGreeting, currentLang, () => setSpeakingIndex(null));
    }
  };

  const handleLanguageToggle = () => {
    stopSpeech();
    if (isListening && recognizerRef.current) recognizerRef.current.abort();
    setSpeakingIndex(null);
    const nextLang = currentLang === 'en' ? 'hi' : 'en';
    setCurrentLang(nextLang);
  };

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || input || '').trim();
    if (!query || isThinking) return;

    stopSpeech();
    setSpeakingIndex(null);

    const updatedMsgs = [...messages, { sender: 'user', text: query }];
    setMessages(updatedMsgs);
    setInput('');
    setIsThinking(true);

    try {
      const response = await sendCharacterMessage(selectedChar.id, query, currentLang);
      const botResponse = response.reply;

      const nextMsgs = [...updatedMsgs, { sender: 'bot', text: botResponse }];
      setMessages(nextMsgs);
      const newBotIdx = nextMsgs.length - 1;

      if (autoVoice) {
        setSpeakingIndex(newBotIdx);
        speakText(botResponse, currentLang, () => setSpeakingIndex(null));
      }

      if (onAwardPoints) onAwardPoints(15);
    } catch (err) {
      console.error('LLM Proxy failed:', err);
      
      const fallbackResponse = currentLang === 'hi'
        ? `हमारे काल में, प्रकृति, धर्म और गहन तर्क से ही "${query}" का ज्ञान प्राप्त किया जा सकता है।`
        : `In our classical era, wisdom dictates that one must observe nature, virtue, and mathematics to comprehend "${query}".`;

      const nextMsgs = [...updatedMsgs, { sender: 'bot', text: fallbackResponse }];
      setMessages(nextMsgs);
      const newBotIdx = nextMsgs.length - 1;

      if (autoVoice) {
        setSpeakingIndex(newBotIdx);
        speakText(fallbackResponse, currentLang, () => setSpeakingIndex(null));
      }
    } finally {
      setIsThinking(false);
    }
  };

  // Toggle Speech-to-Text Listening
  const handleToggleListening = () => {
    stopSpeech();

    if (isListening) {
      if (recognizerRef.current) recognizerRef.current.stop();
      setIsListening(false);
      return;
    }

    const recognizer = createSpeechRecognizer(
      currentLang,
      (transcript) => {
        setInput(transcript);
        handleSendMessage(transcript);
      },
      () => setIsListening(false),
      (err) => {
        setIsListening(false);
        console.warn('Microphone error:', err);
      }
    );

    if (recognizer) {
      recognizerRef.current = recognizer;
      try {
        recognizer.start();
        setIsListening(true);
      } catch (e) {
        console.warn('Recognition start failed', e);
      }
    }
  };

  const toggleMessageAudio = (text, idx) => {
    if (speakingIndex === idx) {
      stopSpeech();
      setSpeakingIndex(null);
    } else {
      setSpeakingIndex(idx);
      speakText(text, currentLang, () => setSpeakingIndex(null));
    }
  };

  return (
    <section id="characters" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-10">
        <span className="text-xs font-bold tracking-widest text-amber-400 uppercase flex items-center justify-center gap-1.5 font-mono">
          <Sparkles className="w-3.5 h-3.5" /> Historical Intelligence & Dialectics
        </span>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mt-2">
          Converse With The Architects of Thought
        </h2>
        <p className="text-neutral-400 text-xs sm:text-sm mt-2">
          Engage in live dialogues powered by historical persona prompts with dual-language audio synthesis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Characters List */}
        <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1">
          {CHARACTERS.map((char) => {
            const isSelected = selectedChar.id === char.id;
            return (
              <div
                key={char.id}
                onClick={() => handleSelectChar(char)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'border-amber-500/60 bg-amber-500/10 shadow-lg shadow-amber-950/40'
                    : 'bg-[#0f1219]/70 border-white/5 hover:border-amber-500/30 opacity-80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex-shrink-0">
                    {char.avatar}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white font-serif">{char.name}</h3>
                    <p className="text-xs text-amber-400/90">{char.role}</p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">{char.era}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Chat Box */}
        <div className="lg:col-span-2 bg-[#0f1219]/90 backdrop-blur-md rounded-3xl border border-amber-500/20 flex flex-col h-[560px] shadow-2xl overflow-hidden">
          {/* Top Bar */}
          <div className="p-4 border-b border-white/5 bg-neutral-900/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">{selectedChar.avatar}</span>
              <div>
                <h4 className="text-sm font-bold text-white font-serif">{selectedChar.name}</h4>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                  ● LLM Persona Live
                </span>
              </div>
            </div>

            {/* Language & Voice Switches */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleLanguageToggle}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs border border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 transition cursor-pointer font-mono"
                title="Toggle Language"
              >
                <Languages className="w-3.5 h-3.5" />
                <span>{currentLang === 'hi' ? '🇮🇳 हिंदी' : '🌐 EN'}</span>
              </button>

              <button
                onClick={() => {
                  stopSpeech();
                  setSpeakingIndex(null);
                  setAutoVoice(!autoVoice);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs border transition cursor-pointer ${
                  autoVoice
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                    : 'bg-neutral-800 border-white/5 text-neutral-400'
                }`}
              >
                {autoVoice ? <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span className="text-[11px] font-mono hidden sm:inline">{autoVoice ? 'Live Audio' : 'Muted'}</span>
              </button>
            </div>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 text-sm">
            {messages.map((m, idx) => {
              const isBot = m.sender === 'bot';
              const isCurrentlySpeaking = speakingIndex === idx;

              return (
                <div key={idx} className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl text-xs md:text-sm leading-relaxed shadow-md ${
                      isBot
                        ? 'bg-neutral-900/95 border border-white/10 text-slate-100 rounded-tl-none font-serif'
                        : 'bg-amber-500 text-black font-semibold rounded-tr-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.text}</p>

                    {isBot && (
                      <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
                        <button
                          onClick={() => toggleMessageAudio(m.text, idx)}
                          className="flex items-center gap-1.5 text-[11px] text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                        >
                          {isCurrentlySpeaking ? (
                            <>
                              <VolumeX className="w-3.5 h-3.5 text-red-400" />
                              <span className="text-red-300 font-mono">Stop Speaking</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                              <span>Replay ({currentLang.toUpperCase()})</span>
                            </>
                          )}
                        </button>
                        <span className="text-[10px] text-neutral-400 font-mono">
                          {currentLang === 'hi' ? 'हिंदी ध्वनि' : 'Vocalized'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-neutral-900 border border-amber-500/20 p-3.5 rounded-2xl rounded-tl-none text-xs text-amber-300 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                  <span>Unrolling ancient scrolls...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Strip */}
          <div className="px-4 py-2 bg-neutral-900/50 border-t border-white/5 flex gap-2 overflow-x-auto text-xs scrollbar-none">
            {selectedChar.prompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(p)}
                disabled={isThinking || isListening}
                className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-neutral-800/90 border border-white/10 hover:border-amber-400 text-neutral-300 text-[11px] transition cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
              >
                <MessageSquare className="w-3 h-3 text-amber-400" /> {p}
              </button>
            ))}
          </div>

          {/* Bottom Chat Bar with Mic & Send */}
          <div className="p-3 bg-neutral-950/80 border-t border-white/5 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={
                isListening
                  ? currentLang === 'hi' ? '🎙️ सुन रहा हूँ... बोलिए...' : '🎙️ Listening... Speak now...'
                  : currentLang === 'hi'
                  ? `${selectedChar.name.split(' ')[0]} से प्रश्न पूछें...`
                  : `Ask ${selectedChar.name.split(' ')[0]} a question...`
              }
              className={`flex-1 bg-neutral-900/90 border rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none transition ${
                isListening ? 'border-red-500 ring-1 ring-red-500/50 bg-red-950/20' : 'border-white/10 focus:border-amber-400'
              }`}
            />

            {/* Mic Trigger */}
            <button
              onClick={handleToggleListening}
              disabled={isThinking}
              title={isListening ? 'Stop Listening' : 'Speak into Microphone'}
              className={`p-2.5 sm:p-3 rounded-2xl text-xs flex items-center justify-center transition cursor-pointer border ${
                isListening
                  ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse shadow-lg shadow-red-950'
                  : 'bg-[#141824] border-white/10 hover:border-amber-400/50 text-neutral-300 hover:text-amber-300'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4 text-red-400" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Send Trigger */}
            <button
              onClick={() => handleSendMessage()}
              disabled={isThinking || !input.trim()}
              className="p-2.5 sm:p-3 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-2xl text-xs flex items-center justify-center transition cursor-pointer disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}