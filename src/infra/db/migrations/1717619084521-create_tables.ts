import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1717619084521 implements MigrationInterface {
  name = 'CreateTables1717619084521';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "city" character varying(45) NOT NULL, "cep" character varying(45), "state" character varying(45) NOT NULL, "street" character varying(45) NOT NULL, "complement" character varying(45), "neighborhood" character varying(45) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name_guardian" character varying(100) NOT NULL, "telephone_guardian" character varying(15) NOT NULL, "name_pet" character varying(45) NOT NULL, "content" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "guardian_id" uuid, "shelter_id" uuid, "pet_id" uuid, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6d70a337427f757f6879856778" ON "message" ("guardian_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ce342efaf73b9919614a79ac25" ON "message" ("shelter_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_61f199be7c6a397c55b8843a57" ON "message" ("pet_id") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."pet_size_enum" AS ENUM('pequeno', 'médio', 'grande', 'gigante')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."pet_status_enum" AS ENUM('adotado', 'não adotado')`,
    );
    await queryRunner.query(
      `CREATE TABLE "pet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "birth_date" TIMESTAMP, "image" character varying(255) NOT NULL, "size" "public"."pet_size_enum" NOT NULL, "behavior" character varying(100) NOT NULL, "status" "public"."pet_status_enum" DEFAULT 'não adotado', "specie" character varying(45) NOT NULL, "shelter_id" uuid, "guardian_id" uuid, CONSTRAINT "PK_b1ac2e88e89b9480e0c5b53fa60" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_d252745c2aa37bfa7c402b7f41" ON "pet" ("name") `);
    await queryRunner.query(
      `CREATE INDEX "IDX_7658583fd96fed078e45032b71" ON "pet" ("birth_date") `,
    );
    await queryRunner.query(`CREATE INDEX "IDX_c1dff7749367e865481b09d375" ON "pet" ("size") `);
    await queryRunner.query(`CREATE INDEX "IDX_14e6e143bca4aa43e12cc91863" ON "pet" ("status") `);
    await queryRunner.query(`CREATE INDEX "IDX_95eb8fc839215a5dd22c105955" ON "pet" ("specie") `);
    await queryRunner.query(
      `CREATE INDEX "IDX_80e1ff45d1324b428780eacb7a" ON "pet" ("shelter_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bd8c777a49a848117e9fc0a19c" ON "pet" ("guardian_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "guardian" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "about" text, "birth_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "address_id" uuid, "user_id" uuid, CONSTRAINT "REL_d1c3a36be489a1b09c9ee631fe" UNIQUE ("address_id"), CONSTRAINT "REL_2a8a3239a2868ec2fd2c34e0fb" UNIQUE ("user_id"), CONSTRAINT "PK_5eb51ec9378bc6b07702717160e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2a8a3239a2868ec2fd2c34e0fb" ON "guardian" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(60) NOT NULL, "role" character varying(45) NOT NULL, "photo" character varying(255), "telephone" character varying(15) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
    await queryRunner.query(
      `CREATE TABLE "shelter" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "about" text, "website" character varying(255) NOT NULL, "working_hours" character varying(45) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "user_id" uuid, "address_id" uuid, CONSTRAINT "REL_6b37a09b857e638e3200dcc995" UNIQUE ("user_id"), CONSTRAINT "REL_642eb6002341a37b7851c45e4e" UNIQUE ("address_id"), CONSTRAINT "PK_fa71ea731c766e25af6c091a31f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6b37a09b857e638e3200dcc995" ON "shelter" ("user_id") `,
    );
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
    await queryRunner.query(
      `ALTER TABLE "pet" ADD CONSTRAINT "FK_bd8c777a49a848117e9fc0a19c4" FOREIGN KEY ("guardian_id") REFERENCES "guardian"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "guardian" ADD CONSTRAINT "FK_d1c3a36be489a1b09c9ee631fe7" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "guardian" ADD CONSTRAINT "FK_2a8a3239a2868ec2fd2c34e0fb2" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "shelter" ADD CONSTRAINT "FK_6b37a09b857e638e3200dcc995d" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "shelter" ADD CONSTRAINT "FK_642eb6002341a37b7851c45e4ec" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shelter" DROP CONSTRAINT "FK_642eb6002341a37b7851c45e4ec"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shelter" DROP CONSTRAINT "FK_6b37a09b857e638e3200dcc995d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "guardian" DROP CONSTRAINT "FK_2a8a3239a2868ec2fd2c34e0fb2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "guardian" DROP CONSTRAINT "FK_d1c3a36be489a1b09c9ee631fe7"`,
    );
    await queryRunner.query(`ALTER TABLE "pet" DROP CONSTRAINT "FK_bd8c777a49a848117e9fc0a19c4"`);
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
    await queryRunner.query(`DROP INDEX "public"."IDX_6b37a09b857e638e3200dcc995"`);
    await queryRunner.query(`DROP TABLE "shelter"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_2a8a3239a2868ec2fd2c34e0fb"`);
    await queryRunner.query(`DROP TABLE "guardian"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_bd8c777a49a848117e9fc0a19c"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_80e1ff45d1324b428780eacb7a"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_95eb8fc839215a5dd22c105955"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_14e6e143bca4aa43e12cc91863"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_c1dff7749367e865481b09d375"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7658583fd96fed078e45032b71"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_d252745c2aa37bfa7c402b7f41"`);
    await queryRunner.query(`DROP TABLE "pet"`);
    await queryRunner.query(`DROP TYPE "public"."pet_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."pet_size_enum"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_61f199be7c6a397c55b8843a57"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_ce342efaf73b9919614a79ac25"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_6d70a337427f757f6879856778"`);
    await queryRunner.query(`DROP TABLE "message"`);
    await queryRunner.query(`DROP TABLE "address"`);
  }
}
