import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { newsletterSubscribers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { syncResendContact } from "@/lib/resend";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await req.json();

    const [subscriber] = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.id, id))
      .limit(1);

    if (!subscriber) {
      return NextResponse.json({ error: "Subscriber not found" }, { status: 404 });
    }

    const newStatus = body.status === "unsubscribed" ? "unsubscribed" : "subscribed";
    const unsubscribedAt = newStatus === "unsubscribed" ? new Date() : null;

    // Sync with Resend
    try {
      await syncResendContact(subscriber.email, newStatus === "unsubscribed");
    } catch (resendErr) {
      console.warn("Resend contact status update failed:", resendErr);
    }

    const [updated] = await db
      .update(newsletterSubscribers)
      .set({
        status: newStatus,
        unsubscribedAt,
        updatedAt: new Date(),
      })
      .where(eq(newsletterSubscribers.id, id))
      .returning();

    return NextResponse.json({ success: true, subscriber: updated });
  } catch (error: any) {
    console.error("Admin newsletter subscriber PATCH error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update subscriber" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const [subscriber] = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.id, id))
      .limit(1);

    if (!subscriber) {
      return NextResponse.json({ error: "Subscriber not found" }, { status: 404 });
    }

    await db.delete(newsletterSubscribers).where(eq(newsletterSubscribers.id, id));

    return NextResponse.json({
      success: true,
      message: "Subscriber deleted successfully",
    });
  } catch (error: any) {
    console.error("Admin newsletter subscriber DELETE error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete subscriber" },
      { status: 500 }
    );
  }
}
