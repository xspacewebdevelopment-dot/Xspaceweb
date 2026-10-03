"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Newspaper,
  Calendar,
  MapPin,
  Sun,
  CloudSun,
  CloudRain,
} from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

export const MastheadHeader: React.FC = () => {
  // Live dynamic date
  const [currentDate, setCurrentDate] = useState<string>("");

  // Live weather for Dhanbad, Jharkhand
  const [weather, setWeather] = useState<{
    temp: number;
    code: number;
    condition: string;
  }>({
    temp: 28,
    code: 0,
    condition: "Clear",
  });

  useEffect(() => {
    // 1. Update live current date
    const updateDate = () => {
      const now = new Date();
      const formatted = now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      setCurrentDate(formatted);
    };

    updateDate();
    const dateInterval = setInterval(updateDate, 60000);

    // 2. Fetch live weather for Dhanbad, Jharkhand (lat 23.7957, lon 86.4304)
    let isMounted = true;
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=23.7957&longitude=86.4304&current=temperature_2m,weather_code"
        );
        if (!res.ok) return;
        const data = await res.json();
        if (data?.current?.temperature_2m !== undefined && isMounted) {
          const temp = Math.round(data.current.temperature_2m);
          const code = data.current.weather_code ?? 0;
          let condition = "Clear";
          if (code === 0) condition = "Clear";
          else if (code >= 1 && code <= 3) condition = "Partly Cloudy";
          else if (code >= 45 && code <= 48) condition = "Foggy";
          else if (code >= 51 && code <= 67) condition = "Rainy";
          else if (code >= 80 && code <= 82) condition = "Showers";
          else if (code >= 95) condition = "Thunderstorm";

          setWeather({ temp, code, condition });
        }
      } catch {
        // Fallback to default 28°C
      }
    };

    fetchWeather();
    const weatherInterval = setInterval(fetchWeather, 30 * 60 * 1000);

    return () => {
      isMounted = false;
      clearInterval(dateInterval);
      clearInterval(weatherInterval);
    };
  }, []);

  return (
    <section className="w-full bg-white pt-2 pb-6 sm:pb-10">
      {/* Top Vintage / Editorial Masthead Bar & Hero */}
      <Container size="full" className="max-w-[1540px] px-2 sm:px-4 lg:px-6">
        <div className="border-t border-b border-slate-200/90 py-2 sm:py-2.5 my-1">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
            {/* Left Black Box */}
            <div className="w-full lg:w-auto flex-shrink-0 bg-[#07152B] text-white px-3.5 py-2 rounded-lg flex flex-col justify-center shadow-sm">
              <span className="text-[11px] sm:text-xs font-bold tracking-wider text-white uppercase leading-tight">
                NEWS &amp; EVENTS
              </span>
              <span className="text-[9px] sm:text-[10px] font-medium tracking-wide text-slate-300">
                THE OFFICIAL UPDATE HUB
              </span>
            </div>

            {/* Center Editorial Masthead */}
            <div className="flex-1 flex flex-col items-center justify-center text-center px-1">
              <h1 className="text-2xl sm:text-3xl lg:text-[36px] font-serif font-black tracking-tight text-[#07152B] leading-none mb-1">
                XSPACE<span className="text-[#1668E8]">WEB</span>
              </h1>
              <div className="w-full max-w-2xl h-[1px] bg-slate-200 mb-1" />
              <div className="flex flex-wrap items-center justify-center gap-x-1.5 sm:gap-x-2.5 gap-y-0.5 text-[9.5px] sm:text-[10.5px] text-slate-600 font-medium whitespace-nowrap">
                <span suppressHydrationWarning>
                  {currentDate || "Wednesday, September 24, 2026"}
                </span>
                <span className="text-slate-300">|</span>
                <Link
                  href="/news-and-updates#latest-news"
                  className="inline-flex items-center gap-1 hover:text-[#1668E8] transition-colors group cursor-pointer"
                >
                  <Newspaper className="w-2.5 h-2.5 text-slate-500 group-hover:text-[#1668E8] transition-colors" />
                  <span className="group-hover:underline">Today&apos;s News</span>
                </Link>
                <span className="text-slate-300">|</span>
                <Link
                  href="/news-and-updates/events"
                  className="inline-flex items-center gap-1 hover:text-[#1668E8] transition-colors group cursor-pointer"
                >
                  <Calendar className="w-2.5 h-2.5 text-slate-500 group-hover:text-[#1668E8] transition-colors" />
                  <span className="group-hover:underline">Events</span>
                </Link>
                <span className="text-slate-300">|</span>
                <Link
                  href="/contact#map"
                  className="inline-flex items-center gap-1 hover:text-[#1668E8] transition-colors group cursor-pointer"
                >
                  <MapPin className="w-2.5 h-2.5 text-slate-500 group-hover:text-[#1668E8] transition-colors" />
                  <span className="group-hover:underline">Dhanbad, Jharkhand</span>
                </Link>
                <span className="text-slate-300">|</span>
                <span
                  className="inline-flex items-center gap-1 text-slate-600 select-none"
                  title={`Dhanbad, Jharkhand: ${weather.temp}°C, ${weather.condition}`}
                >
                  {weather.code >= 51 ? (
                    <CloudRain className="w-2.5 h-2.5 text-blue-500" />
                  ) : weather.code >= 1 ? (
                    <CloudSun className="w-2.5 h-2.5 text-amber-500" />
                  ) : (
                    <Sun className="w-2.5 h-2.5 text-amber-500" />
                  )}
                  <span>{weather.temp}°C</span>
                </span>
              </div>
            </div>

            {/* Right Black Box */}
            <div className="w-full lg:w-auto flex-shrink-0 bg-[#07152B] text-white px-3.5 py-2 rounded-lg flex flex-col justify-center text-left lg:text-right shadow-sm">
              <span className="text-[11px] sm:text-xs font-bold tracking-wider text-white uppercase leading-tight">
                BUILT BY XSPACEWEB
              </span>
              <span className="text-[9px] sm:text-[10px] font-medium tracking-wide text-slate-300">
                TECHNOLOGY FOR A BETTER TOMORROW
              </span>
            </div>
          </div>
        </div>

        {/* Hero Newspaper Banner Image - Crisp sharp rectangle, wide span with reduced side margins */}
        <div className="mt-2.5 sm:mt-3">
          <div className="relative w-full aspect-[16/9] max-h-[520px] rounded-none overflow-hidden shadow-sm border border-slate-200/80 bg-slate-100">
            <Image
              src="/images/news/news_hero_1.png"
              alt="XSPACEWEB News and Events Newspaper"
              fill
              priority
              className="object-cover object-center"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
