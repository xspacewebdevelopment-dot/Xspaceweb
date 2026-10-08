/**
 * App Development Page Data
 * Projects created and mentioned on the XSPACEWEB website.
 */

export interface AppProjectItem {
  id: string;
  number: string;
  title: string;
  badge: string;
  category: string;
  description: string;
  tags: string[];
  metric: string;
  imageSrc: string;
  href: string;
  isExternal: boolean;
  accentColor: string;
}

export const APP_PROJECTS: AppProjectItem[] = [
  {
    id: "makegstbill",
    number: "01",
    title: "MakeGSTBill",
    badge: "Flagship SaaS App",
    category: "Fintech & Billing Platform",
    description:
      "Enterprise GST invoicing, financial reporting, and point-of-sale mobile app engine built for Indian SMEs and merchants.",
    tags: ["React Native", "Fintech SaaS", "Cloud Sync", "Multi-User"],
    metric: "100K+ Invoices",
    imageSrc: "/images/recent-work/3.webp",
    href: "https://makegstbill.com/",
    isExternal: true,
    accentColor: "#1668E8",
  },
  {
    id: "goldengst",
    number: "02",
    title: "GoldenGST",
    badge: "Enterprise Suite",
    category: "Smart GST & Inventory App",
    description:
      "A premium, cloud-integrated mobile accounting and stock management solution with automated tax compliance calculations.",
    tags: ["Cross-Platform", "Inventory Engine", "SaaS App", "Secure"],
    metric: "99.98% Uptime",
    imageSrc: "/images/recent-work/new.webp",
    href: "https://www.goldengst.com/",
    isExternal: true,
    accentColor: "#F59E0B",
  },
  {
    id: "dravanta-nexus",
    number: "03",
    title: "Dravanta Nexus",
    badge: "Live Retail App",
    category: "E-Commerce Mobile Experience",
    description:
      "High-velocity mobile shopping application for natural & organic goods featuring 1-click checkout, live cart, and shipment telemetry.",
    tags: ["E-Commerce", "iOS & Android", "Payment Gateway", "Spatial UX"],
    metric: "4.9★ Store Rating",
    imageSrc: "/images/recent-work/nexus_card.webp",
    href: "/products/dravanta-nexus",
    isExternal: false,
    accentColor: "#10B981",
  },
  {
    id: "freedeskpro",
    number: "04",
    title: "FreeDeskPro",
    badge: "Infrastructure",
    category: "Remote Access Companion",
    description:
      "Low-latency mobile remote support and workstation controller app built on ultra-fast WebRTC streaming protocols.",
    tags: ["WebRTC", "Remote Desktop", "Mobile Admin", "Low Latency"],
    metric: "<30ms Latency",
    imageSrc: "/images/recent-work/6.webp",
    href: "https://freedeskpro.com/",
    isExternal: true,
    accentColor: "#6366F1",
  },
  {
    id: "modhuralap",
    number: "05",
    title: "Modhuralap",
    badge: "Social Mobile App",
    category: "Real-Time Community Network",
    description:
      "Modern social companion platform built around meaningful voice interactions, real-time audio rooms, and community threads.",
    tags: ["Social Platform", "Audio Streaming", "Real-Time Chat", "Mobile First"],
    metric: "50K+ Active Users",
    imageSrc: "/images/recent-work/7.webp",
    href: "/products/modhuralap",
    isExternal: false,
    accentColor: "#EC4899",
  },
  {
    id: "simplekaam",
    number: "06",
    title: "SimpleKaam",
    badge: "Operations OS",
    category: "Work OS & Field App",
    description:
      "Unified employment operations, on-ground task assignment, and workforce coordination platform tailored for distributed teams.",
    tags: ["Work OS", "Task Management", "Field Operations", "Enterprise"],
    metric: "3.5x Team Velocity",
    imageSrc: "/images/recent-work/8.webp",
    href: "http://simplekaam.com/",
    isExternal: true,
    accentColor: "#8B5CF6",
  },
];
