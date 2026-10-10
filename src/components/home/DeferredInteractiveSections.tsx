"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const TechnologiesSection = dynamic(
  () => import("@/components/home/TechnologiesSection").then((mod) => mod.TechnologiesSection),
  {
    ssr: false,
    loading: () => <div className="w-full min-h-[380px] bg-[#07152B]" />,
  }
);

const TrustedBusinessesSection = dynamic(
  () => import("@/components/home/TrustedBusinessesSection").then((mod) => mod.TrustedBusinessesSection),
  {
    ssr: false,
    loading: () => <div className="w-full min-h-[300px] bg-white" />,
  }
);

function useInViewTrigger(rootMargin = "500px") {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}

export function DeferredTechnologiesSection() {
  const { ref, inView } = useInViewTrigger("500px");

  return (
    <div ref={ref} className="w-full">
      {inView ? <TechnologiesSection /> : <div className="w-full min-h-[380px] bg-[#07152B]" />}
    </div>
  );
}

const ProductShowcase = dynamic(
  () => import("@/components/products/showcase").then((mod) => mod.ProductShowcase),
  {
    ssr: false,
    loading: () => <div className="w-full min-h-[520px] bg-white" />,
  }
);

export function DeferredProductShowcaseSection() {
  const { ref, inView } = useInViewTrigger("500px");

  return (
    <div ref={ref} className="w-full">
      {inView ? <ProductShowcase /> : <div className="w-full min-h-[520px] bg-white" />}
    </div>
  );
}

export function DeferredTrustedBusinessesSection() {
  const { ref, inView } = useInViewTrigger("500px");

  return (
    <div ref={ref} className="w-full">
      {inView ? <TrustedBusinessesSection /> : <div className="w-full min-h-[300px] bg-white" />}
    </div>
  );
}

const TestimonialsSection = dynamic(
  () => import("@/components/home/TestimonialsSection").then((mod) => mod.TestimonialsSection),
  {
    ssr: false,
    loading: () => <div className="w-full min-h-[450px] bg-white" />,
  }
);

export function DeferredTestimonialsSection({ initialReviews }: { initialReviews: any[] }) {
  const { ref, inView } = useInViewTrigger("500px");

  return (
    <div ref={ref} className="w-full">
      {inView ? <TestimonialsSection initialReviews={initialReviews} /> : <div className="w-full min-h-[450px] bg-white" />}
    </div>
  );
}

const BrighterTomorrowSection = dynamic(
  () => import("@/components/home/BrighterTomorrowSection").then((mod) => mod.BrighterTomorrowSection),
  {
    ssr: false,
    loading: () => <div className="w-full min-h-[400px] bg-[#EBF3FE]" />,
  }
);

export function DeferredBrighterTomorrowSection() {
  const { ref, inView } = useInViewTrigger("500px");

  return (
    <div ref={ref} className="w-full">
      {inView ? <BrighterTomorrowSection /> : <div className="w-full min-h-[400px] bg-[#EBF3FE]" />}
    </div>
  );
}
