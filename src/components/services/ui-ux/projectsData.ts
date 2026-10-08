/**
 * Section 4: UI/UX Project Showcase Data
 * Completely distinct project portfolio items for Section 4.
 * Does NOT reuse any artwork from Sections 1–3.
 */

export interface UiUxProjectCardData {
  id: string;
  number: string;
  title: string;
  category: string;
  client: string;
  imageSrc: string;
  alt: string;
  tag: string;
  metric: string;
  colorAccent: string;
}

export const SECTION4_PROJECTS: UiUxProjectCardData[] = [
  {
    id: "s4-proj-1-landing",
    number: "01",
    title: "Quantum.ai",
    category: "Landing Page & Web Architecture",
    client: "AI SaaS Marketing Experience",
    imageSrc: "/images/services/ui-ux/projects/project-1-landing-page.jpg",
    alt: "Quantum.ai High-Converting SaaS Landing Page UI Design",
    tag: "LANDING PAGE",
    metric: "+148% Conv.",
    colorAccent: "#0284C7",
  },
  {
    id: "s4-proj-2-mobile",
    number: "02",
    title: "FinPulse Mobile",
    category: "Native iOS & Android App",
    client: "Wealth & Portfolio Experience",
    imageSrc: "/images/services/ui-ux/projects/project-2-mobile-app.jpg",
    alt: "FinPulse Mobile Banking and Wealth Application Interface",
    tag: "MOBILE APP",
    metric: "4.9★ Store",
    colorAccent: "#6366F1",
  },
  {
    id: "s4-proj-3-dashboard",
    number: "03",
    title: "OmniAnalytics OS",
    category: "Enterprise SaaS Dashboard",
    client: "Real-time Monitoring & Data",
    imageSrc: "/images/services/ui-ux/projects/project-3-saas-dashboard.jpg",
    alt: "OmniAnalytics Real-Time Monitoring and Analytics Workspace UI",
    tag: "SAAS DASHBOARD",
    metric: "<100ms Data",
    colorAccent: "#10B981",
  },
  {
    id: "s4-proj-4-ecommerce",
    number: "04",
    title: "Aethel Ceramics",
    category: "Luxury E-Commerce & Checkout",
    client: "Curated Spatial Commerce",
    imageSrc: "/images/services/ui-ux/projects/project-4-ecommerce.jpg",
    alt: "Aethel Curated Ceramics Luxury Fashion E-commerce UI",
    tag: "E-COMMERCE",
    metric: "3.2x AOV Lift",
    colorAccent: "#EC4899",
  },
  {
    id: "s4-proj-5-webapp",
    number: "05",
    title: "CollabFlow OS",
    category: "Product & Web Application",
    client: "Enterprise Workflow Execution",
    imageSrc: "/images/services/ui-ux/projects/project-5-web-app.jpg",
    alt: "CollabFlow Agile Sprint and Workflow Web App Interface",
    tag: "PRODUCT DESIGN",
    metric: "250K+ Users",
    colorAccent: "#8B5CF6",
  },
  {
    id: "s4-proj-6-designsystem",
    number: "06",
    title: "Astra Tokens",
    category: "Design System & Tokens",
    client: "Living Component Architecture",
    imageSrc: "/images/services/ui-ux/projects/project-6-design-system.jpg",
    alt: "Astra Living Design Tokens and Component System Showcase",
    tag: "DESIGN SYSTEM",
    metric: "120+ Tokens",
    colorAccent: "#06B6D4",
  },
];
