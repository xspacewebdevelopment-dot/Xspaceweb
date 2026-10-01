export interface ProductItem {
  id: string;
  number: string;
  name: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  accent: string;
  accentGlow: string;
  badge?: string;
  featured?: boolean;
  href: string;
  liveUrl?: string;
  category: string;
  launchStatus: string;
  metrics: { label: string; value: string };
  ctaText: string;
  keyFeatures: string[];
}

export const productsData: ProductItem[] = [
  {
    id: "makegstbill",
    number: "01 / 04",
    name: "MakeGSTBill",
    title: "MakeGSTBill",
    tagline: "Simple GST Billing for Every Business.",
    description: "Create, dispatch & reconcile GST-compliant invoices in under 15 seconds with automated WhatsApp & IRN sync.",
    tags: ["GST Billing", "Invoices", "e-Way Bill"],
    accent: "#2563EB",
    accentGlow: "rgba(37, 99, 235, 0.28)",
    badge: "Most Popular",
    featured: true,
    href: "https://makegstbill.com/",
    liveUrl: "https://makegstbill.com/",
    category: "FinTech & Billing",
    launchStatus: "Live & Active",
    metrics: { label: "Active Businesses", value: "10,000+" },
    ctaText: "Explore MakeGSTBill",
    keyFeatures: [
      "15-second invoice creation with smart item auto-complete",
      "Instant WhatsApp & PDF invoice dispatch",
      "UPI QR code integration for instant payments",
      "Cloud backup with offline fallback mode",
    ],
  },
  {
    id: "goldengst",
    number: "02 / 04",
    name: "GoldenGST",
    title: "GoldenGST",
    tagline: "Advanced GST Billing & Business Management.",
    description: "Enterprise multi-branch ERP suite featuring automated GSTR filing prep, multi-godown stock & audit logs.",
    tags: ["Accounting", "Analytics", "Compliance"],
    accent: "#F59E0B",
    accentGlow: "rgba(245, 158, 11, 0.28)",
    badge: "Enterprise Flagship",
    href: "https://www.goldengst.com/",
    liveUrl: "https://www.goldengst.com/",
    category: "FinTech & ERP",
    launchStatus: "Live & Active",
    metrics: { label: "Invoices Processed", value: "₹150Cr+" },
    ctaText: "Explore GoldenGST",
    keyFeatures: [
      "Automated e-Way Bill & IRN generation in 1-click",
      "Multi-godown inventory tracking with batch & expiry alerts",
      "Real-time GSTR-1, GSTR-3B & GSTR-9 automated filing prep",
      "Multi-user permission matrix with audit logs",
    ],
  },
  {
    id: "freedeskpro",
    number: "03 / 04",
    name: "FreeDeskPro",
    title: "FreeDeskPro",
    tagline: "Remote Access, Support & Device Management.",
    description: "Ultra-low latency 60 FPS remote screen streaming with TLS 1.3 encryption, file transfers & unattended access.",
    tags: ["Remote Access", "Device Control", "Support"],
    accent: "#3B82F6",
    accentGlow: "rgba(59, 130, 246, 0.28)",
    badge: "Ultra Low Latency",
    href: "https://freedeskpro.com/",
    liveUrl: "https://freedeskpro.com/",
    category: "Remote & IT Tools",
    launchStatus: "Live & Active",
    metrics: { label: "Daily Sessions", value: "250K+" },
    ctaText: "Explore FreeDeskPro",
    keyFeatures: [
      "60 FPS fluid remote screen sharing with sub-30ms latency",
      "Cross-platform clipboard, file transfer & audio routing",
      "Unattended remote server access with 2FA token security",
      "Session recording & enterprise compliance reporting",
    ],
  },
  {
    id: "modhuralap",
    number: "04 / 04",
    name: "Modhuralap",
    title: "Modhuralap",
    tagline: "Connect. Meet. Create Memories.",
    description: "High-engagement social community platform bringing verified people together with real-time conversations.",
    tags: ["Social", "Community", "Connections"],
    accent: "#EC4899",
    accentGlow: "rgba(236, 72, 153, 0.28)",
    badge: "Community Hub",
    href: "/products/modhuralap",
    category: "Social Network",
    launchStatus: "Live & Active",
    metrics: { label: "Community Members", value: "12K+" },
    ctaText: "Explore Modhuralap",
    keyFeatures: [
      "Verified local interest-based community hubs",
      "Real-time encrypted audio & video meet rooms",
      "Event scheduling & group memory timeline archives",
      "Privacy-first interaction safeguards",
    ],
  },
];
