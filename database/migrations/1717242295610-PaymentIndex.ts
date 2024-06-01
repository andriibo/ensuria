import { MigrationInterface, QueryRunner } from "typeorm";

export class PaymentIndex1717242295610 implements MigrationInterface {
    name = 'PaymentIndex1717242295610'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_3af0086da18f32ac05a52e5639" ON "payment" ("status") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_3af0086da18f32ac05a52e5639"`);
    }

}
