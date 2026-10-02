import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { newsletterSubscribers, newsletterBroadcasts } from "@/lib/db/schema";
import { eq, count } from "drizzle-orm";
import { sendNewsletterBroadcast } from "@/lib/resend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      subject,
      previewText,
      headline,
      content,
      ctaLabel,
      ctaUrl,
      imageUrl,
      imagePublicId,
    } = body;

    if (!subject?.trim() || !headline?.trim() || !content?.trim()) {
      return NextResponse.json(
        { error: "Subject, Headline, and Content are required to send a newsletter" },
        { status: 400 }
      );
    }

    // Count active subscribers
    const [activeRes] = await db
      .select({ value: count() })
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.status, "subscribed"));
    const recipientCount = activeRes?.value ?? 0;

    // Send broadcast through Resend
    const broadcastResult = await sendNewsletterBroadcast({
      subject: subject.trim(),
      previewText: previewText?.trim(),
      headline: headline.trim(),
      content: content.trim(),
      ctaLabel: ctaLabel?.trim(),
      ctaUrl: ctaUrl?.trim(),
      imageUrl: imageUrl || undefined,
    });

    if (!broadcastResult.success) {
      return NextResponse.json(
        {
          error:
            broadcastResult.error ||
            "Failed to dispatch broadcast through Resend. Please verify your RESEND_API_KEY and audience configuration.",
        },
        { status: 500 }
      );
    }

    // Record broadcast in Neon
    const [broadcastRecord] = await db
      .insert(newsletterBroadcasts)
      .values({
        subject: subject.trim(),
        previewText: previewText?.trim() || null,
        headline: headline.trim(),
        content: content.trim(),
        ctaLabel: ctaLabel?.trim() || null,
        ctaUrl: ctaUrl?.trim() || null,
        imageUrl: imageUrl || null,
        imagePublicId: imagePublicId || null,
        resendBroadcastId: broadcastResult.broadcastId || null,
        recipientCount,
        status: "sent",
        sentAt: new Date(),
      })
      .returning();

    return NextResponse.json({
      success: true,
      message: `Newsletter broadcast dispatched successfully to ${recipientCount} active subscribers.`,
      broadcast: broadcastRecord,
      recipientCount,
    });
  } catch (error: any) {
    console.error("Admin newsletter send error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send newsletter broadcast" },
      { status: 500 }
    );
  }
}
