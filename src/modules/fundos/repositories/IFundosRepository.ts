import Fundo from '../infra/typeorm/entities/Fundo';
import ICreateFundoDTO from '../dtos/ICreateFundoDTO';

export default interface IFundosRepository {
  create(data: ICreateFundoDTO): Promise<Fundo>;
  findById(id: number): Promise<Fundo | undefined>;
}
