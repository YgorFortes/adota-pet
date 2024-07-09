import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFieldsInPet1720206955468 implements MigrationInterface {
    name = 'CreateFieldsInPet1720206955468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pet" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "pet" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "pet" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "created_at"`);
    }

}
