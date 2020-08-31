import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import CreatePropostaService from '../services/CreatePropostaService';

import PropostasRepository from '../repositories/PropostasRepository';

const propostasRouter = Router();

propostasRouter.get('/:codigo', async (request, response) => {
  const { id: assessorId } = request.assessor;
  const { codigo } = request.params;
  const propostasRepository = getCustomRepository(PropostasRepository);

  const proposta = await propostasRepository.findByAssessor(
    Number(codigo),
    assessorId,
  );

  return response.json(proposta);
});

propostasRouter.post('/', async (request, response) => {
  const { id: assessorId } = request.assessor;
  const { valor, tipoPagamento, fundoId, clienteId } = request.body;

  const createProposta = new CreatePropostaService();

  const proposta = await createProposta.execute({
    valor,
    tipoPagamento,
    fundoId,
    clienteId,
    assessorId,
  });

  return response.json(proposta);
});

export default propostasRouter;
