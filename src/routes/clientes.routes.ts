import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import CreateClienteService from '../services/CreateClienteService';

import ClientesRepository from '../repositories/ClientesRepository';

const clientesRouter = Router();

clientesRouter.get('/:id?', async (request, response) => {
  const clienteId = Number(request.params.id);
  const { id: assessorId } = request.assessor;

  const clientesRepository = getCustomRepository(ClientesRepository);

  if (clienteId) {
    const cliente = await clientesRepository.findOneByAssessor(
      clienteId,
      assessorId,
    );
    return response.json(cliente);
  }

  const clientes = await clientesRepository.getAllClientesByAssessor(
    assessorId,
  );

  return response.json(clientes);
});

clientesRouter.post('/', async (request, response) => {
  const { id: assessorId } = request.assessor;
  const { nome, cpf, email } = request.body;

  const createCliente = new CreateClienteService();

  const cliente = await createCliente.execute({ nome, cpf, email, assessorId });

  return response.json(cliente);
});

export default clientesRouter;
