import React from "react";
import ImageGallery from "@/components/ui/image-gallery";
import { Container } from "@/components/shared/ui/Container";

const selectedWorkImages = [
  "/images/selected-work/select1.png",
  "/images/selected-work/select2.png",
  "/images/selected-work/select3.png",
  "/images/selected-work/select4.png",
  "/images/selected-work/select5.png",
  "/images/selected-work/select6.png",
  "/images/selected-work/paper_dunes_sunrise.png",
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
