CREATE TABLE IF NOT EXISTS "admatrix_campaign" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"objective" varchar(256),
	"description" varchar(256),
	"clientId" varchar(256) NOT NULL,
	"createdById" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admatrix_client" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"createdById" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
DROP TABLE "admatrix_post";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "admatrix_campaign" ADD CONSTRAINT "admatrix_campaign_clientId_admatrix_client_id_fk" FOREIGN KEY ("clientId") REFERENCES "public"."admatrix_client"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "admatrix_campaign" ADD CONSTRAINT "admatrix_campaign_createdById_admatrix_user_id_fk" FOREIGN KEY ("createdById") REFERENCES "public"."admatrix_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "admatrix_client" ADD CONSTRAINT "admatrix_client_createdById_admatrix_user_id_fk" FOREIGN KEY ("createdById") REFERENCES "public"."admatrix_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "createdById_idx" ON "admatrix_campaign" ("createdById");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "admatrix_campaign" ("name");