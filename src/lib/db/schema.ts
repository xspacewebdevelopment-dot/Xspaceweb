import { pgTable, uuid, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";

export const inquiryStatusEnum = ["new", "contacted", "qualified", "closed"] as const;
export type InquiryStatus = (typeof inquiryStatusEnum)[number];

export const projectInquiries = pgTable("project_inquiries", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  service: text("service"),
  message: text("message"),
  source: text("source").notNull().default("homepage"),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type ProjectInquiry = typeof projectInquiries.$inferSelect;
export type NewProjectInquiry = typeof projectInquiries.$inferInsert;

export const newsStatusEnum = ["draft", "published", "unpublished"] as const;
export type NewsStatus = (typeof newsStatusEnum)[number];

export const newsCategories = [
  "Company Updates",
  "Product Updates",
  "Events",
  "Press Coverage",
  "Achievements",
  "CSR",
] as const;
export type NewsCategory = (typeof newsCategories)[number];

export const newsArticles = pgTable("news_articles", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull().default("Company Updates"),
  summary: text("summary").notNull(),
  content: text("content").notNull(),
  coverImageUrl: text("cover_image_url").notNull(),
  coverImagePublicId: text("cover_image_public_id"),
  status: text("status").notNull().default("draft"),
  isFeatured: boolean("is_featured").notNull().default(false),
  displayOrder: integer("display_order").notNull().default(0),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  archivedAt: timestamp("archived_at", { withTimezone: true }),
});

export type NewsArticle = typeof newsArticles.$inferSelect;
export type NewNewsArticle = typeof newsArticles.$inferInsert;

export const eventStatusEnum = ["draft", "published", "unpublished"] as const;
export type EventStatus = (typeof eventStatusEnum)[number];

export const eventLocationTypeEnum = ["online", "offline"] as const;
export type EventLocationType = (typeof eventLocationTypeEnum)[number];

export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  shortDescription: text("short_description").notNull(),
  fullDescription: text("full_description"),
  eventDate: timestamp("event_date", { withTimezone: true }).notNull(),
  startTime: text("start_time"),
  endTime: text("end_time"),
  locationType: text("location_type").notNull().default("offline"),
  location: text("location").notNull(),
  registrationUrl: text("registration_url"),
  coverImageUrl: text("cover_image_url"),
  coverImagePublicId: text("cover_image_public_id"),
  isFeatured: boolean("is_featured").notNull().default(false),
  status: text("status").notNull().default("draft"),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  archivedAt: timestamp("archived_at", { withTimezone: true }),
});

export type EventItem = typeof events.$inferSelect;
export type NewEventItem = typeof events.$inferInsert;

export const eventGalleryImages = pgTable("event_gallery_images", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: uuid("event_id").references(() => events.id, { onDelete: "set null" }),
  title: text("title"),
  caption: text("caption"),
  imageUrl: text("image_url").notNull(),
  imagePublicId: text("image_public_id"),
  isFeatured: boolean("is_featured").notNull().default(false),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type EventGalleryImage = typeof eventGalleryImages.$inferSelect;
export type NewEventGalleryImage = typeof eventGalleryImages.$inferInsert;

export const mediaMentionStatusEnum = ["draft", "published", "unpublished"] as const;
export type MediaMentionStatus = (typeof mediaMentionStatusEnum)[number];

export const mediaMentions = pgTable("media_mentions", {
  id: uuid("id").defaultRandom().primaryKey(),
  publicationName: text("publication_name").notNull(),
  headline: text("headline").notNull(),
  articleUrl: text("article_url").notNull(),
  logoUrl: text("logo_url"),
  logoPublicId: text("logo_public_id"),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull(),
  status: text("status").notNull().default("draft"),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  archivedAt: timestamp("archived_at", { withTimezone: true }),
});

export type MediaMentionItem = typeof mediaMentions.$inferSelect;
export type NewMediaMentionItem = typeof mediaMentions.$inferInsert;

export const subscriberStatusEnum = ["subscribed", "unsubscribed"] as const;
export type SubscriberStatus = (typeof subscriberStatusEnum)[number];

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  status: text("status").notNull().default("subscribed"),
  resendContactId: text("resend_contact_id"),
  subscribedAt: timestamp("subscribed_at", { withTimezone: true }).defaultNow().notNull(),
  unsubscribedAt: timestamp("unsubscribed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type NewNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;

export const newsletterBroadcasts = pgTable("newsletter_broadcasts", {
  id: uuid("id").defaultRandom().primaryKey(),
  subject: text("subject").notNull(),
  previewText: text("preview_text"),
  headline: text("headline").notNull(),
  content: text("content").notNull(),
  ctaLabel: text("cta_label"),
  ctaUrl: text("cta_url"),
  imageUrl: text("image_url"),
  imagePublicId: text("image_public_id"),
  resendBroadcastId: text("resend_broadcast_id"),
  recipientCount: integer("recipient_count").default(0),
  status: text("status").notNull().default("draft"),
  sentAt: timestamp("sent_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type NewsletterBroadcast = typeof newsletterBroadcasts.$inferSelect;
export type NewNewsletterBroadcast = typeof newsletterBroadcasts.$inferInsert;



