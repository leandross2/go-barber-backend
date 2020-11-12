import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { classToClass } from 'class-transformer';

interface IRequestDTO {
  user_id: string;
}

@injectable()
export default class ListProvidersService {
  constructor(
    @inject('UsersRepository') private userRepository: IUsersRepository,

    @inject('CacheProvider')
    private CacheProvider: ICacheProvider
  ) {
    this.userRepository = userRepository;
  }

  async execute({ user_id }: IRequestDTO): Promise<User[]> {
    let users = await this.CacheProvider.recover<User[]>(
      `providers-list:${user_id}`
    );

    if (!users) {
      users = await this.userRepository.findAllProviders({
        except_user_id: user_id,
      });

      await this.CacheProvider.save(
        `providers-list:${user_id}`,
        classToClass(users)
      );
    }

    return users;
  }
}
