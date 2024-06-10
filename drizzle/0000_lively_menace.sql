CREATE TABLE IF NOT EXISTS "admatrix_account" (
	"userId" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"providerAccountId" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "admatrix_account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admatrix_post" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"createdById" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admatrix_session" (
	"sessionToken" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admatrix_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"emailVerified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"image" varchar(255),
	"password" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admatrix_verificationToken" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "admatrix_verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "admatrix_account" ADD CONSTRAINT "admatrix_account_userId_admatrix_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."admatrix_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "admatrix_post" ADD CONSTRAINT "admatrix_post_createdById_admatrix_user_id_fk" FOREIGN KEY ("createdById") REFERENCES "public"."admatrix_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "admatrix_session" ADD CONSTRAINT "admatrix_session_userId_admatrix_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."admatrix_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "account_userId_idx" ON "admatrix_account" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "createdById_idx" ON "admatrix_post" ("createdById");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "admatrix_post" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_userId_idx" ON "admatrix_session" ("userId");