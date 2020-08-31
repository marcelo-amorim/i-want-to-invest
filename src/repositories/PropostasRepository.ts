import { EntityRepository, Repository } from 'typeorm';
import Proposta from '../entities/Proposta';

@EntityRepository(Proposta)
class PropostasRepository extends Repository<Proposta> {
  public async findByAssessor(
    codigo: number,
    assessorId: number,
  ): Promise<Proposta | undefined> {
    const proposta = await this.findOne({
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
