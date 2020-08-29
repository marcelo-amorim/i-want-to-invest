import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../entities/User';
import AppError from '../errors/AppError';

interface IRequest {
  username: string;
  password: string;
}

class CreateUserService {
  public async execute({ username, password }: IRequest): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: {
        username,
      },
    });

    if (checkUserExists) {
      throw new AppError('Username já utilizado por outro usuário.', 409);
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      username,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
