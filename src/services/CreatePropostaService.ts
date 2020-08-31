import { getRepository } from 'typeorm';
import Proposta from '../entities/Proposta';
import Fundo from '../entities/Fundo';
import Cliente from '../entities/Cliente';
import AppError from '../errors/AppError';

interface IRequest {
  valor: number;
  tipoPagamento: 'boleto' | 'debito';
  fundoId: number;
  clienteId: number;
  assessorId: number;
}

class CreatePropostaService {
  public async execute({
    valor,
    tipoPagamento,
    fundoId,
    clienteId,
    assessorId,
  }: IRequest): Promise<Proposta> {
    const fundosRepository = getRepository(Fundo);
    const clientesRepository = getRepository(Cliente);
    const propostasRepository = getRepository(Proposta);

    if (valor < 0) {
      throw new AppError('Valor de aporte deve ser maior que 0.');
    }

    if (tipoPagamento !== 'boleto' && tipoPagamento !== 'debito') {
      throw new AppError('Tipo de pagamento não permitido.');
    }

    const fundo = await fundosRepository.findOne({
      where: {
        id: fundoId,
      },
    });

    if (!fundo) {
      throw new AppError('Fundo não existente.', 404);
    }

    const cliente = await clientesRepository.findOne({
      where: {
        id: clienteId,
        assessorId,
      },
    });

    if (!cliente) {
      throw new AppError('Cliente não encontrado.', 404);
    }

    const proposta = propostasRepository.create({
      valor,
      fundoId: fundo.id,
      clienteId: cliente.id,
      tipoPagamento,
    });

    await propostasRepository.save(proposta);

    return proposta;
  }
}

export default CreatePropostaService;
