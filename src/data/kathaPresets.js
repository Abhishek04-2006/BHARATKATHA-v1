// src/data/kathaPresets.js
export const KATHA_THEMES = [
  { id: 'ancient-science', title: 'Indian Astronomy & Science', icon: '🔭' },
  { id: 'nalanda-monastery', title: 'Scholarly Debates of Nalanda', icon: '📜' },
  { id: 'varanasi-ghats', title: 'Mysticism of Kashi Ghats', icon: '🪔' },
  { id: 'freedom-struggle', title: 'Echoes of the Independence Movement', icon: '🇮🇳' },
];

export const KATHA_SETTINGS = [
  { id: 'nalanda', label: 'Nalanda Mahavihara (5th CE)' },
  { id: 'pataliputra', label: 'Pataliputra Imperial Court (3rd BCE)' },
  { id: 'varanasi', label: 'Kashi Manikarnika Ghat (8th CE)' },
  { id: 'thanjavur', label: 'Brihadisvara Temple (11th CE)' },
];

export const STORY_STYLES = ['Cinematic Epic', 'Scholastic Diary', 'Folk Legend'];

export function generateMockKatha({ theme, setting, style, customNotes }) {
  const titles = {
    'ancient-science': 'The Celestial Geometry of Kusumapura',
    'nalanda-monastery': 'The Unbroken Palm Leaves of Dharmaganja',
    'varanasi-ghats': 'The Flame that Defied the Ganga Mist',
    'freedom-struggle': 'Midnight Couriers of the Secret Press',
  };

  const storyChapters = {
    'ancient-science': [
      "The bronze astrolabe clinks softly against the stone parapet as the moon crests over the riverbanks.",
      "For weeks, the monks and astronomers argued over the retrograde dance of Mangala (Mars). Tonight, the calculation resolves into undeniable spherical symmetry.",
      "As dawn breaks, the stylus carves the definitive sine tables into fresh birch bark — a legacy for generations yet unborn."
    ],
    'nalanda-monastery': [
      "A bell rings from the ninth terrace of the library. Three thousand scholars pause their recitations in unison.",
      "In the central courtyard, a scholar from Java challenges the venerable abbot on the doctrines of consciousness.",
      "The debate lasts until the oil lamps flicker out, leaving an archive of timeless dialectics inscribed forever."
    ],
    'varanasi-ghats': [
      "The morning mist over the Ganga smells of camphor, marigold garlands, and wet clay.",
      "Boats glide silently through water black as ink before the sun turns the stone steps into molten gold.",
      "A wandering bard plucks a single string of his ektara, recounting songs composed centuries before the city knew stone."
    ],
    'freedom-struggle': [
      "Underneath a quiet print shop in old Delhi, the hand-cranked cylinder press rolls in muted rhythm.",
      "Curfew guards patrol the cobblestones above, unaware of the bundles wrapped in jute sacks below.",
      "By morning sunrise, these pamphlets will kindle a fire across five towns that no edict can extinguish."
    ]
  };

  return {
    title: titles[theme] || 'Echoes of the Sacred Subcontinent',
    settingLabel: KATHA_SETTINGS.find((s) => s.id === setting)?.label || setting,
    style,
    customNotes: customNotes || 'Grounded historical reconstruction',
    chapters: storyChapters[theme] || storyChapters['nalanda-monastery'],
  };
}