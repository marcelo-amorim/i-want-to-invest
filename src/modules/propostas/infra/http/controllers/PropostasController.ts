import { Request, Response } from 'express';
import { container } from 'tsyringe';

import PropostasRepository from '@modules/propostas/infra/typeorm/repositories/PropostasRepository';
import CreatePropostaService from '@modules/propostas/services/CreatePropostaService';

class PropostasController {
  public async find(request: Request, response: Response): Promise<Response> {
    const propostasRepository = container.resolve(PropostasRepository);
    const { id: assessorId } = request.assessor;
    const { codigo } = request.params;

    const proposta = await propostasRepository.findByAssessor(
      Number(codigo),
      assessorId,
    );

    return response.json(proposta);
  }

  public async create(request: Request, response: Response): Promise<Response> {
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
  }
}

export default PropostasController;
