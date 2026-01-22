import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_doctors_style" AS ENUM('list', 'grid');
  CREATE TYPE "public"."enum__pages_v_blocks_doctors_style" AS ENUM('list', 'grid');
  ALTER TABLE "pages_blocks_doctors" ADD COLUMN "style" "enum_pages_blocks_doctors_style" DEFAULT 'list';
  ALTER TABLE "_pages_v_blocks_doctors" ADD COLUMN "style" "enum__pages_v_blocks_doctors_style" DEFAULT 'list';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_doctors" DROP COLUMN "style";
  ALTER TABLE "_pages_v_blocks_doctors" DROP COLUMN "style";
  DROP TYPE "public"."enum_pages_blocks_doctors_style";
  DROP TYPE "public"."enum__pages_v_blocks_doctors_style";`)
}
