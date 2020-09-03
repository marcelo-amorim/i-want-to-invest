import { Router } from 'express';

import sessionRouter from '@modules/users/infra/http/routes/session.routes';
import fundosRouter from '@modules/fundos/infra/http/routes/fundos.routes';
import usersRouter from '@modules/users/infra/http/routes/user.routes';
import assessoresRouter from '@modules/assessores/infra/http/routes/assessores.routes';
import clientesRouter from '@modules/clientes/infra/http/routes/clientes.routes';
import propostasRouter from '@modules/propostas/infra/http/routes/propostas.routes';
import rendimentosRouter from '@modules/rendimentos/infra/http/routes/rendimentos.routes';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const routes = Router();

routes.use('/session', sessionRouter);
routes.use('/fundos', fundosRouter);
routes.use('/users', usersRouter);
routes.use('/assessores', assessoresRouter);
routes.use('/clientes', ensureAuthenticated, clientesRouter);
routes.use('/propostas', ensureAuthenticated, propostasRouter);
routes.use('/rendimentos', ensureAuthenticated, rendimentosRouter);

export default routes;
