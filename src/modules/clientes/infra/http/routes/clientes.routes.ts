import { Router } from 'express';

import ClientesController from '../controllers/ClientesController';

const clientesRouter = Router();
const clientesController = new ClientesController();

clientesRouter.get('/:id?', clientesController.find);

clientesRouter.post('/', clientesController.create);

export default clientesRouter;
