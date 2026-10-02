import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

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
