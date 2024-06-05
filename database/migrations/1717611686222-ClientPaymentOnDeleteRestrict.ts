import { MigrationInterface, QueryRunner } from "typeorm";

export class ClientPaymentOnDeleteRestrict1717611686222 implements MigrationInterface {
    name = 'ClientPaymentOnDeleteRestrict1717611686222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_f0662f97638fcfe621e3c371fa9"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_29a7e6f17a0b34718a896c4f4ab"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_f0662f97638fcfe621e3c371fa9" FOREIGN KEY ("shop_id") REFERENCES "shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_29a7e6f17a0b34718a896c4f4ab" FOREIGN KEY ("shop_id") REFERENCES "shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_29a7e6f17a0b34718a896c4f4ab"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_f0662f97638fcfe621e3c371fa9"`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_29a7e6f17a0b34718a896c4f4ab" FOREIGN KEY ("shop_id") REFERENCES "shop"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_f0662f97638fcfe621e3c371fa9" FOREIGN KEY ("shop_id") REFERENCES "shop"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
