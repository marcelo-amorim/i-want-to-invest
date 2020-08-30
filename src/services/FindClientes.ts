import { getRepository } from 'typeorm';
import Cliente from '../entities/Cliente';
import AppError from '../errors/AppError';

interface IRequest {
  id?: number;
  assessorId: number;
}

class FindClientes {
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

export default FindClientes;
