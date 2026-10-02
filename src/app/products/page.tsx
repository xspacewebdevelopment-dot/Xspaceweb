"use client";

import React, { useState } from "react";
import { ProductsHeroSection } from "@/components/products/ProductsHeroSection";
import { ProductsFeatureCardsSection } from "@/components/products/ProductsFeatureCardsSection";
import { ProductsEcosystemSection } from "@/components/products/ProductsEcosystemSection";
import { ProductsReviewsAndGetStartedSection } from "@/components/products/ProductsReviewsAndGetStartedSection";
import {
  ProductsInteractiveDemoModal,
  FullProduct,
} from "@/components/products/ProductsInteractiveDemoModal";

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<FullProduct | null>(null);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const handleOpenGeneralDemo = () => {
    setSelectedProduct({
      id: "goldengst",
      number: "01",
      name: "GoldenGST",
      tagline: "Advanced GST Billing, Accounting & Multi-Branch ERP.",
      category: "fintech",
      categoryLabel: "FinTech & ERP",
      badge: "Enterprise Flagship",
      isPopular: true,
      accentColor: "#D97706",
      bgGradient: "from-amber-500/10 via-amber-100/30 to-white",
      borderColor: "border-amber-200",
      description:
        "Enterprise-grade GST billing and inventory suite engineered for Indian wholesalers, distributors and manufacturing enterprises. Handles e-Invoicing, automated GSTR reconciliation and audit-ready reporting.",
      keyFeatures: [
        "Automated e-Way Bill & IRN generation in 1-click",
        "Multi-godown inventory tracking with batch & expiry alerts",
        "Real-time GSTR-1, GSTR-3B & GSTR-9 automated filling prep",
        "Multi-user permission matrix with audit logs",
      ],
      metrics: { label: "Invoices Processed", value: "₹ 150Cr+" },
      launchStatus: "Live & Active",
      iconComponent: (
        <div className="w-12 h-12 rounded-2xl bg-[#601414] flex items-center justify-center text-amber-300 font-extrabold text-2xl shadow-md border border-amber-400/40">
          G
        </div>
      ),
    });
    setIsDemoModalOpen(true);
  };

  const handleOpenProductDemo = (productId: string) => {
    if (productId === "simplekaam") {
      setSelectedProduct({
        id: "simplekaam",
        number: "01",
        name: "SimpleKaam",
        tagline: "All-in-one business management platform for modern teams.",
        category: "automation",
        categoryLabel: "Productivity",
        badge: "Coming Soon (Oct 2026)",
        accentColor: "#1668E8",
        bgGradient: "from-blue-500/10 via-indigo-100/30 to-white",
        borderColor: "border-blue-200",
        description:
          "Comprehensive task management, project milestones, team time-tracking and client invoice automation unified in a high-speed interface.",
        keyFeatures: [
          "Kanban, List and Timeline Gantt views",
          "Automated client invoice generation & payment triggers",
          "Team workload distribution and time tracking",
          "Real-time team chat & file asset sharing",
        ],
        metrics: { label: "Projected Teams", value: "5,000+" },
        launchStatus: "Early Access",
        iconComponent: (
          <div className="w-12 h-12 rounded-2xl bg-[#1668E8] flex items-center justify-center text-white font-extrabold text-2xl shadow-md">
            S
          </div>
        ),
      });
      setIsDemoModalOpen(true);
    } else if (productId === "gurukul") {
      setSelectedProduct({
        id: "gurukul",
        number: "02",
        name: "Gurukul Coaching App",
        tagline: "Modern Learning for a Brighter Future.",
        category: "social",
        categoryLabel: "EdTech & LMS",
        badge: "Coming Soon (Oct 2026)",
        accentColor: "#7C3AED",
        bgGradient: "from-purple-500/10 via-violet-100/30 to-white",
        borderColor: "border-purple-200",
        description:
          "All-in-one coaching institute and school management system featuring live video classes, attendance tracking, test assessments, fee collection and automated student report cards.",
        keyFeatures: [
          "Interactive live streaming classrooms with hand-raise",
          "Automated online MCQ & subjective exam grading",
          "Direct parent notification app on WhatsApp & SMS",
          "Digital fee collection & receipt generation",
        ],
        metrics: { label: "Institutes Ready", value: "200+" },
        launchStatus: "Early Access",
        iconComponent: (
          <div className="w-12 h-12 rounded-2xl bg-[#7C3AED] flex items-center justify-center text-white font-extrabold text-2xl shadow-md">
            G
          </div>
        ),
      });
      setIsDemoModalOpen(true);
    } else if (productId === "makegstbill") {
      setSelectedProduct({
        id: "makegstbill",
        number: "02",
        name: "MakeGSTBill",
        tagline: "Simple, Fast & Effortless Invoicing for Small Businesses.",
        category: "fintech",
        categoryLabel: "FinTech & Billing",
        badge: "Most Popular",
        isPopular: true,
        accentColor: "#EA4335",
        bgGradient: "from-blue-500/10 via-red-100/30 to-white",
        borderColor: "border-blue-200",
        description:
          "Designed for retail stores, freelancers, and small business owners to generate beautiful GST-compliant invoices in under 15 seconds.",
        keyFeatures: [
          "15-second invoice creation with smart item auto-complete",
          "Instant WhatsApp & PDF invoice dispatch",
          "UPI QR code integration for instant payments",
          "Cloud backup with offline fallback mode",
        ],
        metrics: { label: "Active Businesses", value: "10,000+" },
        launchStatus: "Live & Active",
        iconComponent: (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#EA4335] via-[#4285F4] to-[#34A853] p-0.5 shadow-md">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <span className="text-2xl font-black text-[#EA4335]">M</span>
            </div>
          </div>
        ),
      });
      setIsDemoModalOpen(true);
    } else if (productId === "goldengst") {
      handleOpenGeneralDemo();
    } else if (productId === "freedeskpro") {
      setSelectedProduct({
        id: "freedeskpro",
        number: "03",
        name: "FreeDeskPro",
        tagline: "Next-Gen Remote Desktop, IT Support & Device Access.",
        category: "remote",
        categoryLabel: "Remote & IT Tools",
        badge: "Ultra Low Latency",
        accentColor: "#2563EB",
        bgGradient: "from-blue-500/10 via-sky-100/30 to-white",
        borderColor: "border-sky-200",
        description:
          "High-speed remote connection platform with 60 FPS streaming, military-grade TLS 1.3 encryption, and unattended access.",
        keyFeatures: [
          "60 FPS fluid remote screen sharing with sub-30ms latency",
          "Cross-platform clipboard, file transfer & audio routing",
          "Unattended remote server access with 2FA token security",
          "Session recording & enterprise compliance reporting",
        ],
        metrics: { label: "Daily Sessions", value: "250K+" },
        launchStatus: "Live & Active",
        iconComponent: (
          <div className="w-12 h-12 rounded-2xl bg-[#06B6D4] flex items-center justify-center text-white shadow-md">
            P
          </div>
        ),
      });
      setIsDemoModalOpen(true);
    }
  };

  return (
    <div className="w-full bg-white text-[#0A1128] overflow-x-hidden min-h-screen">
      {/* 1. Hero Section matching user Screenshot 1 */}
      <ProductsHeroSection onOpenDemo={handleOpenGeneralDemo} />

      {/* 2. Featured Products 2x2 Grid + FreeDeskPro Banner matching Screenshot 2 */}
      <ProductsFeatureCardsSection onOpenProductDemo={handleOpenProductDemo} />

      {/* 3. Why XSPACEWEB Ecosystem & Devices on Mountain Rock matching Screenshot 3 */}
      <ProductsEcosystemSection
        onExploreClick={() => {
          const el = document.getElementById("reviews-section");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* 4. What Our Users Say & Ready to Get Started World Map matching Screenshot 4 */}
      <div id="reviews-section">
        <ProductsReviewsAndGetStartedSection />
      </div>

      {/* Live Interactive Simulation Sandbox Modal */}
      <ProductsInteractiveDemoModal
        product={selectedProduct}
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </div>
  );
}
