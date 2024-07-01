import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameFields1719612259949 implements MigrationInterface {
  name = 'RenameFields1719612259949';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop existing index before altering table
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_95eb8fc839215a5dd22c105955"`);

    // Drop existing column to add the new enum column
    await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN IF EXISTS "specie"`);

    // Create the new enum type
    await queryRunner.query(
      `CREATE TYPE "public"."pet_specie_enum" AS ENUM('cachorro', 'gato', 'pássaro', 'coelho', 'porquinho-da-índia', 'outros')`,
    );

    // Add the new enum column
    await queryRunner.query(
      `ALTER TABLE "pet" ADD "specie" "public"."pet_specie_enum" NOT NULL DEFAULT 'cachorro'`,
    );

    // Recreate index on the new column
    await queryRunner.query(`CREATE INDEX "IDX_95eb8fc839215a5dd22c105955" ON "pet" ("specie")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop existing index before altering table
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_95eb8fc839215a5dd22c105955"`);

    // Drop the enum type
    await queryRunner.query(`DROP TYPE IF EXISTS "public"."pet_specie_enum"`);

    // Drop the enum column
    await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN IF EXISTS "specie"`);

    // Recreate the original varchar column
    await queryRunner.query(
      `ALTER TABLE "pet" ADD "specie" character varying(45) NOT NULL DEFAULT 'cachorro'`,
    );

    // Recreate index on the varchar column
    await queryRunner.query(`CREATE INDEX "IDX_95eb8fc839215a5dd22c105955" ON "pet" ("specie")`);
  }
}
