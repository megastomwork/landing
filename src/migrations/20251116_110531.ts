import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_articles_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_doctors_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_services_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_feedbacks_status" AS ENUM('draft', 'published');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "pages_blocks_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar DEFAULT 'Зображення',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Про нас',
  	"description" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Наші послуги',
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_blog_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Наш блог',
  	"articles_count" numeric DEFAULT 3,
  	"show_more_link" boolean DEFAULT true,
  	"button_text" varchar DEFAULT 'Більше статей',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_blog_row" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Наші статті',
  	"show_more_link" boolean DEFAULT true,
  	"button_text" varchar DEFAULT 'Більше статей',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feedbacks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Відгуки наших клієнтів',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Зв''яжіться з нами',
  	"description" varchar,
  	"image_id" integer,
  	"show_image" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_description" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_paragraph" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_doctors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Наші лікарі',
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_blog_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"title" varchar DEFAULT 'Блог',
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Часті питання',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_prices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Ціни',
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Контактна інформація',
  	"show_map" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"path" varchar,
  	"status" "enum_pages_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"articles_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar DEFAULT 'Зображення',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Про нас',
  	"description" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Наші послуги',
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_blog_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Наш блог',
  	"articles_count" numeric DEFAULT 3,
  	"show_more_link" boolean DEFAULT true,
  	"button_text" varchar DEFAULT 'Більше статей',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_blog_row" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Наші статті',
  	"show_more_link" boolean DEFAULT true,
  	"button_text" varchar DEFAULT 'Більше статей',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feedbacks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Відгуки наших клієнтів',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Зв''яжіться з нами',
  	"description" varchar,
  	"image_id" integer,
  	"show_image" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_description" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_paragraph" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_doctors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Наші лікарі',
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_blog_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"title" varchar DEFAULT 'Блог',
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Часті питання',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_prices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Ціни',
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Контактна інформація',
  	"show_map" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_path" varchar,
  	"version_status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"articles_id" integer
  );
  
  CREATE TABLE "articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"status" "enum_articles_status" DEFAULT 'draft' NOT NULL,
  	"content" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "doctors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"photo_id" integer NOT NULL,
  	"position" varchar NOT NULL,
  	"experience" varchar NOT NULL,
  	"status" "enum_doctors_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon" varchar,
  	"icon_image_id" integer,
  	"status" "enum_services_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "feedbacks" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"client_name" varchar NOT NULL,
  	"stars" numeric NOT NULL,
  	"content" varchar NOT NULL,
  	"status" "enum_feedbacks_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "socials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"username" varchar NOT NULL,
  	"link" varchar NOT NULL,
  	"icon" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "questions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "schedule" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"days" varchar NOT NULL,
  	"hours" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "service_prices" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"price" varchar NOT NULL,
  	"service_id_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"prefix" varchar DEFAULT 'media',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"pages_id" integer,
  	"articles_id" integer,
  	"doctors_id" integer,
  	"services_id" integer,
  	"feedbacks_id" integer,
  	"socials_id" integer,
  	"questions_id" integer,
  	"schedule_id" integer,
  	"service_prices_id" integer,
  	"media_id" integer,
  	"payload_kv_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contacts_address_on_map_coordinates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"coordinate" numeric
  );
  
  CREATE TABLE "contacts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"phone" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"address" varchar NOT NULL,
  	"google_address" varchar NOT NULL,
  	"address_on_map_type" varchar DEFAULT 'Point',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"navigation_menu_home" varchar NOT NULL,
  	"navigation_menu_doctors" varchar NOT NULL,
  	"navigation_menu_services" varchar NOT NULL,
  	"navigation_menu_feedbacks" varchar NOT NULL,
  	"navigation_menu_blog" varchar NOT NULL,
  	"navigation_menu_prices" varchar NOT NULL,
  	"home_page_welcome_image_id" integer,
  	"home_page_welcome_description" varchar NOT NULL,
  	"home_page_about_image_id" integer,
  	"home_page_about_title" varchar NOT NULL,
  	"home_page_about_description" varchar NOT NULL,
  	"home_page_mission_title" varchar NOT NULL,
  	"home_page_mission_description" varchar NOT NULL,
  	"home_page_services_title" varchar NOT NULL,
  	"home_page_services_description" varchar NOT NULL,
  	"home_page_cta_title" varchar NOT NULL,
  	"home_page_cta_description" varchar NOT NULL,
  	"home_page_feedbacks_title" varchar NOT NULL,
  	"home_page_blog_title" varchar NOT NULL,
  	"home_page_blog_button" varchar NOT NULL,
  	"home_page_contact_title" varchar NOT NULL,
  	"doctors_page_page_title" varchar NOT NULL,
  	"doctors_page_page_description" varchar NOT NULL,
  	"blog_page_background_image_id" integer,
  	"blog_page_page_title" varchar NOT NULL,
  	"blog_page_page_description" varchar NOT NULL,
  	"blog_page_articles_title" varchar NOT NULL,
  	"blog_page_faq_title" varchar NOT NULL,
  	"call_to_action_section_image_id" integer,
  	"call_to_action_section_title" varchar NOT NULL,
  	"call_to_action_section_description" varchar NOT NULL,
  	"prices_page_page_title" varchar NOT NULL,
  	"prices_page_page_description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "working_hours_schedule" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"days" varchar NOT NULL,
  	"hours" varchar NOT NULL
  );
  
  CREATE TABLE "working_hours" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_intro" ADD CONSTRAINT "pages_blocks_intro_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_intro" ADD CONSTRAINT "pages_blocks_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_stats" ADD CONSTRAINT "pages_blocks_about_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about" ADD CONSTRAINT "pages_blocks_about_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about" ADD CONSTRAINT "pages_blocks_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services" ADD CONSTRAINT "pages_blocks_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog_grid" ADD CONSTRAINT "pages_blocks_blog_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog_row" ADD CONSTRAINT "pages_blocks_blog_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feedbacks" ADD CONSTRAINT "pages_blocks_feedbacks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact" ADD CONSTRAINT "pages_blocks_contact_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact" ADD CONSTRAINT "pages_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_description" ADD CONSTRAINT "pages_blocks_description_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_paragraph" ADD CONSTRAINT "pages_blocks_paragraph_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_doctors" ADD CONSTRAINT "pages_blocks_doctors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog_hero" ADD CONSTRAINT "pages_blocks_blog_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog_hero" ADD CONSTRAINT "pages_blocks_blog_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_prices" ADD CONSTRAINT "pages_blocks_prices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_info" ADD CONSTRAINT "pages_blocks_contact_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_intro" ADD CONSTRAINT "_pages_v_blocks_intro_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_intro" ADD CONSTRAINT "_pages_v_blocks_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_stats" ADD CONSTRAINT "_pages_v_blocks_about_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about" ADD CONSTRAINT "_pages_v_blocks_about_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about" ADD CONSTRAINT "_pages_v_blocks_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services" ADD CONSTRAINT "_pages_v_blocks_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_blog_grid" ADD CONSTRAINT "_pages_v_blocks_blog_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_blog_row" ADD CONSTRAINT "_pages_v_blocks_blog_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feedbacks" ADD CONSTRAINT "_pages_v_blocks_feedbacks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact" ADD CONSTRAINT "_pages_v_blocks_contact_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact" ADD CONSTRAINT "_pages_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_description" ADD CONSTRAINT "_pages_v_blocks_description_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_paragraph" ADD CONSTRAINT "_pages_v_blocks_paragraph_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_doctors" ADD CONSTRAINT "_pages_v_blocks_doctors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_blog_hero" ADD CONSTRAINT "_pages_v_blocks_blog_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_blog_hero" ADD CONSTRAINT "_pages_v_blocks_blog_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_prices" ADD CONSTRAINT "_pages_v_blocks_prices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_info" ADD CONSTRAINT "_pages_v_blocks_contact_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "doctors" ADD CONSTRAINT "doctors_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_icon_image_id_media_id_fk" FOREIGN KEY ("icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "service_prices" ADD CONSTRAINT "service_prices_service_id_id_services_id_fk" FOREIGN KEY ("service_id_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_doctors_fk" FOREIGN KEY ("doctors_id") REFERENCES "public"."doctors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_feedbacks_fk" FOREIGN KEY ("feedbacks_id") REFERENCES "public"."feedbacks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_socials_fk" FOREIGN KEY ("socials_id") REFERENCES "public"."socials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_questions_fk" FOREIGN KEY ("questions_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_schedule_fk" FOREIGN KEY ("schedule_id") REFERENCES "public"."schedule"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_service_prices_fk" FOREIGN KEY ("service_prices_id") REFERENCES "public"."service_prices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_kv_fk" FOREIGN KEY ("payload_kv_id") REFERENCES "public"."payload_kv"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contacts_address_on_map_coordinates" ADD CONSTRAINT "contacts_address_on_map_coordinates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contacts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content" ADD CONSTRAINT "content_home_page_welcome_image_id_media_id_fk" FOREIGN KEY ("home_page_welcome_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "content" ADD CONSTRAINT "content_home_page_about_image_id_media_id_fk" FOREIGN KEY ("home_page_about_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "content" ADD CONSTRAINT "content_blog_page_background_image_id_media_id_fk" FOREIGN KEY ("blog_page_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "content" ADD CONSTRAINT "content_call_to_action_section_image_id_media_id_fk" FOREIGN KEY ("call_to_action_section_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "working_hours_schedule" ADD CONSTRAINT "working_hours_schedule_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."working_hours"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "pages_blocks_intro_order_idx" ON "pages_blocks_intro" USING btree ("_order");
  CREATE INDEX "pages_blocks_intro_parent_id_idx" ON "pages_blocks_intro" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_intro_path_idx" ON "pages_blocks_intro" USING btree ("_path");
  CREATE INDEX "pages_blocks_intro_image_idx" ON "pages_blocks_intro" USING btree ("image_id");
  CREATE INDEX "pages_blocks_about_stats_order_idx" ON "pages_blocks_about_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_stats_parent_id_idx" ON "pages_blocks_about_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_order_idx" ON "pages_blocks_about" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_parent_id_idx" ON "pages_blocks_about" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_path_idx" ON "pages_blocks_about" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_image_idx" ON "pages_blocks_about" USING btree ("image_id");
  CREATE INDEX "pages_blocks_services_order_idx" ON "pages_blocks_services" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_parent_id_idx" ON "pages_blocks_services" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_path_idx" ON "pages_blocks_services" USING btree ("_path");
  CREATE INDEX "pages_blocks_blog_grid_order_idx" ON "pages_blocks_blog_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_blog_grid_parent_id_idx" ON "pages_blocks_blog_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_blog_grid_path_idx" ON "pages_blocks_blog_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_blog_row_order_idx" ON "pages_blocks_blog_row" USING btree ("_order");
  CREATE INDEX "pages_blocks_blog_row_parent_id_idx" ON "pages_blocks_blog_row" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_blog_row_path_idx" ON "pages_blocks_blog_row" USING btree ("_path");
  CREATE INDEX "pages_blocks_feedbacks_order_idx" ON "pages_blocks_feedbacks" USING btree ("_order");
  CREATE INDEX "pages_blocks_feedbacks_parent_id_idx" ON "pages_blocks_feedbacks" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feedbacks_path_idx" ON "pages_blocks_feedbacks" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_order_idx" ON "pages_blocks_contact" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_parent_id_idx" ON "pages_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_path_idx" ON "pages_blocks_contact" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_image_idx" ON "pages_blocks_contact" USING btree ("image_id");
  CREATE INDEX "pages_blocks_description_order_idx" ON "pages_blocks_description" USING btree ("_order");
  CREATE INDEX "pages_blocks_description_parent_id_idx" ON "pages_blocks_description" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_description_path_idx" ON "pages_blocks_description" USING btree ("_path");
  CREATE INDEX "pages_blocks_paragraph_order_idx" ON "pages_blocks_paragraph" USING btree ("_order");
  CREATE INDEX "pages_blocks_paragraph_parent_id_idx" ON "pages_blocks_paragraph" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_paragraph_path_idx" ON "pages_blocks_paragraph" USING btree ("_path");
  CREATE INDEX "pages_blocks_doctors_order_idx" ON "pages_blocks_doctors" USING btree ("_order");
  CREATE INDEX "pages_blocks_doctors_parent_id_idx" ON "pages_blocks_doctors" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_doctors_path_idx" ON "pages_blocks_doctors" USING btree ("_path");
  CREATE INDEX "pages_blocks_blog_hero_order_idx" ON "pages_blocks_blog_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_blog_hero_parent_id_idx" ON "pages_blocks_blog_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_blog_hero_path_idx" ON "pages_blocks_blog_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_blog_hero_background_image_idx" ON "pages_blocks_blog_hero" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_prices_order_idx" ON "pages_blocks_prices" USING btree ("_order");
  CREATE INDEX "pages_blocks_prices_parent_id_idx" ON "pages_blocks_prices" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_prices_path_idx" ON "pages_blocks_prices" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_info_order_idx" ON "pages_blocks_contact_info" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_info_parent_id_idx" ON "pages_blocks_contact_info" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_info_path_idx" ON "pages_blocks_contact_info" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_path_idx" ON "pages" USING btree ("path");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_articles_id_idx" ON "pages_rels" USING btree ("articles_id");
  CREATE INDEX "_pages_v_blocks_intro_order_idx" ON "_pages_v_blocks_intro" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_intro_parent_id_idx" ON "_pages_v_blocks_intro" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_intro_path_idx" ON "_pages_v_blocks_intro" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_intro_image_idx" ON "_pages_v_blocks_intro" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_about_stats_order_idx" ON "_pages_v_blocks_about_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_stats_parent_id_idx" ON "_pages_v_blocks_about_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_order_idx" ON "_pages_v_blocks_about" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_parent_id_idx" ON "_pages_v_blocks_about" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_path_idx" ON "_pages_v_blocks_about" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_about_image_idx" ON "_pages_v_blocks_about" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_services_order_idx" ON "_pages_v_blocks_services" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_parent_id_idx" ON "_pages_v_blocks_services" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_path_idx" ON "_pages_v_blocks_services" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_blog_grid_order_idx" ON "_pages_v_blocks_blog_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_blog_grid_parent_id_idx" ON "_pages_v_blocks_blog_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_blog_grid_path_idx" ON "_pages_v_blocks_blog_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_blog_row_order_idx" ON "_pages_v_blocks_blog_row" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_blog_row_parent_id_idx" ON "_pages_v_blocks_blog_row" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_blog_row_path_idx" ON "_pages_v_blocks_blog_row" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_feedbacks_order_idx" ON "_pages_v_blocks_feedbacks" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feedbacks_parent_id_idx" ON "_pages_v_blocks_feedbacks" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feedbacks_path_idx" ON "_pages_v_blocks_feedbacks" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_order_idx" ON "_pages_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_parent_id_idx" ON "_pages_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_path_idx" ON "_pages_v_blocks_contact" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_image_idx" ON "_pages_v_blocks_contact" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_description_order_idx" ON "_pages_v_blocks_description" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_description_parent_id_idx" ON "_pages_v_blocks_description" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_description_path_idx" ON "_pages_v_blocks_description" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_paragraph_order_idx" ON "_pages_v_blocks_paragraph" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_paragraph_parent_id_idx" ON "_pages_v_blocks_paragraph" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_paragraph_path_idx" ON "_pages_v_blocks_paragraph" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_doctors_order_idx" ON "_pages_v_blocks_doctors" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_doctors_parent_id_idx" ON "_pages_v_blocks_doctors" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_doctors_path_idx" ON "_pages_v_blocks_doctors" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_blog_hero_order_idx" ON "_pages_v_blocks_blog_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_blog_hero_parent_id_idx" ON "_pages_v_blocks_blog_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_blog_hero_path_idx" ON "_pages_v_blocks_blog_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_blog_hero_background_image_idx" ON "_pages_v_blocks_blog_hero" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_prices_order_idx" ON "_pages_v_blocks_prices" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_prices_parent_id_idx" ON "_pages_v_blocks_prices" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_prices_path_idx" ON "_pages_v_blocks_prices" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_info_order_idx" ON "_pages_v_blocks_contact_info" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_info_parent_id_idx" ON "_pages_v_blocks_contact_info" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_info_path_idx" ON "_pages_v_blocks_contact_info" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_path_idx" ON "_pages_v" USING btree ("version_path");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_articles_id_idx" ON "_pages_v_rels" USING btree ("articles_id");
  CREATE INDEX "articles_image_idx" ON "articles" USING btree ("image_id");
  CREATE INDEX "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE INDEX "articles_deleted_at_idx" ON "articles" USING btree ("deleted_at");
  CREATE INDEX "doctors_photo_idx" ON "doctors" USING btree ("photo_id");
  CREATE INDEX "doctors_updated_at_idx" ON "doctors" USING btree ("updated_at");
  CREATE INDEX "doctors_created_at_idx" ON "doctors" USING btree ("created_at");
  CREATE INDEX "services_icon_image_idx" ON "services" USING btree ("icon_image_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "feedbacks_updated_at_idx" ON "feedbacks" USING btree ("updated_at");
  CREATE INDEX "feedbacks_created_at_idx" ON "feedbacks" USING btree ("created_at");
  CREATE INDEX "socials_updated_at_idx" ON "socials" USING btree ("updated_at");
  CREATE INDEX "socials_created_at_idx" ON "socials" USING btree ("created_at");
  CREATE INDEX "questions_updated_at_idx" ON "questions" USING btree ("updated_at");
  CREATE INDEX "questions_created_at_idx" ON "questions" USING btree ("created_at");
  CREATE INDEX "schedule_updated_at_idx" ON "schedule" USING btree ("updated_at");
  CREATE INDEX "schedule_created_at_idx" ON "schedule" USING btree ("created_at");
  CREATE INDEX "service_prices_service_id_idx" ON "service_prices" USING btree ("service_id_id");
  CREATE INDEX "service_prices_updated_at_idx" ON "service_prices" USING btree ("updated_at");
  CREATE INDEX "service_prices_created_at_idx" ON "service_prices" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX "payload_locked_documents_rels_doctors_id_idx" ON "payload_locked_documents_rels" USING btree ("doctors_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_feedbacks_id_idx" ON "payload_locked_documents_rels" USING btree ("feedbacks_id");
  CREATE INDEX "payload_locked_documents_rels_socials_id_idx" ON "payload_locked_documents_rels" USING btree ("socials_id");
  CREATE INDEX "payload_locked_documents_rels_questions_id_idx" ON "payload_locked_documents_rels" USING btree ("questions_id");
  CREATE INDEX "payload_locked_documents_rels_schedule_id_idx" ON "payload_locked_documents_rels" USING btree ("schedule_id");
  CREATE INDEX "payload_locked_documents_rels_service_prices_id_idx" ON "payload_locked_documents_rels" USING btree ("service_prices_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_payload_kv_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_kv_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "contacts_address_on_map_coordinates_order_idx" ON "contacts_address_on_map_coordinates" USING btree ("_order");
  CREATE INDEX "contacts_address_on_map_coordinates_parent_id_idx" ON "contacts_address_on_map_coordinates" USING btree ("_parent_id");
  CREATE INDEX "content_home_page_home_page_welcome_image_idx" ON "content" USING btree ("home_page_welcome_image_id");
  CREATE INDEX "content_home_page_home_page_about_image_idx" ON "content" USING btree ("home_page_about_image_id");
  CREATE INDEX "content_blog_page_blog_page_background_image_idx" ON "content" USING btree ("blog_page_background_image_id");
  CREATE INDEX "content_call_to_action_section_call_to_action_section_im_idx" ON "content" USING btree ("call_to_action_section_image_id");
  CREATE INDEX "working_hours_schedule_order_idx" ON "working_hours_schedule" USING btree ("_order");
  CREATE INDEX "working_hours_schedule_parent_id_idx" ON "working_hours_schedule" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "pages_blocks_intro" CASCADE;
  DROP TABLE "pages_blocks_about_stats" CASCADE;
  DROP TABLE "pages_blocks_about" CASCADE;
  DROP TABLE "pages_blocks_services" CASCADE;
  DROP TABLE "pages_blocks_blog_grid" CASCADE;
  DROP TABLE "pages_blocks_blog_row" CASCADE;
  DROP TABLE "pages_blocks_feedbacks" CASCADE;
  DROP TABLE "pages_blocks_contact" CASCADE;
  DROP TABLE "pages_blocks_description" CASCADE;
  DROP TABLE "pages_blocks_paragraph" CASCADE;
  DROP TABLE "pages_blocks_doctors" CASCADE;
  DROP TABLE "pages_blocks_blog_hero" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_prices" CASCADE;
  DROP TABLE "pages_blocks_contact_info" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_intro" CASCADE;
  DROP TABLE "_pages_v_blocks_about_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_about" CASCADE;
  DROP TABLE "_pages_v_blocks_services" CASCADE;
  DROP TABLE "_pages_v_blocks_blog_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_blog_row" CASCADE;
  DROP TABLE "_pages_v_blocks_feedbacks" CASCADE;
  DROP TABLE "_pages_v_blocks_contact" CASCADE;
  DROP TABLE "_pages_v_blocks_description" CASCADE;
  DROP TABLE "_pages_v_blocks_paragraph" CASCADE;
  DROP TABLE "_pages_v_blocks_doctors" CASCADE;
  DROP TABLE "_pages_v_blocks_blog_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_prices" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_info" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "articles" CASCADE;
  DROP TABLE "doctors" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "feedbacks" CASCADE;
  DROP TABLE "socials" CASCADE;
  DROP TABLE "questions" CASCADE;
  DROP TABLE "schedule" CASCADE;
  DROP TABLE "service_prices" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "contacts_address_on_map_coordinates" CASCADE;
  DROP TABLE "contacts" CASCADE;
  DROP TABLE "content" CASCADE;
  DROP TABLE "working_hours_schedule" CASCADE;
  DROP TABLE "working_hours" CASCADE;
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_articles_status";
  DROP TYPE "public"."enum_doctors_status";
  DROP TYPE "public"."enum_services_status";
  DROP TYPE "public"."enum_feedbacks_status";`)
}
