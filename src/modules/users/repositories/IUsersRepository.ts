import User from '../infra/typeorm/entities/User';
import ICreateuserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  create(data: ICreateuserDTO): Promise<User>;
  findById(id: number): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
}
