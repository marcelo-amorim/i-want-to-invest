import Proposta from '../infra/typeorm/entities/Proposta';
import ICreatePropostaDTO from '../dtos/ICreatePropostaDTO';

export default interface IPropostasRepository {
  create(data: ICreatePropostaDTO): Promise<Proposta>;
  findByAssessor(
    codigo: number,
    assessorId: number,
  ): Promise<Proposta | undefined>;
}
