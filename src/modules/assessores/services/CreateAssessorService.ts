import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import AppError from '@shared/errors/AppError';

import Assessor from '@modules/assessores/infra/typeorm/entities/Assessor';
import IAssessorRepository from '../repositories/IAssessoresRepository';

interface IRequest {
  nome: string;
  userId: number;
}

@injectable()
class CreateAssessorService {
  constructor(
    @inject('AssessoresRepository')
    private assessoresRepository: IAssessorRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ nome, userId }: IRequest): Promise<Assessor> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('Usuário não cadastrado.');
    }

    const userInUseByAssessor = await this.assessoresRepository.findByUserId(
      userId,
    );

    if (userInUseByAssessor) {
      throw new AppError('Usuário já utilizado por outro assessor.', 409);
    }

    const assessor = await this.assessoresRepository.create({
      nome,
      userId,
    });

    return assessor;
  }
}

export default CreateAssessorService;
