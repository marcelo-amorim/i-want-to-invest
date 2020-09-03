import validaCPF from '@shared/utils/validaCPF';
import validaEmail from '@shared/utils/validaEmail';

import AppError from '@shared/errors/AppError';
import Cliente from '../infra/typeorm/entities/Cliente';
import IClientesRepository from '../repositories/IClientesRepository';

interface IRequest {
  nome: string;
  cpf: string;
  email: string;
  assessorId: number;
}

class CreateClienteService {
  constructor(private clientesRepository: IClientesRepository) {}

  public async execute({
    nome,
    cpf,
    email,
    assessorId,
  }: IRequest): Promise<Cliente> {
    if (nome.length < 3 && nome.length <= 200) {
      throw new AppError('Nome do fundo deve possuir de 3 a 200 caractéres.');
    }

    const formattedCPF = cpf.replace(/[^\d]+/g, '');
    if (!validaCPF(formattedCPF)) {
      throw new AppError('CPF inválido.');
    }

    if (!validaEmail(email)) {
      throw new AppError('E-mail inválido.');
    }

    const checkCPF = await this.clientesRepository.findByCpf(cpf);

    if (checkCPF) {
      throw new AppError('CPF já cadastrado.', 409);
    }

    const checkEmail = await this.clientesRepository.findByEmail(email);

    if (checkEmail) {
      throw new AppError('Email já cadastrado.', 409);
    }

    const cliente = await this.clientesRepository.create({
      nome,
      cpf: formattedCPF,
      email,
      assessorId,
    });

    return cliente;
  }
}

export default CreateClienteService;
