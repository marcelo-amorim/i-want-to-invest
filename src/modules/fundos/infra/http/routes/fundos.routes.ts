import { Router } from 'express';

import FundosController from '../controllers/FundosControllers';

const fundosRouter = Router();
const fundosController = new FundosController();

fundosRouter.post('/', fundosController.create);

export default fundosRouter;
