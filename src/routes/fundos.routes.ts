import { Router } from 'express';
import CreateFundoService from '../services/CreateFundoService';

const fundosRouter = Router();

fundosRouter.post('/', async (request, response) => {
  const { cnpj, nome, rendimentoAnual } = request.body;

  const createFundo = new CreateFundoService();

  const fundo = await createFundo.execute({
    cnpj,
    nome,
    rendimentoAnual,
  });

  return response.json(fundo);
});

export default fundosRouter;
