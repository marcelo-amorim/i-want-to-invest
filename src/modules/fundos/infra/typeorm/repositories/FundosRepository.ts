import { Repository, getRepository } from 'typeorm';
import IFundosRepository from '@modules/fundos/repositories/IFundosRepository';
import ICreateFundoDTO from '@modules/fundos/dtos/ICreateFundoDTO';
import Fundo from '../entities/Fundo';

class FundosRepository implements IFundosRepository {
  private ormRepository: Repository<Fundo>;

  constructor() {
    this.ormRepository = getRepository(Fundo);
  }

  public async create(fundoData: ICreateFundoDTO): Promise<Fundo> {
    const fundo = this.ormRepository.create(fundoData);

    await this.ormRepository.save(fundo);

    return fundo;
  }

  public async findById(id: number): Promise<Fundo | undefined> {
    const fundo = await this.ormRepository.findOne(id);

    return fundo;
  }
}

export default FundosRepository;
