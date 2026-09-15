// src/components/RelicInspector.jsx
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RELICS } from '../data/relicsData';
import { buildRelicMesh } from '../lib/relicModels';
import { ShieldAlert, RotateCw, Sparkles, CheckCircle } from 'lucide-react';

export default function RelicInspector({ onAwardPoints }) {
  const mountRef = useRef(null);
  const [selectedRelic, setSelectedRelic] = useState(RELICS[0]);
  const [activeHotspot, setActiveHotspot] = useState(0);
  const [inspectedRelics, setInspectedRelics] = useState([]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 50);
    camera.position.z = 6.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Studio Lights
    const keyLight = new THREE.DirectionalLight(0xffecd1, 2.5);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 2.0);
    rimLight.position.set(-5, -3, -3);
    scene.add(rimLight);

    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    // Build Current Relic
    const relicMesh = buildRelicMesh(selectedRelic.type);
    scene.add(relicMesh);

    // Mouse Interaction (Drag to Rotate 360)
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onMouseUp = () => { isDragging = false; };
    const onMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;

      relicMesh.rotation.y += dx * 0.008;
      relicMesh.rotation.x += dy * 0.008;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);

    // Touch support for mobile
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        prevX = e.touches[0].clientX;
        prevY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e) => {
      if (e.touches.length === 1) {
        const dx = e.touches[0].clientX - prevX;
        const dy = e.touches[0].clientY - prevY;
        prevX = e.touches[0].clientX;
        prevY = e.touches[0].clientY;
        relicMesh.rotation.y += dx * 0.01;
        relicMesh.rotation.x += dy * 0.01;
      }
    };

    container.addEventListener('touchstart', onTouchStart);
    container.addEventListener('touchmove', onTouchMove);

    // Continuous idle rotation
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging) {
        relicMesh.rotation.y += 0.003;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [selectedRelic]);

  const handleSelectRelic = (relic) => {
    setSelectedRelic(relic);
    setActiveHotspot(0);
    if (!inspectedRelics.includes(relic.id)) {
      setInspectedRelics([...inspectedRelics, relic.id]);
      if (onAwardPoints) onAwardPoints(25);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="text-xs font-bold tracking-widest text-amber-400 uppercase flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> 3D Relic Codex
        </span>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mt-2">
          Inspect Sacred Artifacts
        </h2>
        <p className="text-neutral-400 text-sm mt-2 max-w-xl mx-auto">
          Rotate and examine archaeologically reconstructed antiquities in real-time 360° perspective.
        </p>
      </div>

      {/* Relic Selector Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {RELICS.map((r) => {
          const isSelected = selectedRelic.id === r.id;
          const isInspected = inspectedRelics.includes(r.id);
          return (
            <button
              key={r.id}
              onClick={() => {
                handleSelectRelic(r);
               if (onAwardPoints) {
               onAwardPoints(100, r.id);
                     }
                   }}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                isSelected
                  ? 'glass-panel border-amber-500/50 bg-amber-500/10 gold-glow'
                  : 'glass-panel border-white/5 hover:border-white/20'
              }`}
            >
              <div>
                <h4 className="text-sm font-bold text-white font-serif">{r.name}</h4>
                <p className="text-[11px] text-amber-400/80 mt-0.5">{r.era.split('•')[0]}</p>
              </div>
              {isInspected && (
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main 3D Inspection Chamber */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 glass-panel p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl items-center">
        
        {/* 3D Canvas (7 Cols) */}
        <div className="lg:col-span-7 relative h-[380px] md:h-[460px] rounded-2xl bg-neutral-950/60 border border-white/5 overflow-hidden flex items-center justify-center">
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
          
          <div className="absolute bottom-4 left-4 pointer-events-none flex items-center gap-2 text-[11px] text-neutral-400 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
            <RotateCw className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Click & Drag to Rotate 360°</span>
          </div>

          <div className="absolute top-4 right-4 pointer-events-none text-[10px] font-mono text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-full">
            Real-Time 3D Mesh
          </div>
        </div>

        {/* Hotspot & Archaeological Lore Panel (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div>
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">
              {selectedRelic.material}
            </span>
            <h3 className="text-2xl font-serif font-bold text-white mt-1">
              {selectedRelic.name}
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">{selectedRelic.era}</p>
            <p className="text-xs text-neutral-300 leading-relaxed mt-3 bg-neutral-900/50 p-3.5 rounded-xl border border-white/5">
              {selectedRelic.lore}
            </p>
          </div>

          {/* Interactive Inscriptions / Hotspots */}
          <div>
            <h5 className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2">
              Archaeological Inscriptions
            </h5>
            <div className="space-y-2">
              {selectedRelic.hotspots.map((spot, i) => (
                <div
                  key={i}
                  onClick={() => setActiveHotspot(i)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    activeHotspot === i
                      ? 'bg-amber-500/15 border-amber-500/40 text-white'
                      : 'bg-neutral-900/40 border-white/5 text-neutral-400 hover:border-white/20'
                  }`}
                >
                  <div className="text-xs font-bold text-amber-300">{spot.title}</div>
                  <div className="text-[11px] text-neutral-300 mt-1 leading-normal">{spot.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-white/5 text-[11px] text-neutral-400">
            <span>Codex Discovery Reward</span>
            <span className="text-amber-400 font-mono font-bold">+25 XP Unlocked</span>
          </div>
        </div>

      </div>
    </section>
  );
}