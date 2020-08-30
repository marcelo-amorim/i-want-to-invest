import { getRepository } from 'typeorm';
import Cliente from '../entities/Cliente';

import validaCPF from '../utils/validaCPF';
import validaEmail from '../utils/validaEmail';

import AppError from '../errors/AppError';

interface IRequest {
  nome: string;
  cpf: string;
  email: string;
  assessorId: number;
}

class CreateCliente {
  public async execute({
    nome,
    cpf,
    email,
    assessorId,
  }: IRequest): Promise<Cliente> {
    const clientesRepository = getRepository(Cliente);

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

    const checkCPF = await clientesRepository.findOne({
      where: {
        cpf,
      },
    });

    if (checkCPF) {
      throw new AppError('CPF já cadastrado.', 409);
    }

    const checkEmail = await clientesRepository.findOne({
      where: {
        email,
      },
    });

    if (checkEmail) {
      throw new AppError('Email já cadastrado.', 409);
    }

    const cliente = clientesRepository.create({
      nome,
      cpf: formattedCPF,
      email,
      assessorId,
    });

    await clientesRepository.save(cliente);

    return cliente;
  }
}

export default CreateCliente;
