import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateFundoService from '@modules/fundos/services/CreateFundoService';

class FundosControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const { cnpj, nome, rendimentoAnual } = request.body;

    const createFundo = container.resolve(CreateFundoService);

    const fundo = await createFundo.execute({
      cnpj,
      nome,
      rendimentoAnual,
    });

    return response.json(fundo);
  }
}

export default FundosControllers;
