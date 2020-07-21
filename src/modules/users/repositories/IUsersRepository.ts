import User from '@modules/users/infra/typeorm/entities/User';

import ICreateUserDTO from '@modules/users/dtos/IcreateUserDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(user: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
