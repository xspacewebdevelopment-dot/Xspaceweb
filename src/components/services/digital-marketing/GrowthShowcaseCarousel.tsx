"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight, Layers } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

interface CaseCard {
  id: string;
  tag: string;
  title: string;
  client: string;
  metric: string;
  metricLabel: string;
  description: string;
  chips: string[];
  gradient: string;
}

const CARDS: CaseCard[] = [
  {
    id: "case-1",
    tag: "Fintech SaaS Growth",
    client: "MakeGSTBill",
    title: "Inbound Pipeline & SEO Dominance",
    metric: "100k+",
    metricLabel: "Monthly Organic Inbound",
    description: "Built semantic topic clusters, schema entity architectures, and automated performance search campaigns, reducing customer acquisition cost by 44%.",
    chips: ["Google Performance Max", "Semantic SEO", "Conversion Rate Lift"],
    gradient: "linear-gradient(135deg, rgba(37,99,235,0.06), rgba(79,70,229,0.08))",
  },
  {
    id: "case-2",
    tag: "Enterprise Subscription",
    client: "FreeDeskPro",
    title: "Algorithmic Paid Search & Meta CAPI",
    metric: "5.6×",
    metricLabel: "Blended Return on Spend",
    description: "Deployed server-side tracking, high-intent competitor conquesting bidding, and direct-response creative cells to scale monthly recurring revenue.",
    chips: ["Server-Side GTM", "Meta CAPI", "Dynamic Creative Cells"],
    gradient: "linear-gradient(135deg, rgba(16,185,129,0.06), rgba(2,132,199,0.08))",
  },
  {
    id: "case-3",
    tag: "High-Intent Commercial",
    client: "GoldenGST",
    title: "Tax Season Intent Interception",
    metric: "#1 Rank",
    metricLabel: "400+ Commercial Queries",
    description: "Engineered rapid Core Web Vitals performance and programmatic landing pages to capture surge intent during annual tax compliance cycles.",
    chips: ["Topical Authority", "Core Web Vitals", "Negative Scrubbing"],
    gradient: "linear-gradient(135deg, rgba(234,179,8,0.06), rgba(245,158,11,0.08))",
  },
  {
    id: "case-4",
    tag: "Creative Narrative & Viral Reach",
    client: "Modhuralap",
    title: "Omnichannel Social Community Engine",
    metric: "+260%",
    metricLabel: "Audience Engagement Surge",
    description: "Produced high-velocity short-form creative assets, dynamic audience lookalikes, and interactive polls to turn casual scrollers into brand evangelists.",
    chips: ["Short-Form Video", "Audience Retargeting", "Community Velocity"],
    gradient: "linear-gradient(135deg, rgba(168,85,247,0.06), rgba(236,72,153,0.08))",
  },
];

