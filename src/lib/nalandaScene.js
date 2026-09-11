// src/lib/nalandaScene.js
import * as THREE from 'three';

export function buildNalandaWorld(scene) {
  // 1. Ancient Terracotta Ground
  const groundGeo = new THREE.PlaneGeometry(120, 120);
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0x221811,
    roughness: 0.9,
    metalness: 0.1,
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // Pathway (Paved central avenue)
  const pathGeo = new THREE.PlaneGeometry(8, 70);
  const pathMat = new THREE.MeshStandardMaterial({
    color: 0x3d2817,
    roughness: 0.8,
  });
  const path = new THREE.Mesh(pathGeo, pathMat);
  path.rotation.x = -Math.PI / 2;
  path.position.set(0, 0.02, -10);
  scene.add(path);

  // 2. The Great Stupa (Z = -25)
  const stupaGroup = new THREE.Group();
  stupaGroup.position.set(0, 0, -25);

  const baseGeo = new THREE.BoxGeometry(14, 3, 14);
  const brickMat = new THREE.MeshStandardMaterial({ color: 0x8a3a22, roughness: 0.75 });
  const tier1 = new THREE.Mesh(baseGeo, brickMat);
  tier1.position.y = 1.5;
  stupaGroup.add(tier1);

  const tier2 = new THREE.Mesh(new THREE.BoxGeometry(10, 2.5, 10), brickMat);
  tier2.position.y = 4.25;
  stupaGroup.add(tier2);

  const domeGeo = new THREE.CylinderGeometry(3.5, 4.5, 4, 16);
  const domeMat = new THREE.MeshStandardMaterial({ color: 0xa14428, roughness: 0.7 });
  const dome = new THREE.Mesh(domeGeo, domeMat);
  dome.position.y = 7.5;
  stupaGroup.add(dome);

  // Pinnacle spire (Chhatra)
  const spireGeo = new THREE.ConeGeometry(0.8, 3, 8);
  const goldMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.7, roughness: 0.3 });
  const spire = new THREE.Mesh(spireGeo, goldMat);
  spire.position.y = 11;
  stupaGroup.add(spire);

  scene.add(stupaGroup);

  // 3. Torana (Gateway Arches along the path)
  [-5, -15].forEach((zPos) => {
    const arch = createToranaArch();
    arch.position.set(0, 0, zPos);
    scene.add(arch);
  });

  // 4. Monastery Pillars on Left and Right
  const pillarGeo = new THREE.CylinderGeometry(0.35, 0.45, 5, 12);
  const pillarMat = new THREE.MeshStandardMaterial({ color: 0x5a3020, roughness: 0.8 });

  for (let z = 5; z >= -35; z -= 7) {
    [-6, 6].forEach((x) => {
      const p = new THREE.Mesh(pillarGeo, pillarMat);
      p.position.set(x, 2.5, z);
      scene.add(p);

      // Warm torch light on select pillars
      if (z === -5 || z === -20) {
        const torchLight = new THREE.PointLight(0xff9933, 2, 8);
        torchLight.position.set(x, 4.8, z);
        scene.add(torchLight);
      }
    });
  }

  // 5. Ambient Atmospheric Dust / Golden Embers
  const particleCount = 200;
  const particleGeo = new THREE.BufferGeometry();
  const coords = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    coords[i] = (Math.random() - 0.5) * 60;
    coords[i + 1] = Math.random() * 8 + 0.5;
    coords[i + 2] = (Math.random() - 0.5) * 60;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(coords, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0xffd166,
    size: 0.12,
    transparent: true,
    opacity: 0.7,
  });

  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  return { particles };
}

function createToranaArch() {
  const group = new THREE.Group();
  const colGeo = new THREE.BoxGeometry(0.7, 5.5, 0.7);
  const colMat = new THREE.MeshStandardMaterial({ color: 0x73321d });

  const left = new THREE.Mesh(colGeo, colMat);
  left.position.set(-3.5, 2.75, 0);

  const right = new THREE.Mesh(colGeo, colMat);
  right.position.set(3.5, 2.75, 0);

  const beamGeo = new THREE.BoxGeometry(8.5, 0.6, 0.8);
  const beam = new THREE.Mesh(beamGeo, colMat);
  beam.position.set(0, 5.2, 0);

  group.add(left, right, beam);
  return group;
}