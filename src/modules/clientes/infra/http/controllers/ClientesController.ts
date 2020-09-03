import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ClientesRepository from '@modules/clientes/infra/typeorm/repositories/ClientesRepository';
import CreateClienteService from '@modules/clientes/services/CreateClienteService';

class ClientesController {
  public async find(request: Request, response: Response): Promise<Response> {
    const clientesRepository = new ClientesRepository();
    const clienteId = Number(request.params.id);
    const { id: assessorId } = request.assessor;

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
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { id: assessorId } = request.assessor;
    const { nome, cpf, email } = request.body;

    const createCliente = container.resolve(CreateClienteService);

    const cliente = await createCliente.execute({
      nome,
      cpf,
      email,
      assessorId,
    });

    return response.json(cliente);
  }
}

export default ClientesController;
