import IAssessorRepository from '@modules/assessores/repositories/IAssessoresRepository';
import ICreateAssessorDTO from '@modules/assessores/dtos/ICreateAssessorDTO';
import { Repository, getRepository } from 'typeorm';
import Assessor from '../entities/Assessor';

class AssessoresRepository implements IAssessorRepository {
  private ormRepository: Repository<Assessor>;

  constructor() {
    this.ormRepository = getRepository(Assessor);
  }

  public async create(assessorData: ICreateAssessorDTO): Promise<Assessor> {
    const assessor = this.ormRepository.create(assessorData);

    await this.ormRepository.save(assessor);

    return assessor;
  }

  public async findByUserId(userId: number): Promise<Assessor | undefined> {
    const assessor = await this.ormRepository.findOne({
      where: {
        userId,
      },
    });

    return assessor;
  }
}

export default AssessoresRepository;
