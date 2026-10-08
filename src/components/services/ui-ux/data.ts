/**
 * UI/UX Service Page Data
 * Keeps all content strings, metadata, and service definitions cleanly
 * separated from GSAP animation and presentation logic.
 */

export interface HeroContent {
  category: string;
  headline: string;
  headlineLine1: string;
  headlineLine2: string;
  description: string;
  primaryCta: {
    label: string;
  };
  secondaryCta: {
    label: string;
  };
}

export const HERO_CONTENT: HeroContent = {
  category: "UI / UX DESIGN",
  headline: "Designing digital experiences that work beautifully.",
  headlineLine1: "Designing digital experiences",
  headlineLine2: "that work beautifully.",
  description:
    "We create intuitive, engaging and user-focused digital experiences for websites, mobile applications and digital products — from early research and ideas to polished, developer-ready interfaces.",
  primaryCta: {
    label: "Start a Project",
  },
  secondaryCta: {
    label: "Explore Our Services",
  },
};

/**
 * Service Card Structure for Prompt 2's Pinterest-inspired Fanning Animation
 */
export interface ServiceCardData {
  id: string;
  number: string;
  title: string;
  tag: string;
  description: string;
  imageSrc: string;
  alt: string;
  desktopRotation: number;
  desktopX: number;
  desktopY: number;
  desktopZ: number;
  scale: number;
}

export const SERVICE_CARDS: ServiceCardData[] = [
  {
    id: "card-1-ui",
    number: "01",
    title: "UI DESIGN",
    tag: "INTERFACE DESIGN",
    description:
      "Create clear, consistent and visually engaging interfaces that communicate the product effectively.",
    imageSrc: "/images/services/ui-ux/card-1-ui-design.webp",
    alt: "Atlas UI Design System Component Library Specimen",
    desktopRotation: -8,
    desktopX: -360,
    desktopY: 18,
    desktopZ: -30,
    scale: 0.96,
  },
  {
    id: "card-2-ux",
    number: "02",
    title: "UX DESIGN",
    tag: "USER EXPERIENCE",
    description:
      "Design intuitive user journeys around real user needs, behavior and goals.",
    imageSrc: "/images/services/ui-ux/card-2-ux-design.webp",
    alt: "Architectural UX Wireframe and User Journey Map",
    desktopRotation: -4,
    desktopX: -180,
    desktopY: 8,
    desktopZ: -10,
    scale: 0.98,
  },
  {
    id: "card-3-web",
    number: "03",
    title: "WEB DESIGN",
    tag: "RESPONSIVE SYSTEMS",
    description:
      "Create responsive and modern digital experiences for websites and web applications.",
    imageSrc: "/images/services/ui-ux/card-3-web-design.webp",
    alt: "FlowScale Modern SaaS Web Application Interface",
    desktopRotation: 0,
    desktopX: 0,
    desktopY: 0,
    desktopZ: 20,
    scale: 1.02,
  },
  {
    id: "card-4-mobile",
    number: "04",
    title: "MOBILE APP DESIGN",
    tag: "MOBILE APPS",
    description:
      "Design simple, intuitive mobile experiences that feel natural across devices.",
    imageSrc: "/images/services/ui-ux/card-4-mobile-app.webp",
    alt: "Modern iOS Native Mobile Application Experience",
    desktopRotation: 4,
    desktopX: 180,
    desktopY: 8,
    desktopZ: -10,
    scale: 0.98,
  },
  {
    id: "card-5-product",
    number: "05",
    title: "PRODUCT DESIGN",
    tag: "END-TO-END PRODUCT",
    description:
      "Connect business goals, user needs and technology to create complete digital product experiences.",
    imageSrc: "/images/services/ui-ux/card-5-product-design.webp",
    alt: "SimpleKaam Complete Product Workspace Interface",
    desktopRotation: 8,
    desktopX: 360,
    desktopY: 18,
    desktopZ: -30,
    scale: 0.96,
  },
];

export interface CentralArtworkMeta {
  id: string;
  title: string;
  subtitle: string;
  windowUrl: string;
  imageSrc: string;
  alt: string;
}

export const CENTRAL_ARTWORK: CentralArtworkMeta = {
  id: "central-core-ui",
  title: "SimpleKaam Workspace",
  subtitle: "SaaS Product Design & Living Design System",
  windowUrl: "xspaceweb.design / simplekaam-workspace",
  imageSrc: "/images/services/uiux-hero-artwork.webp",
  alt: "XSPACEWEB UI/UX Design — SimpleKaam Modern SaaS Product Interface",
};
