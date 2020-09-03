import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  username: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ username, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByUsername(username);

    if (checkUserExists) {
      throw new AppError('Username já utilizado por outro usuário.', 409);
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      username,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
