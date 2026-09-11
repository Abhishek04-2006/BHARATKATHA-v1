// src/components/Experience3D.jsx
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArrowLeft, Compass, Camera, Sparkles, X, Download, Share2 } from 'lucide-react';
import { buildNalandaWorld } from '../lib/nalandaScene';
import { NALANDA_ZONES } from '../data/zones';
import { generateStoryCard } from '../lib/snapshotEngine';

export default function Experience3D({ onExit, onAwardPoints }) {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const [activeZone, setActiveZone] = useState(null);
  const [storyCardUrl, setStoryCardUrl] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c0b10);
    scene.fog = new THREE.FogExp2(0x0c0b10, 0.035);

    const camera = new THREE.PerspectiveCamera(65, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 1.8, 12);

    // preserveDrawingBuffer: true is required for canvas capture
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffecd1, 0.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffa244, 1.4);
    sunLight.position.set(20, 30, 10);
    scene.add(sunLight);

    const { particles } = buildNalandaWorld(scene);

    const keys = { w: false, a: false, s: false, d: false };
    let yaw = 0;
    let pitch = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onKeyDown = (e) => {
      const k = e.key.toLowerCase();
      if (keys[k] !== undefined) keys[k] = true;
    };
    const onKeyUp = (e) => {
      const k = e.key.toLowerCase();
      if (keys[k] !== undefined) keys[k] = false;
    };

    const onMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };
    const onMouseUp = () => { isDragging = false; };
    const onMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouseX;
      const dy = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      yaw -= dx * 0.003;
      pitch -= dy * 0.003;
      pitch = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, pitch));
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);

    let animId;
    const moveSpeed = 0.12;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const euler = new THREE.Euler(pitch, yaw, 0, 'YXZ');
      camera.quaternion.setFromEuler(euler);

      const forward = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(0, yaw, 0)).normalize();
      const right = new THREE.Vector3(1, 0, 0).applyEuler(new THREE.Euler(0, yaw, 0)).normalize();

      if (keys.w) camera.position.addScaledVector(forward, moveSpeed);
      if (keys.s) camera.position.addScaledVector(forward, -moveSpeed);
      if (keys.d) camera.position.addScaledVector(right, moveSpeed);
      if (keys.a) camera.position.addScaledVector(right, -moveSpeed);

      camera.position.x = Math.max(-28, Math.min(28, camera.position.x));
      camera.position.z = Math.max(-38, Math.min(18, camera.position.z));
      camera.position.y = 1.8;

      if (particles) particles.rotation.y += 0.0006;

      let foundZone = null;
      for (const zone of NALANDA_ZONES) {
        const dist = Math.hypot(camera.position.x - zone.x, camera.position.z - zone.z);
        if (dist <= zone.radius) {
          foundZone = zone;
          break;
        }
      }
      setActiveZone(foundZone);

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
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleCapture = async () => {
    if (!rendererRef.current) return;
    setIsCapturing(true);

    const canvas = rendererRef.current.domElement;
    const locationTitle = activeZone ? activeZone.name : 'Nalanda Mahavihara Sanctuary';
    const cardDataUrl = await generateStoryCard(canvas, locationTitle);

    setStoryCardUrl(cardDataUrl);
    setIsCapturing(false);
    if (onAwardPoints) onAwardPoints(20);
  };

  const handleNativeShare = async () => {
    if (!storyCardUrl) return;
    try {
      const blob = await (await fetch(storyCardUrl)).blob();
      const file = new File([blob], 'bharatkatha-memory.png', { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Stepped Inside 5th-Century Nalanda',
          text: 'Living history in real-time 3D on BharatKatha.',
        });
      } else {
        triggerDownload();
      }
    } catch {
      triggerDownload();
    }
  };

  const triggerDownload = () => {
    const a = document.createElement('a');
    a.href = storyCardUrl;
    a.download = `BharatKatha-Nalanda-${Date.now()}.png`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden select-none">
      {/* 3D Canvas Mount Point */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top HUD Controls */}
      <div className="absolute top-5 left-6 right-6 flex items-center justify-between pointer-events-none">
        <button
          onClick={onExit}
          className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-xl glass-panel text-neutral-300 hover:text-white border border-white/10 hover:border-amber-400/40 text-xs font-medium transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Exit to Overview
        </button>

        {/* Capture Shutter Button */}
        <button
          onClick={handleCapture}
          disabled={isCapturing}
          className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all transform hover:scale-105 gold-glow cursor-pointer shadow-xl"
        >
          <Camera className="w-4 h-4" />
          <span>{isCapturing ? 'Rendering Story...' : 'Snap Story (+20 XP)'}</span>
        </button>
      </div>

      {/* Controls helper */}
      <div className="hidden md:flex absolute bottom-6 left-6 glass-panel px-4 py-2 rounded-xl text-neutral-400 text-xs items-center gap-3 border border-white/5 pointer-events-none">
        <span>Use <strong className="text-amber-300">W, A, S, D</strong> to walk</span>
        <span>•</span>
        <span><strong className="text-amber-300">Click & Drag</strong> to look</span>
      </div>

      {/* Discovery Lore Notification */}
      {activeZone && !storyCardUrl && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-lg glass-panel p-5 rounded-2xl border border-amber-500/40 shadow-2xl animate-fade-in pointer-events-auto">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> {activeZone.tag}
            </div>
            <button onClick={() => setActiveZone(null)} className="text-neutral-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <h3 className="text-lg font-serif font-bold text-white mt-1">{activeZone.name}</h3>
          <p className="text-xs text-neutral-300 mt-2 leading-relaxed">{activeZone.desc}</p>
        </div>
      )}

      {/* Instagram Story Preview Modal */}
      {storyCardUrl && (
        <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-3xl border border-amber-500/40 max-w-sm w-full flex flex-col items-center space-y-4 shadow-2xl animate-fade-in">
            <div className="w-full flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-mono text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Story Chronicle Ready
              </span>
              <button onClick={() => setStoryCardUrl(null)} className="text-neutral-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Generated 9:16 Preview */}
            <div className="w-full max-h-[55vh] overflow-hidden rounded-2xl border border-white/10 shadow-lg">
              <img src={storyCardUrl} alt="Story Card" className="w-full h-full object-cover" />
            </div>

            {/* Action Buttons */}
            <div className="w-full grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={triggerDownload}
                className="py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs flex items-center justify-center gap-2 border border-white/10 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Save Image
              </button>
              <button
                onClick={handleNativeShare}
                className="py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-black font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <Share2 className="w-3.5 h-3.5" /> Share Story
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}