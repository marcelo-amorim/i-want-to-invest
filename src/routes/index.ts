import { Router } from 'express';

import sessionRouter from './session.routes';
import fundosRouter from './fundos.routes';
import userRouter from './user.routes';
import assessoresRouter from './assessores.routes';
import clientesRouter from './clientes.routes';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const routes = Router();

routes.use('/session', sessionRouter);
routes.use('/fundos', fundosRouter);
routes.use('/users', userRouter);
routes.use('/assessores', assessoresRouter);
routes.use('/clientes', ensureAuthenticated, clientesRouter);
// routes.use('/propostas', ensureAuthenticated)

export default routes;
