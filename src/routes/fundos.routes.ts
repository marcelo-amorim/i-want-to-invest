import { Router } from 'express';
import CreateFundoService from '../services/CreateFundoService';

const fundosRouter = Router();

fundosRouter.post('/', async (request, response) => {
  try {
    const { cnpj, nome, rendimentoAnual } = request.body;

    const createFundo = new CreateFundoService();

    const fundo = await createFundo.execute({
      cnpj,
      nome,
      rendimentoAnual,
    });

    return response.json(fundo);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default fundosRouter;
