import { Router } from 'express';
import { container } from 'tsyringe';

import CalcRendimentoService from '@modules/rendimentos/services/CalcRendimentoService';

const rendimentosRouter = Router();

rendimentosRouter.post('/', async (request, response) => {
  const { id: assessorId } = request.assessor;
  const { dataInicial, proposta, meses } = request.body;
  const calcRendimento = container.resolve(CalcRendimentoService);

  const rendimento = await calcRendimento.execute({
    dataInicial,
    propostaId: proposta,
    meses,
    assessorId,
  });

  return response.json(rendimento);
});

export default rendimentosRouter;
