import { Repository, getRepository } from 'typeorm';
import ICreatePropostaDTO from '@modules/propostas/dtos/ICreatePropostaDTO';
import Proposta from '../entities/Proposta';

class PropostasRepository {
  private ormRepository: Repository<Proposta>;

  constructor() {
    this.ormRepository = getRepository(Proposta);
  }

  public async create(propostaData: ICreatePropostaDTO): Promise<Proposta> {
    const proposta = this.ormRepository.create(propostaData);

    await this.ormRepository.save(proposta);

    return proposta;
  }

  public async findByAssessor(
    codigo: number,
    assessorId: number,
  ): Promise<Proposta | undefined> {
    const proposta = await this.ormRepository.findOne({
      where: {
        codigo,
      },
    });

    if (proposta) {
      if (proposta.cliente.assessorId !== assessorId) {
        return undefined;
      }
    }

    return proposta;
  }
}

export default PropostasRepository;
