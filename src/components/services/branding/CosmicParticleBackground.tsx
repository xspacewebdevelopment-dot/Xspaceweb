"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  speedX: number;
  speedY: number;
  pulseSpeed: number;
  pulsePhase: number;
  color: string;
}

export const CosmicParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const colors = [
      "rgba(56, 189, 248, ", // bright cyan
      "rgba(96, 165, 250, ", // light sky blue
      "rgba(129, 140, 248, ", // electric indigo
      "rgba(255, 255, 255, ", // brilliant star white
      "rgba(37, 99, 235, ", // vibrant royal blue
    ];

    const particleCount = Math.floor(Math.min(100, Math.max(50, width / 20)));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        baseAlpha: Math.random() * 0.4 + 0.1,
        alpha: Math.random() * 0.4 + 0.1,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.25 - 0.08,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    let tick = 0;
    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Render micro design-nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap edges seamlessly
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Twinkle oscillation
        p.alpha = p.baseAlpha + Math.sin(tick * p.pulseSpeed + p.pulsePhase) * 0.15;
        const clampedAlpha = Math.max(0.05, Math.min(0.6, p.alpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${clampedAlpha})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background Deep Dark Blue Space Surface */}
      <div className="absolute inset-0 bg-[#020817]" />

      {/* Floating Luminous Dark Blue & Indigo Glow Spheres */}
      <div className="absolute top-[10%] left-[15%] w-[650px] h-[650px] rounded-full bg-blue-600/15 blur-[180px] pointer-events-none" />
      <div className="absolute top-[45%] right-[10%] w-[750px] h-[750px] rounded-full bg-sky-500/12 blur-[190px] pointer-events-none" />
      <div className="absolute top-[75%] left-[20%] w-[700px] h-[700px] rounded-full bg-indigo-600/15 blur-[180px] pointer-events-none" />

      {/* Interactive 60fps Micro-nodes Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />
    </div>
  );
};

export default CosmicParticleBackground;
