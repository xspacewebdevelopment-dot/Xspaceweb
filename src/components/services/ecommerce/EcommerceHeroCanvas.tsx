"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export interface NodePosition {
  id: string;
  name: string;
  target3D: THREE.Vector3;
  screenPos: { x: number; y: number; visible: boolean };
}

interface EcommerceHeroCanvasProps {
  progress: number; // 0 to 1 scroll scrub progress
  className?: string;
  onNodesUpdate?: (nodes: Array<{ id: string; x: number; y: number; visible: boolean }>) => void;
}

export const EcommerceHeroCanvas: React.FC<EcommerceHeroCanvasProps> = ({
  progress,
  className = "",
  onNodesUpdate,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  const onNodesUpdateRef = useRef(onNodesUpdate);
  onNodesUpdateRef.current = onNodesUpdate;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- 1. Scene & Renderer Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04061a, 0.022);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 120);
    camera.position.set(0, 0.2, 7.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // --- 2. Lighting: Tuned for Rich Deep Space Atmosphere ---
    const ambientLight = new THREE.AmbientLight(0x8da2c4, 0.85);
    scene.add(ambientLight);

    // Brilliant Cyan Key Light
    const keyLight = new THREE.PointLight(0x38bdf8, 3.8, 35);
    keyLight.position.set(6, 6, 6);
    scene.add(keyLight);

    // Deep Cosmic Purple / Violet Rim Light
    const fillLight = new THREE.PointLight(0xa855f7, 3.2, 35);
    fillLight.position.set(-7, -4, 4);
    scene.add(fillLight);

    // Interstellar Cyan / Emerald Core Light
    const coreLight = new THREE.PointLight(0x10b981, 1.4, 25);
    coreLight.position.set(0, 0, 1);
    scene.add(coreLight);

    // Cosmic Backlight (Stellar depth)
    const backLight = new THREE.PointLight(0x6366f1, 2.5, 30);
    backLight.position.set(0, 4, -6);
    scene.add(backLight);

    // --- 3. Master Groups ---
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // =========================================================================
    // REALISTIC DEEP SPACE COSMOS: Stars, Nebula Clouds, Floating Stardust & Meteors
    // =========================================================================

    // A. Procedural Circular Soft Glow Star Texture
    const createStarTexture = (): THREE.Texture => {
      const cvs = document.createElement("canvas");
      cvs.width = 64;
      cvs.height = 64;
      const ctx = cvs.getContext("2d")!;
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.18, "rgba(235, 245, 255, 0.95)");
      grad.addColorStop(0.42, "rgba(160, 210, 255, 0.45)");
      grad.addColorStop(0.72, "rgba(192, 132, 252, 0.15)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      const tex = new THREE.CanvasTexture(cvs);
      tex.needsUpdate = true;
      return tex;
    };

    // B. Procedural Sparkle Diffraction Star Texture
    const createSparkleStarTexture = (): THREE.Texture => {
      const cvs = document.createElement("canvas");
      cvs.width = 128;
      cvs.height = 128;
      const ctx = cvs.getContext("2d")!;
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.16, "rgba(215, 235, 255, 0.9)");
      grad.addColorStop(0.38, "rgba(168, 85, 247, 0.42)");
      grad.addColorStop(0.7, "rgba(56, 189, 248, 0.12)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);

      ctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(64, 18);
      ctx.lineTo(64, 110);
      ctx.moveTo(18, 64);
      ctx.lineTo(110, 64);
      ctx.stroke();

      const tex = new THREE.CanvasTexture(cvs);
      tex.needsUpdate = true;
      return tex;
    };

    // C. Procedural Volumetric Nebula Cloud Texture
    const createNebulaCloudTexture = (r: number, g: number, b: number): THREE.Texture => {
      const cvs = document.createElement("canvas");
      cvs.width = 256;
      cvs.height = 256;
      const ctx = cvs.getContext("2d")!;
      const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.5)`);
      grad.addColorStop(0.32, `rgba(${r}, ${g}, ${b}, 0.28)`);
      grad.addColorStop(0.65, `rgba(${r}, ${g}, ${b}, 0.09)`);
      grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);
      const tex = new THREE.CanvasTexture(cvs);
      tex.needsUpdate = true;
      return tex;
    };

    const starTexture = createStarTexture();
    const sparkleStarTexture = createSparkleStarTexture();

    // 1. Distant Realistic Starfield (2,600 stars with varied colors and individual twinkle phases)
    const starCount = 2600;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    const starTwinklePhases = new Float32Array(starCount);
    const starTwinkleSpeeds = new Float32Array(starCount);

    const paletteColors = [
      new THREE.Color(0xffffff), // Diamond Pure White
      new THREE.Color(0xf0f9ff), // Polar White-Blue
      new THREE.Color(0x38bdf8), // Electric Cyan
      new THREE.Color(0x60a5fa), // Celestial Sapphire
      new THREE.Color(0xc084fc), // Interstellar Lavender
      new THREE.Color(0xa855f7), // Cosmic Purple
      new THREE.Color(0x818cf8), // Deep Violet-Indigo
      new THREE.Color(0xfef08a), // Solar Gold Star
    ];

    for (let i = 0; i < starCount; i++) {
      // Celestial sphere distribution with natural depth
      const radius = 22 + Math.random() * 48;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi) - 6;

      const col = paletteColors[Math.floor(Math.random() * paletteColors.length)];
      starColors[i * 3] = col.r;
      starColors[i * 3 + 1] = col.g;
      starColors[i * 3 + 2] = col.b;

      starSizes[i] = Math.random() * 0.16 + 0.05;
      starTwinklePhases[i] = Math.random() * Math.PI * 2;
      starTwinkleSpeeds[i] = 1.2 + Math.random() * 3.5;
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.14,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 2. Sparkling Stellar Beacons (130 high-intensity stars with cross-spike glow)
    const beaconCount = 130;
    const sparkleBeaconGeo = new THREE.BufferGeometry();
    const beaconPositions = new Float32Array(beaconCount * 3);
    const beaconColors = new Float32Array(beaconCount * 3);

    for (let i = 0; i < beaconCount; i++) {
      const radius = 18 + Math.random() * 35;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      beaconPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      beaconPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      beaconPositions[i * 3 + 2] = radius * Math.cos(phi) - 4;

      const col = paletteColors[Math.floor(Math.random() * 6)]; // cyan, purple, white
      beaconColors[i * 3] = col.r;
      beaconColors[i * 3 + 1] = col.g;
      beaconColors[i * 3 + 2] = col.b;
    }

    sparkleBeaconGeo.setAttribute("position", new THREE.BufferAttribute(beaconPositions, 3));
    sparkleBeaconGeo.setAttribute("color", new THREE.BufferAttribute(beaconColors, 3));

    const beaconStarMat = new THREE.PointsMaterial({
      size: 0.38,
      map: sparkleStarTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const sparkleStars = new THREE.Points(sparkleBeaconGeo, beaconStarMat);
    scene.add(sparkleStars);

    // 3. Floating Cosmic Stardust Particles (1,100 active drifting particles moving in 3D around core)
    const stardustCount = 1100;
    const stardustGeo = new THREE.BufferGeometry();
    const stardustPositions = new Float32Array(stardustCount * 3);
    const stardustBasePositions = new Float32Array(stardustCount * 3);
    const stardustColors = new Float32Array(stardustCount * 3);
    const stardustSpeeds = new Float32Array(stardustCount);

    for (let i = 0; i < stardustCount; i++) {
      const x = (Math.random() - 0.5) * 26;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 16 - 1;

      stardustPositions[i * 3] = x;
      stardustPositions[i * 3 + 1] = y;
      stardustPositions[i * 3 + 2] = z;

      stardustBasePositions[i * 3] = x;
      stardustBasePositions[i * 3 + 1] = y;
      stardustBasePositions[i * 3 + 2] = z;

      // Indigo-cyan-purple nebula hues
      const isPurple = Math.random() > 0.5;
      stardustColors[i * 3] = isPurple ? 0.75 : 0.22; // R
      stardustColors[i * 3 + 1] = isPurple ? 0.35 : 0.74; // G
      stardustColors[i * 3 + 2] = 0.98; // B

      stardustSpeeds[i] = 0.6 + Math.random() * 1.4;
    }

    stardustGeo.setAttribute("position", new THREE.BufferAttribute(stardustPositions, 3));
    stardustGeo.setAttribute("color", new THREE.BufferAttribute(stardustColors, 3));

    const stardustMat = new THREE.PointsMaterial({
      size: 0.08,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const stardustParticles = new THREE.Points(stardustGeo, stardustMat);
    scene.add(stardustParticles);

    // 4. Volumetric 3D Deep Space Nebula Clouds (Purplish, Bluish Cosmic Atmosphere)
    const nebulaGroup = new THREE.Group();
    scene.add(nebulaGroup);

    const nebulaConfigs = [
      { r: 168, g: 85, b: 247, x: -7, y: 4, z: -16, scale: 14, rotSpeed: 0.0004 },  // Violet
      { r: 37, g: 99, b: 235, x: 8, y: -3, z: -15, scale: 16, rotSpeed: -0.0003 }, // Royal Blue
      { r: 6, g: 182, b: 212, x: 5, y: 5, z: -13, scale: 12, rotSpeed: 0.0005 },   // Electric Cyan
      { r: 147, g: 51, b: 234, x: -5, y: -5, z: -14, scale: 15, rotSpeed: -0.0004 },// Purple Deep
      { r: 99, g: 102, b: 241, x: 0, y: 1, z: -17, scale: 18, rotSpeed: 0.0003 },   // Indigo Core
      { r: 217, g: 70, b: 239, x: -9, y: 0, z: -15, scale: 11, rotSpeed: -0.0005 }, // Magenta Filament
      { r: 56, g: 189, b: 248, x: -2, y: 6, z: -12, scale: 13, rotSpeed: 0.0004 },  // Cyan Halo
      { r: 124, g: 58, b: 237, x: 6, y: -6, z: -16, scale: 14, rotSpeed: -0.0003 }, // Violet Depths
    ];

    const nebulaPlanes: Array<{ mesh: THREE.Mesh; rotSpeed: number; baseScale: number }> = [];

    nebulaConfigs.forEach((cfg) => {
      const tex = createNebulaCloudTexture(cfg.r, cfg.g, cfg.b);
      const geo = new THREE.PlaneGeometry(1, 1);
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        opacity: 0.42,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(cfg.x, cfg.y, cfg.z);
      mesh.scale.set(cfg.scale, cfg.scale, 1);
      nebulaGroup.add(mesh);
      nebulaPlanes.push({ mesh, rotSpeed: cfg.rotSpeed, baseScale: cfg.scale });
    });

    // 5. Dynamic Cosmic Shooting Stars (Meteors streaking across the sky)
    interface Meteor {
      line: THREE.Line;
      geo: THREE.BufferGeometry;
      head: THREE.Vector3;
      velocity: THREE.Vector3;
      active: boolean;
      life: number;
      maxLife: number;
      respawnDelay: number;
    }

    const meteors: Meteor[] = [];
    for (let m = 0; m < 2; m++) {
      const meteorPoints = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)];
      const meteorGeo = new THREE.BufferGeometry().setFromPoints(meteorPoints);
      const meteorMat = new THREE.LineBasicMaterial({
        color: m === 0 ? 0x38bdf8 : 0xc084fc,
        transparent: true,
        opacity: 0,
        linewidth: 2,
        blending: THREE.AdditiveBlending,
      });
      const meteorLine = new THREE.Line(meteorGeo, meteorMat);
      scene.add(meteorLine);

      meteors.push({
        line: meteorLine,
        geo: meteorGeo,
        head: new THREE.Vector3(),
        velocity: new THREE.Vector3(),
        active: false,
        life: 0,
        maxLife: 50,
        respawnDelay: 40 + m * 80,
      });
    }

    const triggerMeteor = (meteor: Meteor) => {
      const startX = (Math.random() - 0.5) * 16 - 2;
      const startY = 6 + Math.random() * 4;
      const startZ = -4 - Math.random() * 8;
      meteor.head.set(startX, startY, startZ);

      // Downward angled trajectory
      const angle = -Math.PI / 4 + (Math.random() - 0.5) * 0.4;
      const speed = 0.45 + Math.random() * 0.35;
      meteor.velocity.set(Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1), -Math.sin(Math.abs(angle)) * speed, -speed * 0.2);

      meteor.active = true;
      meteor.life = 0;
      meteor.maxLife = 35 + Math.floor(Math.random() * 25);
    };

    // --- 5. STAGE 1: The Sleek 3D Product Artifact ---
    const productGroup = new THREE.Group();
    masterGroup.add(productGroup);

    // 5a. Core Faceted Crystal Monolith
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.8,
      roughness: 0.15,
      metalness: 0.9,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });
    const coreGeo = new THREE.OctahedronGeometry(1.2, 2);
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    productGroup.add(coreMesh);

    // 5b. Internal Luminous Energy Core
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const innerCoreGeo = new THREE.IcosahedronGeometry(0.75, 1);
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    productGroup.add(innerCoreMesh);

    // 5c. Rotating Gyroscope Rings (Precision titanium engineering)
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.95,
      roughness: 0.2,
      wireframe: false,
    });
    const ringGeo1 = new THREE.TorusGeometry(1.65, 0.024, 16, 100);
    const ring1 = new THREE.Mesh(ringGeo1, ringMat);
    productGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(1.85, 0.02, 16, 100);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat);
    ring2.rotation.x = Math.PI / 2;
    productGroup.add(ring2);

    // 5d. Outer Shards/Facets (These will unfold into the storefront in Stage 2)
    const facetCount = 6;
    const facets: THREE.Mesh[] = [];
    const facetMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.3,
      transparent: true,
      opacity: 0.9,
    });

    for (let i = 0; i < facetCount; i++) {
      const angle = (i / facetCount) * Math.PI * 2;
      const facetGeo = new THREE.BoxGeometry(0.55, 0.85, 0.08);
      const facet = new THREE.Mesh(facetGeo, facetMat);
      facet.position.set(Math.cos(angle) * 1.35, Math.sin(angle) * 0.4, Math.sin(angle) * 1.35);
      facet.rotation.y = -angle;
      productGroup.add(facet);
      facets.push(facet);
    }

    // 5e. Holographic Calibration Pedestal Grid
    const pedestalGeo = new THREE.RingGeometry(0.4, 2.4, 48);
    const pedestalMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
      side: THREE.DoubleSide,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.rotation.x = Math.PI / 2;
    pedestal.position.y = -1.6;
    productGroup.add(pedestal);

    // --- 6. STAGE 2: Digital Storefront Architecture ---
    const storefrontGroup = new THREE.Group();
    storefrontGroup.visible = false;
    masterGroup.add(storefrontGroup);

    // 6a. Architectural Foundation Slab
    const platformGeo = new THREE.BoxGeometry(3.6, 0.16, 3.2);
    const platformMat = new THREE.MeshPhysicalMaterial({
      color: 0x091427,
      emissive: 0x0d2847,
      metalness: 0.9,
      roughness: 0.2,
      clearcoat: 0.6,
    });
    const platform = new THREE.Mesh(platformGeo, platformMat);
    platform.position.y = -1.4;
    storefrontGroup.add(platform);

    // 6b. Platform Cyber Grid Accent lines
    const gridHelper = new THREE.GridHelper(3.6, 12, 0x38bdf8, 0x1e3a5f);
    gridHelper.position.y = -1.31;
    storefrontGroup.add(gridHelper);

    // 6c. Storefront Canopy & Portal Arches
    const portalArchMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e293b,
      metalness: 0.9,
      roughness: 0.15,
      transparent: true,
      opacity: 0.95,
    });
    const archPillar1 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.2, 0.2), portalArchMat);
    archPillar1.position.set(-1.4, -0.3, 1.2);
    storefrontGroup.add(archPillar1);

    const archPillar2 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.2, 0.2), portalArchMat);
    archPillar2.position.set(1.4, -0.3, 1.2);
    storefrontGroup.add(archPillar2);

    const archPillar3 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.2, 0.2), portalArchMat);
    archPillar3.position.set(-1.4, -0.3, -1.2);
    storefrontGroup.add(archPillar3);

    const archPillar4 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.2, 0.2), portalArchMat);
    archPillar4.position.set(1.4, -0.3, -1.2);
    storefrontGroup.add(archPillar4);

    // Roof Canopy Glass
    const canopyMat = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      transmission: 0.85,
      opacity: 0.75,
      transparent: true,
      roughness: 0.1,
      metalness: 0.1,
      ior: 1.5,
    });
    const canopy = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.12, 2.8), canopyMat);
    canopy.position.y = 0.85;
    storefrontGroup.add(canopy);

    // Storefront Luminous Display Glass
    const glassDisplayMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.4,
      transmission: 0.9,
      transparent: true,
      opacity: 0.6,
      roughness: 0.05,
    });
    const glassDisplay = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.6, 0.08), glassDisplayMat);
    glassDisplay.position.set(0, -0.3, 0);
    storefrontGroup.add(glassDisplay);

    // Storefront Digital Apex Beacon
    const beaconGeo = new THREE.ConeGeometry(0.3, 0.6, 6);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.position.y = 1.35;
    storefrontGroup.add(beacon);

    // --- 7. STAGE 2 & 3: Organic Network Conduits & Marketplace Nodes ---
    const ecosystemGroup = new THREE.Group();
    masterGroup.add(ecosystemGroup);

    interface MarketplaceTarget {
      id: string;
      name: string;
      coords: THREE.Vector3;
    }

    const marketplaceTargets: MarketplaceTarget[] = [
      { id: "amazon", name: "Amazon", coords: new THREE.Vector3(-4.4, 2.1, -0.5) },
      { id: "flipkart", name: "Flipkart", coords: new THREE.Vector3(4.4, 1.9, -0.6) },
      { id: "meesho", name: "Meesho", coords: new THREE.Vector3(-4.6, -1.7, 0.4) },
      { id: "ajio", name: "AJIO", coords: new THREE.Vector3(4.6, -1.5, 0.5) },
      { id: "myntra", name: "Myntra", coords: new THREE.Vector3(-2.1, 3.6, -1.1) },
      { id: "shopify", name: "Shopify", coords: new THREE.Vector3(2.3, 3.5, -0.9) },
      { id: "woocommerce", name: "WooCommerce", coords: new THREE.Vector3(0.0, -3.2, 0.6) },
    ];

    interface ConduitData {
      id: string;
      curve: THREE.CatmullRomCurve3;
      line: THREE.Line;
      particles: THREE.Mesh[]; // Flowing packages / orders
      anchorNode: THREE.Mesh;
      pulseRing: THREE.Mesh;
      targetCoords: THREE.Vector3;
    }

    const conduits: ConduitData[] = [];
    const packageMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 1.4,
      metalness: 0.7,
      roughness: 0.2,
    });

    marketplaceTargets.forEach((target) => {
      // Create organic curved 3D spline
      const startPt = new THREE.Vector3(0, 0, 0);
      const midPt = new THREE.Vector3(
        target.coords.x * 0.45 + (Math.random() - 0.5) * 0.5,
        target.coords.y * 0.45 + (Math.random() - 0.5) * 0.5,
        target.coords.z * 0.5 + 0.5
      );
      const endPt = target.coords.clone();

      const curve = new THREE.CatmullRomCurve3([startPt, midPt, endPt]);
      const points = curve.getPoints(50);
      const splineGeo = new THREE.BufferGeometry().setFromPoints(points);

      // Line with cyber glowing appearance
      const splineMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0,
        linewidth: 1.5,
      });
      const line = new THREE.Line(splineGeo, splineMat);
      ecosystemGroup.add(line);

      // 3D Anchor Node at target
      const anchorGeo = new THREE.SphereGeometry(0.24, 16, 16);
      const anchorMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        emissive: 0x38bdf8,
        emissiveIntensity: 0.7,
        metalness: 0.9,
        roughness: 0.1,
      });
      const anchorNode = new THREE.Mesh(anchorGeo, anchorMat);
      anchorNode.position.copy(target.coords);
      anchorNode.scale.setScalar(0.001);
      ecosystemGroup.add(anchorNode);

      // Pulse ring surrounding the node
      const pulseGeo = new THREE.RingGeometry(0.3, 0.42, 32);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      });
      const pulseRing = new THREE.Mesh(pulseGeo, pulseMat);
      pulseRing.position.copy(target.coords);
      pulseRing.scale.setScalar(0.001);
      ecosystemGroup.add(pulseRing);

      // Miniature flowing 3D packages/orders along the spline
      const pkgs: THREE.Mesh[] = [];
      for (let p = 0; p < 3; p++) {
        const pkgGeo = new THREE.BoxGeometry(0.14, 0.14, 0.14);
        const pkg = new THREE.Mesh(pkgGeo, packageMat);
        pkg.visible = false;
        ecosystemGroup.add(pkg);
        pkgs.push(pkg);
      }

      conduits.push({
        id: target.id,
        curve,
        line,
        particles: pkgs,
        anchorNode,
        pulseRing,
        targetCoords: target.coords,
      });
    });

    // --- 8. STAGE 3: Holographic 3D Sales & Growth Visualization ---
    const salesVisualizationGroup = new THREE.Group();
    salesVisualizationGroup.visible = false;
    masterGroup.add(salesVisualizationGroup);

    // 8a. Holographic Exponential Growth Curve Spline
    const salesPts = [
      new THREE.Vector3(-4.5, -2.5, -1.5),
      new THREE.Vector3(-2.5, -1.8, -1.2),
      new THREE.Vector3(-0.5, -1.0, -0.8),
      new THREE.Vector3(1.5, 0.2, -0.4),
      new THREE.Vector3(3.2, 1.8, 0.2),
      new THREE.Vector3(4.8, 3.4, 0.8),
    ];
    const salesCurve = new THREE.CatmullRomCurve3(salesPts);
    const salesGeo = new THREE.BufferGeometry().setFromPoints(salesCurve.getPoints(80));
    const salesLineMat = new THREE.LineBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.85,
    });
    const salesLine = new THREE.Line(salesGeo, salesLineMat);
    salesVisualizationGroup.add(salesLine);

    // 8b. Holographic milestone spheres along growth curve
    const milestoneMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
    salesPts.forEach((pt) => {
      const ms = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), milestoneMat);
      ms.position.copy(pt);
      salesVisualizationGroup.add(ms);
    });

    // 8c. Volumetric Sales Grid Plane
    const salesGrid = new THREE.GridHelper(8, 16, 0x10b981, 0x064e3b);
    salesGrid.position.set(0, -2.6, -1);
    salesVisualizationGroup.add(salesGrid);

    // --- 9. Mouse Parallax Variables ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // --- 10. Animation Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const t = progressRef.current; // 0 to 1

      // Mouse Parallax Lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Restrained parallax camera tilt
      camera.rotation.y = mouse.x * 0.04;
      camera.rotation.x = mouse.y * 0.03;

      // 1. Distant Starfield Slow Celestial Rotation & Twinkling
      starField.rotation.y = elapsedTime * 0.005;
      starField.rotation.x = Math.sin(elapsedTime * 0.003) * 0.015;
      starMat.opacity = 0.82 + Math.sin(elapsedTime * 1.5) * 0.08;

      // 2. Sparkling Stellar Beacons Breathing Pulse
      sparkleStars.rotation.y = -elapsedTime * 0.003;
      sparkleStars.rotation.z = Math.sin(elapsedTime * 0.004) * 0.02;
      beaconStarMat.opacity = 0.78 + Math.sin(elapsedTime * 2.8) * 0.18;

      // 3. Floating Cosmic Stardust: Active 3D harmonic wave drift
      const dustPos = stardustGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < stardustCount; i++) {
        const speed = stardustSpeeds[i];
        const baseX = stardustBasePositions[i * 3];
        const baseY = stardustBasePositions[i * 3 + 1];
        const baseZ = stardustBasePositions[i * 3 + 2];

        dustPos[i * 3] = baseX + Math.sin(elapsedTime * speed * 0.8 + i) * 0.45;
        dustPos[i * 3 + 1] = baseY + Math.cos(elapsedTime * speed * 0.6 + i * 0.7) * 0.4;
        dustPos[i * 3 + 2] = baseZ + Math.sin(elapsedTime * speed * 0.5 + i * 1.2) * 0.35 + t * 2.0;
      }
      stardustGeo.attributes.position.needsUpdate = true;
      stardustParticles.rotation.y = elapsedTime * 0.012;

      // 4. Volumetric Nebula Clouds: Organic breathing & mouse parallax shift
      nebulaPlanes.forEach((np, idx) => {
        np.mesh.rotation.z += np.rotSpeed;
        const pulse = 1 + Math.sin(elapsedTime * 0.4 + idx * 0.8) * 0.06;
        np.mesh.scale.set(np.baseScale * pulse, np.baseScale * pulse, 1);
      });

      // 5. Dynamic Cosmic Shooting Stars (Meteors)
      meteors.forEach((m) => {
        if (!m.active) {
          m.respawnDelay--;
          if (m.respawnDelay <= 0) {
            triggerMeteor(m);
          }
        } else {
          m.life++;
          m.head.add(m.velocity);
          const pts = [
            m.head.clone(),
            m.head.clone().sub(m.velocity.clone().multiplyScalar(4.5)),
          ];
          m.geo.setFromPoints(pts);

          // Alpha fade in and fade out
          const lifeProgress = m.life / m.maxLife;
          const mat = m.line.material as THREE.LineBasicMaterial;
          if (lifeProgress < 0.2) {
            mat.opacity = (lifeProgress / 0.2) * 0.95;
          } else {
            mat.opacity = (1 - (lifeProgress - 0.2) / 0.8) * 0.95;
          }

          if (m.life >= m.maxLife) {
            m.active = false;
            mat.opacity = 0;
            m.respawnDelay = 50 + Math.floor(Math.random() * 120);
          }
        }
      });

      // ==========================================
      // STAGE PROGRESSION LOGIC (Continuous smooth interpolation)
      // ==========================================

      // --- STAGE 1: 0.0 -> 0.35 (BUILD: Product Artifact) ---
      if (t < 0.4) {
        productGroup.visible = true;
        storefrontGroup.visible = t > 0.15;

        // Subtle restrained product floating & rotation
        coreMesh.rotation.y = elapsedTime * 0.35 + t * 4;
        coreMesh.rotation.x = Math.sin(elapsedTime * 0.25) * 0.2;
        innerCoreMesh.rotation.y = -elapsedTime * 0.5;

        ring1.rotation.y = elapsedTime * 0.45;
        ring2.rotation.z = elapsedTime * 0.35;

        // Transformation unfolding: as t goes from 0.15 to 0.38
        const unfoldFactor = THREE.MathUtils.smoothstep(t, 0.12, 0.38);
        facets.forEach((facet, idx) => {
          const angle = (idx / facetCount) * Math.PI * 2;
          const dist = 1.35 + unfoldFactor * 1.8;
          facet.position.set(
            Math.cos(angle) * dist,
            Math.sin(angle) * 0.4 + unfoldFactor * 0.8,
            Math.sin(angle) * dist
          );
          facet.scale.setScalar(1 - unfoldFactor * 0.4);
          facet.rotation.x = unfoldFactor * (Math.PI / 3);
        });

        // Storefront rises as product dissolves/unfolds
        storefrontGroup.scale.setScalar(unfoldFactor);
        platform.position.y = -1.4 * unfoldFactor;
        canopy.position.y = 0.85 * unfoldFactor;

        // Shrink product core slightly as storefront takes over
        productGroup.scale.setScalar(1 - unfoldFactor * 0.7);
        coreMat.opacity = 1 - unfoldFactor * 0.6;
      } else {
        productGroup.visible = false;
        storefrontGroup.visible = true;
        storefrontGroup.scale.setScalar(1);
      }

      // --- STAGE 2: 0.28 -> 0.70 (LAUNCH: Network Conduits & Marketplace Nodes) ---
      const launchProgress = THREE.MathUtils.smoothstep(t, 0.26, 0.58);
      const networkOpacity = THREE.MathUtils.smoothstep(t, 0.3, 0.52);

      conduits.forEach((c, idx) => {
        // Line growth & opacity
        const lineMat = c.line.material as THREE.LineBasicMaterial;
        lineMat.opacity = networkOpacity * 0.8;

        // Progressive node appearance
        const nodeThreshold = 0.3 + (idx / conduits.length) * 0.22;
        const nodeAppear = THREE.MathUtils.smoothstep(t, nodeThreshold, nodeThreshold + 0.12);

        c.anchorNode.scale.setScalar(nodeAppear * (1 + Math.sin(elapsedTime * 3 + idx) * 0.08));
        c.pulseRing.scale.setScalar(nodeAppear * (1 + (elapsedTime * 1.2 + idx * 0.5) % 1.5));
        const pulseMat = c.pulseRing.material as THREE.MeshBasicMaterial;
        pulseMat.opacity = (1 - ((elapsedTime * 1.2 + idx * 0.5) % 1.5) / 1.5) * nodeAppear * 0.7;
        c.pulseRing.lookAt(camera.position);

        // Order/package flow along spline
        c.particles.forEach((pkg, pIdx) => {
          if (t >= 0.32) {
            pkg.visible = true;
            // Travel head position along curve: time-driven + scroll-accelerated
            const speed = 0.25 + t * 0.35;
            const progressAlong = (elapsedTime * speed + pIdx * 0.33 + idx * 0.15) % 1.0;
            const pt = c.curve.getPointAt(progressAlong);
            pkg.position.copy(pt);
            pkg.rotation.x = elapsedTime * 2;
            pkg.rotation.y = elapsedTime * 2;
            pkg.scale.setScalar(0.7 + Math.sin(progressAlong * Math.PI) * 0.4);
          } else {
            pkg.visible = false;
          }
        });
      });

      // --- STAGE 3: 0.52 -> 0.88 (SCALE: Camera Zoom Out & Growth Telemetry) ---
      const scaleProgress = THREE.MathUtils.smoothstep(t, 0.48, 0.82);

      // Camera pull-back (smooth cinematic zoom out revealing complete ecosystem)
      const targetCamZ = THREE.MathUtils.lerp(7.2, 14.8, scaleProgress);
      const targetCamY = THREE.MathUtils.lerp(0.2, 1.6, scaleProgress);
      camera.position.z += (targetCamZ - camera.position.z) * 0.12;
      camera.position.y += (targetCamY - camera.position.y) * 0.12;

      // Volumetric 3D Sales Growth Visualization
      if (t > 0.52) {
        salesVisualizationGroup.visible = true;
        const salesAppear = THREE.MathUtils.smoothstep(t, 0.54, 0.8);
        salesVisualizationGroup.scale.setScalar(salesAppear);
        salesLineMat.opacity = salesAppear * 0.9;
        salesVisualizationGroup.rotation.y = Math.sin(elapsedTime * 0.2) * 0.08;
      } else {
        salesVisualizationGroup.visible = false;
      }

      // Storefront beacon light pulse
      beacon.rotation.y = elapsedTime * 1.5;
      keyLight.intensity = 3.5 + Math.sin(elapsedTime * 2) * 0.8;
      coreLight.intensity = THREE.MathUtils.lerp(1.2, 4.0, scaleProgress);

      // --- STAGE 4: 0.85 -> 1.0 (Exit Transition upward into Next Section) ---
      if (t > 0.82) {
        const exitProgress = THREE.MathUtils.smoothstep(t, 0.82, 1.0);
        masterGroup.position.y = exitProgress * 4.2;
        masterGroup.rotation.x = -exitProgress * 0.25;
        masterGroup.scale.setScalar(1 - exitProgress * 0.22);
      } else {
        masterGroup.position.y = 0;
        masterGroup.rotation.x = 0;
        masterGroup.scale.setScalar(1);
      }

      // Project 3D Node Positions to 2D Screen Space for UI synchronization
      if (onNodesUpdateRef.current && conduits.length > 0) {
        const nodeScreenData = conduits.map((c) => {
          const worldPos = c.targetCoords.clone();
          worldPos.applyMatrix4(masterGroup.matrixWorld);
          worldPos.project(camera);

          const screenX = (worldPos.x * 0.5 + 0.5) * width;
          const screenY = (-worldPos.y * 0.5 + 0.5) * height;
          const visible = t >= 0.32 && worldPos.z < 1.0;

          return {
            id: c.id,
            x: screenX,
            y: screenY,
            visible,
          };
        });

        onNodesUpdateRef.current(nodeScreenData);
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- 11. Resize Observer ---
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // --- 12. Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      starGeo.dispose();
      starMat.dispose();
      starTexture.dispose();
      sparkleBeaconGeo.dispose();
      beaconStarMat.dispose();
      sparkleStarTexture.dispose();
      stardustGeo.dispose();
      stardustMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      innerCoreGeo.dispose();
      innerCoreMat.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      ringMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
};
