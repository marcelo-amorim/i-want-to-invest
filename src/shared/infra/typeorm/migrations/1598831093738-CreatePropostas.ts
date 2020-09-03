import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreatePropostas1598831093738
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'propostas',
        columns: [
          {
            name: 'codigo',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'valor',
            type: 'float',
            precision: 12,
            scale: 2,
          },
          {
            name: 'tipo_pagamento',
            type: 'varchar',
            length: '50',
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
            name: 'fundo_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'cliente_id',
            type: 'int',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'fk_propostas_x_fundos',
            referencedTableName: 'fundos',
            referencedColumnNames: ['id'],
            columnNames: ['fundo_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
          {
            name: 'fk_propostas_x_clientes',
            referencedTableName: 'clientes',
            referencedColumnNames: ['id'],
            columnNames: ['cliente_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('propostas');
  }
}
