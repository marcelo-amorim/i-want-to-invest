import { Router } from 'express';

import CreateUserService from '@modules/users/services/CreateUserService';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const usersRepository = new UsersRepository();
  const { username, password } = request.body;

  const createUser = new CreateUserService(usersRepository);

  const user = await createUser.execute({ username, password });

  delete user.password;

  return response.json(user);
});

export default usersRouter;
