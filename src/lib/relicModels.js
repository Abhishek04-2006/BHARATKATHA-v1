// src/lib/relicModels.js
import * as THREE from 'three';

export function buildRelicMesh(type) {
  const group = new THREE.Group();

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.85,
    roughness: 0.25,
  });

  const darkBronzeMat = new THREE.MeshStandardMaterial({
    color: 0x8a5a36,
    metalness: 0.7,
    roughness: 0.4,
  });

  const stoneMat = new THREE.MeshStandardMaterial({
    color: 0x9c4a30,
    metalness: 0.1,
    roughness: 0.8,
  });

  if (type === 'chakra') {
    // Outer Rim
    const rimGeo = new THREE.TorusGeometry(2.2, 0.18, 16, 64);
    const rim = new THREE.Mesh(rimGeo, goldMat);
    group.add(rim);

    // Inner Hub
    const hubGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.45, 32);
    hubGeo.rotateX(Math.PI / 2);
    const hub = new THREE.Mesh(hubGeo, goldMat);
    group.add(hub);

    // 24 Radial Spokes
    const spokeGeo = new THREE.CylinderGeometry(0.04, 0.06, 2.0, 8);
    for (let i = 0; i < 24; i++) {
      const angle = (i * Math.PI * 2) / 24;
      const spoke = new THREE.Mesh(spokeGeo, goldMat);
      spoke.position.set(Math.cos(angle) * 1.05, Math.sin(angle) * 1.05, 0);
      spoke.rotation.z = angle - Math.PI / 2;
      group.add(spoke);
    }
  } else if (type === 'seal') {
    // Terracotta Seal Plaque
    const plaqueGeo = new THREE.CylinderGeometry(2.1, 2.1, 0.35, 32);
    plaqueGeo.rotateX(Math.PI / 2);
    const plaque = new THREE.Mesh(plaqueGeo, stoneMat);
    group.add(plaque);

    // Embossed concentric rings
    const ringGeo = new THREE.TorusGeometry(1.6, 0.08, 12, 48);
    const ring = new THREE.Mesh(ringGeo, goldMat);
    ring.position.z = 0.18;
    group.add(ring);

    // Central Stupa Crest
    const crestGeo = new THREE.ConeGeometry(0.8, 1.4, 6);
    crestGeo.rotateX(Math.PI / 2);
    const crest = new THREE.Mesh(crestGeo, goldMat);
    crest.position.z = 0.25;
    group.add(crest);
  } else {
    // Astrolabe / Armillary Spherical Rings
    const ring1Geo = new THREE.TorusGeometry(2.2, 0.09, 16, 64);
    const ring1 = new THREE.Mesh(ring1Geo, darkBronzeMat);
    group.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.7, 0.08, 16, 64);
    const ring2 = new THREE.Mesh(ring2Geo, goldMat);
    ring2.rotation.x = Math.PI / 3;
    group.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(1.2, 0.07, 16, 64);
    const ring3 = new THREE.Mesh(ring3Geo, goldMat);
    ring3.rotation.y = Math.PI / 4;
    group.add(ring3);

    // Core Celestial Sphere
    const sphereGeo = new THREE.SphereGeometry(0.4, 24, 24);
    const sphere = new THREE.Mesh(sphereGeo, goldMat);
    group.add(sphere);
  }

  return group;
}