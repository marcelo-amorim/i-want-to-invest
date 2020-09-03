import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateFundos1598505313465 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'fundos',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'cnpj',
            type: 'char',
            length: '14',
          },
          {
            name: 'nome',
            type: 'varchar',
            length: '200',
          },
          {
            name: 'rendimento_anual',
            type: 'float',
            precision: 12,
            scale: 4,
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
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('fundos');
  }
}