// 3D Tilt Card with cursor spotlight follower
const TiltCard: React.FC<{ card: CaseCard; isDesktopPinned?: boolean; isActive?: boolean }> = ({ 
  card, 
  isDesktopPinned = false,
  isActive = true 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0, isHovered: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);

    setMousePos({ x: mouseX, y: mouseY, isHovered: true });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setMousePos((prev) => ({ ...prev, isHovered: false }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`group relative h-full min-h-[380px] p-8 md:p-12 rounded-3xl bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.08)] hover:border-slate-300 transition-all duration-500 flex flex-col justify-between overflow-hidden cursor-pointer ${
        isDesktopPinned
          ? isActive
            ? "opacity-100 scale-100 ring-1 ring-slate-200"
            : "opacity-60 scale-[0.96]"
          : "opacity-100 scale-100"
      }`}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      {mousePos.isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 280px at ${mousePos.x}px ${mousePos.y}px, rgba(37, 99, 235, 0.08), transparent 80%)`,
          }}
        />
      )}

      {/* Top Header */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-slate-100 text-slate-700">
            {card.tag}
          </span>
          <span className="text-xs font-mono font-medium text-slate-400">
            {card.client}
          </span>
        </div>

        <h3
          className="text-[24px] md:text-[30px] font-semibold tracking-tight text-[#0a1b33] mt-2 group-hover:text-[#1668E8] transition-colors"
          style={{ fontFamily: "'Outfit', var(--font-display), sans-serif" }}
        >
          {card.title}
        </h3>

        <p
          className="text-[14px] md:text-[15px] text-slate-500 mt-3 leading-relaxed max-w-xl"
          style={{ fontFamily: "'Inter', var(--font-sans), sans-serif" }}
        >
          {card.description}
        </p>
      </div>

      {/* Metric Highlight & Tags */}
      <div className="relative z-10 pt-6 mt-6 border-t border-slate-100">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <span
              className="text-[36px] md:text-[44px] font-bold tracking-tight text-[#0a1b33]"
              style={{ fontFamily: "'Outfit', var(--font-display), sans-serif" }}
            >
              {card.metric}
            </span>
            <p className="text-[12px] font-medium text-emerald-600">
              {card.metricLabel}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 group-hover:bg-[#1668E8] group-hover:text-white transition-all flex items-center justify-center text-slate-500">
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {card.chips.map((chip, i) => (
            <span
              key={i}
              className="text-[11px] px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200/60 text-slate-600 font-medium"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const GrowthShowcaseCarousel: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const [activePanelIdx, setActivePanelIdx] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (!sectionRef.current || !trackRef.current) return;

        const panels = gsap.utils.toArray<HTMLElement>(".desktop-case-panel");
        const totalPanels = panels.length;

        gsap.to(panels, {
          xPercent: -100 * (totalPanels - 1),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${window.innerWidth * 1.8}`,
            onUpdate: (self) => {
              const current = Math.min(
                totalPanels - 1,
                Math.round(self.progress * (totalPanels - 1))
              );
              setActivePanelIdx(current);
            },
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const mobileScroll = (direction: "left" | "right") => {
    if (!mobileContainerRef.current) return;
    const cardWidth = 320;
    mobileContainerRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="growth-showcase"
      ref={sectionRef}
      className="w-full bg-white border-y border-slate-200/60 relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20 flex flex-col justify-center min-h-[100vh] lg:h-screen">
        {/* Section Header with Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 lg:mb-10 shrink-0">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[#1668E8] text-xs font-semibold tracking-wide uppercase mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Verified Case Models</span>
            </div>
            <h2
              className="text-[32px] md:text-[42px] font-medium tracking-tight text-[#0a1b33] leading-[1.12]"
              style={{ fontFamily: "'Outfit', var(--font-display), sans-serif" }}
            >
              Engineered case models with verified business lift
            </h2>
            <p
              className="mt-2 text-[14px] md:text-[15px] text-[#64748b] leading-relaxed"
              style={{ fontFamily: "'Inter', var(--font-sans), sans-serif" }}
            >
              Scroll through our client models. On desktop, vertical scroll drives a smooth pinned horizontal journey with real-time 3D tilt interaction.
            </p>
          </div>

          {/* Mobile / Tablet Carousel Controls */}
          <div className="flex lg:hidden items-center gap-2 self-start sm:self-auto shrink-0">
            <button
              type="button"
              onClick={() => mobileScroll("left")}
              aria-label="Previous slide"
              className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-700 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => mobileScroll("right")}
              aria-label="Next slide"
              className="w-10 h-10 rounded-full bg-[#0a1b33] text-white shadow-xs flex items-center justify-center cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop Pinned Horizontal Track (>= 1024px) */}
        <div className="hidden lg:block relative w-full overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-8 items-center w-[400%]"
            style={{ width: `${CARDS.length * 80}vw` }}
          >
            {CARDS.map((card, idx) => (
              <div
                key={card.id}
                className="desktop-case-panel w-[72vw] shrink-0"
              >
                <TiltCard
                  card={card}
                  isDesktopPinned={true}
                  isActive={activePanelIdx === idx}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile / Tablet Scroll-Snap Container (< 1024px) */}
        <div
          ref={mobileContainerRef}
          className="flex lg:hidden gap-5 overflow-x-auto pb-4 pt-2 scroll-smooth no-scrollbar select-none"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {CARDS.map((card) => (
            <div
              key={card.id}
              className="w-[85vw] max-w-[340px] shrink-0"
              style={{ scrollSnapAlign: "start" }}
            >
              <TiltCard card={card} isDesktopPinned={false} isActive={true} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
