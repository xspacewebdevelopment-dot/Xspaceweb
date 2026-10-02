import { z } from "zod";
import { talentStatusEnum } from "@/lib/db/schema";

export const talentProfileSubmissionSchema = z.object({
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
  currentLocation: z.string().max(100, "Location is too long").nullable().optional(),
  preferredRole: z.string().min(1, "Area of expertise / preferred role is required"),
  expertise: z.string().max(100).nullable().optional(),
  experience: z.string().nullable().optional(),
  availability: z.string().nullable().optional(),
  preferredWorkMode: z.string().nullable().optional(),
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
  profileUrl: z
    .string()
    .url("Invalid profile/resume URL")
    .or(z.literal(""))
    .nullable()
    .optional(),
  message: z.string().max(2000, "Message cannot exceed 2000 characters").nullable().optional(),
});

export type TalentProfileSubmissionInput = z.infer<typeof talentProfileSubmissionSchema>;

export const talentStatusUpdateSchema = z.object({
  status: z.enum(talentStatusEnum, {
    message: "Invalid talent profile status",
  }),
  note: z.string().optional(),
});

export const talentNoteCreateSchema = z.object({
  text: z.string().min(1, "Note text cannot be empty").max(2000, "Note is too long"),
});

export const talentTagsUpdateSchema = z.object({
  tags: z.array(z.string().min(1).max(50)),
});

export const talentConvertSchema = z.object({
  openingId: z.string().min(1, "Opening selection is required"),
  status: z.string().optional().default("reviewing"),
  availability: z.string().optional(),
  preferredWorkMode: z.string().optional(),
  experience: z.string().optional(),
  expectedStartDate: z.string().nullable().optional(),
  currentRole: z.string().nullable().optional(),
  currentCompany: z.string().nullable().optional(),
  highestQualification: z.string().nullable().optional(),
  college: z.string().nullable().optional(),
});

export type TalentConvertInput = z.infer<typeof talentConvertSchema>;

/**
 * Format date for talent pool display (e.g. 02 Oct 2026)
 */
export function formatTalentDate(date: Date | string | null | undefined): string {
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
