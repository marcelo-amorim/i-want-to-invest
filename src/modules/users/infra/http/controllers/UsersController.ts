import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ username, password });

    delete user.password;

    return response.json(user);
  }
}

export default UsersController;
