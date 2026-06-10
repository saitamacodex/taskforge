CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(40) NOT NULL,
	"last_name" varchar(45),
	"email" varchar(322) NOT NULL,
	"password" varchar(65) NOT NULL,
	"salt" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
