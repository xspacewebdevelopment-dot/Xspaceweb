import React from "react";
import Image from "next/image";

export const SpidermanBannerSection: React.FC = () => {
  return (
    <section className="w-full bg-[#002e69] relative overflow-hidden select-none">
      {/* Spider-Man Web Banner Visual - Full Edge-to-Edge Width */}
      <div className="w-full cursor-pointer relative transition-transform duration-300 hover:scale-[1.005] opacity-95">
        <Image
          src="/images/technologies/spiderman_web_banner_clean.jpg"
          alt="Spider-Man Web Action Banner"
          width={1920}
          height={400}
          sizes="100vw"
          loading="lazy"
          className="w-full h-auto block object-fill"
        />

        {/* Subtle Ambient Radial Highlight along the web strand */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/5 to-transparent pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500" />
      </div>
    </section>
  );
};



