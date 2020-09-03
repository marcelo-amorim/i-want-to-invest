import { Router } from 'express';

import PropostasController from '../controllers/PropostasController';

const propostasRouter = Router();
const propostasController = new PropostasController();

propostasRouter.get('/:codigo', propostasController.find);

propostasRouter.post('/', propostasController.create);

export default propostasRouter;
