"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import "./appDevHero.css";

export interface AppDevHeroSectionProps {
  onStartProject?: () => void;
  className?: string;
}

const BASE = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/";

const SHOTS = [
  { v: "pay", url: BASE + "hf_20260912_110422_0fc34393-7417-41b0-a200-43fd2b08a37f.png" },
  { v: "launch", url: BASE + "hf_20260912_110423_ba46182e-43bc-43a8-9007-a8234acf442d.png" },
  { v: "shop", url: BASE + "hf_20260912_110423_06cfbb84-6f96-48f6-be45-e03516510e48.png" },
  { v: "brand", url: BASE + "hf_20260912_110422_634bf390-f171-4f5d-9151-0d2c86c26e7b.png" },
  { v: "frete", url: BASE + "hf_20260912_110423_0cfe058d-db0e-4ee6-9708-7a297cc11a7a.png" },
  { v: "plain", t: "RITUAL REGIME", url: BASE + "hf_20260912_110422_a90a35d7-ae20-4ce3-86d7-e3f6f658a6bc.png" },
  { v: "power", url: BASE + "hf_20260912_110422_de267714-7647-4d9a-a0a9-55325683b2a2.png" },
  { v: "plain", t: "JUST ARRIVED", url: BASE + "hf_20260912_110504_80eda275-e380-4ccb-b51f-332f25337079.png" },
  { v: "off", url: BASE + "hf_20260912_110422_d6ba08f5-4ff8-4f09-8abe-93ee6bb0e34e.png" },
  { v: "plain", t: "STREETWEAR", url: BASE + "hf_20260912_110423_87ec2115-3157-47ef-ac98-973f8ad6532d.png" },
];

