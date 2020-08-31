import { Router } from 'express';
import CalcRendimentoService from '../services/CalcRendimentoService';

const rendimentosRouter = Router();

rendimentosRouter.post('/', async (request, response) => {
  const { id: assessorId } = request.assessor;
  const { dataInicial, proposta, meses } = request.body;
  const calcRendimento = new CalcRendimentoService();

  const rendimento = await calcRendimento.execute({
    dataInicial,
    propostaId: proposta,
    meses,
    assessorId,
  });

  return response.json(rendimento);
});

export default rendimentosRouter;
