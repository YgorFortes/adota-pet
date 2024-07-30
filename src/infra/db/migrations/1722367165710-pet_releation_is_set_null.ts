import { MigrationInterface, QueryRunner } from 'typeorm';

export class PetReleationIsSetNull1722367165710 implements MigrationInterface {
  name = 'PetReleationIsSetNull1722367165710';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "pet" DROP CONSTRAINT "FK_80e1ff45d1324b428780eacb7a2"`);
    await queryRunner.query(`ALTER TABLE "pet" ALTER COLUMN "shelter_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "pet" ADD CONSTRAINT "FK_80e1ff45d1324b428780eacb7a2" FOREIGN KEY ("shelter_id") REFERENCES "shelter"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "pet" DROP CONSTRAINT "FK_80e1ff45d1324b428780eacb7a2"`);
    await queryRunner.query(`ALTER TABLE "pet" ALTER COLUMN "shelter_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "pet" ADD CONSTRAINT "FK_80e1ff45d1324b428780eacb7a2" FOREIGN KEY ("shelter_id") REFERENCES "shelter"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
