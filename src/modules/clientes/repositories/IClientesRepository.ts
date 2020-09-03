import Cliente from '../infra/typeorm/entities/Cliente';
import ICreateClienteDTO from '../dtos/ICreateClienteDTO';

export default interface IClientesRepository {
  create(data: ICreateClienteDTO): Promise<Cliente>;
  findByCpf(cpf: string): Promise<Cliente | undefined>;
  findByEmail(email: string): Promise<Cliente | undefined>;
  findOneByAssessor(
    clienteId: number,
    assessorId: number,
  ): Promise<Cliente | undefined>;
  getAllClientesByAssessor(assessorId: number): Promise<Cliente[]>;
}
