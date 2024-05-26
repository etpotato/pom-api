import { MigrationInterface, QueryRunner } from 'typeorm';

export class SourceNameUnique1716737680486 implements MigrationInterface {
  name = 'SourceNameUnique1716737680486';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "source" ADD CONSTRAINT "UQ_e64619e22dc97d6525c86ef8af5" UNIQUE ("name")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "source" DROP CONSTRAINT "UQ_e64619e22dc97d6525c86ef8af5"`,
    );
  }
}
