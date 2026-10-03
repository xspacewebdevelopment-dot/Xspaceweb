/**
 * Internship & Certification Utilities
 */

export interface InternshipProgressResult {
  progressPercentage: number;
  daysCompleted: number;
  totalDays: number;
  daysRemaining: number;
  isCompleted: boolean;
  isPending: boolean;
  isInProgress: boolean;
}

/**
 * Calculates dynamic internship progress, days completed, and remaining duration.
 */
export function calculateInternshipProgress(
  startDateInput: Date | string,
  endDateInput: Date | string,
  status?: string
): InternshipProgressResult {
  const start = new Date(startDateInput);
  const end = new Date(endDateInput);
  const now = new Date();

  const totalMs = end.getTime() - start.getTime();
  const totalDays = Math.max(1, Math.round(totalMs / (1000 * 60 * 60 * 24)));

  // If status is explicitly TERMINATED
  if (status === "TERMINATED") {
    return {
      progressPercentage: 0,
      daysCompleted: 0,
      totalDays,
      daysRemaining: 0,
      isCompleted: false,
      isPending: false,
      isInProgress: false,
    };
  }

  // If status is explicitly COMPLETED or date is past end date
  if (now.getTime() >= end.getTime() || status === "COMPLETED") {
    return {
      progressPercentage: 100,
      daysCompleted: totalDays,
      totalDays,
      daysRemaining: 0,
      isCompleted: true,
      isPending: false,
      isInProgress: false,
    };
  }

  // If before start date
  if (now.getTime() < start.getTime()) {
    return {
      progressPercentage: 0,
      daysCompleted: 0,
      totalDays,
      daysRemaining: totalDays,
      isCompleted: false,
      isPending: true,
      isInProgress: false,
    };
  }

  // Currently in progress
  const elapsedMs = now.getTime() - start.getTime();
  const daysCompleted = Math.max(0, Math.floor(elapsedMs / (1000 * 60 * 60 * 24)));
  const daysRemaining = Math.max(0, Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

  const rawPercent = totalMs > 0 ? (elapsedMs / totalMs) * 100 : 100;
  const progressPercentage = Math.min(100, Math.max(0, Math.round(rawPercent)));

  return {
    progressPercentage,
    daysCompleted,
    totalDays,
    daysRemaining,
    isCompleted: false,
    isPending: false,
    isInProgress: true,
  };
}

/**
 * Calculates human-readable duration between start and end dates (e.g. "3 Months", "6 Months").
 */
export function calculateDuration(startDateInput: Date | string, endDateInput: Date | string): string {
  const start = new Date(startDateInput);
  const end = new Date(endDateInput);

  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 20) {
    const weeks = Math.max(1, Math.round(diffDays / 7));
    return `${weeks} ${weeks === 1 ? "Week" : "Weeks"}`;
  }

  const months = Math.round(diffDays / 30);
  if (months < 1) return "1 Month";
  return `${months} ${months === 1 ? "Month" : "Months"}`;
}

/**
 * Normalizes input to uppercase and trimmed Internship ID.
 * e.g. "xsw-intern-001" -> "XSW-INTERN-001"
 */
export function normalizeInternshipId(input: string): string {
  if (!input) return "";
  return input.trim().toUpperCase();
}

/**
 * Validates Internship ID format: ^XSW-INTERN-[0-9]{3,}$
 */
export function isValidInternshipId(input: string): boolean {
  if (!input) return false;
  const normalized = normalizeInternshipId(input);
  return /^XSW-INTERN-[0-9]{3,}$/.test(normalized);
}

/**
 * Generates the next sequential Internship ID (e.g. XSW-INTERN-001, XSW-INTERN-024).
 */
export function generateNextInternshipId(existingIds: string[]): string {
  let maxSeq = 0;

  for (const id of existingIds) {
    const match = id.match(/^XSW-INTERN-([0-9]+)$/i);
    if (match && match[1]) {
      const num = parseInt(match[1], 10);
      if (!isNaN(num) && num > maxSeq) {
        maxSeq = num;
      }
    }
  }

  const nextSeq = maxSeq + 1;
  return `XSW-INTERN-${String(nextSeq).padStart(3, "0")}`;
}
