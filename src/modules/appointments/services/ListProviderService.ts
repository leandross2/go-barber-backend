import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequestDTO {
  user_id: string;
}

@injectable()
export default class ListProvidersService {
  constructor(
    @inject('UsersRepository') private userRepository: IUsersRepository
  ) {
    this.userRepository = userRepository;
  }

  async execute({ user_id }: IRequestDTO): Promise<User[]> {
    const user = await this.userRepository.findAllProviders({
      except_user_id: user_id,
    });

    return user;
  }
}
