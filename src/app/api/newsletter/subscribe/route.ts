import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { newsletterSubscribers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { syncResendContact } from "@/lib/resend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawEmail = body.email;

    if (!rawEmail || typeof rawEmail !== "string") {
      return NextResponse.json(
        { error: "A valid email address is required" },
        { status: 400 }
      );
    }

    const email = rawEmail.trim().toLowerCase();

    // Basic email regex format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length > 255) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Check if subscriber already exists in Neon
    const [existing] = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, email))
      .limit(1);

    let resendContactId = existing?.resendContactId || undefined;

    // Attempt Resend contact sync
    try {
      const resendResult = await syncResendContact(email, false);
      if (resendResult.contactId) {
        resendContactId = resendResult.contactId;
      }
    } catch (resendErr) {
      console.warn("Resend contact sync failed (continuing local subscription):", resendErr);
    }

    if (existing) {
      // If already subscribed
      if (existing.status === "subscribed") {
        return NextResponse.json({
          success: true,
          message: "You're already subscribed! We'll keep you updated with our latest news.",
          alreadySubscribed: true,
        });
      }

      // Re-subscribe if previously unsubscribed
      await db
        .update(newsletterSubscribers)
        .set({
          status: "subscribed",
          subscribedAt: new Date(),
          unsubscribedAt: null,
          resendContactId: resendContactId || existing.resendContactId,
          updatedAt: new Date(),
        })
        .where(eq(newsletterSubscribers.id, existing.id));

      return NextResponse.json({
        success: true,
        message: "Welcome back! Your subscription has been renewed.",
      });
    }

    // Insert new subscriber in Neon
    await db.insert(newsletterSubscribers).values({
      email,
      status: "subscribed",
      resendContactId: resendContactId || null,
      subscribedAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "You're subscribed! We'll keep you updated with XSPACEWEB news and events.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Unable to process subscription right now. Please try again later." },
      { status: 500 }
    );
  }
}
