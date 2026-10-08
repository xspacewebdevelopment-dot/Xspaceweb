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
      "rgba(56, 189, 248, ", // cyan
      "rgba(168, 85, 247, ", // purple
      "rgba(99, 102, 241, ", // indigo
      "rgba(255, 255, 255, ", // starlight white
      "rgba(147, 197, 253, ", // ice blue
    ];

    const particleCount = Math.floor(Math.min(140, Math.max(70, width / 14)));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.6,
        baseAlpha: Math.random() * 0.6 + 0.2,
        alpha: Math.random() * 0.6 + 0.2,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: (Math.random() - 0.5) * 0.3 - 0.1, // subtle upward cosmic drift
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

      // Render cosmic particles
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
        p.alpha = p.baseAlpha + Math.sin(tick * p.pulseSpeed + p.pulsePhase) * 0.25;
        const clampedAlpha = Math.max(0.08, Math.min(0.9, p.alpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${clampedAlpha})`;
        ctx.fill();

        // Subtle glow for larger particles
        if (p.size > 1.6) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${clampedAlpha * 0.25})`;
          ctx.fill();
        }
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
      {/* Background Deep Cosmic Gradients */}
      <div className="absolute inset-0 bg-[#02040c]" />

      {/* Floating Nebula Glow Spheres */}
      <div className="absolute top-[10%] left-[15%] w-[650px] h-[650px] rounded-full bg-cyan-900/15 blur-[180px] pointer-events-none" />
      <div className="absolute top-[45%] right-[10%] w-[750px] h-[750px] rounded-full bg-purple-900/15 blur-[190px] pointer-events-none" />
      <div className="absolute top-[75%] left-[20%] w-[700px] h-[700px] rounded-full bg-blue-900/15 blur-[180px] pointer-events-none" />

      {/* Interactive 60fps Star Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default CosmicParticleBackground;
