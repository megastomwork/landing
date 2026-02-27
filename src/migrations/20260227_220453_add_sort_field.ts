import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "doctors" ADD COLUMN "sort_order" numeric DEFAULT 0;
  CREATE INDEX "doctors_sort_order_idx" ON "doctors" USING btree ("sort_order");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "doctors_sort_order_idx";
  ALTER TABLE "doctors" DROP COLUMN "sort_order";`)
}
