import { MigrationInterface, QueryRunner } from 'typeorm';

export class SourceDates1716755323407 implements MigrationInterface {
  name = 'SourceDates1716755323407';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "source" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "source" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "source" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "source" DROP COLUMN "created_at"`);
  }
}
