import { Router } from 'express';

import fundosRouter from './fundos.routes';
import userRouter from './user.routes';
import assessoresRouter from './assessores.routes';

const routes = Router();

routes.use('/fundos', fundosRouter);
routes.use('/users', userRouter);
routes.use('/assessores', assessoresRouter);

export default routes;
