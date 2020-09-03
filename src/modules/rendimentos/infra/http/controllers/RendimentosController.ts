import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CalcRendimentoService from '@modules/rendimentos/services/CalcRendimentoService';

class RendimentosController {
  public async create(request: Request, response: Response): Promise<Response> {
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
  }
}

export default RendimentosController;
