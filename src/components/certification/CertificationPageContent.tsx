"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { CertificationHero } from "./CertificationHero";
import { CertificationResultCard, VerifiedInternData } from "./CertificationResultCard";
import { CertificationInternsShowcase } from "./CertificationInternsShowcase";
import { CertificationCtaBanner } from "./CertificationCtaBanner";
import { normalizeInternshipId } from "@/lib/internship-utils";

interface CertificationPageContentProps {
  initialIntern?: VerifiedInternData | null;
  initialId?: string;
  initialError?: string | null;
}

export const CertificationPageContent: React.FC<CertificationPageContentProps> = ({
  initialIntern = null,
  initialId = "",
  initialError = null,
}) => {
  const resultRef = useRef<HTMLDivElement>(null);

  const [searchedId, setSearchedId] = useState<string>(
    initialId || initialIntern?.internshipId || ""
  );
  const [intern, setIntern] = useState<VerifiedInternData | null>(initialIntern);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(initialError);

  // Sync state if server passes updated props during navigation
  useEffect(() => {
    if (initialIntern) {
      setIntern(initialIntern);
      setSearchedId(initialIntern.internshipId);
      setErrorMessage(null);
    } else if (initialError) {
      setIntern(null);
      setErrorMessage(initialError);
    }
  }, [initialIntern, initialError]);

  const performSearch = useCallback(
    async (id: string, shouldScroll = true) => {
      const normalized = normalizeInternshipId(id);
      if (!normalized) return;

      // If already displaying this exact intern, don't refetch
      if (normalized === intern?.internshipId && !errorMessage) {
        if (shouldScroll) {
          resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        return;
      }

      setSearchedId(normalized);
      setIsLoading(true);
      setErrorMessage(null);

      // Update URL in browser history cleanly without triggering router refresh loops
      if (typeof window !== "undefined") {
        try {
          const currentUrl = new URL(window.location.href);
          if (currentUrl.searchParams.get("id")?.toUpperCase() !== normalized) {
            currentUrl.searchParams.set("id", normalized);
            window.history.replaceState(null, "", currentUrl.toString());
          }
        } catch {
          // ignore history update errors
        }
      }

      try {
        const res = await fetch(`/api/certification/verify?id=${encodeURIComponent(normalized)}`);
        const data = await res.json();

        if (!res.ok) {
          setIntern(null);
          setErrorMessage(
            data.error || "Internship record not found. Please check your Internship ID and try again."
          );
        } else if (data.intern) {
          setIntern(data.intern);
          setErrorMessage(null);
          if (shouldScroll) {
            setTimeout(() => {
              resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
          }
        } else {
          setIntern(null);
          setErrorMessage("Internship record not found. Please check your Internship ID and try again.");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setIntern(null);
        setErrorMessage("Verification service temporarily unavailable. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [intern?.internshipId, errorMessage]
  );

  return (
    <div className="min-h-screen bg-white text-[#07152B]">
      {/* 1. Hero Search Section with 4 feature pills & 3D Certificate stack */}
      <CertificationHero
        onSearch={(id) => performSearch(id, true)}
        isLoading={isLoading}
        initialId={searchedId}
        errorMessage={errorMessage}
        clearError={() => setErrorMessage(null)}
      />

      {/* 2. Search Result Container (appears when an intern record is verified) */}
      <div ref={resultRef} className="scroll-mt-24">
        {intern && (
          <section className="py-10 sm:py-16 bg-gradient-to-b from-white via-slate-50/60 to-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <CertificationResultCard intern={intern} />
            </div>
          </section>
        )}
      </div>

      {/* 3. "Meet Our Amazing Interns" cards row + Quote Carousel */}
      <CertificationInternsShowcase
        onSelectIntern={(id) => {
          performSearch(id, true);
        }}
      />

      {/* 4. Bottom CTA Banner: "Start Your 30-Day Free Trial" */}
      <CertificationCtaBanner />
    </div>
  );
};
