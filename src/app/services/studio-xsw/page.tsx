import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio XSW — Visions Beyond Boundaries | XSPACEWEB",
  description:
    "Cinematic production archive and wildlife photography by Studio XSW (XSPACEWEB). High-impact visual narratives captured without intervention.",
};

export default function StudioXswPage() {
  return (
    <div className="relative w-full h-[100dvh] bg-black overflow-hidden select-none">
      {/* Fullscreen Embedded Self-Contained Archive Experience */}
      <iframe
        src="/services/studio-xsw.html"
        title="Studio XSW — Visions Beyond Boundaries"
        className="w-full h-full border-0 absolute inset-0 z-10"
        allow="autoplay; fullscreen"
      />
    </div>
  );
}
