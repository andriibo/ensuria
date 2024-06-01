import { MigrationInterface, QueryRunner } from "typeorm";

export class PaymentHistoryUniqueFields1717233025906 implements MigrationInterface {
    name = 'PaymentHistoryUniqueFields1717233025906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_history" ADD CONSTRAINT "UQ_8d2672cb48d5b5bf305c9d2130c" UNIQUE ("payment_id", "status")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_history" DROP CONSTRAINT "UQ_8d2672cb48d5b5bf305c9d2130c"`);
    }

}
