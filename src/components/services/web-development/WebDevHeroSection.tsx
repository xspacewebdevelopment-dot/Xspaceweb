"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { mergeVertices, mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { ArrowLeft, ArrowRight, Code2 } from "lucide-react";

export interface WebDevHeroSectionProps {
  onStartProject?: () => void;
  className?: string;
}

const MODEL_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260929_212926_92423081-b0e4-4f5a-b650-14af6c05c058.glb";

export const WebDevHeroSection: React.FC<WebDevHeroSectionProps> = ({
  onStartProject,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeDot, setActiveDot] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  // References for external button clicks to rotate the 3D cube
  const rotateStepRef = useRef<(rad: number) => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = containerRef.current;
    if (!canvas || !hero) return;

    // 1. Renderer & Camera
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x020204, 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);

    // 2. Offscreen 2D Canvas for Headline Texture
    const textCanvas = document.createElement("canvas");
    const textCtx = textCanvas.getContext("2d");
    const bgTex = new THREE.CanvasTexture(textCanvas);
    bgTex.colorSpace = THREE.SRGBColorSpace;
    bgTex.minFilter = THREE.LinearFilter;
    bgTex.magFilter = THREE.LinearFilter;
    bgTex.generateMipmaps = false;

    // Fullscreen quad for background in its own scene
    const bgScene = new THREE.Scene();
    const bgMat = new THREE.ShaderMaterial({
      uniforms: {
        uTex: { value: bgTex },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTex;
        varying vec2 vUv;
        void main() {
          gl_FragColor = texture2D(uTex, vUv);
          #include <colorspace_fragment>
        }
      `,
      depthTest: false,
      depthWrite: false,
    });
    const bgQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), bgMat);
    bgQuad.frustumCulled = false;
    bgScene.add(bgQuad);

    // 3. Render Targets for Two-Pass Refraction
    let rtBack: THREE.WebGLRenderTarget | null = null;
    let rtFront: THREE.WebGLRenderTarget | null = null;

    // 4. Custom Glass Shader Materials
    const glassUniformsBase = {
      uResolution: { value: new THREE.Vector2(1, 1) },
      uTexture: { value: null as THREE.Texture | null },
      uChromatic: { value: 0.5 },
      uSaturation: { value: 1.08 },
      uShininess: { value: 90.0 },
      uDiffuseness: { value: 0.02 },
      uFresnelPower: { value: 5.0 },
      uLight: { value: new THREE.Vector3(-1.0, 1.0, 1.0) },
    };

    const vertexShader = `
      varying vec3 vNormal;
      varying vec3 vEye;
      void main() {
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vec4 mvPos = viewMatrix * worldPos;
        gl_Position = projectionMatrix * mvPos;
        vNormal = normalize(normalMatrix * normal);
        vEye = normalize(mvPos.xyz);
      }
    `;

    const fragmentShader = `
      uniform vec2 uResolution;
      uniform sampler2D uTexture;
      uniform float uRefractPower;
      uniform float uChromatic;
      uniform float uSaturation;
      uniform float uShininess;
      uniform float uDiffuseness;
      uniform float uFresnelPower;
      uniform vec3 uLight;
      uniform float uBackside;

      varying vec3 vNormal;
      varying vec3 vEye;

      const float uIorR = 1.15;
      const float uIorY = 1.16;
      const float uIorG = 1.18;
      const float uIorC = 1.22;
      const float uIorB = 1.22;
      const float uIorP = 1.22;

      float specFunc(vec3 n, vec3 l, vec3 view, float shininess, float diffuseness) {
        vec3 h = normalize(l + view);
        return pow(max(dot(n, h), 0.0), shininess) + max(0.0, dot(n, l)) * diffuseness;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution;
        vec3 n = normalize(vNormal);
        if (uBackside > 0.5) n = -n;
        vec3 eye = normalize(vEye);
        vec3 view = -eye;

        vec3 color = vec3(0.0);
        const int LOOP = 16;
        for (int i = 0; i < LOOP; i++) {
          float slide = float(i) / float(LOOP) * 0.045;

          vec3 refrR = refract(eye, n, 1.0 / uIorR);
          vec3 refrY = refract(eye, n, 1.0 / uIorY);
          vec3 refrG = refract(eye, n, 1.0 / uIorG);
          vec3 refrC = refract(eye, n, 1.0 / uIorC);
          vec3 refrB = refract(eye, n, 1.0 / uIorB);
          vec3 refrP = refract(eye, n, 1.0 / uIorP);

          vec4 texR = texture2D(uTexture, uv + refrR.xy * (uRefractPower + slide * 1.0) * uChromatic);
          vec4 texY = texture2D(uTexture, uv + refrY.xy * (uRefractPower + slide * 1.0) * uChromatic);
          vec4 texG = texture2D(uTexture, uv + refrG.xy * (uRefractPower + slide * 2.0) * uChromatic);
          vec4 texC = texture2D(uTexture, uv + refrC.xy * (uRefractPower + slide * 2.5) * uChromatic);
          vec4 texB = texture2D(uTexture, uv + refrB.xy * (uRefractPower + slide * 3.0) * uChromatic);
          vec4 texP = texture2D(uTexture, uv + refrP.xy * (uRefractPower + slide * 1.0) * uChromatic);

          float r = texR.r * 0.5;
          float y = (texY.r * 2.0 + texY.g * 2.0 - texY.b) / 6.0;
          float g = texG.g * 0.5;
          float c = (texC.g * 2.0 + texC.b * 2.0 - texC.r) / 6.0;
          float b = texB.b * 0.5;
          float p = (texP.b * 2.0 + texP.r * 2.0 - texP.g) / 6.0;

          float R = r + (2.0 * p + 2.0 * y - c) / 3.0;
          float G = g + (2.0 * y + 2.0 * c - p) / 3.0;
          float B = b + (2.0 * c + 2.0 * p - y) / 3.0;

          color += vec3(R, G, B);
        }

        color /= float(LOOP);

        float luma = dot(color, vec3(0.2125, 0.7154, 0.0721));
        color = mix(vec3(luma), color, uSaturation);

        vec3 l1 = normalize(-uLight);
        vec3 l2 = normalize(-vec3(1.0, 1.0, -1.0));
        float spec = specFunc(n, l1, view, uShininess, uDiffuseness) + 0.6 * specFunc(n, l2, view, uShininess * 0.6, uDiffuseness * 0.5);
        color += spec * (uBackside > 0.5 ? 0.35 : 1.0);

        float f = pow(clamp(1.0 + dot(eye, n), 0.0, 1.0), uFresnelPower);
        color = mix(color, vec3(1.0), f * (uBackside > 0.5 ? 0.25 : 0.55));

        color += vec3(0.004, 0.005, 0.007);
        gl_FragColor = vec4(color, 1.0);
        #include <colorspace_fragment>
      }
    `;

    const backMat = new THREE.ShaderMaterial({
      uniforms: {
        ...THREE.UniformsUtils.clone(glassUniformsBase),
        uRefractPower: { value: 0.22 },
        uBackside: { value: 1.0 },
      },
      vertexShader,
      fragmentShader,
      side: THREE.BackSide,
      transparent: false,
    });

    const frontMat = new THREE.ShaderMaterial({
      uniforms: {
        ...THREE.UniformsUtils.clone(glassUniformsBase),
        uRefractPower: { value: 0.30 },
        uBackside: { value: 0.0 },
      },
      vertexShader,
      fragmentShader,
      side: THREE.FrontSide,
      transparent: false,
    });

    // 5. Main 3D Scene Graph
    const scene = new THREE.Scene();
    const pivot = new THREE.Group();
    const spinner = new THREE.Group();
    pivot.add(spinner);
    scene.add(pivot);

    // Initial spinner rotation: Euler(-0.42, 0.62, 0.18)
    spinner.rotation.set(-0.42, 0.62, 0.18);
    spinner.quaternion.setFromEuler(spinner.rotation);

    let cubeMesh: THREE.Mesh | null = null;

    function applyGeometry(geom: THREE.BufferGeometry) {
      geom.computeBoundingBox();
      geom.center();
      const size = new THREE.Vector3();
      geom.boundingBox?.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z);
      if (maxDim > 0) {
        geom.scale(1 / maxDim, 1 / maxDim, 1 / maxDim);
      }
      cubeMesh = new THREE.Mesh(geom, frontMat);
      spinner.add(cubeMesh);
      setIsLoaded(true);
    }

    // Load Model or Fallback
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      MODEL_URL,
      (gltf) => {
        try {
          const geoms: THREE.BufferGeometry[] = [];
          gltf.scene.updateMatrixWorld(true);
          gltf.scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).geometry) {
              const mesh = child as THREE.Mesh;
              const g = mesh.geometry.clone();
              if (g.attributes.uv) g.deleteAttribute("uv");
              if (g.attributes.color) g.deleteAttribute("color");
              if (g.attributes.tangent) g.deleteAttribute("tangent");
              const merged = mergeVertices(g, 1e-4);
              merged.computeVertexNormals();
              merged.applyMatrix4(mesh.matrixWorld);
              geoms.push(merged);
            }
          });

          if (geoms.length > 0) {
            const finalGeom = mergeGeometries(geoms, false);
            applyGeometry(finalGeom);
          } else {
            applyGeometry(new RoundedBoxGeometry(1, 1, 1, 8, 0.12));
          }
        } catch {
          applyGeometry(new RoundedBoxGeometry(1, 1, 1, 8, 0.12));
        }
      },
      undefined,
      () => {
        applyGeometry(new RoundedBoxGeometry(1, 1, 1, 8, 0.12));
      }
    );

    // 6. Draw 2D Background Headline onto Canvas
    function drawBackgroundText(W: number, H: number, dpr: number) {
      if (!textCtx) return;
      const cw = Math.max(1, Math.round(W * dpr));
      const ch = Math.max(1, Math.round(H * dpr));

      if (textCanvas.width !== cw || textCanvas.height !== ch) {
        textCanvas.width = cw;
        textCanvas.height = ch;
      }

      textCtx.save();
      textCtx.scale(dpr, dpr);

      textCtx.fillStyle = "#020204";
      textCtx.fillRect(0, 0, W, H);

      const mobile = W < 768 || W / H < 1;
      let fs = Math.min(H * 0.21, W * (mobile ? 0.21 : 0.118));

      // Headline tailored for Web Development
      const lines = ["Code", "Build", "Scale"];
      textCtx.font = `800 ${fs}px Poppins, sans-serif`;

      let maxW = 0;
      for (const line of lines) {
        maxW = Math.max(maxW, textCtx.measureText(line).width);
      }
      const allowedW = W * (mobile ? 0.9 : 0.5);
      if (maxW > allowedW && maxW > 0) {
        fs *= allowedW / maxW;
        textCtx.font = `800 ${fs}px Poppins, sans-serif`;
      }

      const cx = W * (mobile ? 0.5 : 0.505);
      const cy = H * (mobile ? 0.45 : 0.468);
      const gap = fs * 1.07;
      const cap = fs * 0.7;

      textCtx.fillStyle = "#e9e9e9";
      textCtx.textAlign = "center";
      textCtx.textBaseline = "alphabetic";

      for (let i = 0; i < lines.length; i++) {
        const y = cy + cap / 2 + (i - 1) * gap;
        textCtx.fillText(lines[i], cx, y);
      }

      textCtx.restore();
      bgTex.needsUpdate = true;
    }

    // 7. Layout & Resize Calculation
    function layout() {
      if (!canvas || !hero) return;
      const W = hero.clientWidth || window.innerWidth;
      const H = hero.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      renderer.setPixelRatio(dpr);
      renderer.setSize(W, H);

      camera.aspect = W / H;
      camera.updateProjectionMatrix();

      const drawW = Math.round(W * dpr);
      const drawH = Math.round(H * dpr);

      // Render Targets Reallocation
      if (!rtBack || rtBack.width !== drawW || rtBack.height !== drawH) {
        if (rtBack) rtBack.dispose();
        if (rtFront) rtFront.dispose();

        const rtParams = {
          type: THREE.HalfFloatType,
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
          generateMipmaps: false,
          depthBuffer: true,
        };
        rtBack = new THREE.WebGLRenderTarget(drawW, drawH, rtParams);
        rtFront = new THREE.WebGLRenderTarget(drawW, drawH, rtParams);

        backMat.uniforms.uTexture.value = rtBack.texture;
        frontMat.uniforms.uTexture.value = rtFront.texture;
      }

      backMat.uniforms.uResolution.value.set(drawW, drawH);
      frontMat.uniforms.uResolution.value.set(drawW, drawH);

      // Redraw background headline
      drawBackgroundText(W, H, dpr);

      // Cube positioning & scaling
      const fovRad = (camera.fov * Math.PI) / 180;
      const visH = 2 * Math.tan(fovRad / 2) * 10;
      const visW = visH * camera.aspect;

      const mobile = W < 768 || W / H < 1;
      const sx = mobile ? 0.5 : 0.517;
      const sy = mobile ? 0.45 : 0.488;
      pivot.position.set((sx - 0.5) * visW, (0.5 - sy) * visH, 0);

      const px = Math.min(H * 0.44, W * (mobile ? 0.45 : 0.29));
      const scale = (px / H) * visH;
      pivot.scale.set(scale, scale, scale);
    }

    window.addEventListener("resize", layout);

    // 8. Interaction & Animation Variables
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let velX = 0;
    let velY = 0;
    let lastMoveTime = 0;
    let timeSinceRelease = 0;
    let remainingStep = 0;

    const axisY = new THREE.Vector3(0, 1, 0);
    const axisX = new THREE.Vector3(1, 0, 0);

    rotateStepRef.current = (rad: number) => {
      velX = 0;
      velY = 0;
      remainingStep += rad;
    };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      canvas.setPointerCapture(e.pointerId);
      canvas.classList.add("cursor-grabbing");
      canvas.classList.remove("cursor-grab");
      lastX = e.clientX;
      lastY = e.clientY;
      lastMoveTime = performance.now();
      velX = 0;
      velY = 0;
      remainingStep = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const now = performance.now();
      const dtMove = Math.max((now - lastMoveTime) / 1000, 0.001);
      lastMoveTime = now;

      const deltaX = e.clientX - lastX;
      const deltaY = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;

      const dx = deltaX * 0.008;
      const dy = deltaY * 0.008;

      const qY = new THREE.Quaternion().setFromAxisAngle(axisY, dx);
      spinner.quaternion.premultiply(qY);
      const qX = new THREE.Quaternion().setFromAxisAngle(axisX, dy);
      spinner.quaternion.premultiply(qX);

      const frameFactor = 0.01667 / dtMove;
      velX = dx * frameFactor;
      velY = dy * frameFactor;
      timeSinceRelease = 0;
    };

    const endDrag = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      canvas.classList.remove("cursor-grabbing");
      canvas.classList.add("cursor-grab");
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {}
      timeSinceRelease = 0;
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", endDrag);
    canvas.addEventListener("pointercancel", endDrag);

    // 9. Main Render Loop
    let lastTime = performance.now();
    let animId: number;

    function tick(now: number) {
      const rawDt = (now - lastTime) / 1000;
      lastTime = now;
      const dt = Math.min(rawDt, 0.05);

      if (isDragging) {
        timeSinceRelease = 0;
      } else {
        timeSinceRelease += dt;

        // Button step rotation (Prev/Next)
        if (Math.abs(remainingStep) > 0.0005) {
          const step = remainingStep * Math.min(1.0, 0.09 * dt * 60);
          remainingStep -= step;
          const qStep = new THREE.Quaternion().setFromAxisAngle(axisY, step);
          spinner.quaternion.premultiply(qStep);
        } else {
          remainingStep = 0;

          // Inertia damping
          if (Math.abs(velX) > 0.00001 || Math.abs(velY) > 0.00001) {
            const qY = new THREE.Quaternion().setFromAxisAngle(axisY, velX);
            spinner.quaternion.premultiply(qY);
            const qX = new THREE.Quaternion().setFromAxisAngle(axisX, velY);
            spinner.quaternion.premultiply(qX);

            const damping = Math.pow(0.94, dt * 60);
            velX *= damping;
            velY *= damping;
          }

          // Idle drift (ramps in after 0.6s)
          if (timeSinceRelease > 0.6) {
            const blend = Math.min(1.0, (timeSinceRelease - 0.6) / 1.0);
            const driftY = 0.0035 * blend * (dt * 60);
            const driftX = 0.0012 * blend * (dt * 60);

            const qDriftY = new THREE.Quaternion().setFromAxisAngle(axisY, driftY);
            spinner.quaternion.premultiply(qDriftY);
            const qDriftX = new THREE.Quaternion().setFromAxisAngle(axisX, driftX);
            spinner.quaternion.premultiply(qDriftX);
          }
        }
      }

      // Three-pass rendering pipeline:
      // 1) Render bgScene -> rtBack
      if (cubeMesh) cubeMesh.visible = false;
      if (rtBack) {
        renderer.setRenderTarget(rtBack);
        renderer.clear();
        renderer.render(bgScene, camera);
      }

      // 2) Render bgScene -> rtFront, then cube with backMat -> rtFront
      if (rtFront) {
        renderer.setRenderTarget(rtFront);
        renderer.clear();
        renderer.render(bgScene, camera);

        if (cubeMesh) {
          cubeMesh.visible = true;
          cubeMesh.material = backMat;
          renderer.autoClear = false;
          renderer.render(scene, camera);
        }
      }

      // 3) Render bgScene -> screen, then cube with frontMat -> screen
      renderer.setRenderTarget(null);
      renderer.clear();
      renderer.render(bgScene, camera);

      if (cubeMesh) {
        cubeMesh.material = frontMat;
        renderer.clearDepth();
        renderer.render(scene, camera);
        renderer.autoClear = true;
      }

      animId = requestAnimationFrame(tick);
    }

    // Font ready check
    document.fonts?.ready?.then(() => {
      layout();
    });
    layout();
    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", layout);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", endDrag);
      canvas.removeEventListener("pointercancel", endDrag);
      if (rtBack) rtBack.dispose();
      if (rtFront) rtFront.dispose();
      renderer.dispose();
    };
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    rotateStepRef.current(-(Math.PI / 2));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    rotateStepRef.current(Math.PI / 2);
  };

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("featured-web-projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else if (onStartProject) {
      onStartProject();
    }
  };

  return (
    <section
      ref={containerRef}
      className={`relative w-full h-[calc(100vh-72px)] min-h-[640px] max-h-[1050px] overflow-hidden bg-[#020204] text-white select-none ${className}`}
    >
      {/* Three.js Refraction Canvas */}
      <canvas
        ref={canvasRef}
        id="webdev-scene"
        className="absolute inset-0 w-full h-full block cursor-grab touch-none"
        aria-label="Interactive 3D glass cuboid. Drag to rotate."
      />

      {/* UI Overlay Layer */}
      <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-[clamp(20px,6.95vw,120px)]">
        {/* Top Header / Kicker Badge */}
        <div className="flex items-center justify-between w-full">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.5)] backdrop-blur-md pointer-events-auto">
            <Code2 className="w-4 h-4 text-[#38BDF8]" />
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[#38BDF8] uppercase font-mono">
              XSPACEWEB // WEB ENGINEERING LAB
            </span>
          </div>

          {/* 3D Arrow Controllers (top-right) */}
          <div className="flex items-center gap-3 sm:gap-6 pointer-events-auto">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border-2 border-white/90 bg-black/30 backdrop-blur-md text-white flex items-center justify-center transition-all duration-200 hover:bg-white hover:text-black cursor-pointer shadow-lg active:scale-95"
              aria-label="Rotate cube left"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border-2 border-white/90 bg-black/30 backdrop-blur-md text-white flex items-center justify-center transition-all duration-200 hover:bg-white hover:text-black cursor-pointer shadow-lg active:scale-95"
              aria-label="Rotate cube right"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Vertical Pagination Dots (right edge) */}
        <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 pointer-events-auto">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              onClick={() => setActiveDot(idx)}
              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 border-white transition-all duration-200 cursor-pointer ${
                activeDot === idx ? "bg-transparent scale-110 shadow-[0_0_8px_rgba(255,255,255,0.8)]" : "bg-white"
              }`}
              aria-label={`Select frame ${idx + 1}`}
            />
          ))}
        </div>

        {/* Bottom Tagline & CTA Row */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between w-full gap-6">
          {/* Tagline */}
          <p className="text-[clamp(24px,2.65vw,44px)] font-light leading-[1.2] tracking-[-0.01em] text-white max-w-lg">
            Let&apos;s Build the
            <br />
            Future of{" "}
            <strong className="font-extrabold text-white block sm:inline bg-gradient-to-r from-white via-slate-100 to-[#38BDF8] bg-clip-text text-transparent">
              Web Development.
            </strong>
          </p>

          {/* CTA Row with Line & Outlined 01 */}
          <div className="flex items-center w-full md:w-auto md:min-w-[420px] gap-4 pointer-events-auto">
            <a
              href="#featured-web-projects"
              onClick={handleScrollToProjects}
              className="px-5 h-12 inline-flex items-center justify-center rounded-lg border-[1.5px] border-white/90 bg-black/40 backdrop-blur-md text-white font-medium text-sm transition-all duration-200 hover:bg-white hover:text-black shadow-lg cursor-pointer flex-shrink-0"
            >
              Explore Web Projects
            </a>
            <span className="flex-1 h-[1.5px] bg-white/70 min-w-[30px]" />
            <span
              className="text-[clamp(90px,14vw,200px)] font-normal leading-none tracking-[-0.02em] text-transparent select-none translate-y-[6%]"
              style={{
                WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.85)",
              }}
              aria-hidden="true"
            >
              01
            </span>
          </div>
        </div>
      </div>

      {/* Model Loading Indicator */}
      {!isLoaded && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs uppercase tracking-[0.2em] text-slate-400 pointer-events-none animate-pulse">
          Loading 3D Optics Engine...
        </div>
      )}
    </section>
  );
};
