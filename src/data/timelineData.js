// src/data/timelineData.js
export const TIMELINE_EPOCHS = [
  {
    id: 'ancient',
    name: 'Ancient Era',
    range: '500 BCE – 600 CE',
    videoLoop: '/videos/ancient.mp4',
    events: [
      {
        year: '499 CE',
        title: 'Aryabhata writes Aryabhatiya',
        location: 'Kusumapura (Bihar)',
        desc: 'Calculates Pi to 4 decimal places, formulates sine tables, and explains planetary rotation with zero as a conceptual base.',
        tag: 'Scientific Revolution'
      },
      {
        year: '427 CE',
        title: 'Foundation of Nalanda Mahavihara',
        location: 'Magadha (Bihar)',
        desc: 'Kumargupta I establishes the premier residential university of the ancient world, housing 9 million manuscripts.',
        tag: 'Scholastic Hegemony'
      }
    ]
  },
  {
    id: 'medieval',
    name: 'Medieval Golden Age',
    range: '600 CE – 1526 CE',
    videoLoop: '/videos/medieval.mp4',
    events: [
      {
        year: '1010 CE',
        title: 'Brihadisvara Temple Consecration',
        location: 'Thanjavur (Tamil Nadu)',
        desc: 'Rajaraja Chola I completes the 216-foot granite vimana, setting the peak standard of Dravidian architecture without binding mortar.',
        tag: 'Dravidian Architecture'
      },
      {
        year: '1150 CE',
        title: 'Bhaskara II authors Siddhanta Shiromani',
        location: 'Ujjain (Madhya Pradesh)',
        desc: 'Forms foundational differential calculus principles and determines orbital velocities centuries before Newton.',
        tag: 'Calculus & Astronomy'
      }
    ]
  },
  {
    id: 'colonial',
    name: 'Colonial Era',
    range: '1526 CE – 1857 CE',
    videoLoop: '/videos/colonial.mp4',
    events: [
      {
        year: '1757 CE',
        title: 'Battle of Plassey & Economic Drainage',
        location: 'Palashi (Bengal)',
        desc: 'East India Company assumes fiscal control of Bengal treasury, marking the shift from mercantile trade to systemic de-industrialization.',
        tag: 'Imperial Subjugation'
      },
      {
        year: '1780 CE',
        title: 'Mysorean Iron-Cased War Rockets',
        location: 'Srirangapatna (Karnataka)',
        desc: 'Hyder Ali and Tipu Sultan deploy the worlds first iron-cased ballistic rockets, later reverse-engineered by the British as Congreve rockets.',
        tag: 'Military Innovation'
      }
    ]
  },
  {
    id: 'freedom',
    name: 'Freedom Movement',
    range: '1857 CE – 1947 CE',
    videoLoop: '/videos/freedom.mp4',
    events: [
      {
        year: '1857 CE',
        title: 'First War of Indian Independence',
        location: 'Meerut / Delhi',
        desc: 'Sepoy rebellion ignites nationwide resistance across Avadh and central principalities, forcing the dissolution of the East India Company.',
        tag: 'National Resistance'
      },
      {
        year: '1930 CE',
        title: 'Dandi Salt March (Satyagraha)',
        location: 'Sabarmati to Dandi (Gujarat)',
        desc: 'Mahatma Gandhi marches 240 miles to break the imperial salt monopoly, catalyzing civil disobedience globally.',
        tag: 'Mass Awakening'
      }
    ]
  }
];