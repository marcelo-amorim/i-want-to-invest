import AppError from '@shared/errors/AppError';

import validaCNPJ from '@shared/utils/validaCNPJ';

import Fundo from '@modules/fundos/infra/typeorm/entities/Fundo';
import IFundosRepository from '../repositories/IFundosRepository';

interface IRequest {
  cnpj: string;
  nome: string;
  rendimentoAnual: number;
}

class CreateFundoService {
  constructor(private fundosRepository: IFundosRepository) {}

  public async execute({
    cnpj,
    nome,
    rendimentoAnual,
  }: IRequest): Promise<Fundo> {
    if (nome.length < 3 && nome.length <= 200) {
      throw new AppError('Nome do fundo deve possuir de 3 a 200 caractéres.');
    }

    const formattedCNPJ = cnpj.replace(/[^\d]+/g, '');
    if (!validaCNPJ(formattedCNPJ)) {
      throw new AppError('CNPJ inválido.');
    }

    if (rendimentoAnual < 0) {
      throw new AppError('Rendimento atual deve ser maior que zero.');
    }

    const fundo = await this.fundosRepository.create({
      nome,
      cnpj,
      rendimentoAnual,
    });

    return fundo;
  }
}

export default CreateFundoService;