function getCreativeHTML(d: (typeof SHOTS)[0]) {
  const im = `<img alt="" src="${d.url}">`;
  switch (d.v) {
    case "pay":
      return (
        `<div class="adh-fill" style="background:#efedea"></div>` +
        `<div class="adh-ph" style="top:112px;bottom:0">${im}</div>` +
        `<svg class="adh-ph" style="top:118px;bottom:0" viewBox="0 0 130 182" preserveAspectRatio="none">` +
        `<g stroke="#e5202f" stroke-width="8" fill="none" opacity=".92" stroke-linecap="square">` +
        `<path d="M2 42h30M14 30v96M4 100l26-16"/>` +
        `<path d="M96 34v58M120 34v58M96 92q12 15 24 0"/>` +
        `<path d="M92 108l14 34M126 108l-12 34"/>` +
        `</g></svg>` +
        `<div class="adh-cv" style="top:20px;text-align:right;font-size:3.4px;letter-spacing:.15em;color:#8d9298">METHOD OF CHECKOUTS</div>` +
        `<div class="adh-cv adh-t-big" style="top:32px;font-size:14px;color:#16171b">Checkouts</div>` +
        `<div class="adh-cv adh-t-big" style="top:47px;font-size:14px;color:#e5202f">Quick n simple</div>` +
        `<div class="adh-cv" style="top:76px;font-size:5.2px;font-weight:700;color:#16171b;line-height:1.7">` +
        `<div><b class="adh-dot"></b>SPEND VIA <b>ACH</b></div>` +
        `<div style="margin-top:8px"><b class="adh-dot adh-sq"></b>OR AT MAX <b>12X</b><br>` +
        `<span style="margin-left:11px">ON CREDIT</span></div></div>`
      );
    case "launch":
      return (
        `<div class="adh-fill" style="background:linear-gradient(168deg,#f9d9e5,#f3bdd2 55%,#e8a3c0)"></div>` +
        `<div class="adh-ph" style="top:100px;bottom:0">${im}` +
        `<div class="adh-fill" style="background:linear-gradient(180deg,rgba(249,217,229,.97),rgba(249,217,229,0) 30%)"></div>` +
        `</div>` +
        `<div class="adh-cv adh-t-serif" style="top:36px;font-size:17px;color:#b03a63">COLLECTION</div>` +
        `<div class="adh-cv adh-t-serif" style="top:55px;font-size:17px;color:#b03a63">EXCLUSIVE!</div>`
      );
    case "shop":
      return (
        `<div class="adh-fill" style="background:#fff"></div>` +
        `<div class="adh-ph" style="top:0;height:148px">${im}</div>` +
        `<div class="adh-cv" style="top:158px;font-size:5.4px;font-weight:700;letter-spacing:.09em;color:#16171b">REGIME AT DAWNS</div>` +
        `<div class="adh-cv" style="top:168px;font-size:4.2px;color:#7b8087">Cleanse · Serum · Moisturize</div>` +
        `<div style="position:absolute;left:10px;top:180px;padding:4px 11px;border-radius:20px;background:#16171b;font-size:4.6px;font-weight:600;color:#fff;letter-spacing:.05em">Acquire today</div>`
      );
    case "brand":
      return (
        `<div class="adh-fill" style="background:linear-gradient(180deg,#0a2a4a,#0d3a63 50%,#08192b)"></div>` +
        `<div class="adh-ph" style="top:92px;bottom:0">${im}` +
        `<div class="adh-fill" style="background:linear-gradient(180deg,rgba(10,42,74,.98),rgba(10,42,74,0) 36%)"></div>` +
        `</div>` +
        `<div class="adh-cv" style="top:16px;font-size:4.2px;line-height:1.7;color:rgba(255,255,255,.82);width:74px">Formulas light, assessed hypoallergenically n designed with a new ritual — revealing since a starting moment.</div>` +
        `<div style="position:absolute;right:10px;top:16px;font-size:5.4px;font-weight:600;color:#fff;opacity:.92">✳ Vertex</div>`
      );
    case "frete":
      return (
        `<div class="adh-fill" style="background:linear-gradient(158deg,#4a0c80 0%,#7a16a6 40%,#a81fc6 66%,#5c0e90 100%)"></div>` +
        `<div class="adh-ph" style="top:140px;bottom:0;opacity:.45;mix-blend-mode:screen">${im}</div>` +
        `<div class="adh-fill" style="background:radial-gradient(44% 16% at 50% 62%, rgba(255,255,255,.92), rgba(255,255,255,0) 72%)"></div>` +
        `<div style="position:absolute;left:-6px;right:-6px;top:44px;height:13px;background:#ff2d8a;transform:rotate(-2.6deg);box-shadow:0 4px 12px rgba(255,45,138,.5)"></div>` +
        `<div style="position:absolute;left:0;right:0;top:45.5px;transform:rotate(-2.6deg);text-align:center;font-size:5.6px;font-weight:700;letter-spacing:.05em;color:#fff">OBTAIN AT HOME AND</div>` +
        `<div class="adh-cv adh-t-big" style="top:64px;font-size:24px;color:#fff;text-shadow:0 3px 0 rgba(84,9,124,.6)">Ships</div>` +
        `<div class="adh-cv adh-t-big" style="top:87px;font-size:24px;color:#fff;text-shadow:0 3px 0 rgba(84,9,124,.6)">Gratis</div>` +
        `<div class="adh-cv adh-t-big" style="top:113px;font-size:19px;color:#fff">+</div>`
      );
    case "power":
      return (
        `<div class="adh-ph adh-phf">${im}</div>` +
        `<div class="adh-fill" style="background:linear-gradient(180deg,rgba(6,5,10,0) 34%,rgba(6,5,10,.55) 52%,rgba(6,5,10,.92) 72%)"></div>` +
        `<div class="adh-cv adh-t-serif" style="top:132px;font-size:16px;color:#fff">A POWER</div>` +
        `<div class="adh-cv adh-t-serif" style="top:150px;font-size:16px;color:#fff">FEMININE</div>` +
        `<div class="adh-cv" style="top:171px;font-size:4.4px;letter-spacing:.07em;color:rgba(255,255,255,.85)">is echoing in all we acquire</div>`
      );
    case "off":
      return (
        `<div class="adh-ph adh-phf">${im}</div>` +
        `<div class="adh-fill" style="background:linear-gradient(180deg,rgba(3,9,20,0) 30%,rgba(3,9,20,.6) 48%,rgba(3,9,20,.95) 70%)"></div>` +
        `<div class="adh-cv adh-t-big" style="top:126px;font-size:10px;color:#fff;opacity:.9">On sale · til</div>` +
        `<div class="adh-cv adh-t-big" style="top:139px;font-size:22px;color:#3fe3ff;text-shadow:0 0 16px rgba(63,227,255,.5)">50% off</div>`
      );
    case "plain":
    default:
      return (
        `<div class="adh-ph adh-phf">${im}</div>` +
        `<div class="adh-fill" style="background:linear-gradient(180deg,rgba(4,8,16,0) 38%,rgba(4,8,16,.85) 68%)"></div>` +
        `<div class="adh-cv" style="top:150px;font-size:5.4px;font-weight:600;letter-spacing:.2em;color:#fff">${d.t || ""}</div>`
      );
  }
}

