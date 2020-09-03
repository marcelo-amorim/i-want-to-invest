import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

import IAssessoresRepository from '@modules/assessores/repositories/IAssessoresRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthenticateUserService {
  constructor(
    private usersRepository: IUsersRepository,
    private assessoresRepository: IAssessoresRepository,
  ) {}

  public async execute({ username, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) {
      throw new AppError('Usuário e senha incorretos', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Usuário e senha incorretos', 401);
    }

    // const roles = [];
    const assessor = await this.assessoresRepository.findByUserId(user.id);

    // if (assessor) {
    //   roles.push('ASSESSOR');
    // }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ assessorId: assessor?.id }, secret, {
      subject: user.id.toString(),
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
