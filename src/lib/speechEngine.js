// src/lib/speechEngine.js

export function speakText(text, personaType = 'chanakya', onEndCallback) {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported on this browser.');
    return;
  }

  // Pehle se chal rahi kisi speech ko stop karo
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();

  // Voice priority: Indian English (en-IN) ya koi authoritative English voice
  const indianVoice = voices.find((v) => v.lang === 'en-IN') || voices.find((v) => v.lang.includes('en'));
  if (indianVoice) {
    utterance.voice = indianVoice;
  }

  // Persona ke hisab se pitch aur pace calibrate karo
  if (personaType === 'chanakya') {
    utterance.pitch = 0.85; // Deep authoritative tone
    utterance.rate = 0.92;  // Deliberate, firm cadence
  } else if (personaType === 'aryabhata') {
    utterance.pitch = 0.95; // Calm scientific tone
    utterance.rate = 0.9;   // Contemplative cadence
  } else {
    utterance.pitch = 1.0;
    utterance.rate = 1.0;
  }

  utterance.onend = () => {
    if (onEndCallback) onEndCallback();
  };

  utterance.onerror = () => {
    if (onEndCallback) onEndCallback();
  };

  window.speechSynthesis.speak(utterance);
}

export function stopSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}