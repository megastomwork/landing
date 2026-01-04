import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contacts" ADD COLUMN "iframe_src" varchar NOT NULL;
  ALTER TABLE "contacts" DROP COLUMN "address_label";
  ALTER TABLE "contacts" DROP COLUMN "phone_label";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contacts" ADD COLUMN "address_label" varchar DEFAULT 'Наша адреса';
  ALTER TABLE "contacts" ADD COLUMN "phone_label" varchar DEFAULT 'Телефон';
  ALTER TABLE "contacts" DROP COLUMN "iframe_src";`)
}
