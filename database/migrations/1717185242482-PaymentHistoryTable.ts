import { MigrationInterface, QueryRunner } from "typeorm";

export class PaymentHistoryTable1717185242482 implements MigrationInterface {
    name = 'PaymentHistoryTable1717185242482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "payment_id" uuid NOT NULL, "amount" numeric(10,2) NOT NULL, "amount_blocked" numeric(10,2) NOT NULL DEFAULT '0', "status" "public"."payment_history_status_enum" NOT NULL DEFAULT 'new', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5fcec51a769b65c0c3c0987f11c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payment_history" ADD CONSTRAINT "FK_34e09242082136eb5e16b24dfa3" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_history" DROP CONSTRAINT "FK_34e09242082136eb5e16b24dfa3"`);
        await queryRunner.query(`DROP TABLE "payment_history"`);
    }

}
