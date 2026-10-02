import { z } from "zod";
import { applicationStatusEnum } from "@/lib/db/schema";

export const applicationSubmissionSchema = z.object({
  openingId: z.string().min(1, "Opening ID is required"),
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name is too long"),
  email: z
    .string()
    .email("Please provide a valid email address")
    .transform((val) => val.trim().toLowerCase()),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .max(20, "Phone number is too long")
    .regex(/^[\d\s+\-()]{7,20}$/, "Please provide a valid phone number"),
  currentLocation: z
    .string()
    .min(2, "Current location is required")
    .max(100, "Location is too long"),
  availability: z.string().min(1, "Availability is required"),
  preferredWorkMode: z.string().min(1, "Preferred work mode is required"),
  expectedStartDate: z.string().nullable().optional(),
  experience: z.string().min(1, "Experience is required"),
  currentCompany: z.string().nullable().optional(),
  currentRole: z.string().nullable().optional(),
  highestQualification: z.string().nullable().optional(),
  college: z.string().nullable().optional(),
  yearOfStudy: z.string().nullable().optional(),
  fieldOfStudy: z.string().nullable().optional(),
  portfolioUrl: z
    .string()
    .url("Invalid portfolio URL")
    .or(z.literal(""))
    .nullable()
    .optional(),
  githubUrl: z
    .string()
    .url("Invalid GitHub URL")
    .or(z.literal(""))
    .nullable()
    .optional(),
  linkedinUrl: z
    .string()
    .url("Invalid LinkedIn URL")
    .or(z.literal(""))
    .nullable()
    .optional(),
  coverLetter: z.string().max(3000, "Cover letter cannot exceed 3000 characters").nullable().optional(),
});

export type ApplicationSubmissionInput = z.infer<typeof applicationSubmissionSchema>;

export const applicationStatusUpdateSchema = z.object({
  status: z.enum(applicationStatusEnum, {
    message: "Invalid application status",
  }),
  note: z.string().optional(),
});

export const internalNoteCreateSchema = z.object({
  text: z.string().min(1, "Note text cannot be empty").max(2000, "Note is too long"),
});

/**
 * Format application date for display
 */
export function formatApplicationDate(date: Date | string | null | undefined): string {
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
 * Format detailed timestamp (e.g. 02 Oct 2026, 04:30 PM)
 */
export function formatDetailedDateTime(date: Date | string | null | undefined): string {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
