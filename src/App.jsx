// src/App.jsx
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Pillars from './components/Pillars';
import TimelineExplorer from './components/TimelineExplorer';
import CharacterStudio from './components/CharacterStudio';
import CreateKatha from './components/CreateKatha';
import MyRoots from './components/MyRoots';
import Experience3D from './components/Experience3D';
import RelicInspector from './components/RelicInspector';
import { syncExplorerAchievement } from './services/api';


export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'explore' | 'characters' | 'create' | 'roots' | '3d-nalanda'
  const [xp, setXp] = useState(150);

  const handleAwardPoints = async (points, relicId = null) => {
  setXp((prev) => prev + points);

  const token = localStorage.getItem('bharatkatha_token');
  const storedUser = localStorage.getItem('bharatkatha_user');

  if (token && storedUser) {
    try {
      const result = await syncExplorerAchievement(relicId, points);
      const parsed = JSON.parse(storedUser);
      const updatedUser = {
        ...parsed,
        xp: result.xp,
        unlockedRelics: result.unlockedRelics
      };
      localStorage.setItem('bharatkatha_user', JSON.stringify(updatedUser));
    } catch (err) {
      console.warn('Background sync failed:', err);
    }
  }
};

  return (
    <main className="min-h-screen bg-[#0B0C10] text-neutral-200 relative selection:bg-amber-500/20 overflow-x-hidden">
      {/* Navigation OS */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* --- Dynamic Views Switcher --- */}
      
      {/* View 1: Sanctum Home */}
{activeTab === 'home' && (
  <div className="animate-fade-in">
    <Hero 
      onStartExperience={() => setActiveTab('3d-nalanda')} 
      onExplore={() => setActiveTab('explore')}
    />
    {/* Pillars ab tab switcher ban chuka hai */}
    <Pillars onSelectPillar={(tabId) => setActiveTab(tabId)} />
  </div>
)}
      {/* View 2: Timeline Scrubber (Discover) */}
      {activeTab === 'explore' && (
        <TimelineExplorer onAwardPoints={handleAwardPoints} />
      )}
      {/* View 2.5: 3D Relic Codex */}
       {activeTab === 'relics' && (
         <div className="pt-20 animate-fade-in">
          <RelicInspector onAwardPoints={handleAwardPoints} />
          </div>
          )}  
      
      {/* View 3: AI Character Debates */}
      {activeTab === 'characters' && (
        <div className="pt-20 animate-fade-in">
          <CharacterStudio onAwardPoints={handleAwardPoints} />
        </div>
      )}

      {/* View 4: AI Story Studio (Create) */}
      {activeTab === 'create' && (
        <div className="pt-20 animate-fade-in">
          <CreateKatha 
            onAwardPoints={handleAwardPoints} 
            onLaunchLiveKatha={() => setActiveTab('3d-nalanda')} 
          />
        </div>
      )}

      {/* View 5: Oral Roots Codex (Preserve) */}
      {activeTab === 'roots' && (
        <div className="pt-20 animate-fade-in">
          <MyRoots onAwardPoints={handleAwardPoints} />
        </div>
      )}
      
      {/* View 6: 3D Nalanda Metaverse Experience */}
      {activeTab === '3d-nalanda' && (
        <Experience3D
          onExit={() => setActiveTab('home')}
          onAwardPoints={handleAwardPoints}
        />
      )}
      

      {/* Permanent Footer / Integrity Badge */}
      {activeTab !== '3d-nalanda' && (
        <footer className="py-8 text-center text-xs text-neutral-500 border-t border-neutral-900 mt-16">
          <p>🏛️ BharatKatha is an educational simulation. Reconstructions grounded in historical texts.</p>
        </footer>
      )}
    </main>
  );
}