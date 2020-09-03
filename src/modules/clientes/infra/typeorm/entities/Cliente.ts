import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

import Assessor from '@modules/assessores/infra/typeorm/entities/Assessor';

@Entity('clientes')
class Cliente {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 200 })
  nome: string;

  @Column({ length: 11 })
  cpf: string;

  @Column({ length: 200 })
  email: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column()
  @OneToOne(() => Assessor)
  @JoinColumn({ name: 'assessor_id' })
  assessorId: number;
}

export default Cliente;
