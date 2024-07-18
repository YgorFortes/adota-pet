import { MigrationInterface, QueryRunner } from "typeorm";

export class RefacMessageTable1721160739152 implements MigrationInterface {
    name = 'RefacMessageTable1721160739152'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_6d70a337427f757f68798567784"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_ce342efaf73b9919614a79ac250"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_61f199be7c6a397c55b8843a578"`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "name_guardian"`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "telephone_guardian"`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "name_pet"`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_6d70a337427f757f68798567784" FOREIGN KEY ("guardian_id") REFERENCES "guardian"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_ce342efaf73b9919614a79ac250" FOREIGN KEY ("shelter_id") REFERENCES "shelter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_61f199be7c6a397c55b8843a578" FOREIGN KEY ("pet_id") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_61f199be7c6a397c55b8843a578"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_ce342efaf73b9919614a79ac250"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_6d70a337427f757f68798567784"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "name_pet" character varying(45) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "message" ADD "telephone_guardian" character varying(15) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "message" ADD "name_guardian" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_61f199be7c6a397c55b8843a578" FOREIGN KEY ("pet_id") REFERENCES "pet"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_ce342efaf73b9919614a79ac250" FOREIGN KEY ("shelter_id") REFERENCES "shelter"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_6d70a337427f757f68798567784" FOREIGN KEY ("guardian_id") REFERENCES "guardian"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
