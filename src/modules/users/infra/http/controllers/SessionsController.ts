import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthtenticateUserService from '@modules/users/services/AuthtenticateUserService';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const authenticateUser = container.resolve(AuthtenticateUserService);

    const { user, token } = await authenticateUser.execute({
      username,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  }
}

export default SessionsController;
