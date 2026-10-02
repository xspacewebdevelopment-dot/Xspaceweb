import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { projectInquiries } from "@/lib/db/schema";
import { z } from "zod";

export const dynamic = "force-dynamic";

const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(150, "Email cannot exceed 150 characters"),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number cannot exceed 30 characters")
    .optional()
    .nullable(),
  company: z
    .string()
    .trim()
    .max(100, "Company cannot exceed 100 characters")
    .optional()
    .nullable(),
  service: z
    .string()
    .trim()
    .max(100, "Service cannot exceed 100 characters")
    .optional()
    .nullable(),
  message: z
    .string()
    .trim()
    .max(3000, "Message cannot exceed 3000 characters")
    .optional()
    .nullable(),
  source: z
    .string()
    .trim()
    .max(50)
    .default("homepage"),
});

/**
 * POST /api/inquiries
 * Public submission endpoint for website visitors.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = inquirySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Invalid form data",
          details: result.error.issues.map((i) => i.message),
        },
        { status: 400 }
      );
    }

    const { name, email, phone, company, service, message, source } = result.data;

    const [inserted] = await db
      .insert(projectInquiries)
      .values({
        name,
        email: email.toLowerCase(),
        phone: phone || null,
        company: company || null,
        service: service || null,
        message: message || null,
        source: source || "homepage",
        status: "new",
      })
      .returning();

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry successfully submitted",
        id: inserted.id,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Public inquiry submission error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * Reject GET requests to public inquiries endpoint.
 * Inquiries can only be read through authenticated /api/admin/inquiries.
 */
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}
