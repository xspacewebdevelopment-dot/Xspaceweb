import { pgTable, uuid, text, timestamp, boolean, integer, jsonb, index } from "drizzle-orm/pg-core";

// ==========================================
// INQUIRIES SCHEMA
// ==========================================

export const inquiryStatusEnum = ["new", "contacted", "qualified", "closed"] as const;
export type InquiryStatus = (typeof inquiryStatusEnum)[number];

export const inquiryTypeEnum = ["project", "service"] as const;
export type InquiryType = (typeof inquiryTypeEnum)[number];

export const projectInquiries = pgTable("project_inquiries", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  service: text("service"),
  message: text("message"),
  inquiryType: text("inquiry_type").notNull().default("project"),
  source: text("source").notNull().default("homepage-project"),
  status: text("status").notNull().default("new"),
  archivedAt: timestamp("archived_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type ProjectInquiry = typeof projectInquiries.$inferSelect;
export type NewProjectInquiry = typeof projectInquiries.$inferInsert;

// ==========================================
// NEWS & UPDATES SCHEMA
// ==========================================

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
  archivedAt: timestamp("archived_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type NewsArticle = typeof newsArticles.$inferSelect;
export type NewNewsArticle = typeof newsArticles.$inferInsert;

// ==========================================
// EVENTS & WEBINARS SCHEMA
// ==========================================

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
  archivedAt: timestamp("archived_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;
export type EventItem = Event;

// ==========================================
// EVENT GALLERY SCHEMA
// ==========================================

export const eventGalleryImages = pgTable("event_gallery_images", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: uuid("event_id").references(() => events.id, { onDelete: "set null" }),
  title: text("title"),
  caption: text("caption"),
  imageUrl: text("image_url").notNull(),
  imagePublicId: text("image_public_id"),
  publicId: text("public_id"),
  isFeatured: boolean("is_featured").notNull().default(false),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type EventGalleryImage = typeof eventGalleryImages.$inferSelect;
export type NewEventGalleryImage = typeof eventGalleryImages.$inferInsert;

// ==========================================
// MEDIA MENTIONS SCHEMA
// ==========================================

export const mediaStatusEnum = ["draft", "published", "unpublished"] as const;
export type MediaStatus = (typeof mediaStatusEnum)[number];
export const mediaMentionStatusEnum = mediaStatusEnum;
export type MediaMentionStatus = MediaStatus;

export const mediaMentions = pgTable("media_mentions", {
  id: uuid("id").defaultRandom().primaryKey(),
  publicationName: text("publication_name").notNull(),
  headline: text("headline").notNull(),
  articleUrl: text("article_url").notNull(),
  logoUrl: text("logo_url"),
  logoPublicId: text("logo_public_id"),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  status: text("status").notNull().default("published"),
  displayOrder: integer("display_order").notNull().default(0),
  archivedAt: timestamp("archived_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type MediaMention = typeof mediaMentions.$inferSelect;
export type NewMediaMention = typeof mediaMentions.$inferInsert;
export type MediaMentionItem = MediaMention;

// ==========================================
// NEWSLETTER SUBSCRIBERS & BROADCASTS SCHEMA
// ==========================================

export const subscriberStatusEnum = ["subscribed", "unsubscribed", "bounced"] as const;
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

// ==========================================
// CAREERS SCHEMA (PHASE 1, 2, 3)
// ==========================================

export const openingTypeEnum = ["job", "internship"] as const;
export type OpeningType = (typeof openingTypeEnum)[number];

export const employmentTypeEnum = [
  "full-time",
  "part-time",
  "contract",
  "internship",
] as const;
export type EmploymentType = (typeof employmentTypeEnum)[number];

export const workModeEnum = ["remote", "onsite", "hybrid"] as const;
export type WorkMode = (typeof workModeEnum)[number];

export const careerOpeningStatusEnum = [
  "draft",
  "published",
  "closed",
  "archived",
] as const;
export type CareerOpeningStatus = (typeof careerOpeningStatusEnum)[number];
export const openingStatusEnum = careerOpeningStatusEnum;
export type OpeningStatus = CareerOpeningStatus;

export interface SalaryStructure {
  min?: number | null;
  max?: number | null;
  currency?: string;
  period?: "monthly" | "annual";
  text?: string;
  isPublic?: boolean;
}

export interface InternshipStructure {
  duration?: string;
  stipend?: string;
  durationMonths?: number;
  stipendAmount?: number;
  stipendType?: "paid" | "unpaid";
  ppoOpportunity?: boolean;
}

export const careerOpenings = pgTable("career_openings", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  openingType: text("opening_type").notNull().default("job"),
  department: text("department").notNull(),
  employmentType: text("employment_type").notNull().default("full-time"),
  location: text("location").notNull(),
  workMode: text("work_mode").notNull().default("hybrid"),
  shortDescription: text("short_description").notNull(),
  aboutRole: text("about_role").notNull(),
  responsibilities: jsonb("responsibilities").$type<string[]>().notNull().default([]),
  requirements: jsonb("requirements").$type<string[]>().notNull().default([]),
  niceToHave: jsonb("nice_to_have").$type<string[]>().notNull().default([]),
  skills: jsonb("skills").$type<string[]>().notNull().default([]),
  experience: text("experience").notNull(),
  salary: jsonb("salary").$type<SalaryStructure>(),
  internship: jsonb("internship").$type<InternshipStructure>(),
  status: text("status").notNull().default("draft"),
  featured: boolean("featured").notNull().default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  closingDate: timestamp("closing_date", { withTimezone: true }),
  createdBy: text("created_by"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type CareerOpening = typeof careerOpenings.$inferSelect;
export type NewCareerOpening = typeof careerOpenings.$inferInsert;

// ==========================================
// CAREER APPLICATIONS SCHEMA
// ==========================================

export const applicationStatusEnum = [
  "new",
  "reviewing",
  "shortlisted",
  "interview",
  "selected",
  "rejected",
  "withdrawn",
] as const;
export type ApplicationStatus = (typeof applicationStatusEnum)[number];

export interface OpeningSnapshot {
  title: string;
  slug: string;
  openingType: "job" | "internship";
  department: string;
  location: string;
  workMode?: string;
  employmentType?: string;
}

export interface ApplicantInfo {
  fullName: string;
  email: string;
  phone: string;
  currentLocation: string;
}

export interface ResumeInfo {
  url: string;
  fileName: string;
  mimeType: string;
  size: number;
}

export interface ApplicationDetails {
  availability: string;
  preferredWorkMode: string;
  expectedStartDate?: string | null;
  experience: string;
  currentCompany?: string | null;
  currentRole?: string | null;
  highestQualification?: string | null;
  college?: string | null;
  yearOfStudy?: string | null;
  fieldOfStudy?: string | null;
  portfolioUrl?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  coverLetter?: string | null;
  resume: ResumeInfo;
}

export interface InternalNote {
  id: string;
  text: string;
  createdBy: string;
  createdAt: string;
}

export interface StatusHistoryEntry {
  from: string | null;
  to: string;
  changedBy: string;
  changedAt: string;
}

export const careerApplications = pgTable(
  "career_applications",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    applicationId: text("application_id").notNull().unique(),
    openingId: uuid("opening_id"),
    talentProfileId: uuid("talent_profile_id"),
    openingSnapshot: jsonb("opening_snapshot").$type<OpeningSnapshot>().notNull(),
    applicant: jsonb("applicant").$type<ApplicantInfo>().notNull(),
    application: jsonb("application").$type<ApplicationDetails>().notNull(),
    status: text("status").notNull().default("new"),
    source: text("source").notNull().default("website"),
    internalNotes: jsonb("internal_notes").$type<InternalNote[]>().notNull().default([]),
    statusHistory: jsonb("status_history").$type<StatusHistoryEntry[]>().notNull().default([]),
    appliedAt: timestamp("applied_at", { withTimezone: true }).defaultNow().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("career_apps_opening_idx").on(table.openingId),
    index("career_apps_status_idx").on(table.status),
    index("career_apps_applied_at_idx").on(table.appliedAt),
    index("career_apps_app_id_idx").on(table.applicationId),
    index("career_apps_talent_profile_idx").on(table.talentProfileId),
  ]
);

export type CareerApplication = typeof careerApplications.$inferSelect;
export type NewCareerApplication = typeof careerApplications.$inferInsert;

// ==========================================
// TALENT POOL SCHEMA (PHASE 3)
// ==========================================

export const talentStatusEnum = [
  "new",
  "reviewed",
  "potential",
  "contacted",
  "converted",
  "archived",
] as const;
export type TalentStatus = (typeof talentStatusEnum)[number];

export interface ProfileLinks {
  portfolioUrl?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
}

export interface TalentResumeInfo {
  url?: string | null;
  fileName?: string | null;
  mimeType?: string | null;
  size?: number | null;
}

export interface ConversionRecord {
  applicationId: string;
  openingId: string;
  openingTitle?: string;
  applicationCode?: string;
  convertedBy?: string;
  convertedAt: string;
}

export const talentProfiles = pgTable(
  "talent_profiles",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    profileId: text("profile_id").notNull().unique(),
    fullName: text("full_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    currentLocation: text("current_location"),
    preferredRole: text("preferred_role").notNull(),
    expertise: text("expertise"),
    experience: text("experience"),
    availability: text("availability"),
    preferredWorkMode: text("preferred_work_mode"),
    profileLinks: jsonb("profile_links").$type<ProfileLinks>().notNull().default({}),
    resume: jsonb("resume").$type<TalentResumeInfo | null>(),
    profileUrl: text("profile_url"),
    message: text("message"),
    status: text("status").notNull().default("new"),
    tags: jsonb("tags").$type<string[]>().notNull().default([]),
    source: text("source").notNull().default("website"),
    internalNotes: jsonb("internal_notes").$type<InternalNote[]>().notNull().default([]),
    conversionHistory: jsonb("conversion_history").$type<ConversionRecord[]>().notNull().default([]),
    submittedAt: timestamp("submitted_at", { withTimezone: true }).defaultNow().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("talent_profiles_profile_id_idx").on(table.profileId),
    index("talent_profiles_email_idx").on(table.email),
    index("talent_profiles_status_idx").on(table.status),
    index("talent_profiles_role_idx").on(table.preferredRole),
    index("talent_profiles_submitted_at_idx").on(table.submittedAt),
  ]
);

export type TalentProfile = typeof talentProfiles.$inferSelect;
export type NewTalentProfile = typeof talentProfiles.$inferInsert;
