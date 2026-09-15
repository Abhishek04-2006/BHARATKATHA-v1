# 🏛️ BharatKatha — Subcontinental Metaverse & Archival Intelligence

> **An immersive, AI-powered cultural preservation engine bringing 2,500 years of Indian history, philosophy, and architectural heritage to life.**

BharatKatha bridges traditional historical archives with modern interactive technologies: real-time LLM scholar personas, 3D metaverse explorations, bilingual audio dialectics, dynamic video ambiences, and decentralized community lore.

---

## 🌟 Core Pillars & Features

### 1. 📜 Discover — Timeline Chamber (2,500 Years of Lore)
* **Epoch-Scrubbing Engine**: Seamlessly transition across four pivotal civilizational eras with synchronized high-definition dynamic video loops and ambient soundscapes.
* **AI Deep-Dive Archives**: Interactive milestone inspection powered by Google Gemini, unrolling contextual palm-leaf historical insights on demand.
* **Bilingual Speech Synthesis**: In-browser audio narration of historical events in both Hindi and English.
* **Gamified Chronology**: Discovery rewards granting explorers **+50 XP** per archival inquiry.

### 2. 🏛️ Converse — Character Studio (Architects of Thought)
* **Live Historical Dialectics**: Converse in real time with legendary figures:
  * **Acharya Chanakya (Kautilya)** — Governance, Arthashastra & Realpolitik
  * **Aryabhata I** — Celestial mechanics, zero, trigonometry & spherical earth
  * **Xuanzang (Hiuen Tsang)** — Silk Route pilgrimage & Nalanda scholarship
  * **Maharshi Sushruta** — Ancient surgery, anatomical ethics & rhinoplasty
  * **Gargi Vachaknavi** — Upanishadic philosophy & debates of Videha
  * **Bhaskara II** — Gravity principles, calculus foundations & Lilavati riddles
* **Dual-Language Interaction (Hindi / English)**: Switch fluently between English and Shuddh Hindi dialectics.
* **Speech-to-Text & Voice Synthesis**: Speak directly using Web Speech API mic recognition and listen to vocalized scholar responses.

### 3. 🏺 Inspect — 3D Nalanda & Relic Vault
* **Spatial Relic Inspection**: Examine ancient artifacts, inscriptions, and seals with interactive 3D inspection.
* **Codex Progression**: Discovering relics unlocks badges, increases knowledge tiers, and stores progression securely in MongoDB Atlas.

### 4. 🪶 Create & Preserve — AI Katha Studio & Oral Roots
* **Katha AI Studio**: Generate structured historical manuscripts with customizable tone and era constraints.
* **Oral Roots Vault**: Community-driven crowdsourcing portal for indigenous folklore, village narratives, and family oral histories with community upvoting.

### 5. 🏆 BharatKatha Leaderboard & Codex Badging
* Real-time XP tracking and ranking tiers:
  * 📜 **Novice Chronicler** (0 - 249 XP)
  * 🪷 **Nalanda Scholar** (250 - 499 XP)
  * 🏛️ **Imperial Historian** (500 - 999 XP)
  * 👑 **Codex Master** (1000+ XP)
* Global leaderboard modal tracking discovered relics and contribution points.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide Icons, Three.js / Canvas |
| **Speech & Audio** | Web Speech API (`SpeechRecognition` & `SpeechSynthesis`) |
| **Backend** | Node.js, Express.js, RESTful Architecture |
| **Database** | MongoDB Atlas, Mongoose ORM |
| **Generative AI** | Google Gemini 2.5 Flash API |
| **Authentication** | JSON Web Tokens (JWT), bcrypt.js, LocalStorage Session Sync |
| **Hosting & CI/CD** | Frontend on **Vercel** / Backend on **Render** |

---

## 📂 Architecture & Directory Structure

```text
bharatkatha/
├── public/
│   ├── videos/              # Looping ambient epoch backgrounds
│   └── favicon.ico
├── server/
│   ├── config/              # MongoDB connection
│   ├── controllers/         # Auth, Character, Katha & Timeline controllers
│   ├── middleware/          # JWT auth protection
│   ├── models/              # User, Katha, Relic, and OralRoot schemas
│   ├── routes/              # Express API routes
│   └── index.js             # Express server entry point
├── src/
│   ├── components/          # React components (Studio, Timeline, Leaderboard, Navbar)
│   ├── data/                # Static characters and epoch data
│   ├── services/            # Axios / Fetch API client layer
│   ├── utils/               # Audio TTS and STT recognizer utilities
│   ├── App.jsx              # Main view state router
│   └── main.jsx
├── vercel.json              # Single Page Application rewrite rules
├── package.json
└── README.md

⚙️ Local Development Setup
git clone [https://github.com/](https://github.com/)<your-username>/bharatkatha.git
cd bharatkatha

Configure Backend Environment
Create a .env file inside the server/ directory:
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/bharatkatha?retryWrites=true&w=majority
JWT_SECRET=your_ultra_secure_jwt_secret
GEMINI_API_KEY=your_gemini_api_key

Install Dependencies & Run
Start Backend Server:

Bash
cd server
npm install
npm run dev

Start Frontend Client:
Open a separate terminal in the root directory:

Bash
npm install
npm run dev
The application will be running at http://localhost:5173.

🚀 Deployment Instructions
Backend (Render): Set Root Directory to server/, build command npm install, start command node index.js, and attach environment variables.

Frontend (Vercel): Connect repository, set build command npm run build, output folder to dist, and set VITE_API_BASE_URL pointing to your Render backend API.

📜 License
Developed under the MIT License. Preserving cultural heritage through open technology.
