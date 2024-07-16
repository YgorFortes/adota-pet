import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableToken1720807089716 implements MigrationInterface {
    name = 'CreateTableToken1720807089716'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "token_invalid" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying(255) NOT NULL, CONSTRAINT "PK_b739e4ff8fb2dd7a4362e0ebcc5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "token_invalid"`);
    }

}
