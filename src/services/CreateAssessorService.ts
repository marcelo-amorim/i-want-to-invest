import { getRepository } from 'typeorm';
import User from '../entities/User';
import Assessor from '../entities/Assessor';

import AppError from '../errors/AppError';

interface IRequest {
  nome: string;
  userId: number;
}

class CreateAssessorService {
  public async execute({ nome, userId }: IRequest): Promise<Assessor> {
    const usersRepository = getRepository(User);
    const assessoresRepository = getRepository(Assessor);

    const user = await usersRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new AppError('Usuário não cadastrado.');
    }

    const userInUseByAssessor = await assessoresRepository.findOne({
      where: {
        userId: user.id,
      },
    });

    if (userInUseByAssessor) {
      throw new AppError('Usuário já utilizado por outro assessor.', 409);
    }

    const assessor = assessoresRepository.create({
      nome,
      userId,
    });

    await assessoresRepository.save(assessor);

    return assessor;
  }
}

export default CreateAssessorService;
