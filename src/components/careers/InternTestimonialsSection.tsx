"use client";

import React from "react";
import Image from "next/image";
import { Star, Quote, Sparkles } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

export const InternTestimonialsSection: React.FC = () => {
  return (
    <section className="w-full bg-[#F8FAFC] py-16 sm:py-24 border-b border-slate-200/80">
      <Container size="wide">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1668E8]/10 text-[#1668E8] border border-[#1668E8]/20 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#1668E8]" />
            <span className="text-[11px] font-bold tracking-wider uppercase">
              INTERNSHIP TESTIMONIALS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#07152B] tracking-tight">
            What Our <span className="text-[#1668E8]">Interns</span> Say
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
            Real experiences. Real growth. Hear directly from our interns about their journey, learning, and life at XSPACEWEB.
          </p>
        </div>

        {/* Bento / Masonry Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 items-start">
          {/* Column 1: Left 2 Cards (col-span-3) */}
          <div className="lg:col-span-3 space-y-5">
            {/* Card 1: Aman Verma */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow relative">
              <Quote className="w-6 h-6 text-[#1668E8] fill-[#1668E8] mb-2" />
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                &ldquo;XSPACEWEB gave me a great learning experience. The team is very supportive and always encourages new ideas.&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden flex-shrink-0 relative">
                  <Image
                    src="/images/news/gallery_outdoor_team.jpg"
                    alt="Aman Verma"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#07152B]">Aman Verma</h4>
                  <p className="text-[10px] text-slate-400">Frontend Development Intern</p>
                </div>
              </div>
            </div>

            {/* Card 2: Victoria Wilson */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                &ldquo;I got massive exposure at XSPACEWEB working on real projects. I learned modern tools, improved my technical skills and gained confidence. The mentors are very helpful and the work culture is amazing.&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden flex-shrink-0 relative">
                  <Image
                    src="/images/news/news_hero_centered.jpg"
                    alt="Victoria Wilson"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#07152B]">Victoria Wilson</h4>
                  <p className="text-[10px] text-slate-400">Product Design Intern</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Middle Left (col-span-3) */}
          <div className="lg:col-span-3 space-y-5">
            {/* Card 3: Nishi Karmakar */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-12 h-12 rounded-full mx-auto mb-2 overflow-hidden relative shadow-sm border border-slate-100">
                <Image
                  src="/images/careers/intern_hero_portrait.jpg"
                  alt="Nishi Karmakar"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="flex justify-center gap-0.5 text-amber-400 mb-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <h4 className="text-xs font-bold text-[#07152B] mb-1">
                I really appreciate!
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
                &ldquo;XSPACEWEB has an amazing team and a great learning environment. I learned a lot during my internship.&rdquo;
              </p>
              <p className="text-[11px] font-bold text-[#07152B]">Nishi Karmakar</p>
              <p className="text-[10px] text-slate-400">Marketing Intern</p>
            </div>

            {/* Card 4: Multi-intern Team Appreciation */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow text-center">
              <h4 className="text-xs font-bold text-[#07152B] mb-2">
                I was very impressed!
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed mb-4">
                &ldquo;The team is talented, the work environment is positive, and there are always opportunities to learn. XSPACEWEB is the perfect place for students who want real industry exposure.&rdquo;
              </p>
              <div className="flex items-center justify-center -space-x-2">
                <div className="w-7 h-7 rounded-full border-2 border-white overflow-hidden relative bg-slate-300">
                  <Image src="/images/careers/intern_hero_portrait.jpg" alt="Intern 1" fill className="object-cover" />
                </div>
                <div className="w-7 h-7 rounded-full border-2 border-white overflow-hidden relative bg-slate-300">
                  <Image src="/images/news/news_hero_centered.jpg" alt="Intern 2" fill className="object-cover" />
                </div>
                <div className="w-7 h-7 rounded-full border-2 border-white overflow-hidden relative bg-slate-300">
                  <Image src="/images/news/gallery_outdoor_team.jpg" alt="Intern 3" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Centerpiece Featured Portrait Card (col-span-3) */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
            <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden bg-slate-100 mb-4">
              <Image
                src="/images/careers/intern_hero_portrait.jpg"
                alt="Sarah Khan Featured Intern"
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="text-center px-2 pb-2">
              <p className="text-xs font-medium text-slate-700 italic leading-relaxed mb-2">
                &ldquo;Much more than just an intern. A place to learn, grow and be yourself.&rdquo;
              </p>
              <span className="font-serif italic text-sm font-bold text-[#07152B] block">
                Sarah Khan
              </span>
              <span className="text-[10px] text-slate-400">Software Engineer Intern</span>
            </div>
          </div>

          {/* Column 4: Right 2 Cards (col-span-3) */}
          <div className="lg:col-span-3 space-y-5">
            {/* Card 5: Good Job & Riya Sharma */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden flex-shrink-0 relative">
                  <Image
                    src="/images/careers/intern_hero_portrait.jpg"
                    alt="Riya Sharma"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <div className="flex gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <h4 className="text-xs font-bold text-[#07152B]">Good Job!</h4>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
                &ldquo;Supportive team and excellent guidance. Helped me improve my skills and gain real industry experience.&rdquo;
              </p>
              <div className="text-right">
                <span className="font-serif italic text-xs font-bold text-[#07152B] block">
                  Riya Sharma
                </span>
                <span className="text-[10px] text-slate-400">Frontend Intern</span>
              </div>
            </div>

            {/* Card 6: Rohit Verma & Ravi Mishra */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
                &ldquo;The internship at XSPACEWEB helped me explore new technologies and work on real client projects. The team is supportive and always open to feedback. It was a great learning journey.&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden flex-shrink-0 relative">
                  <Image
                    src="/images/news/gallery_outdoor_team.jpg"
                    alt="Ravi Mishra"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#07152B]">Ravi Mishra</h4>
                  <p className="text-[10px] text-slate-400">Co-Founder Intern</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
