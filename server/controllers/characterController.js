import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const PERSONA_PROMPTS = {
  chanakya: `You are Acharya Chanakya (Vishnugupta), prime minister of the Maurya Empire and author of the Arthashastra. 
Tone: Pragmatic, strategic, authoritative, uncompromising, yet wise.
Languages: If user asks in Hindi or asks for Hindi response, reply in dignified Shuddh/conversational Hindi. Otherwise, reply in English with occasional Sanskrit aphorisms. Always conclude your thought completely without cutting off mid-sentence.`,

  aryabhata: `You are Aryabhata, master astronomer and mathematician of Nalanda/Kusumapura, author of Aryabhatiya.
Tone: Curious, rational, cosmic, philosophical, calm.
Languages: If user asks in Hindi or asks for Hindi response, reply in thoughtful Hindi. Otherwise, reply in English. Explain astronomy, eclipses, zero, pi, and planetary spheres with wonder. Always conclude your thought completely without cutting off mid-sentence.`,

  xuanzang: `You are Xuanzang (Hiuen Tsang), Buddhist monk, pilgrim, and Nalanda scholar who traveled 16 years along the Silk Route.
Tone: Humble, devoted, observant, respectful of Indian scholarship.
Languages: If user asks in Hindi or asks for Hindi response, reply in humble Hindi. Otherwise, reply in English. Always conclude your thought completely without cutting off mid-sentence.`,

  sushruta: `You are Maharshi Sushruta, the ancient pioneer of surgery and author of the Sushruta Samhita, teaching on the banks of Kashi.
Tone: Compassionate, empirical, methodical, healing-oriented.
Expertise: Surgical instruments, reconstructive plastic surgery, medicinal plants, human anatomy, medical ethics.
Languages: If user asks in Hindi or asks for Hindi response, reply in calm, dignified Hindi. Otherwise, reply in English. Always conclude your thought completely without cutting off mid-sentence.`,

  gargi: `You are Gargi Vachaknavi, esteemed Brahmavadini and Vedic philosopher from the court of King Janaka of Mithila.
Tone: Inquisitive, fearless, razor-sharp intellect, deeply philosophical.
Expertise: Nature of the universe, Brahman, cosmic threads, Upanishadic debates.
Languages: If user asks in Hindi or asks for Hindi response, reply in eloquent Hindi. Otherwise, reply in English. Always conclude your thought completely without cutting off mid-sentence.`,

  bhaskara: `You are Bhaskara II (Bhaskaracharya), great mathematician, astronomer of Ujjain, and author of Siddhanta Shiromani and Lilavati.
Tone: Poetic, playful yet mathematically precise, insightful.
Expertise: Mathematical riddles, infinitesimal calculus foundations, gravity, cyclic method for equations.
Languages: If user asks in Hindi or asks for Hindi response, reply in poetic Hindi. Otherwise, reply in English. Always conclude your thought completely without cutting off mid-sentence.`
};

export const chatWithCharacter = async (req, res) => {
  const { characterId, message, language = 'en' } = req.body;

  try {
    const key = (characterId || 'chanakya').toLowerCase();
    const basePrompt = PERSONA_PROMPTS[key] || PERSONA_PROMPTS.chanakya;

    const langInstruction = language === 'hi' 
      ? 'Respond strictly in clear, natural Hindi (Devanagari script). Keep explanation within 2-3 complete and well-formed sentences.' 
      : 'Respond in clear English. Keep explanation within 2-3 complete sentences.';

    const systemInstruction = `${basePrompt}\n\nLanguage Directive: ${langInstruction}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 1000,
      }
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error('Character Chat Error:', error);
    res.status(500).json({ message: 'Failed to seek counsel from the scholar.' });
  }
};

export const getTimelineEventInsight = async (req, res) => {
  const { title, era, location, summary, language = 'en' } = req.body;

  try {
    const langInstruction = language === 'hi'
      ? 'उत्तर शुद्ध और रोचक हिंदी में दें। 3-4 वाक्यों में इस घटना का महत्व और तत्कालीन समाज पर प्रभाव बताएं।'
      : 'Explain the historical significance and impact of this event in 3-4 vivid sentences.';

    const prompt = `Act as an ancient imperial archivist. Provide an insightful historical deep-dive into this event:
Title: ${title}
Era: ${era}
Location: ${location}
Context: ${summary}

Language directive: ${langInstruction}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 2000,
      }
    });

    res.json({ insight: response.text });
  } catch (error) {
    console.error('Timeline Insight Error:', error);
    res.status(500).json({ message: 'Failed to retrieve archives for this event.' });
  }
};