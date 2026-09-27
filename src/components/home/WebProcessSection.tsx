import React from "react";
import { Container } from "@/components/shared/ui/Container";

interface ProcessStep {
  number: string;
  title: string[];
  description: string;
  badgeBg: string;
  badgeShadow: string;
  cardBg: string;
  cardBorder: string;
  cardGlow: string;
  renderIcon: () => React.ReactNode;
}

const steps: ProcessStep[] = [
  {
    number: "01",
    title: ["Requirement", "Analysis"],
    description:
      "Understand client goals, target audience, desired features and overall aspirations.",
    badgeBg: "bg-[#8B5CF6]",
    badgeShadow: "rgba(139, 92, 246, 0.35)",
    cardBg: "from-[#F6F2FD] via-[#FAF8FE] to-[#FFFFFF]",
    cardBorder: "border-[#E4D7FB]",
    cardGlow: "rgba(139, 92, 246, 0.05)",
    renderIcon: () => (
      <svg
        className="w-6 h-6 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Clipboard checklist */}
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <path d="m9 14 2 2 4-4" />
      </svg>
    ),
  },
  {
    number: "02",
    title: ["Planning", "and Design"],
    description:
      "Define structure, layout and create prototypes and wireframes.",
    badgeBg: "bg-[#2563EB]",
    badgeShadow: "rgba(37, 99, 235, 0.35)",
    cardBg: "from-[#EEF5FF] via-[#F6FAFF] to-[#FFFFFF]",
    cardBorder: "border-[#CFE1FD]",
    cardGlow: "rgba(37, 99, 235, 0.05)",
    renderIcon: () => (
      <svg
        className="w-6 h-6 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Wireframe layout */}
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="m3 3 18 18" />
        <path d="m21 3-18 18" />
        <rect width="6" height="6" x="9" y="9" rx="1" fill="currentColor" fillOpacity="0.3" />
      </svg>
    ),
  },
  {
    number: "03",
    title: ["Development"],
    description:
      "Build the website using modern technologies like HTML, CSS and JavaScript.",
    badgeBg: "bg-[#F97316]",
    badgeShadow: "rgba(249, 115, 22, 0.35)",
    cardBg: "from-[#FFF3EB] via-[#FFF9F5] to-[#FFFFFF]",
    cardBorder: "border-[#FED6B8]",
    cardGlow: "rgba(249, 115, 22, 0.05)",
    renderIcon: () => (
      <svg
        className="w-6 h-6 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Code brackets </> */}
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" x2="10" y1="4" y2="20" strokeWidth="2" />
      </svg>
    ),
  },
  {
    number: "04",
    title: ["Testing and", "Quality Control"],
    description:
      "Test across devices and browsers, ensure usability, fix issues and check security.",
    badgeBg: "bg-[#10B981]",
    badgeShadow: "rgba(16, 185, 129, 0.35)",
    cardBg: "from-[#ECFAF2] via-[#F6FCF8] to-[#FFFFFF]",
    cardBorder: "border-[#C5F1D7]",
    cardGlow: "rgba(16, 185, 129, 0.05)",
    renderIcon: () => (
      <svg
        className="w-6 h-6 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Checkmark in shield / circle */}
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

export const WebProcessSection: React.FC = () => {
  return (
    <section id="process" className="w-full pt-4 sm:pt-6 pb-16 sm:pb-20 bg-white relative">
      <Container size="wide">
        {/* Section Header */}
        <div className="space-y-2 max-w-3xl mb-7 sm:mb-8">
          {/* Eyebrow */}
          <span className="text-[12px] sm:text-[13px] font-bold tracking-[0.22em] text-[#556987] uppercase select-none block">
            OUR WEB DEVELOPMENT PROCESS
          </span>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-[#07152B] tracking-tight leading-[1.15]">
            From Idea to a{" "}
            <span className="text-[#1668E8]">Powerful Website</span>
          </h2>

          {/* Description Subtitle */}
          <p className="text-sm sm:text-base md:text-[17px] text-[#556987] leading-relaxed pt-1">
            A simple and transparent workflow to turn your vision into reality.
          </p>
        </div>

        {/* Process Flow Cards with Connecting Arrows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-4 items-stretch relative">
          {steps.map((step, index) => (
            <div key={step.number} className="relative flex flex-col">
              {/* Process Card */}
              <div
                className={`flex-1 rounded-[22px] bg-gradient-to-b ${step.cardBg} border ${step.cardBorder} p-6 sm:p-6.5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg`}
                style={{
                  boxShadow: `0 8px 24px -6px ${step.cardGlow}, 0 2px 6px -2px rgba(7, 21, 43, 0.03)`,
                }}
              >
                {/* Top Row: Icon Badge + (Number and Title) */}
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    {/* Rounded Square Badge */}
                    <div
                      className={`w-12.5 h-12.5 rounded-xl ${step.badgeBg} flex items-center justify-center flex-shrink-0`}
                      style={{
                        boxShadow: `0 4px 14px -2px ${step.badgeShadow}`,
                      }}
                    >
                      {step.renderIcon()}
                    </div>

                    {/* Step Number + Title next to icon */}
                    <div className="pt-0.5">
                      <span className="text-[12px] sm:text-[13px] font-bold text-slate-400 block select-none">
                        {step.number}
                      </span>
                      <h3 className="text-[16px] sm:text-[17px] font-extrabold text-[#07152B] leading-[1.25]">
                        {step.title.map((line, i) => (
                          <span key={i} className="block">
                            {line}
                          </span>
                        ))}
                      </h3>
                    </div>
                  </div>

                  {/* Description below */}
                  <p className="text-[13px] sm:text-[13.5px] text-[#556987] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connecting Right Arrow between cards (Visible on Desktop) */}
              {index < steps.length - 1 && (
                <div
                  className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 pointer-events-none items-center justify-center"
                  aria-hidden="true"
                >
                  <div className="w-7 h-7 flex items-center justify-center text-[#2563EB]">
                    <svg
                      className="w-5 h-5 stroke-[2.5]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
