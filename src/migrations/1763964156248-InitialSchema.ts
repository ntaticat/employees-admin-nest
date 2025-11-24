import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1763964156248 implements MigrationInterface {
    name = 'InitialSchema1763964156248'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "curp" character varying NOT NULL, "name" character varying NOT NULL, "middleName" character varying NOT NULL, "surName" character varying NOT NULL, "phoneNumber" character varying, "email" character varying, CONSTRAINT "UQ_bee1d924b190fec901f4d3bca75" UNIQUE ("curp"), CONSTRAINT "UQ_b16a62b0eb49a67425c9a6bca18" UNIQUE ("phoneNumber"), CONSTRAINT "UQ_817d1d427138772d47eca048855" UNIQUE ("email"), CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
