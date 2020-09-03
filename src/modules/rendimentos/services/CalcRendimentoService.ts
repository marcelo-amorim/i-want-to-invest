import AppError from '@shared/errors/AppError';
import IPropostasRepository from '@modules/propostas/repositories/IPropostasRepository';

interface IRequest {
  dataInicial: string;
  propostaId: number;
  meses: number;
  assessorId: number;
}

interface IRendimento {
  data: Date;
  proposta: number;
  valor: number;
}

class CalcRendimentoService {
  constructor(private propostasRepository: IPropostasRepository) {}

  public async execute({
    dataInicial,
    propostaId,
    meses,
    assessorId,
  }: IRequest): Promise<IRendimento[]> {
    if (meses < 1) {
      throw new AppError('Quantidade de meses deve ser maior que 0.', 404);
    }
    const proposta = await this.propostasRepository.findByAssessor(
      propostaId,
      assessorId,
    );

    if (!proposta) {
      throw new AppError('Proposta não encontrada.', 404);
    }

    const startDate = new Date(dataInicial);
    const { valor: valorAporte, fundo } = proposta;
    const { rendimentoAnual } = fundo;
    const rendimentoMensal = rendimentoAnual / 12 / 100;

    let montante = valorAporte;
    const rendimentos = Array.from({ length: meses }, (_, index) => {
      const newDate = new Date(startDate);
      const qtdMeses = index + 1;
      newDate.setMonth(startDate.getMonth() + qtdMeses);
      montante += montante * rendimentoMensal;
      return {
        data: newDate,
        proposta: propostaId,
        valor: Number(montante.toFixed(2)),
      };
    });

    return rendimentos;
  }
}

export default CalcRendimentoService;
