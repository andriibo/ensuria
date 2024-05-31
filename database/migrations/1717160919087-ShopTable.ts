import { MigrationInterface, QueryRunner } from "typeorm";

export class ShopTable1717160919087 implements MigrationInterface {
    name = 'ShopTable1717160919087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shop" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "commissionC" numeric(4,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f0640e30fef1d175426d80dbc13" UNIQUE ("name"), CONSTRAINT "PK_ad47b7c6121fe31cb4b05438e44" PRIMARY KEY ("id")); COMMENT ON COLUMN "shop"."commissionC" IS 'in percents'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "shop"`);
    }

}
