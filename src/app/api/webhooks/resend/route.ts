import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { newsletterSubscribers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const eventType = payload.type;
    const data = payload.data || {};
    const email = data.email || data.to?.[0];

    console.log(`[Resend Webhook] Received event: ${eventType} for ${email || "unknown"}`);

    if (email && (eventType === "contact.updated" || eventType === "contact.deleted")) {
      if (data.unsubscribed === true || eventType === "contact.deleted") {
        await db
          .update(newsletterSubscribers)
          .set({
            status: "unsubscribed",
            unsubscribedAt: new Date(),
            updatedAt: new Date(),
          })
          .where(eq(newsletterSubscribers.email, email.toLowerCase()));
      }
    }

    if (email && (eventType === "email.bounced" || eventType === "email.complained")) {
      await db
        .update(newsletterSubscribers)
        .set({
          status: "unsubscribed",
          unsubscribedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(newsletterSubscribers.email, email.toLowerCase()));
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Resend webhook processing error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
