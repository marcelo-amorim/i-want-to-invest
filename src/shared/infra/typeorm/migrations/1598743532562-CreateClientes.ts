import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateClientes1598743532562 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'clientes',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'nome',
            type: 'varchar',
            length: '200',
          },
          {
            name: 'cpf',
            type: 'char',
            length: '11',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '200',
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
          {
            name: 'assessor_id',
            type: 'int',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'fk_clientes_x_assessores',
            referencedTableName: 'assessores',
            referencedColumnNames: ['id'],
            columnNames: ['assessor_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('clientes');
  }
}
