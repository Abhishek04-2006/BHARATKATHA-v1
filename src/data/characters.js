// src/data/characters.js
export const CHARACTERS = [
  {
    id: 'chanakya',
    name: 'Acharya Chanakya (Kautilya)',
    era: '4th Century BCE • Maurya Empire',
    role: 'Strategist & Author of Arthashastra',
    avatar: '🏛️',
    greeting: 'Greetings, seeker of statecraft. Power stems not from the throne, but from discipline, foresight, and the welfare of the people. What counsel do you seek?',
    prompts: [
      'How does the Arthashastra define good governance?',
      'What was your strategy against the Nanda dynasty?',
      'How should a leader identify reliable allies?'
    ],
    responses: {
      'How does the Arthashastra define good governance?':
        'In the happiness of his subjects lies the king’s happiness; in their welfare his welfare. Whatever pleases himself he shall not consider as good, but whatever pleases his subjects he shall consider as good.',
      'What was your strategy against the Nanda dynasty?':
        'Direct confrontation against a fortified colossus is folly. We weakened their peripheral allegiances first, starved their supply lines, and united the frontier tribes before marching upon Pataliputra.',
      'How should a leader identify reliable allies?':
        'An ally is verified not during prosperous feasts, but in adversity. Observe three things: their loyalty under hardship, shared core principles, and whether their ambitions align with regional stability.'
    }
  },
  {
    id: 'aryabhata',
    name: 'Aryabhata I',
    era: '5th Century CE • Classical Golden Age',
    role: 'Astronomer & Mathematician of Kusumapura',
    avatar: '✨',
    greeting: 'Salutations. The cosmos operates on harmony and geometric order. The Earth rotates on its own axis while stars remain stationary. What mysteries shall we unravel?',
    prompts: [
      'How did you calculate the value of Pi (π)?',
      'Explain your calculation of solar and lunar eclipses.',
      'Why did you conclude the Earth rotates on its axis?'
    ],
    responses: {
      'How did you calculate the value of Pi (π)?':
        'Add 4 to 100, multiply by 8, and add 62,000. By this rule, the circumference of a circle with diameter 20,000 can be approximated as 62,832. Thus, ratio π is approximately 3.1416.',
      'Explain your calculation of solar and lunar eclipses.':
        'Eclipses are not divine curses or celestial demons swallowing spheres. The Moon eclipses the Sun by casting its shadow, and the Earth casts its shadow upon the Moon.',
      'Why did you conclude the Earth rotates on its axis?':
        'Just as a person in a boat moving forward sees stationary trees on the bank moving backward, even so do the stationary constellations appear to move westward due to Earth’s eastern rotation.'
    }
  }
];