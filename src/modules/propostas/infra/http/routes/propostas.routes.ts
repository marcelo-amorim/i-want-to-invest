import { Router } from 'express';

import CreatePropostaService from '@modules/propostas/services/CreatePropostaService';

import PropostasRepository from '@modules/propostas/infra/typeorm/repositories/PropostasRepository';
import FundosRepository from '@modules/fundos/infra/typeorm/repositories/FundosRepository';
import ClientesRepository from '@modules/clientes/infra/typeorm/repositories/ClientesRepository';

const propostasRouter = Router();

propostasRouter.get('/:codigo', async (request, response) => {
  const propostasRepository = new PropostasRepository();
  const { id: assessorId } = request.assessor;
  const { codigo } = request.params;

  const proposta = await propostasRepository.findByAssessor(
    Number(codigo),
    assessorId,
  );

  return response.json(proposta);
});

propostasRouter.post('/', async (request, response) => {
  const propostasRepository = new PropostasRepository();
  const fundosRepository = new FundosRepository();
  const clientesRepository = new ClientesRepository();

  const { id: assessorId } = request.assessor;
  const { valor, tipoPagamento, fundoId, clienteId } = request.body;

  const createProposta = new CreatePropostaService(
    fundosRepository,
    clientesRepository,
    propostasRepository,
  );

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
