import { EntityRepository, Repository } from 'typeorm';
import Cliente from '../entities/Cliente';

@EntityRepository(Cliente)
class ClientesRepository extends Repository<Cliente> {
  public async findOneByAssessor(
    clienteId: number,
    assessorId: number,
  ): Promise<Cliente | undefined> {
    const cliente = await this.findOne({
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
    const clientes = await this.find({
      where: {
        assessorId,
      },
    });

    return clientes;
  }
}

export default ClientesRepository;
