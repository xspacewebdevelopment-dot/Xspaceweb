ALTER TABLE "project_inquiries" ALTER COLUMN "source" SET DEFAULT 'homepage-project';--> statement-breakpoint
ALTER TABLE "project_inquiries" ADD COLUMN "inquiry_type" text DEFAULT 'project' NOT NULL;--> statement-breakpoint
ALTER TABLE "project_inquiries" ADD COLUMN "archived_at" timestamp with time zone;