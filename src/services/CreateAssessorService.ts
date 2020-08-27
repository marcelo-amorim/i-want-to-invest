import { getRepository } from 'typeorm';
import User from '../entities/User';
import Assessor from '../entities/Assessor';

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
      throw new Error('Usuário não cadastrado.');
    }

    const userInUseByAssessor = await assessoresRepository.findOne({
      where: {
        userId: user.id,
      },
    });

    if (userInUseByAssessor) {
      throw new Error('Usuário já utilizado por outro assessor.');
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
