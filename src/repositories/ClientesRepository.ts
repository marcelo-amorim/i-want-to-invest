import { EntityRepository, Repository } from 'typeorm';
import Cliente from '../entities/Cliente';

@EntityRepository(Cliente)
class ClientesRepository extends Repository<Cliente> {
  public async findByDate(): Promise<void> {}
}

export default ClientesRepository;
