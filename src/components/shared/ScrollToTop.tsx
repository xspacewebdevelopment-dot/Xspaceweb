"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollToTop
 *
 * Ensures that whenever a user navigates between routes,
 * the viewport is immediately and synchronously reset to the top (0, 0),
 * preventing the browser or smooth-scroll from carrying over the previous
 * page's scroll position into the middle or second section of the target page.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // If navigating directly to a hash anchor (e.g. /#process), do not override
    if (window.location.hash) return;

    // Prevent browser from restoring previous scroll position
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const html = document.documentElement;
    const body = document.body;
    const originalScrollBehavior = html.style.scrollBehavior;

    // Disable smooth scrolling temporarily to enforce instant jump to top
    html.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    html.scrollTop = 0;
    body.scrollTop = 0;

    // Re-verify on next animation frame after React layout & DOM mount
    const rafId = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      html.scrollTop = 0;
      body.scrollTop = 0;
      html.style.scrollBehavior = originalScrollBehavior;

      // If GSAP ScrollTrigger is registered, force a recalculation from top 0
      try {
        const win = window as unknown as { ScrollTrigger?: { refresh: () => void } };
        if (win.ScrollTrigger && typeof win.ScrollTrigger.refresh === "function") {
          win.ScrollTrigger.refresh();
        }
      } catch {
        // no-op
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
      html.style.scrollBehavior = originalScrollBehavior;
    };
  }, [pathname]);

  return null;
}
