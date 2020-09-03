import { Router } from 'express';
import { container } from 'tsyringe';

import PropostasRepository from '@modules/propostas/infra/typeorm/repositories/PropostasRepository';
import CreatePropostaService from '@modules/propostas/services/CreatePropostaService';

const propostasRouter = Router();

propostasRouter.get('/:codigo', async (request, response) => {
  const propostasRepository = container.resolve(PropostasRepository);
  const { id: assessorId } = request.assessor;
  const { codigo } = request.params;

  const proposta = await propostasRepository.findByAssessor(
    Number(codigo),
    assessorId,
  );

  return response.json(proposta);
});

propostasRouter.post('/', async (request, response) => {
  const { id: assessorId } = request.assessor;
  const { valor, tipoPagamento, fundoId, clienteId } = request.body;

  const createProposta = container.resolve(CreatePropostaService);

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
