import React from "react";
import type { Metadata } from "next";
import {
  CompanyHeroSection,
  CompanyMilestonesSection,
  CompanyEssentialInfoSection,
  CompanyLegalDetailsSection,
  CompanyLocationsSection,
  CompanyLeadershipSection,
  CompanyPresenceSection,
} from "@/components/company";

export const metadata: Metadata = {
  title: "Company Information — XSPACEWEB PRIVATE LIMITED",
  description:
    "A journey from freelance in 2021 to a Private Limited Company. Explore XSPACEWEB's corporate registration details, key milestones, leadership, and operational presence.",
};

export default function CompanyPage() {
  return (
    <main className="w-full min-h-screen bg-white">
      {/* 1. Hero: A Journey from Freelance to a Private Limited Company */}
      <CompanyHeroSection />

      {/* 2. Key Milestones Timeline */}
      <CompanyMilestonesSection />

      {/* 3. Essential Information (6 Cards Grid) */}
      <CompanyEssentialInfoSection />

      {/* 4. Registration Details (CIN & GST Cards) */}
      <CompanyLegalDetailsSection />

      {/* 5. Locations (Dhanbad, Kolkata, Hazaribagh) */}
      <CompanyLocationsSection />

      {/* 6. The People Behind XSPACEWEB (Dhrub Kumar Karmkar & Rahul Kumar) */}
      <CompanyLeadershipSection />

      {/* 7. Across Two States, Serving Clients Nationwide */}
      <CompanyPresenceSection />
    </main>
  );
}
