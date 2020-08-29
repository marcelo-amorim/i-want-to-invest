import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import validaCNPJ from '../utils/validaCNPJ';

import Fundo from '../entities/Fundo';

interface IRequest {
  cnpj: string;
  nome: string;
  rendimentoAnual: number;
}

class CreateFundoService {
  public async execute({
    cnpj,
    nome,
    rendimentoAnual,
  }: IRequest): Promise<Fundo> {
    if (nome.length < 3 && nome.length <= 200) {
      throw new AppError('Nome do fundo deve possuir de 3 a 200 caractéres.');
    }

    if (!validaCNPJ(cnpj)) {
      throw new AppError('CNPJ inválido.');
    }

    if (rendimentoAnual < 0) {
      throw new AppError('Rendimento atual deve ser maior que zero.');
    }

    const fundoRepository = getRepository(Fundo);

    const fundo = fundoRepository.create({
      nome,
      cnpj,
      rendimentoAnual,
    });

    await fundoRepository.save(fundo);

    return fundo;
  }
}

export default CreateFundoService;
