"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/shared/ui/Container";
import BlurText from "@/components/ui/BlurText";
import { MechanicalKeycap } from "@/components/ui/MechanicalKeycap";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Icons from react-icons
import {
  SiHtml5,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiLaravel,
  SiPython,
  SiMongodb,
  SiMysql,
  SiFigma,
  SiTypescript,
  SiTailwindcss,
  SiVuedotjs,
  SiAngular,
  SiExpress,
  SiDjango,
  SiFastapi,
  SiGo,
  SiSpringboot,
  SiGraphql,
  SiFlutter,
  SiSwift,
  SiKotlin,
  SiAndroid,
  SiApple,
  SiExpo,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiFirebase,
  SiSupabase,
  SiVercel,
  SiGithub,
} from "react-icons/si";
import { FaCss3Alt, FaAws } from "react-icons/fa6";

interface TechItem {
  name: string;
  theme: "light" | "dark";
  icon: React.ReactNode;
  brandColor: string;
  category: string;
  description: string;
}

interface Division {
  id: string;
  label: string;
  description: string;
  techs: TechItem[];
}

const DIVISIONS: Division[] = [
  {
    id: "web-frontend",
    label: "Web & Frontend",
    description: "Modern, reactive, and lightning-fast client interfaces with pixel-perfect craft.",
    techs: [
      { name: "HTML5", theme: "light", icon: <SiHtml5 className="text-[#E34F26]" />, brandColor: "#E34F26", category: "Markup", description: "Semantic, accessible HTML5 structuring for ultra-fast SEO indexing." },
      { name: "CSS3", theme: "dark", icon: <FaCss3Alt className="text-[#264DE4]" />, brandColor: "#264DE4", category: "Styling", description: "Modern responsive CSS3 with fluid typography and GPU-accelerated effects." },
      { name: "JavaScript", theme: "light", icon: <SiJavascript className="text-[#F7DF1E] bg-[#000000] p-0.5 rounded-sm" />, brandColor: "#F7DF1E", category: "Core", description: "Modern ESNext JavaScript driving asynchronous and dynamic interactions." },
      { name: "React", theme: "dark", icon: <SiReact className="text-[#61DAFB]" />, brandColor: "#61DAFB", category: "Framework", description: "Component-driven declarative architectures for enterprise web apps." },
      { name: "Next.js", theme: "light", icon: <SiNextdotjs className="text-slate-900" />, brandColor: "#000000", category: "Full-Stack", description: "Server components, streaming SSR, and edge compute optimization." },
      { name: "Node.js", theme: "dark", icon: <SiNodedotjs className="text-[#5FA04E]" />, brandColor: "#5FA04E", category: "Runtime", description: "Event-driven asynchronous runtime powering scalable web microservices." },
      { name: "PHP", theme: "light", icon: <SiPhp className="text-[#777BB4]" />, brandColor: "#777BB4", category: "Backend", description: "Robust modern PHP 8.x engines backing battle-tested enterprise portals." },
      { name: "Laravel", theme: "dark", icon: <SiLaravel className="text-[#FF2D20]" />, brandColor: "#FF2D20", category: "Framework", description: "Elegant MVC web applications with expressive routing and ORM." },
      { name: "Python", theme: "light", icon: <SiPython className="text-[#3776AB]" />, brandColor: "#3776AB", category: "Language", description: "High-performance Python for backend APIs, data pipelines, and AI engines." },
      { name: "MongoDB", theme: "dark", icon: <SiMongodb className="text-[#47A248]" />, brandColor: "#47A248", category: "Database", description: "Flexible document-based NoSQL database for rapid schema iteration." },
      { name: "MySQL", theme: "light", icon: <SiMysql className="text-[#4479A1]" />, brandColor: "#4479A1", category: "Database", description: "ACID-compliant relational database engine with proven enterprise stability." },
      { name: "Figma", theme: "dark", icon: <SiFigma className="text-[#F24E1E]" />, brandColor: "#F24E1E", category: "Design", description: "Collaborative UI/UX design systems with interactive prototyping." },
    ],
  },
  {
    id: "backend-apis",
    label: "Backend & APIs",
    description: "Resilient microservices, high-throughput REST & GraphQL APIs, and secure business logic.",
    techs: [
      { name: "Node.js", theme: "light", icon: <SiNodedotjs className="text-[#5FA04E]" />, brandColor: "#5FA04E", category: "Runtime", description: "Non-blocking event-driven backend services handling 100k+ concurrent requests." },
      { name: "Express", theme: "dark", icon: <SiExpress className="text-white" />, brandColor: "#FFFFFF", category: "Web Framework", description: "Minimalist and flexible Node.js web application framework." },
      { name: "Python", theme: "light", icon: <SiPython className="text-[#3776AB]" />, brandColor: "#3776AB", category: "Language", description: "Backend architecture with clean syntax and extensive scientific & AI ecosystem." },
      { name: "Django", theme: "light", icon: <SiDjango className="text-[#0C4B33]" />, brandColor: "#0C4B33", category: "Framework", description: "Batteries-included web framework with built-in security and ORM." },
      { name: "FastAPI", theme: "light", icon: <SiFastapi className="text-[#009688]" />, brandColor: "#009688", category: "API Engine", description: "Ultra-fast asynchronous Python APIs powered by Pydantic and Starlette." },
      { name: "Go (Golang)", theme: "dark", icon: <SiGo className="text-[#00ADD8]" />, brandColor: "#00ADD8", category: "Systems", description: "Blazing fast compiled language built for concurrency and cloud microservices." },
      { name: "Laravel", theme: "light", icon: <SiLaravel className="text-[#FF2D20]" />, brandColor: "#FF2D20", category: "Framework", description: "Artisan CLI, Eloquent ORM, and queue workers for complex SaaS platforms." },
      { name: "Spring Boot", theme: "dark", icon: <SiSpringboot className="text-[#6DB33F]" />, brandColor: "#6DB33F", category: "Enterprise", description: "Enterprise Java framework for mission-critical banking and fintech workloads." },
      { name: "GraphQL", theme: "light", icon: <SiGraphql className="text-[#E10098]" />, brandColor: "#E10098", category: "Query Language", description: "Precise client-tailored data fetching eliminating over-fetching." },
      { name: "TypeScript", theme: "dark", icon: <SiTypescript className="text-[#3178C6]" />, brandColor: "#3178C6", category: "Language", description: "End-to-end type safety connecting client contracts with backend schemas." },
      { name: "PHP", theme: "light", icon: <SiPhp className="text-[#777BB4]" />, brandColor: "#777BB4", category: "Backend", description: "Modern object-oriented PHP powering high-traffic portals and CMS backends." },
      { name: "Redis", theme: "dark", icon: <SiRedis className="text-[#DC382D]" />, brandColor: "#DC382D", category: "Cache / Queue", description: "Sub-millisecond in-memory caching, pub/sub messaging, and distributed locks." },
    ],
  },
  {
    id: "mobile-apps",
    label: "Mobile & App Dev",
    description: "Native and cross-platform mobile apps delivering 60 FPS fluidity on iOS and Android.",
    techs: [
      { name: "React Native", theme: "light", icon: <SiReact className="text-[#61DAFB]" />, brandColor: "#61DAFB", category: "Cross-Platform", description: "Native cross-platform mobile apps with shared codebase and near-native speed." },
      { name: "Flutter", theme: "dark", icon: <SiFlutter className="text-[#02569B]" />, brandColor: "#02569B", category: "Cross-Platform", description: "Google's UI toolkit compiling directly to native ARM machine code." },
      { name: "Swift", theme: "light", icon: <SiSwift className="text-[#F05138]" />, brandColor: "#F05138", category: "Native iOS", description: "Apple Swift for high-performance iOS, iPadOS, and macOS native experiences." },
      { name: "Kotlin", theme: "dark", icon: <SiKotlin className="text-[#7F52FF]" />, brandColor: "#7F52FF", category: "Native Android", description: "Modern, concise Android development with Jetpack Compose." },
      { name: "Android", theme: "light", icon: <SiAndroid className="text-[#3DDC84]" />, brandColor: "#3DDC84", category: "OS / Platform", description: "Deep hardware integration, background services, and Play Store ecosystem." },
      { name: "Apple iOS", theme: "dark", icon: <SiApple className="text-white" />, brandColor: "#FFFFFF", category: "OS / Platform", description: "Human Interface Guidelines compliance, CoreML, and Apple Pay integrations." },
      { name: "Expo", theme: "light", icon: <SiExpo className="text-black" />, brandColor: "#000000", category: "Toolchain", description: "Universal React framework for over-the-air updates and instant previews." },
      { name: "Tailwind", theme: "dark", icon: <SiTailwindcss className="text-[#06B6D4]" />, brandColor: "#06B6D4", category: "Styling", description: "Utility-first design tokens translated into fluid mobile viewports." },
      { name: "TypeScript", theme: "light", icon: <SiTypescript className="text-[#3178C6]" />, brandColor: "#3178C6", category: "Language", description: "Robust typing eliminating runtime crashes across mobile devices." },
      { name: "Firebase", theme: "dark", icon: <SiFirebase className="text-[#FFCA28]" />, brandColor: "#FFCA28", category: "BaaS", description: "Push notifications, real-time sync, crashlytics, and mobile analytics." },
      { name: "Vue.js", theme: "light", icon: <SiVuedotjs className="text-[#4FC08D]" />, brandColor: "#4FC08D", category: "Progressive Web", description: "Progressive web apps with offline service workers and installability." },
      { name: "Angular", theme: "dark", icon: <SiAngular className="text-[#DD0031]" />, brandColor: "#DD0031", category: "Enterprise Web", description: "Enterprise-grade SPA architecture with dependency injection." },
    ],
  },
  {
    id: "cloud-database",
    label: "Databases & Cloud",
    description: "Highly available distributed databases, automated DevOps pipelines, and cloud infra.",
    techs: [
      { name: "PostgreSQL", theme: "light", icon: <SiPostgresql className="text-[#4169E1]" />, brandColor: "#4169E1", category: "SQL Database", description: "Advanced open-source relational database with JSONB indexing and PostGIS." },
      { name: "MongoDB", theme: "dark", icon: <SiMongodb className="text-[#47A248]" />, brandColor: "#47A248", category: "NoSQL Database", description: "High-scale document database with automated horizontal sharding." },
      { name: "MySQL", theme: "light", icon: <SiMysql className="text-[#4479A1]" />, brandColor: "#4479A1", category: "SQL Database", description: "High-concurrency transactional database powering enterprise commerce." },
      { name: "Redis", theme: "dark", icon: <SiRedis className="text-[#DC382D]" />, brandColor: "#DC382D", category: "In-Memory Store", description: "Ultra-low latency in-memory data store for sessions and queue brokering." },
      { name: "AWS", theme: "light", icon: <FaAws className="text-[#FF9900]" />, brandColor: "#FF9900", category: "Cloud Infra", description: "Elastic compute (EC2), serverless (Lambda), S3 storage, and global CDN." },
      { name: "Docker", theme: "dark", icon: <SiDocker className="text-[#2496ED]" />, brandColor: "#2496ED", category: "Containers", description: "Isolated containerization ensuring parity across development and production." },
      { name: "Firebase", theme: "light", icon: <SiFirebase className="text-[#FFCA28]" />, brandColor: "#FFCA28", category: "Serverless", description: "Realtime database, Cloud Functions, and managed authentication." },
      { name: "Supabase", theme: "dark", icon: <SiSupabase className="text-[#3ECF8E]" />, brandColor: "#3ECF8E", category: "Open Source BaaS", description: "Postgres backend with instant REST/Realtime APIs and Row-Level Security." },
      { name: "Vercel", theme: "light", icon: <SiVercel className="text-black" />, brandColor: "#000000", category: "Edge Platform", description: "Global edge network with automated CI/CD and instant branch previews." },
      { name: "GitHub", theme: "dark", icon: <SiGithub className="text-white" />, brandColor: "#FFFFFF", category: "DevOps & CI/CD", description: "Automated GitHub Actions workflows, security scanning, and deployments." },
      { name: "Figma", theme: "light", icon: <SiFigma className="text-[#F24E1E]" />, brandColor: "#F24E1E", category: "Design System", description: "Central design tokens and asset sync connecting designers with frontend." },
      { name: "Next.js", theme: "dark", icon: <SiNextdotjs className="text-white" />, brandColor: "#FFFFFF", category: "Edge Engine", description: "Zero-configuration serverless functions deployed to edge nodes worldwide." },
    ],
  },
];

