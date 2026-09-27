"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Code2,
  Palette,
  BarChart3,
  Users,
  Briefcase,
  GraduationCap,
  Bookmark,
  ArrowRight,
  MapPin,
  Clock,
  Sparkles,
  X,
  CheckCircle2,
  Send,
} from "lucide-react";
import { Container } from "@/components/shared/ui/Container";
import { cn } from "@/lib/utils";

interface RoleItem {
  id: string;
  type: "job" | "internship";
  title: string;
  department: string;
  workType: string;
  location: string;
  isNew: boolean;
  description: string;
  iconBg: string;
  iconColor: string;
  icon: React.ElementType;
  responsibilities: string[];
  requirements: string[];
}

const positionsData: RoleItem[] = [
  // Full-time Jobs
  {
    id: "fullstack-dev",
    type: "job",
    title: "Full Stack Developer",
    department: "Engineering",
    workType: "Full Time",
    location: "Kolkata / Remote",
    isNew: true,
    description:
      "Build scalable web applications and SaaS products from frontend to backend.",
    iconBg: "bg-[#EBF3FE]",
    iconColor: "text-[#1668E8]",
    icon: Code2,
    responsibilities: [
      "Architect and build high-performance web applications using React, Next.js, and Node.js.",
      "Design reliable REST & GraphQL APIs with PostgreSQL and MongoDB databases.",
      "Collaborate with product designers to ship responsive, accessible user interfaces.",
      "Optimize application performance, security, and cloud scalability on AWS.",
    ],
    requirements: [
      "2+ years of full stack web engineering experience.",
      "Strong proficiency in TypeScript, Next.js, React, Node.js, and SQL/NoSQL.",
      "Experience deploying and maintaining cloud workloads.",
      "Passionate about clean code, unit testing, and developer experience.",
    ],
  },
  {
    id: "uiux-designer",
    type: "job",
    title: "UI/UX Designer",
    department: "Design",
    workType: "Full Time",
    location: "Kolkata / Remote",
    isNew: true,
    description:
      "Design intuitive interfaces and digital experiences for our growing product ecosystem.",
    iconBg: "bg-[#F3E8FF]",
    iconColor: "text-[#9333EA]",
    icon: Palette,
    responsibilities: [
      "Create high-fidelity wireframes, interactive prototypes, and design systems in Figma.",
      "Conduct user research and usability testing to refine SaaS workflows.",
      "Collaborate closely with engineers to ensure design fidelity during implementation.",
      "Produce brand assets, landing page graphics, and marketing collaterals.",
    ],
    requirements: [
      "Portfolio showcasing end-to-end web & mobile product design.",
      "Deep mastery of Figma, auto-layout, design tokens, and prototyping.",
      "Understanding of frontend CSS, accessibility standards, and responsive design.",
      "Empathetic mindset with obsession for micro-interactions and polish.",
    ],
  },
  {
    id: "marketing-exec",
    type: "job",
    title: "Digital Marketing Executive",
    department: "Marketing",
    workType: "Full Time",
    location: "Kolkata / Remote",
    isNew: true,
    description:
      "Work across SEO, social media, content and performance marketing.",
    iconBg: "bg-[#DCFCE7]",
    iconColor: "text-[#16A34A]",
    icon: BarChart3,
    responsibilities: [
      "Manage organic SEO strategies, on-page technical optimization, and high-ranking content.",
      "Execute multi-channel performance ad campaigns on Google Ads and Meta.",
      "Track analytics, user acquisition funnels, CAC, and conversion optimization.",
      "Oversee company social channels, newsletters, and press releases.",
    ],
    requirements: [
      "1-3 years in digital marketing, SaaS growth, or growth agency roles.",
      "Hands-on experience with Google Analytics 4, Search Console, and SEMrush/Ahrefs.",
      "Strong copywriting and storytelling skills for tech audiences.",
      "Data-driven approach with analytical problem-solving skills.",
    ],
  },
  {
    id: "bizdev-exec",
    type: "job",
    title: "Business Development Executive",
    department: "Business",
    workType: "Full Time",
    location: "Kolkata / Remote",
    isNew: true,
    description:
      "Help our products reach new customers, businesses and markets.",
    iconBg: "bg-[#FFE4E6]",
    iconColor: "text-[#E11D48]",
    icon: Users,
    responsibilities: [
      "Identify and engage prospective B2B clients, SMBs, and retail enterprises.",
      "Conduct product demos for MakeGSTBill, GoldenGST, and bespoke services.",
      "Manage deal cycles from initial discovery to closing and onboarding.",
      "Gather customer feedback to inform product roadmap and strategy.",
    ],
    requirements: [
      "1+ years in B2B sales, client relations, or software account management.",
      "Exceptional verbal and written communication skills.",
      "Self-motivated with strong relationship-building capabilities.",
      "Familiarity with SaaS sales cycles and CRM software.",
    ],
  },

  // Internships
  {
    id: "frontend-intern",
    type: "internship",
    title: "Frontend Engineering Intern",
    department: "Engineering",
    workType: "Internship (6 Months)",
    location: "Kolkata / Remote",
    isNew: true,
    description:
      "Work on live Next.js client products, component libraries, and interactive interfaces.",
    iconBg: "bg-[#EBF3FE]",
    iconColor: "text-[#1668E8]",
    icon: Code2,
    responsibilities: [
      "Develop modular React/Next.js components with Tailwind CSS.",
      "Integrate REST endpoints and state management.",
      "Participate in daily standups and code reviews with senior engineers.",
    ],
    requirements: [
      "Proficiency in JavaScript/TypeScript, React, HTML5, and CSS3.",
      "Familiarity with Git and GitHub workflows.",
      "Eager to learn modern web architecture and ship production features.",
    ],
  },
  {
    id: "uiux-intern",
    type: "internship",
    title: "UI/UX Design Intern",
    department: "Design",
    workType: "Internship (6 Months)",
    location: "Kolkata / Remote",
    isNew: true,
    description:
      "Assist in creating wireframes, mobile prototypes, and design system components.",
    iconBg: "bg-[#F3E8FF]",
    iconColor: "text-[#9333EA]",
    icon: Palette,
    responsibilities: [
      "Assist in user flow diagrams, low-fidelity wireframing, and Figma component libraries.",
      "Create marketing banners, social assets, and presentation graphics.",
    ],
    requirements: [
      "Strong Figma design portfolio or university design projects.",
      "Basic understanding of UI principles, typography, and color theory.",
    ],
  },
  {
    id: "growth-intern",
    type: "internship",
    title: "Growth & Marketing Intern",
    department: "Marketing",
    workType: "Internship (6 Months)",
    location: "Kolkata / Remote",
    isNew: true,
    description:
      "Support SEO research, content creation, social media campaigns, and user community growth.",
    iconBg: "bg-[#DCFCE7]",
    iconColor: "text-[#16A34A]",
    icon: BarChart3,
    responsibilities: [
      "Write educational tech blog articles and social media updates.",
      "Conduct competitor keyword research and backlinks analysis.",
    ],
    requirements: [
      "Passionate about technology, marketing, and content writing.",
      "Active on LinkedIn, Twitter, and tech communities.",
    ],
  },
  {
    id: "product-ops-intern",
    type: "internship",
    title: "SaaS Product Operations Intern",
    department: "Product",
    workType: "Internship (6 Months)",
    location: "Kolkata / Remote",
    isNew: true,
    description:
      "Help test new product releases, write customer documentation, and assist user onboarding.",
    iconBg: "bg-[#FFE4E6]",
    iconColor: "text-[#E11D48]",
    icon: Users,
    responsibilities: [
      "Perform QA testing across web and mobile builds.",
      "Assist users with onboarding and product queries.",
    ],
    requirements: [
      "Strong problem-solving mindset and detail orientation.",
      "Good communication skills and interest in SaaS businesses.",
    ],
  },
];

