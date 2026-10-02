import React from "react";
import { cn } from "@/lib/utils";

export interface GoogleMapEmbedProps {
  /** The search/place query for the map embed */
  query: string;
  /** Optional zoom level (0 to 21) */
  zoom?: number;
  /** Additional CSS class names for styling or sizing */
  className?: string;
  /** Accessible iframe title */
  title?: string;
}

export const GoogleMapEmbed: React.FC<GoogleMapEmbedProps> = ({
  query,
  zoom,
  className = "",
  title = "Google Map Location",
}) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div
        className={cn(
          "w-full bg-slate-100/80 border border-slate-200 rounded-xl flex items-center justify-center p-4 text-xs text-slate-500 font-medium text-center",
          className
        )}
      >
        <span>Google Maps API key is not configured.</span>
      </div>
    );
  }

  const encodedQuery = encodeURIComponent(query);
  const zoomParam = zoom !== undefined ? `&zoom=${zoom}` : "";
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedQuery}${zoomParam}`;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl bg-slate-100",
        className
      )}
    >
      <iframe
        title={title}
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full border-0 block"
      />
    </div>
  );
};
