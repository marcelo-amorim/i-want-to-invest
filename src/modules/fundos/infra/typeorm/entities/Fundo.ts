import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('fundos')
class Fundo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  cnpj: string;

  @Column()
  nome: string;

  @Column({ name: 'rendimento_anual' })
  rendimentoAnual: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default Fundo;
