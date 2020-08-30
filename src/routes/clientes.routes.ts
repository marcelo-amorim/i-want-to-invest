import { Router } from 'express';
import FindClientes from '../services/FindClientes';
import CreateCliente from '../services/CreateCliente';

const clientesRouter = Router();

clientesRouter.get('/:id?', async (request, response) => {
  const clienteId = Number(request.params.id);
  const { id: assessorId } = request.assessor;

  const findClientes = new FindClientes();
  const clientes = await findClientes.execute({ id: clienteId, assessorId });
  return response.json(clientes);
});

clientesRouter.post('/', async (request, response) => {
  const { id: assessorId } = request.assessor;
  const { nome, cpf, email } = request.body;

  const createCliente = new CreateCliente();

  const cliente = await createCliente.execute({ nome, cpf, email, assessorId });

  return response.json(cliente);
});

export default clientesRouter;
