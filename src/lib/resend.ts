import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
export const resend = apiKey ? new Resend(apiKey) : null;

export const RESEND_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "XSPACEWEB <news@xspaceweb.com>";

let cachedAudienceId: string | null = process.env.RESEND_AUDIENCE_ID || null;

/**
 * Returns or retrieves the primary Resend Audience ID for newsletter subscribers.
 */
export async function getOrCreateAudienceId(): Promise<string | null> {
  if (cachedAudienceId) return cachedAudienceId;
  if (!resend) return null;

  try {
    const { data: audiences, error } = await resend.audiences.list();
    if (error) {
      console.warn("Failed to list Resend audiences:", error);
    } else if (audiences && audiences.data && audiences.data.length > 0) {
      cachedAudienceId = audiences.data[0].id;
      return cachedAudienceId;
    }

    // Try to create an audience if none exist
    const createRes = await resend.audiences.create({
      name: "XSPACEWEB Newsletter",
    });

    if (createRes.data?.id) {
      cachedAudienceId = createRes.data.id;
      return cachedAudienceId;
    }
  } catch (err) {
    console.error("Error ensuring Resend audience:", err);
  }

  return null;
}

/**
 * Syncs a newsletter subscriber with Resend Contacts.
 */
export async function syncResendContact(
  email: string,
  unsubscribed = false
): Promise<{ success: boolean; contactId?: string; error?: string }> {
  if (!resend) {
    return { success: false, error: "RESEND_API_KEY is not configured" };
  }

  try {
    const audienceId = await getOrCreateAudienceId();
    if (!audienceId) {
      return { success: false, error: "No Resend audience available" };
    }

    // Create contact
    const { data, error } = await resend.contacts.create({
      email,
      audienceId,
      unsubscribed,
    });

    if (error) {
      // If contact already exists, try updating unsubscribed status
      if (
        error.message?.toLowerCase().includes("already exists") ||
        (error.name as string) === "conflict"
      ) {
        try {
          const updateRes = await resend.contacts.update({
            email,
            audienceId,
            unsubscribed,
          });
          return { success: true, contactId: updateRes.data?.id };
        } catch {
          // Contact already present in audience
          return { success: true };
        }
      }
      return { success: false, error: error.message };
    }

    return { success: true, contactId: data?.id };
  } catch (err: any) {
    console.error("Resend contact sync failed:", err);
    return { success: false, error: err.message || "Unknown Resend error" };
  }
}

/**
 * Creates and sends a branded newsletter broadcast to the subscriber audience.
 */
export async function sendNewsletterBroadcast(params: {
  subject: string;
  previewText?: string;
  headline: string;
  content: string;
  ctaLabel?: string;
  ctaUrl?: string;
  imageUrl?: string;
  audienceId?: string;
}): Promise<{
  success: boolean;
  broadcastId?: string;
  error?: string;
}> {
  if (!resend) {
    return { success: false, error: "RESEND_API_KEY is not configured" };
  }

  const audienceId = params.audienceId || (await getOrCreateAudienceId());
  if (!audienceId) {
    return { success: false, error: "No Resend audience configured for broadcasts" };
  }

  const html = generateNewsletterHtml({
    subject: params.subject,
    previewText: params.previewText,
    headline: params.headline,
    content: params.content,
    ctaLabel: params.ctaLabel,
    ctaUrl: params.ctaUrl,
    imageUrl: params.imageUrl,
  });

  try {
    // 1. Create Broadcast
    const createRes = await resend.broadcasts.create({
      audienceId,
      from: RESEND_FROM_EMAIL,
      subject: params.subject,
      html,
    });

    if (createRes.error || !createRes.data?.id) {
      return {
        success: false,
        error: createRes.error?.message || "Failed to create Resend broadcast",
      };
    }

    const broadcastId = createRes.data.id;

    // 2. Trigger Send
    const sendRes = await resend.broadcasts.send(broadcastId);
    if (sendRes.error) {
      return {
        success: false,
        broadcastId,
        error: sendRes.error.message || "Failed to trigger broadcast send",
      };
    }

    return {
      success: true,
      broadcastId,
    };
  } catch (err: any) {
    console.error("Failed to execute Resend broadcast:", err);
    return { success: false, error: err.message || "Broadcast send failed" };
  }
}

/**
 * Generates an email template for XSPACEWEB Newsletters.
 */
