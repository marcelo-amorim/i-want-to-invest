import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Fundo from './Fundo';
import Cliente from './Cliente';

@Entity('propostas')
class Proposta {
  @PrimaryGeneratedColumn('increment')
  codigo: number;

  @Column()
  valor: number;

  @Column({ name: 'tipo_pagamento' })
  tipoPagamento: string;

  @Column()
  fundoId: number;

  @ManyToOne(() => Fundo, { eager: true })
  @JoinColumn({ name: 'fundo_id' })
  fundo: Fundo;

  @Column({ name: 'cliente_id' })
  clienteId: number;

  @ManyToOne(() => Cliente, { eager: true })
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default Proposta;
