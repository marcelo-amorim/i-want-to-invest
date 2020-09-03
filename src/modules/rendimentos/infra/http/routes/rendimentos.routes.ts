import { Router } from 'express';
import CalcRendimentoService from '@modules/rendimentos/services/CalcRendimentoService';

import PropostasRepository from '@modules/propostas/infra/typeorm/repositories/PropostasRepository';

const rendimentosRouter = Router();

rendimentosRouter.post('/', async (request, response) => {
  const propostasRepository = new PropostasRepository();
  const { id: assessorId } = request.assessor;
  const { dataInicial, proposta, meses } = request.body;
  const calcRendimento = new CalcRendimentoService(propostasRepository);

  const rendimento = await calcRendimento.execute({
    dataInicial,
    propostaId: proposta,
    meses,
    assessorId,
  });

  return response.json(rendimento);
});

export default rendimentosRouter;
