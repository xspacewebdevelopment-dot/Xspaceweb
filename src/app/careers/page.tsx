import React from "react";
import { Metadata } from "next";
import { CareerHero } from "@/components/careers/CareerHero";
import { OpenPositionsSection } from "@/components/careers/OpenPositionsSection";
import { InternTestimonialsSection } from "@/components/careers/InternTestimonialsSection";
import { CareerCtaSection } from "@/components/careers/CareerCtaSection";

export const metadata: Metadata = {
  title: "Careers & Internships | XSPACEWEB",
  description:
    "Find your opportunity at XSPACEWEB. Join our team of passionate engineers, designers, and innovators building impactful SaaS products and digital solutions.",
  openGraph: {
    title: "Careers & Internships | XSPACEWEB",
    description:
      "Find your opportunity at XSPACEWEB. Join our team of passionate engineers, designers, and innovators building impactful SaaS products and digital solutions.",
  },
};

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-white">
      <CareerHero />
      <OpenPositionsSection />
      <InternTestimonialsSection />
      <CareerCtaSection />
    </main>
  );
}
