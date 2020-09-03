import { Router } from 'express';

import AssessoresController from '../controllers/AssessoresController';

const assessoresRouter = Router();
const assessoresController = new AssessoresController();

assessoresRouter.post('/', assessoresController.create);

export default assessoresRouter;
