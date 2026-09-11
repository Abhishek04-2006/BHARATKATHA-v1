// src/components/AudioPlayer.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Royalty-free subtle ambient sitar & flute soundscape
    audioRef.current = new Audio('/ambience.mp3' );
    audioRef.current.loop = true;
    audioRef.current.volume = 0.35; // Gentle background level

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Audio autoplay blocked by browser:', err));
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={toggleAudio}
        title={isPlaying ? 'Mute Ambient Audio' : 'Play Ambient Sitar/Flute'}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all cursor-pointer text-xs ${
          isPlaying
            ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
            : 'bg-neutral-900/80 border-white/10 text-neutral-400 hover:text-white'
        }`}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="hidden sm:inline font-mono text-[11px]">Ambience: On</span>
            {/* Audio wave animation */}
            <span className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 bg-amber-400 h-2 animate-bounce" style={{ animationDelay: '0.1s' }} />
              <span className="w-0.5 bg-amber-400 h-3 animate-bounce" style={{ animationDelay: '0.2s' }} />
              <span className="w-0.5 bg-amber-400 h-1.5 animate-bounce" style={{ animationDelay: '0.3s' }} />
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-neutral-500" />
            <span className="hidden sm:inline text-[11px]">Soundscape</span>
          </>
        )}
      </button>
    </div>
  );
}