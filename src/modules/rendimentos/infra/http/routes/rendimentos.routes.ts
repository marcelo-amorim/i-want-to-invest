import { Router } from 'express';

import RendimentosController from '../controllers/RendimentosController';

const rendimentosRouter = Router();
const rendimentosController = new RendimentosController();

rendimentosRouter.post('/', rendimentosController.create);

export default rendimentosRouter;
