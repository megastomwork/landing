import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_intro" RENAME TO "pages_blocks_intro_1";
  ALTER TABLE "pages_blocks_section_header" RENAME TO "pages_blocks_intro_2";
  ALTER TABLE "_pages_v_blocks_intro" RENAME TO "_pages_v_blocks_intro_1";
  ALTER TABLE "_pages_v_blocks_section_header" RENAME TO "_pages_v_blocks_intro_2";
  ALTER TABLE "pages_blocks_intro_1" DROP CONSTRAINT "pages_blocks_intro_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_intro_1" DROP CONSTRAINT "pages_blocks_intro_parent_id_fk";
  
  ALTER TABLE "pages_blocks_intro_2" DROP CONSTRAINT "pages_blocks_section_header_parent_id_fk";
  
  ALTER TABLE "_pages_v_blocks_intro_1" DROP CONSTRAINT "_pages_v_blocks_intro_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_intro_1" DROP CONSTRAINT "_pages_v_blocks_intro_parent_id_fk";
  
  ALTER TABLE "_pages_v_blocks_intro_2" DROP CONSTRAINT "_pages_v_blocks_section_header_parent_id_fk";
  
  DROP INDEX "pages_blocks_intro_order_idx";
  DROP INDEX "pages_blocks_intro_parent_id_idx";
  DROP INDEX "pages_blocks_intro_path_idx";
  DROP INDEX "pages_blocks_intro_image_idx";
  DROP INDEX "pages_blocks_section_header_order_idx";
  DROP INDEX "pages_blocks_section_header_parent_id_idx";
  DROP INDEX "pages_blocks_section_header_path_idx";
  DROP INDEX "_pages_v_blocks_intro_order_idx";
  DROP INDEX "_pages_v_blocks_intro_parent_id_idx";
  DROP INDEX "_pages_v_blocks_intro_path_idx";
  DROP INDEX "_pages_v_blocks_intro_image_idx";
  DROP INDEX "_pages_v_blocks_section_header_order_idx";
  DROP INDEX "_pages_v_blocks_section_header_parent_id_idx";
  DROP INDEX "_pages_v_blocks_section_header_path_idx";
  ALTER TABLE "pages_blocks_blog_row" ADD COLUMN "button_link" varchar DEFAULT '/blog';
  ALTER TABLE "_pages_v_blocks_blog_row" ADD COLUMN "button_link" varchar DEFAULT '/blog';
  ALTER TABLE "pages_blocks_intro_1" ADD CONSTRAINT "pages_blocks_intro_1_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_intro_1" ADD CONSTRAINT "pages_blocks_intro_1_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_intro_2" ADD CONSTRAINT "pages_blocks_intro_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_intro_1" ADD CONSTRAINT "_pages_v_blocks_intro_1_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_intro_1" ADD CONSTRAINT "_pages_v_blocks_intro_1_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_intro_2" ADD CONSTRAINT "_pages_v_blocks_intro_2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_intro_1_order_idx" ON "pages_blocks_intro_1" USING btree ("_order");
  CREATE INDEX "pages_blocks_intro_1_parent_id_idx" ON "pages_blocks_intro_1" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_intro_1_path_idx" ON "pages_blocks_intro_1" USING btree ("_path");
  CREATE INDEX "pages_blocks_intro_1_image_idx" ON "pages_blocks_intro_1" USING btree ("image_id");
  CREATE INDEX "pages_blocks_intro_2_order_idx" ON "pages_blocks_intro_2" USING btree ("_order");
  CREATE INDEX "pages_blocks_intro_2_parent_id_idx" ON "pages_blocks_intro_2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_intro_2_path_idx" ON "pages_blocks_intro_2" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_intro_1_order_idx" ON "_pages_v_blocks_intro_1" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_intro_1_parent_id_idx" ON "_pages_v_blocks_intro_1" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_intro_1_path_idx" ON "_pages_v_blocks_intro_1" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_intro_1_image_idx" ON "_pages_v_blocks_intro_1" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_intro_2_order_idx" ON "_pages_v_blocks_intro_2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_intro_2_parent_id_idx" ON "_pages_v_blocks_intro_2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_intro_2_path_idx" ON "_pages_v_blocks_intro_2" USING btree ("_path");
  ALTER TABLE "pages_blocks_blog_row" DROP COLUMN "show_more_link";
  ALTER TABLE "_pages_v_blocks_blog_row" DROP COLUMN "show_more_link";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar DEFAULT 'Зображення',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_section_header" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
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
  
  CREATE TABLE "_pages_v_blocks_section_header" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DROP TABLE "pages_blocks_intro_1" CASCADE;
  DROP TABLE "pages_blocks_intro_2" CASCADE;
  DROP TABLE "_pages_v_blocks_intro_1" CASCADE;
  DROP TABLE "_pages_v_blocks_intro_2" CASCADE;
  ALTER TABLE "pages_blocks_blog_row" ADD COLUMN "show_more_link" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_blog_row" ADD COLUMN "show_more_link" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_intro" ADD CONSTRAINT "pages_blocks_intro_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_intro" ADD CONSTRAINT "pages_blocks_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_section_header" ADD CONSTRAINT "pages_blocks_section_header_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_intro" ADD CONSTRAINT "_pages_v_blocks_intro_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_intro" ADD CONSTRAINT "_pages_v_blocks_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_section_header" ADD CONSTRAINT "_pages_v_blocks_section_header_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_intro_order_idx" ON "pages_blocks_intro" USING btree ("_order");
  CREATE INDEX "pages_blocks_intro_parent_id_idx" ON "pages_blocks_intro" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_intro_path_idx" ON "pages_blocks_intro" USING btree ("_path");
  CREATE INDEX "pages_blocks_intro_image_idx" ON "pages_blocks_intro" USING btree ("image_id");
  CREATE INDEX "pages_blocks_section_header_order_idx" ON "pages_blocks_section_header" USING btree ("_order");
  CREATE INDEX "pages_blocks_section_header_parent_id_idx" ON "pages_blocks_section_header" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_section_header_path_idx" ON "pages_blocks_section_header" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_intro_order_idx" ON "_pages_v_blocks_intro" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_intro_parent_id_idx" ON "_pages_v_blocks_intro" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_intro_path_idx" ON "_pages_v_blocks_intro" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_intro_image_idx" ON "_pages_v_blocks_intro" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_section_header_order_idx" ON "_pages_v_blocks_section_header" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_section_header_parent_id_idx" ON "_pages_v_blocks_section_header" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_section_header_path_idx" ON "_pages_v_blocks_section_header" USING btree ("_path");
  ALTER TABLE "pages_blocks_blog_row" DROP COLUMN "button_link";
  ALTER TABLE "_pages_v_blocks_blog_row" DROP COLUMN "button_link";`)
}