export const OpenPositionsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"job" | "internship">("job");
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});
  const [selectedRole, setSelectedRole] = useState<RoleItem | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [submittedRole, setSubmittedRole] = useState<string | null>(null);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredPositions = positionsData.filter((item) => item.type === activeTab);
  const jobsCount = positionsData.filter((item) => item.type === "job").length;
  const internshipsCount = positionsData.filter((item) => item.type === "internship").length;

  return (
    <section id="open-positions" className="w-full bg-white py-8 sm:py-12 border-b border-slate-200/80">
      <Container size="wide">
        {/* Toggle Pills Centered at Top */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex p-1 rounded-full bg-[#F1F5F9] border border-slate-200 shadow-inner">
            <button
              onClick={() => setActiveTab("job")}
              className={cn(
                "inline-flex items-center gap-2 px-5 sm:px-7 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer",
                activeTab === "job"
                  ? "bg-[#1668E8] text-white shadow-sm"
                  : "text-[#556987] hover:text-[#07152B]"
              )}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Jobs ({jobsCount})</span>
            </button>
            <button
              onClick={() => setActiveTab("internship")}
              className={cn(
                "inline-flex items-center gap-2 px-5 sm:px-7 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer",
                activeTab === "internship"
                  ? "bg-[#1668E8] text-white shadow-sm"
                  : "text-[#556987] hover:text-[#07152B]"
              )}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Internship ({internshipsCount})</span>
            </button>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#07152B] tracking-tight">
              Open Positions
            </h2>
            <p className="text-xs text-slate-500">
              Find the right role and help us build the future.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Sort by:</span>
            <span className="font-semibold text-[#07152B] bg-[#F8FAFC] border border-slate-200 px-2.5 py-1 rounded-md text-xs">
              Latest First ▾
            </span>
          </div>
        </div>

        {/* Role Cards List - Compact & Streamlined */}
        <div className="space-y-3">
          {filteredPositions.map((role) => {
            const Icon = role.icon;
            const isBookmarked = bookmarked[role.id];

            return (
              <div
                key={role.id}
                className="bg-white rounded-xl p-4 sm:p-4.5 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#1668E8]/40 transition-all duration-200 group flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Left Part: Icon + Info (Clickable Link) */}
                <Link
                  href={`/careers/${role.id}`}
                  className="flex items-center gap-3.5 sm:gap-4 flex-1 cursor-pointer"
                >
                  {/* Category Icon */}
                  <div
                    className={cn(
                      "w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-105",
                      role.iconBg,
                      role.iconColor
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Title & Metadata */}
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-[#07152B] group-hover:text-[#1668E8] transition-colors leading-tight">
                        {role.title}
                      </h3>
                      {role.isNew && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider bg-emerald-100 text-emerald-700 uppercase">
                          New
                        </span>
                      )}
                      {/* Tag Pills */}
                      <div className="hidden sm:flex items-center gap-1.5 text-[10.5px] text-slate-500 ml-1">
                        <span className="px-2 py-0.5 rounded bg-[#F1F5F9] font-medium text-slate-700">
                          {role.department}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#F1F5F9] font-medium text-slate-700">
                          {role.workType}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#F1F5F9] font-medium text-slate-700">
                          {role.location}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-500 leading-snug truncate max-w-2xl">
                      {role.description}
                    </p>
                  </div>
                </Link>

                {/* Right Part: Bookmark + View Details Button */}
                <div className="flex items-center justify-end gap-2.5 flex-shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <button
                    onClick={(e) => toggleBookmark(role.id, e)}
                    aria-label="Bookmark this role"
                    className={cn(
                      "p-2 rounded-lg border transition-colors cursor-pointer",
                      isBookmarked
                        ? "bg-[#1668E8]/10 text-[#1668E8] border-[#1668E8]/30"
                        : "bg-white text-slate-400 border-slate-200 hover:text-[#07152B] hover:bg-slate-50"
                    )}
                  >
                    <Bookmark
                      className={cn(
                        "w-3.5 h-3.5",
                        isBookmarked ? "fill-current" : ""
                      )}
                    />
                  </button>

                  <Link
                    href={`/careers/${role.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#1668E8] text-[#1668E8] hover:bg-[#1668E8] hover:text-white text-xs font-semibold transition-all duration-200 shadow-sm cursor-pointer group/btn"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Job Detail & Application Modal */}
        {selectedRole && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => {
                  setSelectedRole(null);
                  setIsApplying(false);
                }}
                className="absolute top-5 right-5 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-start gap-4 mb-6 pr-8">
                <div
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0",
                    selectedRole.iconBg,
                    selectedRole.iconColor
                  )}
                >
                  <selectedRole.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#07152B]">
                    {selectedRole.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-500">
                    <span className="font-semibold text-[#1668E8] bg-[#EBF3FE] px-2.5 py-0.5 rounded-md">
                      {selectedRole.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {selectedRole.workType}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {selectedRole.location}
                    </span>
                  </div>
                </div>
              </div>

              {!isApplying ? (
                <div className="space-y-6 text-sm text-slate-700">
                  <div>
                    <h4 className="font-bold text-[#07152B] mb-2">Role Overview</h4>
                    <p className="leading-relaxed text-slate-600">
                      {selectedRole.description} You will collaborate with cross-functional teams to build cutting-edge SaaS platforms and empower businesses with modern digital tools.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#07152B] mb-2">Key Responsibilities</h4>
                    <ul className="space-y-2 list-disc list-inside text-slate-600">
                      {selectedRole.responsibilities.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#07152B] mb-2">What We Are Looking For</h4>
                    <ul className="space-y-2 list-disc list-inside text-slate-600">
                      {selectedRole.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex gap-3">
                    <button
                      onClick={() => setIsApplying(true)}
                      className="w-full py-3 rounded-full bg-[#1668E8] hover:bg-[#1255c2] text-white font-semibold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Apply For This Position</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : submittedRole === selectedRole.id ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-[#07152B]">
                    Application Submitted!
                  </h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you for applying to <strong>{selectedRole.title}</strong>. Our recruiting team will review your application and contact you within 48 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedRole(null);
                      setIsApplying(false);
                      setSubmittedRole(null);
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#07152B] text-white text-xs font-semibold hover:bg-[#1668E8] transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmittedRole(selectedRole.id);
                  }}
                  className="space-y-4"
                >
                  <h4 className="font-bold text-[#07152B]">
                    Submit Your Application
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        LinkedIn / Portfolio URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://linkedin.com/in/..."
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Short Note / Cover Letter
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us briefly why you'd be a great fit..."
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
                    />
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsApplying(false)}
                      className="w-1/3 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[#07152B] text-xs font-semibold transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 py-2.5 rounded-full bg-[#1668E8] hover:bg-[#1255c2] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Application</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};
