/**
 * Section 5: UI/UX Services & Capabilities Data
 * Contains the 9 core services provided by XSPACEWEB.
 * Text-focused, editorial, and completely isolated from Sections 1–4.
 */

export interface UiUxServiceItem {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
}

export const SECTION5_SERVICES: UiUxServiceItem[] = [
  {
    id: "s5-service-01",
    number: "01",
    name: "UX RESEARCH",
    tagline: "Understand your users before designing the experience.",
    description:
      "We explore user needs, behaviors, pain points and expectations to uncover insights that guide better product decisions.",
  },
  {
    id: "s5-service-02",
    number: "02",
    name: "UI DESIGN",
    tagline: "Create interfaces that look clear, modern and engaging.",
    description:
      "We design polished digital interfaces with strong visual hierarchy, consistent components and thoughtful details.",
  },
  {
    id: "s5-service-03",
    number: "03",
    name: "UX DESIGN",
    tagline: "Make digital products simple and intuitive to use.",
    description:
      "We structure user journeys, information architecture and interactions so users can complete tasks naturally.",
  },
  {
    id: "s5-service-04",
    number: "04",
    name: "PROTOTYPING",
    tagline: "Turn ideas into experiences you can test.",
    description:
      "We create interactive prototypes that help teams validate concepts, communicate ideas and identify improvements before development.",
  },
  {
    id: "s5-service-05",
    number: "05",
    name: "DESIGN SYSTEMS",
    tagline: "Build consistency that scales.",
    description:
      "We create reusable components, patterns, guidelines and design foundations that keep digital products consistent as they grow.",
  },
  {
    id: "s5-service-06",
    number: "06",
    name: "USABILITY TESTING",
    tagline: "Find friction before your users do.",
    description:
      "We evaluate real user interactions to identify usability problems and improve the overall experience.",
  },
  {
    id: "s5-service-07",
    number: "07",
    name: "INTERACTION DESIGN",
    tagline: "Design how products respond to people.",
    description:
      "We carefully craft interactions, transitions, states and behaviors that make interfaces feel intuitive and responsive.",
  },
  {
    id: "s5-service-08",
    number: "08",
    name: "BRANDING",
    tagline: "Give your digital product a recognizable identity.",
    description:
      "We connect visual identity, typography, color and interface design to create a consistent brand experience.",
  },
  {
    id: "s5-service-09",
    number: "09",
    name: "DEVELOPER HANDOFF",
    tagline: "Make the transition from design to development smoother.",
    description:
      "We provide organized design files, specifications, components and interaction guidelines so developers can build with confidence.",
  },
];
