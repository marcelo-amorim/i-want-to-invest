import { Router } from 'express';

import AuthtenticateUserService from '../services/AuthtenticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  try {
    const { username, password } = request.body;

    const authenticateUser = new AuthtenticateUserService();

    const { user, token } = await authenticateUser.execute({
      username,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  } catch (err) {
    return response.status(400).json({
      error: err.message,
    });
  }
});

export default sessionRouter;
