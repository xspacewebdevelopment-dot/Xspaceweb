import { z } from "zod";
import {
  openingStatusEnum,
  openingTypeEnum,
  employmentTypeEnum,
  workModeEnum,
} from "@/lib/db/schema";

export const careerOpeningSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(120, "Title cannot exceed 120 characters"),
  slug: z.string().optional(),
  openingType: z.enum(openingTypeEnum, {
    message: "Opening type must be job or internship",
  }),
  department: z.string().min(2, "Department is required"),
  employmentType: z.enum(employmentTypeEnum, {
    message: "Please select a valid employment type",
  }),
  location: z.string().min(2, "Location is required"),
  workMode: z.enum(workModeEnum, {
    message: "Please select a valid work mode",
  }),
  shortDescription: z
    .string()
    .min(10, "Short description must be at least 10 characters")
    .max(300, "Short description cannot exceed 300 characters"),
  aboutRole: z
    .string()
    .min(30, "About the role must be at least 30 characters"),
  responsibilities: z
    .array(z.string().min(1, "Responsibility item cannot be empty"))
    .min(1, "At least 1 responsibility is required"),
  requirements: z
    .array(z.string().min(1, "Requirement item cannot be empty"))
    .min(1, "At least 1 requirement is required"),
  niceToHave: z.array(z.string()).default([]),
  skills: z.array(z.string()).default([]),
  experience: z.string().min(1, "Experience is required"),
  salary: z
    .object({
      min: z.number().nullable().optional(),
      max: z.number().nullable().optional(),
      currency: z.string().default("INR").optional(),
      period: z.enum(["monthly", "annual"]).default("annual").optional(),
      text: z.string().optional(),
    })
    .nullable()
    .optional(),
  internship: z
    .object({
      duration: z.string().optional(),
      stipend: z.string().optional(),
    })
    .nullable()
    .optional(),
  status: z.enum(openingStatusEnum).default("draft"),
  featured: z.boolean().default(false),
  closingDate: z.string().nullable().optional(),
});

export type CareerOpeningFormData = z.infer<typeof careerOpeningSchema>;

/**
 * Generate a URL-safe slug from a title string.
 * Example: "Full Stack Developer" -> "full-stack-developer"
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove special characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-") // collapse consecutive hyphens
    .replace(/^-+|-+$/g, ""); // trim hyphens from ends
}

/**
 * Format date for display in CRM and Public UI
 */
export function formatOpeningDate(date: Date | string | null | undefined): string {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * Format relative time (e.g. "2 days ago", "Today")
 */
export function formatRelativeTime(date: Date | string | null | undefined): string {
  if (!date) return "Recently";
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "Recently";

  const diffMs = Date.now() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Check if opening was published within the last 7 days (for NEW badge)
 */
export function isOpeningNew(publishedAt: Date | string | null | undefined): boolean {
  if (!publishedAt) return false;
  const d = typeof publishedAt === "string" ? new Date(publishedAt) : publishedAt;
  if (isNaN(d.getTime())) return false;
  const diffMs = Date.now() - d.getTime();
  return diffMs >= 0 && diffMs <= 7 * 24 * 60 * 60 * 1000;
}
