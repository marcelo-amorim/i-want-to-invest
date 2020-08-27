import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../entities/User';

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
      throw new Error('Username já utilizado por outro usuário.');
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
