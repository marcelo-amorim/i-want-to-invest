import { Router } from 'express';
import CreateFundoService from '@modules/fundos/services/CreateFundoService';

import FundosRepository from '@modules/fundos/infra/typeorm/repositories/FundosRepository';

const fundosRouter = Router();

fundosRouter.post('/', async (request, response) => {
  const fundosRepository = new FundosRepository();
  const { cnpj, nome, rendimentoAnual } = request.body;

  const createFundo = new CreateFundoService(fundosRepository);

  const fundo = await createFundo.execute({
    cnpj,
    nome,
    rendimentoAnual,
  });

  return response.json(fundo);
});

export default fundosRouter;