export function generateNewsletterHtml(params: {
  subject: string;
  previewText?: string;
  headline: string;
  content: string;
  ctaLabel?: string;
  ctaUrl?: string;
  imageUrl?: string;
}): string {
  const formattedContent = params.content
    .split("\n\n")
    .map((p) => `<p style="margin: 0 0 16px; line-height: 1.6; color: #334155; font-size: 15px;">${p.replace(/\n/g, "<br/>")}</p>`)
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${params.subject}</title>
  ${params.previewText ? `<div style="display:none;font-size:1px;color:#333333;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${params.previewText}</div>` : ""}
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <!-- Header Branding -->
          <tr>
            <td style="background-color: #07152B; padding: 28px 36px; text-align: left;">
              <span style="font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">XSPACEWEB</span>
              <span style="display: block; font-size: 11px; color: #94a3b8; margin-top: 4px; letter-spacing: 0.5px; text-transform: uppercase;">Official Newsletter & Updates</span>
            </td>
          </tr>

          ${params.imageUrl ? `
          <!-- Hero Image -->
          <tr>
            <td style="padding: 0;">
              <img src="${params.imageUrl}" alt="${params.headline}" width="600" style="width: 100%; max-height: 300px; object-fit: cover; display: block;" />
            </td>
          </tr>
          ` : ""}

          <!-- Body Content -->
          <tr>
            <td style="padding: 36px 36px 28px;">
              <h1 style="margin: 0 0 20px; font-size: 24px; font-weight: 800; color: #07152b; line-height: 1.25; letter-spacing: -0.5px;">
                ${params.headline}
              </h1>

              ${formattedContent}

              ${params.ctaLabel && params.ctaUrl ? `
              <div style="margin: 32px 0 16px;">
                <a href="${params.ctaUrl}" style="background-color: #1668E8; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px; display: inline-block;">
                  ${params.ctaLabel} &rarr;
                </a>
              </div>
              ` : ""}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 28px 36px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="margin: 0 0 8px; font-size: 12px; color: #64748b;">
                You are receiving this email because you subscribed to XSPACEWEB updates.
              </p>
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                &copy; ${new Date().getFullYear()} XSPACEWEB Technologies. All rights reserved.
                <br/>
                <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color: #64748b; text-decoration: underline; margin-top: 6px; display: inline-block;">Unsubscribe from this list</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Sends a branded email notification to subscribers when a news article is published.
 */
export async function sendNewsNotificationBroadcast(article: {
  title: string;
  slug: string;
  summary: string;
  category?: string;
  coverImageUrl?: string;
}): Promise<{ success: boolean; broadcastId?: string; error?: string }> {
  const siteUrl = process.env.NEXTAUTH_URL || "https://xspaceweb.com";
  const articleUrl = `${siteUrl}/news-and-updates/${article.slug}`;

  return sendNewsletterBroadcast({
    subject: `New Story: ${article.title}`,
    previewText: article.summary,
    headline: article.title,
    content: article.summary,
    ctaLabel: "Read Full Story",
    ctaUrl: articleUrl,
    imageUrl: article.coverImageUrl || undefined,
  });
}

/**
 * Sends a branded email notification to subscribers when an event is published.
 */
export async function sendEventNotificationBroadcast(event: {
  title: string;
  slug: string;
  shortDescription: string;
  eventDate: Date | string;
  location: string;
  startTime?: string | null;
  endTime?: string | null;
  locationType?: string;
  coverImageUrl?: string | null;
}): Promise<{ success: boolean; broadcastId?: string; error?: string }> {
  const siteUrl = process.env.NEXTAUTH_URL || "https://xspaceweb.com";
  const eventUrl = `${siteUrl}/news-and-updates/events/${event.slug}`;

  const formattedDate = new Date(event.eventDate).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const timeStr = event.startTime
    ? `\nTime: ${event.startTime}${event.endTime ? ` - ${event.endTime}` : ""}`
    : "";
  const locationStr = `\nLocation: ${event.location} (${
    event.locationType === "online" ? "Online" : "In-Person"
  })`;

  return sendNewsletterBroadcast({
    subject: `Upcoming Event: ${event.title}`,
    previewText: `${formattedDate} - ${event.shortDescription}`,
    headline: event.title,
    content: `${event.shortDescription}\n\nDate: ${formattedDate}${timeStr}${locationStr}`,
    ctaLabel: "View Event Details & RSVP",
    ctaUrl: eventUrl,
    imageUrl: event.coverImageUrl || undefined,
  });
}
