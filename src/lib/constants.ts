export const SITE_CONFIG = {
  name: "XSPACEWEB",
  legalName: "XSPACEWEB PRIVATE LIMITED",
  tagline: "Building digital experiences beyond boundaries.",
  description: "XSPACEWEB is an Indian technology company focused on building innovative SaaS products and delivering end-to-end digital solutions.",
  contacts: {
    email: "support@xspaceweb.com",
    phones: ["+91 8292526386", "+91 7979099017"],
    operatingHours: "Mon - Sat, 9:00 AM - 7:00 PM",
    responseTime: "We usually respond within 24 hours",
    registeredOffice: {
      title: "Registered Office",
      company: "XSPACEWEB PRIVATE LIMITED",
      address: "Muraidih, Dhanbad, Jharkhand, India 828306",
      cin: "U62012JH2024PTC022737",
    },
    corporateOffice: {
      title: "Corporate Office",
      company: "XSPACEWEB PRIVATE LIMITED",
      address: "Airport Gate, Holding number 131 (95), 131, 03, Jangalpur Rd, International Airport, Kolkata, West Bengal 700081",
    },
  },
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Services", href: "/services" },
    { label: "Studio", href: "/#studio" },
    { label: "Industries", href: "/#industries" },
    { label: "About", href: "/about" },
    { label: "News & Updates", href: "/news-and-updates" },
  ],
  footerLinks: {
    company: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Our Process", href: "/#process" },
      { label: "Contact", href: "/contact" },
    ],
    products: [
      { label: "MakeGSTBill", href: "https://makegstbill.com/" },
      { label: "GoldenGST", href: "https://www.goldengst.com/" },
      { label: "FreeDeskPro", href: "https://freedeskpro.com/" },
      { label: "SimpleKaam", href: "http://simplekaam.com/" },
      { label: "All Products", href: "/products" },
    ],
    services: [
      { label: "Digital Marketing", href: "/services#digital-marketing" },
      { label: "Website Development", href: "/services#website-development" },
      { label: "App Development", href: "/services#app-development" },
      { label: "Studio XSW", href: "/#studio-xsw" },
      { label: "UI/UX Design", href: "/services#ui-ux-design" },
      { label: "Graphic Design", href: "/services#graphic-design" },
    ],
    resources: [
      { label: "Blog", href: "/#blog" },
      { label: "Case Studies", href: "/#case-studies" },
      { label: "Help Center", href: "/contact#help" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-conditions" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "Refund Policy", href: "/refund-policy" },
    ],
  },
  socials: [
    { name: "LinkedIn", href: "https://in.linkedin.com/company/xspaceweb", icon: "linkedin" },
    { name: "Instagram", href: "https://www.instagram.com/xspaceweb/", icon: "instagram" },
    { name: "Facebook", href: "https://www.facebook.com/Xspace.web", icon: "facebook" },
  ],
};

export const SOURCE_LABELS: Record<string, string> = {
  "homepage-digital-solutions": "Homepage – Get Started",
  "homepage-project": "Homepage – Project Form",
  "homepage": "Homepage – Project Form",
  "services-page": "Services Page",
  "about-page": "About – Let's Build Together",
  "contact-page": "Contact Page",
  "contact": "Contact Page",
  "navbar": "Navbar – Let's Talk",
};

export function formatSource(source?: string | null): string {
  if (!source) return "Website";
  if (SOURCE_LABELS[source]) return SOURCE_LABELS[source];
  return source
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
