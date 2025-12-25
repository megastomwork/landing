import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_blog_grid_with_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"blog_title" varchar DEFAULT 'Наш блог',
  	"button_text" varchar DEFAULT 'Більше статей',
  	"faq_title" varchar DEFAULT 'Часті питання',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_blog_grid_with_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"blog_title" varchar DEFAULT 'Наш блог',
  	"button_text" varchar DEFAULT 'Більше статей',
  	"faq_title" varchar DEFAULT 'Часті питання',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "site_settings_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"path" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL,
  	"contact_button_text" varchar DEFAULT 'Зв''язатись з нами' NOT NULL,
  	"footer_menu_title" varchar DEFAULT 'Меню:',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "scroll_modal" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar DEFAULT 'Залишились питання?' NOT NULL,
  	"description" varchar DEFAULT 'Зв''яжіться з нами зручним для вас способом' NOT NULL,
  	"is_enabled" boolean DEFAULT false,
  	"scroll_down_trigger" numeric DEFAULT 90 NOT NULL,
  	"scroll_up_trigger" numeric DEFAULT 10 NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "contacts_address_on_map_coordinates" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "working_hours_schedule" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "working_hours" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "contacts_address_on_map_coordinates" CASCADE;
  DROP TABLE "content" CASCADE;
  DROP TABLE "working_hours_schedule" CASCADE;
  DROP TABLE "working_hours" CASCADE;
  ALTER TABLE "services" DROP CONSTRAINT "services_icon_image_id_media_id_fk";
  
  DROP INDEX "services_icon_image_idx";
  ALTER TABLE "doctors" ALTER COLUMN "status" SET NOT NULL;
  ALTER TABLE "services" ALTER COLUMN "status" SET NOT NULL;
  ALTER TABLE "feedbacks" ALTER COLUMN "stars" SET DEFAULT 5;
  ALTER TABLE "feedbacks" ALTER COLUMN "status" SET NOT NULL;
  ALTER TABLE "pages_blocks_blog_hero" ADD COLUMN "show_overlay" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_blog_hero" ADD COLUMN "show_overlay" boolean DEFAULT false;
  ALTER TABLE "services" ADD COLUMN "icon_id" integer NOT NULL;
  ALTER TABLE "socials" ADD COLUMN "icon_id" integer NOT NULL;
  ALTER TABLE "contacts" ADD COLUMN "address_label" varchar DEFAULT 'Наша адреса';
  ALTER TABLE "contacts" ADD COLUMN "phone_label" varchar DEFAULT 'Телефон';
  ALTER TABLE "pages_blocks_blog_grid_with_faq" ADD CONSTRAINT "pages_blocks_blog_grid_with_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_blog_grid_with_faq" ADD CONSTRAINT "_pages_v_blocks_blog_grid_with_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_menu_items" ADD CONSTRAINT "site_settings_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "scroll_modal" ADD CONSTRAINT "scroll_modal_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_blog_grid_with_faq_order_idx" ON "pages_blocks_blog_grid_with_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_blog_grid_with_faq_parent_id_idx" ON "pages_blocks_blog_grid_with_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_blog_grid_with_faq_path_idx" ON "pages_blocks_blog_grid_with_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_blog_grid_with_faq_order_idx" ON "_pages_v_blocks_blog_grid_with_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_blog_grid_with_faq_parent_id_idx" ON "_pages_v_blocks_blog_grid_with_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_blog_grid_with_faq_path_idx" ON "_pages_v_blocks_blog_grid_with_faq" USING btree ("_path");
  CREATE INDEX "site_settings_menu_items_order_idx" ON "site_settings_menu_items" USING btree ("_order");
  CREATE INDEX "site_settings_menu_items_parent_id_idx" ON "site_settings_menu_items" USING btree ("_parent_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "scroll_modal_image_idx" ON "scroll_modal" USING btree ("image_id");
  ALTER TABLE "services" ADD CONSTRAINT "services_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "socials" ADD CONSTRAINT "socials_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "services_icon_idx" ON "services" USING btree ("icon_id");
  CREATE INDEX "socials_icon_idx" ON "socials" USING btree ("icon_id");
  ALTER TABLE "pages_blocks_intro_1" DROP COLUMN "alt";
  ALTER TABLE "pages_blocks_contact_info" DROP COLUMN "show_map";
  ALTER TABLE "_pages_v_blocks_intro_1" DROP COLUMN "alt";
  ALTER TABLE "_pages_v_blocks_contact_info" DROP COLUMN "show_map";
  ALTER TABLE "services" DROP COLUMN "icon";
  ALTER TABLE "services" DROP COLUMN "icon_image_id";
  ALTER TABLE "socials" DROP COLUMN "username";
  ALTER TABLE "socials" DROP COLUMN "icon";
  ALTER TABLE "contacts" DROP COLUMN "email";
  ALTER TABLE "contacts" DROP COLUMN "google_address";
  ALTER TABLE "contacts" DROP COLUMN "address_on_map_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "contacts_address_on_map_coordinates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"coordinate" numeric
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
  
  ALTER TABLE "pages_blocks_blog_grid_with_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_blog_grid_with_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_menu_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "scroll_modal" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_blog_grid_with_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_blog_grid_with_faq" CASCADE;
  DROP TABLE "site_settings_menu_items" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "scroll_modal" CASCADE;
  ALTER TABLE "services" DROP CONSTRAINT "services_icon_id_media_id_fk";
  
  ALTER TABLE "socials" DROP CONSTRAINT "socials_icon_id_media_id_fk";
  
  DROP INDEX "services_icon_idx";
  DROP INDEX "socials_icon_idx";
  ALTER TABLE "doctors" ALTER COLUMN "status" DROP NOT NULL;
  ALTER TABLE "services" ALTER COLUMN "status" DROP NOT NULL;
  ALTER TABLE "feedbacks" ALTER COLUMN "stars" DROP DEFAULT;
  ALTER TABLE "feedbacks" ALTER COLUMN "status" DROP NOT NULL;
  ALTER TABLE "pages_blocks_intro_1" ADD COLUMN "alt" varchar DEFAULT 'Зображення';
  ALTER TABLE "pages_blocks_contact_info" ADD COLUMN "show_map" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_intro_1" ADD COLUMN "alt" varchar DEFAULT 'Зображення';
  ALTER TABLE "_pages_v_blocks_contact_info" ADD COLUMN "show_map" boolean DEFAULT true;
  ALTER TABLE "services" ADD COLUMN "icon" varchar;
  ALTER TABLE "services" ADD COLUMN "icon_image_id" integer;
  ALTER TABLE "socials" ADD COLUMN "username" varchar NOT NULL;
  ALTER TABLE "socials" ADD COLUMN "icon" varchar NOT NULL;
  ALTER TABLE "contacts" ADD COLUMN "email" varchar NOT NULL;
  ALTER TABLE "contacts" ADD COLUMN "google_address" varchar NOT NULL;
  ALTER TABLE "contacts" ADD COLUMN "address_on_map_type" varchar DEFAULT 'Point';
  ALTER TABLE "contacts_address_on_map_coordinates" ADD CONSTRAINT "contacts_address_on_map_coordinates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contacts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content" ADD CONSTRAINT "content_home_page_welcome_image_id_media_id_fk" FOREIGN KEY ("home_page_welcome_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "content" ADD CONSTRAINT "content_home_page_about_image_id_media_id_fk" FOREIGN KEY ("home_page_about_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "content" ADD CONSTRAINT "content_blog_page_background_image_id_media_id_fk" FOREIGN KEY ("blog_page_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "content" ADD CONSTRAINT "content_call_to_action_section_image_id_media_id_fk" FOREIGN KEY ("call_to_action_section_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "working_hours_schedule" ADD CONSTRAINT "working_hours_schedule_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."working_hours"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "contacts_address_on_map_coordinates_order_idx" ON "contacts_address_on_map_coordinates" USING btree ("_order");
  CREATE INDEX "contacts_address_on_map_coordinates_parent_id_idx" ON "contacts_address_on_map_coordinates" USING btree ("_parent_id");
  CREATE INDEX "content_home_page_home_page_welcome_image_idx" ON "content" USING btree ("home_page_welcome_image_id");
  CREATE INDEX "content_home_page_home_page_about_image_idx" ON "content" USING btree ("home_page_about_image_id");
  CREATE INDEX "content_blog_page_blog_page_background_image_idx" ON "content" USING btree ("blog_page_background_image_id");
  CREATE INDEX "content_call_to_action_section_call_to_action_section_im_idx" ON "content" USING btree ("call_to_action_section_image_id");
  CREATE INDEX "working_hours_schedule_order_idx" ON "working_hours_schedule" USING btree ("_order");
  CREATE INDEX "working_hours_schedule_parent_id_idx" ON "working_hours_schedule" USING btree ("_parent_id");
  ALTER TABLE "services" ADD CONSTRAINT "services_icon_image_id_media_id_fk" FOREIGN KEY ("icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "services_icon_image_idx" ON "services" USING btree ("icon_image_id");
  ALTER TABLE "pages_blocks_blog_hero" DROP COLUMN "show_overlay";
  ALTER TABLE "_pages_v_blocks_blog_hero" DROP COLUMN "show_overlay";
  ALTER TABLE "services" DROP COLUMN "icon_id";
  ALTER TABLE "socials" DROP COLUMN "icon_id";
  ALTER TABLE "contacts" DROP COLUMN "address_label";
  ALTER TABLE "contacts" DROP COLUMN "phone_label";`)
}
