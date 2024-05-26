import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSourceTable1716720475889 implements MigrationInterface {
  name = 'AddSourceTable1716720475889';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "source" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_018c433f8264b58c86363eaadde" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "source"`);
  }
}
