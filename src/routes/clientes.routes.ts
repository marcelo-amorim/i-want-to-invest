import { Router } from 'express';
import FindClientesService from '../services/FindClienteService';
import CreateClienteService from '../services/CreateClienteService';

const clientesRouter = Router();

clientesRouter.get('/:id?', async (request, response) => {
  const clienteId = Number(request.params.id);
  const { id: assessorId } = request.assessor;

  const findClientes = new FindClientesService();
  const clientes = await findClientes.execute({ id: clienteId, assessorId });
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
