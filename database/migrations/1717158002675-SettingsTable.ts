import { MigrationInterface, QueryRunner } from "typeorm";

export class SettingsTable1717158002675 implements MigrationInterface {
    name = 'SettingsTable1717158002675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "settings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "commissionA" numeric(6,2) NOT NULL, "commissionB" numeric(4,2) NOT NULL, "blockingD" numeric(4,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0669fe20e252eb692bf4d344975" PRIMARY KEY ("id")); COMMENT ON COLUMN "settings"."commissionB" IS 'in percents'; COMMENT ON COLUMN "settings"."blockingD" IS 'in percents'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "settings"`);
    }

}