export const AppDevHeroSection: React.FC<AppDevHeroSectionProps> = ({
  onStartProject,
  className = "",
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const stARef = useRef<HTMLDivElement>(null);
  const stBRef = useRef<HTMLDivElement>(null);

  // Fitter element refs
  const h1aRef = useRef<HTMLHeadingElement>(null);
  const h1bRef = useRef<HTMLHeadingElement>(null);
  const sub1Ref = useRef<HTMLParagraphElement>(null);
  const sub2Ref = useRef<HTMLParagraphElement>(null);
  const badgeTxtRef = useRef<HTMLElement>(null);
  const vpLabelRef = useRef<HTMLSpanElement>(null);
  const heroBtnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Starfield
    const genStars = (el: HTMLDivElement | null, count: number, blur: number, minA: number, maxA: number) => {
      if (!el) return;
      const parts: string[] = [];
      for (let i = 0; i < count; i++) {
        const x = (Math.random() * 100).toFixed(2);
        const y = (Math.random() * 100).toFixed(2);
        const a = (minA + Math.random() * (maxA - minA)).toFixed(3);
        parts.push(`${x}vw ${y}vh ${blur}px 0 rgba(255,255,255,${a})`);
      }
      el.style.boxShadow = parts.join(",");
    };
    genStars(stARef.current, 150, 0, 0.05, 0.3);
    genStars(stBRef.current, 18, 1.2, 0.35, 0.7);

    // 2. Carousel 3D Ring
    const NUM_CARDS = 37;
    const cardEls: HTMLDivElement[] = [];
    if (ringRef.current) {
      let ringHTML = "";
      for (let i = 0; i < NUM_CARDS; i++) {
        const d = SHOTS[i % 10];
        ringHTML += `<div class="adh-card" id="adh-cd-${i}">${getCreativeHTML(d)}<div class="adh-edge"></div></div>`;
      }
      ringRef.current.innerHTML = ringHTML;

      for (let j = 0; j < NUM_CARDS; j++) {
        const cEl = document.getElementById(`adh-cd-${j}`) as HTMLDivElement | null;
        if (cEl) {
          cardEls.push(cEl);
          const imgs = cEl.querySelectorAll("img");
          imgs.forEach((img) => {
            img.addEventListener("error", () => {
              cEl.classList.add("broken");
            });
          });
        }
      }
    }

    const R = 891;
    const step = 360 / NUM_CARDS;
    const cull = 42;
    const speed = 1.9;
    let phase = -2;
    let last = performance.now();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const placeCards = () => {
      for (let i = 0; i < NUM_CARDS; i++) {
        const el = cardEls[i];
        if (!el) continue;
        const a = (((i * step + phase) % 360) + 540) % 360 - 180;
        if (Math.abs(a) > cull) {
          el.style.visibility = "hidden";
          continue;
        }
        el.style.visibility = "visible";
        const r = a * (Math.PI / 180);
        const c = Math.cos(r);
        const s = Math.sin(r);
        const tx = (R * s).toFixed(2);
        const tz = (R * (1 - c)).toFixed(2);
        const rotY = (-a).toFixed(2);
        const bright = (0.84 + 0.5 * (1 / c - 1)).toFixed(3);
        el.style.transform = `translate3d(${tx}px, 0, ${tz}px) rotateY(${rotY}deg)`;
        el.style.filter = `brightness(${bright})`;
      }
    };

    let animId: number;
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      if (!reducedMotion.matches) {
        phase -= speed * dt;
        placeCards();
      }
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);

    // 3. Scaling & Type Fitter
    const TAB_MAX = 1080;
    const TAB_MIN = 701;
    const CW = 1172;
    const DW_MIN = 920;

    const measCanvas = document.createElement("canvas");
    const mctx = measCanvas.getContext("2d");

    let isMobile = false;
    let isTablet = false;
    let k = 1;
    let tboost = 1;

    const fontOf = (el: HTMLElement) => {
      const st = window.getComputedStyle(el);
      return {
        css: `${st.fontWeight || "400"} ${st.fontSize || "16px"} ${st.fontFamily || "Poppins"}`,
        size: parseFloat(st.fontSize) || 16,
      };
    };

    const capRatio = (el: HTMLElement) => {
      if (!mctx) return 0.7;
      const f = fontOf(el);
      mctx.font = `400 100px ${f.css.split(" ").slice(2).join(" ") || "Poppins"}`;
      const m = mctx.measureText("H");
      return (m.actualBoundingBoxAscent || 70) / 100;
    };

    const fitBox = (el: HTMLElement | null, tw: number, tc: number, pre = "") => {
      if (!el) return;
      el.style.transform = pre;
      const cr = capRatio(el);
      el.style.fontSize = `${tc / cr}px`;
      const rectW = el.getBoundingClientRect().width / (isMobile ? 1 : k);
      const sx = rectW > 0 ? (tw / rectW).toFixed(4) : "1";
      el.style.transform = `${pre ? pre + " " : ""}scaleX(${sx})`;
    };

    const baseline = (el: HTMLElement | null, y: number) => {
      if (!el || !mctx) return;
      const f = fontOf(el);
      mctx.font = f.css;
      const m = mctx.measureText("H");
      const A = m.fontBoundingBoxAscent || f.size * 0.8;
      const D = m.fontBoundingBoxDescent || f.size * 0.2;
      const top = y - ((f.size - (A + D)) / 2 + A);
      el.style.top = `${top.toFixed(1)}px`;
    };

    const centreLabel = (btn: HTMLElement | null, el: HTMLElement | null, capPx: number) => {
      if (!btn || !el) return;
      const probe = document.createElement("i");
      probe.style.display = "inline-block";
      probe.style.width = "0";
      probe.style.height = "0";
      probe.style.verticalAlign = "baseline";
      el.appendChild(probe);
      const btnRect = btn.getBoundingClientRect();
      const pRect = probe.getBoundingClientRect();
      el.removeChild(probe);

      const btnH = btnRect.height / (isMobile ? 1 : k);
      const base = (pRect.top - btnRect.top) / (isMobile ? 1 : k);
      const BIAS = 1.1;
      const top = btnH / 2 - (base - capPx / 2) + BIAS;
      el.style.top = `${top.toFixed(1)}px`;
    };

    const layout = () => {
      if (isMobile) {
        [h1aRef.current, h1bRef.current, sub1Ref.current, sub2Ref.current, badgeTxtRef.current, vpLabelRef.current].forEach((el) => {
          if (el) {
            el.style.removeProperty("fontSize");
            el.style.removeProperty("top");
            el.style.removeProperty("transform");
          }
        });
        placeCards();
        return;
      }

      const T = isTablet ? tboost : 1;
      fitBox(h1aRef.current, 563.5 * T, 37.2 * T, "translateX(-50%)");
      baseline(h1aRef.current, 204.5);

      fitBox(h1bRef.current, 197.5 * T, 37.2 * T, "translateX(-50%)");
      baseline(h1bRef.current, 258.5);

      fitBox(sub1Ref.current, 389 * T, 8.4 * T, "translateX(-50%)");
      baseline(sub1Ref.current, 300.5);

      fitBox(sub2Ref.current, 311 * T, 8.4 * T, "translateX(-50%)");
      baseline(sub2Ref.current, 316.5);

      fitBox(badgeTxtRef.current, 184 * T, 9.4 * T, "translate(2px,-1px)");

      fitBox(vpLabelRef.current, 76 * T, 9.5 * T);
      if (heroBtnRef.current) centreLabel(heroBtnRef.current, vpLabelRef.current, 9.5 * T);

      placeCards();
    };

    const resize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      isMobile = vw <= 700;
      isTablet = vw > 700 && vw <= 1080;

      if (!canvasRef.current) return;

      if (isMobile) {
        k = 1;
        tboost = 1;
        canvasRef.current.style.removeProperty("--k");
        canvasRef.current.style.removeProperty("--fill");
        canvasRef.current.style.removeProperty("--stshift");
        canvasRef.current.style.removeProperty("--sshift");
        canvasRef.current.style.removeProperty("--rs");
        layout();
        return;
      }

      let W = CW;
      if (isTablet) {
        W = DW_MIN + ((vw - TAB_MIN) * (CW - DW_MIN)) / (TAB_MAX - TAB_MIN);
        if (vh > vw * 1.15) W = Math.min(W, 900);
      }

      const stageH = stageRef.current ? stageRef.current.clientHeight : Math.max(vh - 72, 700);
      k = Math.min(vw / W, stageH / 910);
      const ramp = isTablet ? Math.min(1, (TAB_MAX - vw) / 120) : 0;
      tboost = 1 + 0.14 * ramp;

      let fill = Math.max(0, stageH / k - 890);
      let st = 0;
      let ss = 0;
      let rs = 1;

      if (fill > 0 && isTablet) {
        ss = Math.min(fill * 0.55, 420) * ramp;
        rs = 1 + Math.min(fill / 1100, 0.75) * ramp;
        const slack = 219.5 - 125 * rs + ss;
        st = Math.max(0, slack / 2 - 28) * ramp;
        fill -= ss;
      }

      canvasRef.current.style.setProperty("--k", String(k));
      canvasRef.current.style.setProperty("--fill", `${fill.toFixed(1)}px`);
      canvasRef.current.style.setProperty("--stshift", `${st.toFixed(1)}px`);
      canvasRef.current.style.setProperty("--sshift", `${ss.toFixed(1)}px`);
      canvasRef.current.style.setProperty("--rs", rs.toFixed(3));

      layout();
    };

    window.addEventListener("resize", resize);
    resize();
    document.fonts?.ready?.then(layout);
    const t1 = setTimeout(layout, 400);
    const t2 = setTimeout(layout, 1400);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("featured-app-projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else if (onStartProject) {
      onStartProject();
    }
  };

  return (
    <section className={`adh-stage relative w-full h-screen overflow-hidden select-none ${className}`}>
      {/* Starfield Background */}
      <div className="adh-bg">
        <div ref={stARef} className="adh-stars"></div>
        <div ref={stBRef} className="adh-stars"></div>
      </div>

      {/* Scaled Canvas */}
      <div ref={canvasRef} className="adh-canvas">
        {/* Layout Stack */}
        <div className="adh-stack">
          {/* Badge (PIXEL CONTRACT A) */}
          <div className="adh-badge">
            <i>
              <svg
                viewBox="5 1 14 22"
                preserveAspectRatio="none"
                fill="rgba(16,112,152,.72)"
                stroke="rgba(190,236,255,.6)"
                strokeWidth="1.6"
                strokeLinejoin="round"
              >
                <path d="M13.9 1.6 5.5 13.6a.7.7 0 0 0 .6 1.1h4.2l-1 7.7a.7.7 0 0 0 1.25.55l8.3-12.1a.7.7 0 0 0-.6-1.1h-4.2l1-7.7a.7.7 0 0 0-1.25-.55Z" />
              </svg>
            </i>
            <b ref={badgeTxtRef}>Professionals at app startup</b>
          </div>

          {/* Hero Headlines */}
          <h1 ref={h1aRef} className="adh-h1 adh-l1" id="adh-h1a">
            Streamline the app
          </h1>
          <h1 ref={h1bRef} className="adh-h1 adh-l2" id="adh-h1b">
            Process
          </h1>

          {/* Subtitles */}
          <p ref={sub1Ref} className="adh-sub adh-s1" id="adh-sub1">
            <b>Restructuring store systems / <span className="adh-nb">App Development</span></b> orchestrated with
          </p>
          <p ref={sub2Ref} className="adh-sub adh-s2" id="adh-sub2">
            checkouts, performance, a sustainable expansion.
          </p>

          {/* Hero CTA (PIXEL CONTRACT B) */}
          <a
            ref={heroBtnRef}
            href="#featured-app-projects"
            onClick={handleScrollToProjects}
            className="adh-btn adh-cta2"
          >
            <span ref={vpLabelRef}>See projects</span>
          </a>
        </div>

        {/* Showcase Container */}
        <div className="adh-showcase">
          {/* 3D Cylindrical Ring (z-index 5) */}
          <div ref={ringRef} className="adh-ring"></div>
        </div>

        {/* Browser Mockup (z-index 100, overlaps in front of ring) */}
        <div className="adh-browser">
          <div className="adh-bar">
            <div className="adh-dots">
              <i style={{ background: "#ee5c62" }}></i>
              <i style={{ background: "#f6b719" }}></i>
              <i style={{ background: "#12c02f" }}></i>
            </div>
            <div className="adh-omni">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.8-3.8" />
              </svg>
              <span>App Focused - Digital Solutions</span>
            </div>
            <div className="adh-tools">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                <path d="M12 16V4m0 0L8 8m4-4 4 4" />
                <path d="M4 15v5h16v-5" />
              </svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2">
                <path d="M12 5v14M5 12h14" />
              </svg>
              <svg viewBox="0 0 24 24" stroke="#fff" strokeWidth="2">
                <path d="M12 3 3 8l9 5 9-5-9-5Z" fill="#fff" opacity=".95" />
                <path d="M3 13l9 5 9-5" fill="none" opacity=".55" />
              </svg>
            </div>
          </div>

          <div className="adh-page">
            <div className="adh-ann">
              <u>&#8249;</u>
              <span>Production-ready mobile applications</span>
              <u>&#8250;</u>
            </div>

            <div className="adh-shoplogo">
              <em>VERTEX</em>
              <i>APP STUDIO</i>
            </div>

            <div className="adh-shopicons">
              <svg viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.8-3.8" />
              </svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2">
                <circle cx="12" cy="8" r="4" />
                <path d="M4.5 21c0-4.2 3.4-6.6 7.5-6.6s7.5 2.4 7.5 6.6" />
              </svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2">
                <path d="M5.5 8h13l-1.2 12H6.7L5.5 8Z" />
                <path d="M9 8V6.2A3 3 0 0 1 15 6.2V8" />
              </svg>
            </div>

            <div className="adh-pagebody">
              <div className="adh-pghero">
                <Image
                  src="/images/products/ecosystem_devices.jpg"
                  alt="App and SaaS ecosystem preview"
                  fill
                  sizes="600px"
                  priority
                  className="object-cover"
                />
                <div className="adh-scrim"></div>
                <div className="adh-copy">
                  <u>Just deployed</u>
                  <em>Engineered for scale.<br />Built for speed.</em>
                  <i>EXPLORE APPS</i>
                </div>
              </div>

              <div className="adh-pgsec">
                <b>Featured Products</b>
                <u>see all</u>
              </div>

              <div className="adh-pggrid">
                <div className="adh-pgcard">
                  <div className="adh-ph">
                    <span className="adh-tag">SAAS</span>
                    <img
                      src="/images/recent-work/3.webp"
                      alt="MakeGSTBill preview"
                    />
                  </div>
                  <b>MakeGSTBill</b>
                  <i>Fintech · Mobile & Web</i>
                  <s>Live In Production</s>
                </div>

                <div className="adh-pgcard">
                  <div className="adh-ph">
                    <span className="adh-tag">SUITE</span>
                    <img
                      src="/images/recent-work/new.webp"
                      alt="GoldenGST preview"
                    />
                  </div>
                  <b>GoldenGST</b>
                  <i>Smart Tax · Inventory</i>
                  <s>Enterprise Ready</s>
                </div>

                <div className="adh-pgcard">
                  <div className="adh-ph">
                    <span className="adh-tag">RETAIL</span>
                    <img
                      src="/images/recent-work/nexus_card.webp"
                      alt="Dravanta Nexus preview"
                    />
                  </div>
                  <b>Dravanta Nexus</b>
                  <i>E-Commerce App</i>
                  <s>1-Click Checkout</s>
                </div>

                <div className="adh-pgcard">
                  <div className="adh-ph">
                    <span className="adh-tag">REMOTE</span>
                    <img
                      src="/images/recent-work/6.webp"
                      alt="FreeDeskPro preview"
                    />
                  </div>
                  <b>FreeDeskPro</b>
                  <i>WebRTC Remote</i>
                  <s>&lt;30ms Latency</s>
                </div>
              </div>

              <div className="adh-pgstrip">
                <span>iOS & Android Native</span>
                <span>Cloud & Offline Sync</span>
                <span>Scalable Architecture</span>
                <span>Bank-Grade Security</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
