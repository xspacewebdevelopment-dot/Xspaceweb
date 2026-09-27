"use client";

import React from "react";
import ImageGallery from "@/components/ui/image-gallery";
import { Container } from "@/components/shared/ui/Container";

const selectedWorkImages = [
  "/select/select1.png",
  "/select/select2.png",
  "/select/select3.png",
  "/select/select4.png",
  "/select/select5.png",
  "/select/select6.png",
  "/select/Paper Dunes at Sunrise.png",
];

export const SelectedWorkSection: React.FC = () => {
  return (
    <section id="selected-work" className="w-full bg-white py-12 sm:py-16 relative border-t border-b border-slate-200/80">
      <Container size="wide">
        <ImageGallery
          eyebrow="Studio XSW®"
          title="Selected Work"
          subtitle="Ideas we've designed, built & brought to life."
          images={selectedWorkImages}
        />
      </Container>
    </section>
  );
};
