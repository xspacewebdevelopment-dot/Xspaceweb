import React from "react";
import { Container } from "@/components/shared/ui/Container";
import { Star } from "lucide-react";

interface ReviewPlatform {
  id: string;
  name: string;
  rating: string;
  stars: number;
  caption: string;
  logo: React.ReactNode;
}

const reviewPlatforms: ReviewPlatform[] = [
  {
    id: "clutch",
    name: "Clutch",
    rating: "4.8",
    stars: 5,
    caption: "Based on client reviews",
    logo: (
      <div className="flex items-center gap-1">
        <span className="text-lg font-black tracking-tight text-[#07152B] font-sans">
          Clutch
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#E5484D] inline-block -mt-2" />
      </div>
    ),
  },
  {
    id: "trustpilot",
    name: "Trustpilot",
    rating: "4.6",
    stars: 5,
    caption: "Trusted by global clients",
    logo: (
      <div className="flex items-center gap-1.5">
        <svg className="w-4 h-4 text-[#00B67A] fill-current" viewBox="0 0 24 24">
          <path d="m12 1.5 3.09 6.26 6.91 1-5 4.87 1.18 6.87L12 17.27l-6.18 3.23L7 13.63l-5-4.87 6.91-1L12 1.5z" />
        </svg>
        <span className="text-sm font-bold tracking-tight text-[#07152B]">
          Trustpilot
        </span>
      </div>
    ),
  },
  {
    id: "google",
    name: "Google",
    rating: "4.9",
    stars: 5,
    caption: "Google Business Reviews",
    logo: (
      <div className="flex items-center gap-1.5">
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
          />
        </svg>
        <span className="text-sm font-bold tracking-tight text-[#07152B]">
          Google
        </span>
      </div>
    ),
  },
  {
    id: "upwork",
    name: "Upwork",
    rating: "4.8",
    stars: 5,
    caption: "Rated by clients worldwide",
    logo: (
      <div className="flex items-center gap-1">
        <span className="text-base font-extrabold tracking-tight text-[#14A800] font-sans">
          Upwork
        </span>
      </div>
    ),
  },
];

export const RatingsStrip: React.FC = () => {
  return (
    <section className="w-full relative z-10 pt-2 sm:pt-4 pb-6 sm:pb-8 bg-white">
      <Container size="wide">
        {/* Main Soft-white Rounded Container matching PDF */}
        <div className="w-full rounded-[24px] sm:rounded-[32px] bg-[#F8FAFC] border border-slate-200/80 p-5 sm:p-7 lg:p-8 shadow-[0_12px_36px_-6px_rgba(7,21,43,0.06),0_2px_8px_-2px_rgba(7,21,43,0.03)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-4 items-center">
            
            {/* Column 1: Title & Subtitle */}
            <div className="lg:col-span-3 pr-0 lg:pr-4 lg:border-r border-slate-200/80">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#07152B] tracking-tight leading-snug">
                Loved by businesses worldwide.
              </h2>
              <p className="text-sm text-[#556987] mt-1.5 font-normal">
                Real feedback. Real impact.
              </p>
            </div>

            {/* Column 2-5: Review Cards */}
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {reviewPlatforms.map((platform) => (
                <div
                  key={platform.id}
                  className="rounded-2xl bg-white border border-slate-200/70 p-4 sm:p-5 shadow-[0_4px_16px_-2px_rgba(7,21,43,0.04)] flex flex-col justify-between space-y-3 transition-shadow hover:shadow-md"
                >
                  {/* Top row: Platform logo + Rating score */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="h-6 flex items-center">{platform.logo}</div>
                    <span className="text-2xl font-black text-[#07152B] tracking-tight">
                      {platform.rating}
                    </span>
                  </div>

                  {/* Middle row: 5 Stars */}
                  <div className="flex items-center gap-1" aria-label={`${platform.rating} out of 5 stars`}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-[#FF7A00] text-[#FF7A00]"
                      />
                    ))}
                  </div>

                  {/* Bottom row: Caption */}
                  <p className="text-xs text-[#556987] font-medium leading-tight">
                    {platform.caption}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
};
