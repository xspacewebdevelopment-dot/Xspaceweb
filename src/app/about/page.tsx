import React from "react";
import type { Metadata } from "next";
import {
  AboutHeroSection,
  OurStoryTimelineSection,
  WhatWeDoSection,
  OurApproachSection,
  InnovationCoreSection,
  OurVisionGoalsSection,
  OurPresenceSection,
  OurLeadershipSection,
  OurBeliefCtaSection,
} from "@/components/about";

export const metadata: Metadata = {
  title: "About Us — XSPACEWEB | Building Digital Experiences Beyond Boundaries",
  description:
    "Learn about XSPACEWEB, our journey from freelancing to a Private Limited Company, our visionary leadership, technology innovation, services, and future-ready ecosystem.",
};

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* 1. Hero Section with retro computer bliss landscape and annotations */}
      <AboutHeroSection />

      {/* 2. Our Story: From Freelancing to Private Limited (Timeline) */}
      <OurStoryTimelineSection />

      {/* 3. Our Services: What We Do Today */}
      <WhatWeDoSection />

      {/* 4. Our Approach: Built Around You */}
      <OurApproachSection />

      {/* 5. Innovation: Innovation Is Our Core */}
      <InnovationCoreSection />

      {/* 6. Our Vision & Future Goals */}
      <OurVisionGoalsSection />

      {/* 7. Our Presence: Growing Across India and Beyond */}
      <OurPresenceSection />

      {/* 8. Our Leadership: People Behind XSPACEWEB */}
      <OurLeadershipSection />

      {/* 9. Our Belief & CTA Banner: Ideas. People. Technology. Real Impact. */}
      <OurBeliefCtaSection />
    </div>
  );
}
