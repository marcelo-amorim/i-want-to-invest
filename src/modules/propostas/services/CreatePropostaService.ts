import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Proposta from '@modules/propostas/infra/typeorm/entities/Proposta';

import IFundosRepository from '@modules/fundos/repositories/IFundosRepository';
import IClientesRepository from '@modules/clientes/repositories/IClientesRepository';
import IPropostasRepository from '../repositories/IPropostasRepository';

interface IRequest {
  valor: number;
  tipoPagamento: 'boleto' | 'debito';
  fundoId: number;
  clienteId: number;
  assessorId: number;
}

@injectable()
class CreatePropostaService {
  constructor(
    @inject('FundosRepository')
    private fundosRepository: IFundosRepository,

    @inject('ClientesRepository')
    private clientesRepository: IClientesRepository,

    @inject('PropostasRepository')
    private propostasRepository: IPropostasRepository,
  ) {}

  public async execute({
    valor,
    tipoPagamento,
    fundoId,
    clienteId,
    assessorId,
  }: IRequest): Promise<Proposta> {
    if (valor < 0) {
      throw new AppError('Valor de aporte deve ser maior que 0.');
    }

    if (tipoPagamento !== 'boleto' && tipoPagamento !== 'debito') {
      throw new AppError('Tipo de pagamento não permitido.');
    }

    const fundo = await this.fundosRepository.findById(fundoId);

    if (!fundo) {
      throw new AppError('Fundo não existente.', 404);
    }

    const cliente = await this.clientesRepository.findOneByAssessor(
      clienteId,
      assessorId,
    );

    if (!cliente) {
      throw new AppError('Cliente não encontrado.', 404);
    }

    const proposta = await this.propostasRepository.create({
      valor,
      fundoId: fundo.id,
      clienteId: cliente.id,
      tipoPagamento,
    });

    return proposta;
  }
}

export default CreatePropostaService;