export const TechnologiesSection: React.FC = () => {
  const [activeDivisionIndex, setActiveDivisionIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);

  const currentDivision = DIVISIONS[activeDivisionIndex];

  const handleNext = () => {
    setSlideDirection(1);
    setActiveDivisionIndex((prev) => (prev + 1) % DIVISIONS.length);
  };

  const handlePrev = () => {
    setSlideDirection(-1);
    setActiveDivisionIndex((prev) => (prev - 1 + DIVISIONS.length) % DIVISIONS.length);
  };

  const handleSelectDivision = (idx: number) => {
    setSlideDirection(idx > activeDivisionIndex ? 1 : -1);
    setActiveDivisionIndex(idx);
  };

  return (
    <section id="technologies" className="w-full bg-white text-slate-900 pt-16 sm:pt-20 pb-12 sm:pb-16 relative overflow-hidden">
      <Container size="wide" className="relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-8 sm:mb-12">
          {/* Eyebrow with flanking lines */}
          <div className="inline-flex items-center justify-center gap-3 sm:gap-4 select-none">
            <span className="w-6 sm:w-10 h-[1.5px] bg-[#1668E8]/60" />
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.22em] text-[#1668E8] uppercase">
              TECHNOLOGIES WE WORK WITH
            </span>
            <span className="w-6 sm:w-10 h-[1.5px] bg-[#1668E8]/60" />
          </div>

          {/* Heading */}
          <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight flex flex-wrap items-center justify-center gap-x-[0.3em]">
            <BlurText
              text="Powerful Technologies"
              delay={100}
              animateBy="words"
              direction="top"
              stepDuration={0.4}
              className="text-[#07152B] justify-center"
              as="h2"
            />
            <BlurText
              text="We Work With"
              delay={100}
              animateBy="words"
              direction="top"
              stepDuration={0.4}
              className="text-[#1668E8] justify-center"
              as="span"
            />
          </div>

          {/* Subtitle */}
          <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Modern tools and technologies to build high-performance digital products.
            <br className="hidden sm:inline" /> Always learning. Always ahead.
          </p>

          {/* Division Slices / Tabs Switcher */}
          <div className="pt-3 sm:pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {DIVISIONS.map((div, idx) => {
              const isActive = idx === activeDivisionIndex;
              return (
                <button
                  key={div.id}
                  type="button"
                  onClick={() => handleSelectDivision(idx)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 select-none ${
                    isActive
                      ? "bg-[#1668E8] text-white shadow-md shadow-blue-500/25 scale-105"
                      : "bg-slate-100/90 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80"
                  }`}
                >
                  {div.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Keycaps Carousel Container */}
        <div className="relative w-full max-w-7xl mx-auto px-2 sm:px-4">
          
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous division"
            className="absolute left-0 sm:-left-3 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-slate-200 shadow-md hover:shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center text-slate-700 hover:text-blue-600 focus:outline-none"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next division"
            className="absolute right-0 sm:-right-3 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-slate-200 shadow-md hover:shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center text-slate-700 hover:text-blue-600 focus:outline-none"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Keycaps Grid with Animated Slicing Slide */}
          <div className="overflow-hidden py-4 sm:py-6 px-4 sm:px-8 lg:px-10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentDivision.id}
                initial={{ opacity: 0, x: slideDirection * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: slideDirection * -60 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-y-6 gap-x-2.5 sm:gap-x-3.5 lg:gap-x-4 items-end justify-items-center"
              >
                {currentDivision.techs.map((tech) => (
                  <MechanicalKeycap
                    key={tech.name}
                    label={tech.name}
                    theme={tech.theme}
                    icon={tech.icon}
                    brandColor={tech.brandColor}
                    size="md"
                    onClick={() => setSelectedTech(tech)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Indicators (4 Slices) */}
          <div className="flex items-center justify-center gap-2 sm:gap-2.5 mt-4 sm:mt-6">
            {DIVISIONS.map((_, idx) => {
              const isActive = idx === activeDivisionIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Jump to slide ${idx + 1}`}
                  onClick={() => handleSelectDivision(idx)}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-8 sm:w-10 bg-[#1668E8]"
                      : "w-5 sm:w-6 bg-slate-200 hover:bg-slate-300"
                  }`}
                />
              );
            })}
          </div>

          {/* Interactive Technology Detail Capsule */}
          <div className="min-h-[44px] mt-4 flex items-center justify-center">
            {selectedTech ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200/90 shadow-sm text-xs sm:text-sm text-slate-700"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full animate-pulse"
                  style={{ backgroundColor: selectedTech.brandColor }}
                />
                <span className="font-bold text-slate-900">{selectedTech.name}</span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-600">{selectedTech.description}</span>
              </motion.div>
            ) : (
              <span className="text-xs text-slate-400 tracking-wide select-none">
                💡 Click or press any keycap to feel the tactile switch and explore details
              </span>
            )}
          </div>

        </div>

      </Container>
    </section>
  );
};
