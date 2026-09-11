# 🏛️ BharatKatha (भारतकथा)
> **Step Inside India's History. Don't Just Learn It.**

BharatKatha is a visual-first, cinematic interactive web platform built for modern digital natives to experience Indian history, architectural heritage, and scholastic philosophy through real-time 3D environments, generative AI, and spatial storytelling.

---

## 🌟 Core Pillars

The platform is structured around 4 interactive dimensions:

1. **Discover (Interactive Timeline & Epochs)**
   - 2,500 years of subcontinental lore scrubbed across 4 distinct epochs: *Ancient Era (500 BCE – 600 CE)*, *Medieval Golden Age (600 CE – 1526 CE)*, *Colonial Era (1526 CE – 1857 CE)*, and the *Freedom Movement (1857 CE – 1947 CE)*.
   - Dynamic cinematic ambient video backgrounds that shift with each era.
   - Curated scientific, architectural, and socio-political milestones.

2. **Experience (3D Nalanda Metaverse)**
   - First-person WASD exploration of 5th-century Nalanda Mahavihara built with Three.js.
   - Proximity-based discovery triggers around Stupa No. 3, Dharmaganja Library, and the Scholars' Vihara.
   - Built-in **Photo Mode & Story Exporter**: captures real-time 9:16 vertical Instagram/Snapchat story cards with date stamps and location metadata.

3. **Create (AI Katha Studio)**
   - 4-step guided narrative generator enabling users to synthesize custom historical chronicles.
   - Integrates user-chosen eras, protagonists, dilemmas, and architectural settings into walkable manuscripts.

4. **Preserve (Oral Roots Codex)**
   - Living archive dedicated to crowdsourced hometown traditions, folk songs, and elder memories.
   - Real-time community submission system with category tags and upvoting.

---

## ⚡ Key Highlights & Features

- **AI Scholars & Voice Synthesis:** Interactive dialogues with historical personas (Chanakya, Aryabhata) powered by real-time client-side Text-to-Speech (TTS) audio narration.
- **3D Relic Codex:** Procedural Three.js 360° inspector for sacred antiquities (*Ashoka Dharma Chakra*, *Nalanda Royal Seal*, and *Astronomical Astrolabes*) with clickable archaeological hotspots.
- **Chanakya's War Room:** RPG-style tactical statecraft dilemma simulator evaluating decisions against authentic *Arthashastra* maxims.
- **Ambient Soundscape Engine:** Global background sitar & bamboo flute audio with an animated visualizer toggle.
- **Unified Gamification Engine:** Dynamic XP tracker rewarding exploration, artifact inspection, and lore interaction across all modules.
- **Streamlined Navigation:** Zero-clutter header synced directly with the four main pillars and quick-launch access to the 3D world.

---

## 🛠️ Tech Stack

- **Core Framework:** React 18 + Vite
- **Styling & UI:** Tailwind CSS, Obsidian/Gold Glassmorphism Design System
- **3D Graphics:** Three.js (WebGL rendering, procedural meshes, lighting, and camera controllers)
- **Icons:** Lucide React
- **Audio & Speech:** Web Speech API (`window.speechSynthesis`) + HTML5 Audio Engine

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Abhishek04-2006/bharatkatha.git](https://github.com/your-username/bharatkatha.git)
   cd bharatkatha
Install dependencies:

Bash
npm install
Local Video Assets Setup:
Create a videos directory inside the public/ directory and place your cinematic loop files:

Plaintext
public/
└── videos/
    ├── ancient.mp4
    ├── medieval.mp4
    ├── colonial.mp4
    └── freedom.mp4
Run the development server:

Bash
npm run dev
Build for production:

Bash
npm run build

### 📂 Project Structure
Plaintext
bharatkatha/
├── public/
│   ├── audio/           # Soundscape tracks (sitar, flute, ambience)
│   └── videos/          # Epoch cinematic loop clips
├── src/
│   ├── components/
│   │   ├── Navbar.jsx            # Sleek 4-pillar navigation header
│   │   ├── Hero.jsx              # Sanctum entry gateway
│   │   ├── Pillars.jsx           # 4 action-oriented dimension cards
│   │   ├── TimelineExplorer.jsx  # Epoch timeline with dynamic video backgrounds
│   │   ├── Experience3D.jsx      # Three.js Nalanda metaverse + Story Exporter
│   │   ├── RelicInspector.jsx    # 3D 360° artifact inspection chamber
│   │   ├── CharacterStudio.jsx   # AI scholar chat with TTS voice engine
│   │   ├── WarRoom.jsx           # Arthashastra scenario dilemma simulator
│   │   ├── KathaStudio.jsx       # 4-step generative story synthesizer
│   │   ├── OralRoots.jsx         # Crowdsourced oral folklore archive
│   │   └── AudioPlayer.jsx       # Global ambient sitar/flute controller
│   ├── data/
│   │   ├── timelineData.js       # Epoch milestones & video mappings
│   │   ├── relicsData.js         # Artifact geometries & lore metadata
│   │   ├── characters.js         # Scholar dialogues & persona prompts
│   │   ├── warRoomData.js        # Strategic statecraft dilemma sets
│   │   └── zones.js              # 3D spatial coordinates & proximity lore
│   ├── lib/
│   │   ├── speechEngine.js       # Client-side TTS calibration
│   │   ├── snapshotEngine.js     # 9:16 vertical canvas capture utility
│   │   ├── relicModels.js        # Procedural Three.js 3D meshes
│   │   └── nalandaScene.js       # Vihara, stupa & environment generation
│   ├── App.jsx                   # Central tab orchestration & XP tracking
│   └── index.css                 # Obsidian-gold gradients & custom glows
├── package.json
└── README.md
### 📜 License
Distributed under the MIT License. See LICENSE for more information.