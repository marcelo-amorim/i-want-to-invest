import { Router } from 'express';

import AuthtenticateUserService from '@modules/users/services/AuthtenticateUserService';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import AssessoresRepository from '@modules/assessores/infra/typeorm/repositories/AssessoresRepository';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  const usersRepository = new UsersRepository();
  const assessoresRepository = new AssessoresRepository();
  const { username, password } = request.body;

  const authenticateUser = new AuthtenticateUserService(
    usersRepository,
    assessoresRepository,
  );

  const { user, token } = await authenticateUser.execute({
    username,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionRouter;
