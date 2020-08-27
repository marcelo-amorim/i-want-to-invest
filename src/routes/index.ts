import { Router } from 'express';

import usersRouter from './user.routes';
import assessoresRouter from './assessores.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/assessores', assessoresRouter);

export default routes;
