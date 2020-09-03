import { getRepository, Repository } from 'typeorm';

import IClientesRepository from '@modules/clientes/repositories/IClientesRepository';

import ICreateClienteDTO from '@modules/clientes/dtos/ICreateClienteDTO';
import Cliente from '../entities/Cliente';

class ClientesRepository implements IClientesRepository {
  private ormRepository: Repository<Cliente>;

  constructor() {
    this.ormRepository = getRepository(Cliente);
  }

  public async create({
    nome,
    cpf,
    email,
    assessorId,
  }: ICreateClienteDTO): Promise<Cliente> {
    const cliente = this.ormRepository.create({ nome, cpf, email, assessorId });

    await this.ormRepository.save(cliente);

    return cliente;
  }

  public async findByCpf(cpf: string): Promise<Cliente | undefined> {
    const cliente = await this.ormRepository.findOne({
      where: {
        cpf,
      },
    });

    return cliente;
  }

  public async findByEmail(email: string): Promise<Cliente | undefined> {
    const cliente = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return cliente;
  }

  public async findOneByAssessor(
    clienteId: number,
    assessorId: number,
  ): Promise<Cliente | undefined> {
    const cliente = await this.ormRepository.findOne({
      where: {
        id: clienteId,
        assessorId,
      },
    });

    return cliente;
  }

  public async getAllClientesByAssessor(
    assessorId: number,
  ): Promise<Cliente[]> {
    const clientes = await this.ormRepository.find({
      where: {
        assessorId,
      },
    });

    return clientes;
  }
}

export default ClientesRepository;
