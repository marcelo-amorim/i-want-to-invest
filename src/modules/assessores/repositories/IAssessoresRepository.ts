import Assessor from '../infra/typeorm/entities/Assessor';
import ICreateAssessorDTO from '../dtos/ICreateAssessorDTO';

export default interface IAssessoresRepository {
  create(data: ICreateAssessorDTO): Promise<Assessor>;
  findByUserId(userId: number): Promise<Assessor | undefined>;
}
