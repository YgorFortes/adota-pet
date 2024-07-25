import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateForeignKeysTypeOrm1721759409035 implements MigrationInterface {
  name = 'CreateForeignKeysTypeOrm1721759409035';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_6d70a337427f757f68798567784"`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_ce342efaf73b9919614a79ac250"`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_61f199be7c6a397c55b8843a578"`,
    );
    await queryRunner.query(`ALTER TABLE "message" ALTER COLUMN "guardian_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "message" ALTER COLUMN "shelter_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "message" ALTER COLUMN "pet_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "pet" DROP CONSTRAINT "FK_80e1ff45d1324b428780eacb7a2"`);
    await queryRunner.query(`ALTER TABLE "pet" ALTER COLUMN "shelter_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_6d70a337427f757f68798567784" FOREIGN KEY ("guardian_id") REFERENCES "guardian"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_ce342efaf73b9919614a79ac250" FOREIGN KEY ("shelter_id") REFERENCES "shelter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_61f199be7c6a397c55b8843a578" FOREIGN KEY ("pet_id") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "pet" ADD CONSTRAINT "FK_80e1ff45d1324b428780eacb7a2" FOREIGN KEY ("shelter_id") REFERENCES "shelter"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "pet" DROP CONSTRAINT "FK_80e1ff45d1324b428780eacb7a2"`);
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_61f199be7c6a397c55b8843a578"`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_ce342efaf73b9919614a79ac250"`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_6d70a337427f757f68798567784"`,
    );
    await queryRunner.query(`ALTER TABLE "pet" ALTER COLUMN "shelter_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "pet" ADD CONSTRAINT "FK_80e1ff45d1324b428780eacb7a2" FOREIGN KEY ("shelter_id") REFERENCES "shelter"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(`ALTER TABLE "message" ALTER COLUMN "pet_id" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "message" ALTER COLUMN "shelter_id" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "message" ALTER COLUMN "guardian_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_61f199be7c6a397c55b8843a578" FOREIGN KEY ("pet_id") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_ce342efaf73b9919614a79ac250" FOREIGN KEY ("shelter_id") REFERENCES "shelter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_6d70a337427f757f68798567784" FOREIGN KEY ("guardian_id") REFERENCES "guardian"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
