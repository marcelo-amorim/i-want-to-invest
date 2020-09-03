import { Router } from 'express';
import { container } from 'tsyringe';

import CreateFundoService from '@modules/fundos/services/CreateFundoService';

const fundosRouter = Router();

fundosRouter.post('/', async (request, response) => {
  const { cnpj, nome, rendimentoAnual } = request.body;

  const createFundo = container.resolve(CreateFundoService);

  const fundo = await createFundo.execute({
    cnpj,
    nome,
    rendimentoAnual,
  });

  return response.json(fundo);
});

export default fundosRouter;
