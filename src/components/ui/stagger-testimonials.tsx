"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const SQRT_5000 = Math.sqrt(5000);

export interface TestimonialItem {
  tempId?: number | string;
  id?: number | string;
  testimonial: string;
  by: string;
  rating?: number;
  imgSrc: string;
}

const defaultTestimonials: TestimonialItem[] = [
  {
    tempId: 0,
    testimonial: "XspaceWeb transformed our digital presence completely. Their 3D design and web performance exceeded all expectations!",
    by: "Rohan Mehta, CEO at TechInnovate",
    rating: 5,
    imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    tempId: 1,
    testimonial: "The attention to detail in UI/UX and motion design is unmatched. Our conversion rates jumped 180% after launch!",
    by: "Amit Shah, CTO at SecureNet India",
    rating: 5,
    imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  },
  {
    tempId: 2,
    testimonial: "We were lost before we found XspaceWeb. They delivered a enterprise-grade web application in record time.",
    by: "Priya Sharma, COO at InnovateCo",
    rating: 5,
    imgSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  },
  {
    tempId: 3,
    testimonial: "XspaceWeb's products make scaling our web infrastructure seamless. Can't recommend their team enough!",
    by: "Ananya Roy, VP of Engineering at CloudMasters",
    rating: 5,
    imgSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
  },
  {
    tempId: 4,
    testimonial: "If I could give 10 stars, I would. The tactile 3D interactions and mobile responsiveness are state of the art.",
    by: "Vikram Singhania, Head of Design at CreativeSolutions",
    rating: 5,
    imgSrc: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
  },
  {
    tempId: 5,
    testimonial: "Extremely happy with XspaceWeb! They saved us over 120 hours of design iterations with their components.",
    by: "Kavita Deshmukh, Product Manager at TimeWise",
    rating: 5,
    imgSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
  },
  {
    tempId: 6,
    testimonial: "Now that we're powered by XspaceWeb architecture, our team is never going back to generic web templates.",
    by: "Rajesh Kumar, Marketing Director at BrandBuilders",
    rating: 5,
    imgSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
  },
  {
    tempId: 7,
    testimonial: "The analytical precision and SEO speed scores achieved by XspaceWeb resulted in a 100X ROI for our platform.",
    by: "Daniel Joseph, Data Scientist at AnalyticsPro",
    rating: 5,
    imgSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
  },
  {
    tempId: 8,
    testimonial: "Hands down the best web design & development studio we have collaborated with in the industry. Period.",
    by: "Fernando Alva, Lead UX Designer at UserFirst",
    rating: 5,
    imgSrc: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
  },
  {
    tempId: 9,
    testimonial: "Switched our front-end infrastructure to XspaceWeb design system 2 years ago and our apps run lightning fast.",
    by: "Aditya Verma, DevOps Engineer at CloudScale",
    rating: 5,
    imgSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
  },
  {
    tempId: 10,
    testimonial: "I've been searching for a web agency like XspaceWeb for years. So glad we finally partnered with them!",
    by: "Preeti Nair, Sales Director at RevenueRockets",
    rating: 5,
    imgSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  },
  {
    tempId: 11,
    testimonial: "Simple, intuitive, and blisteringly fast. Our entire product team got up to speed within minutes.",
    by: "Marina Silva, HR Tech Manager at TalentForge",
    rating: 5,
    imgSrc: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
  },
  {
    tempId: 12,
    testimonial: "XspaceWeb customer support is unparalleled. They are available 24/7 whenever we need new features built.",
    by: "Siddharth Rao, Customer Success Lead at ClientCare",
    rating: 5,
    imgSrc: "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=400&q=80",
  },
  {
    tempId: 13,
    testimonial: "The efficiency and performance gains we've seen since launching our web app with XspaceWeb are off the charts!",
    by: "Neha Kapoor, Operations Manager at Streamline",
    rating: 5,
    imgSrc: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80",
  },
  {
    tempId: 14,
    testimonial: "XspaceWeb has revolutionized how we handle digital workflows. A true game-changer for modern enterprises!",
    by: "Lila Chen, Workflow Specialist at ProcessPro",
    rating: 5,
    imgSrc: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
  },
  {
    tempId: 15,
    testimonial: "The scalability of XspaceWeb code is remarkable. It handles high traffic volume without any drop in speed.",
    by: "Trevor Vance, VP of Growth at GrowthGurus",
    rating: 5,
    imgSrc: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
  },
];

interface TestimonialCardProps {
  position: number;
  testimonial: TestimonialItem;
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-6 sm:p-8 transition-all duration-500 ease-in-out select-none",
        isCenter
          ? "z-10 bg-[#1668E8] text-white border-[#1668E8] shadow-2xl"
          : "z-0 bg-white text-slate-800 border-slate-200 hover:border-blue-400"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(40px 0%, calc(100% - 40px) 0%, 100% 40px, 100% 100%, calc(100% - 40px) 100%, 40px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.55) * position}px)
          translateY(${isCenter ? -60 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? "0px 12px 32px -4px rgba(22, 104, 232, 0.4), 0px 4px 0px 4px #0F4CB0"
          : "0px 0px 0px 0px transparent",
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-slate-300/80"
        style={{
          right: -2,
          top: 38,
          width: SQRT_5000,
          height: 2,
        }}
      />
      <div className="flex items-center justify-between mb-4">
        <img
          src={testimonial.imgSrc}
          alt={testimonial.by.split(",")[0]}
          className="h-12 w-12 sm:h-14 sm:w-14 rounded-full object-cover border-2 border-white shadow-md"
        />
        {/* Star Rating Render */}
        <div className="flex items-center gap-0.5">
          {[...Array(testimonial.rating || 5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "w-4 h-4 fill-amber-400",
                isCenter ? "text-amber-300" : "text-amber-400"
              )}
            />
          ))}
        </div>
      </div>
      <h3
        className={cn(
          "text-sm sm:text-base md:text-lg font-medium leading-snug line-clamp-4",
          isCenter ? "text-white" : "text-slate-900"
        )}
      >
        &ldquo;{testimonial.testimonial}&rdquo;
      </h3>
      <p
        className={cn(
          "absolute bottom-6 left-6 right-6 text-xs sm:text-sm italic font-semibold truncate",
          isCenter ? "text-blue-100" : "text-slate-500"
        )}
      >
        — {testimonial.by}
      </p>
    </div>
  );
};

export interface StaggerTestimonialsProps {
  testimonials?: TestimonialItem[];
  className?: string;
}

export const StaggerTestimonials: React.FC<StaggerTestimonialsProps> = ({
  testimonials: initialTestimonials,
  className,
}) => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState<TestimonialItem[]>(
    initialTestimonials || defaultTestimonials
  );

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-gradient-to-b from-slate-50/50 via-blue-50/20 to-slate-50/50 py-8",
        className
      )}
      style={{ height: 580 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position =
          testimonialsList.length % 2
            ? index - (testimonialsList.length + 1) / 2
            : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId ?? index}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3 z-20">
        <button
          type="button"
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center text-xl transition-all rounded-full shadow-md",
            "bg-white border-2 border-slate-200 text-slate-700 hover:bg-[#1668E8] hover:text-white hover:border-[#1668E8] hover:scale-105 active:scale-95",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          type="button"
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center text-xl transition-all rounded-full shadow-md",
            "bg-white border-2 border-slate-200 text-slate-700 hover:bg-[#1668E8] hover:text-white hover:border-[#1668E8] hover:scale-105 active:scale-95",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
