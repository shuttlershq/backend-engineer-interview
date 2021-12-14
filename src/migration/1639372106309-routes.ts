import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class tracks1639372106309 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'routes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'assetId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'start',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'stop',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'distance',
            type: 'bigint',
            default: 0,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      false,
      true,
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tracks');
  }
}
