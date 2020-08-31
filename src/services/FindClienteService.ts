import { getRepository } from 'typeorm';
import Cliente from '../entities/Cliente';

interface IRequest {
  id?: number;
  assessorId: number;
}

class FindClienteService {
  public async execute({
    id,
    assessorId,
  }: IRequest): Promise<Cliente | Cliente[] | undefined> {
    const clientesRepository = getRepository(Cliente);

    if (id) {
      return clientesRepository.findOne({
        where: {
          id,
          assessorId,
        },
      });
    }

    return clientesRepository.find({
      where: {
        assessorId,
      },
    });
  }
}

export default FindClienteService;
