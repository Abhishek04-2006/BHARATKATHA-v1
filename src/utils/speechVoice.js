
// Stop any currently running speech
export const stopSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

// Main Speech Synthesis Function
export const speakText = (text, lang = 'en', onEndCallback) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  stopSpeech();

  const playUtterance = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();

    if (lang === 'hi') {
      const hindiVoice = voices.find(
        (v) => v.lang === 'hi-IN' || v.lang.includes('hi')
      );
      if (hindiVoice) utterance.voice = hindiVoice;
      utterance.lang = 'hi-IN';
      utterance.pitch = 0.95;
      utterance.rate = 0.9;
    } else {
      const enVoice =
        voices.find((v) => v.lang === 'en-IN') ||
        voices.find((v) => v.lang.startsWith('en'));
      if (enVoice) utterance.voice = enVoice;
      utterance.lang = 'en-US';
      utterance.pitch = 1.0;
      utterance.rate = 1.0;
    }

    // Reset indicator on UI when speech completes or fails
    if (onEndCallback) {
      utterance.onend = () => onEndCallback();
      utterance.onerror = () => onEndCallback();
    }

    window.speechSynthesis.speak(utterance);
  };

  // Chromium fix: If voices haven't loaded yet, wait for onvoiceschanged
  const availableVoices = window.speechSynthesis.getVoices();
  if (availableVoices.length === 0) {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.onvoiceschanged = null; // Clean up listener
      playUtterance();
    };
  } else {
    playUtterance();
  }
};

// Speech-to-Text Recognition Initializer
export const createSpeechRecognizer = (lang = 'en', onResult, onEnd, onError) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    if (onError) onError('Speech Recognition is not supported in this browser.');
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-US';

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    if (onResult) onResult(transcript);
  };

  recognition.onerror = (event) => {
    console.warn('Speech recognition error:', event.error);
    if (onError) onError(event.error);
  };

  recognition.onend = () => {
    if (onEnd) onEnd();
  };

  return recognition;
};