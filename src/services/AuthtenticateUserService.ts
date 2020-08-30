import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../errors/AppError';

import User from '../entities/User';
import Assessor from '../entities/Assessor';

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ username, password }: IRequest): Promise<IResponse> {
    const usersRepository = getRepository(User);
    const assessoresRepository = getRepository(Assessor);

    const user = await usersRepository.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      throw new AppError('Usuário e senha incorretos', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Usuário e senha incorretos', 401);
    }

    // const roles = [];
    const assessor = await assessoresRepository.findOne({
      where: {
        userId: user.id,
      },
    });

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
