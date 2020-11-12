import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequestDTO {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository') private userRepository: IUsersRepository,
    @inject('HashProvider') private hashProvider: IHashProvider
  ) {
    this.userRepository = userRepository;
  }

  async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: IRequestDTO): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('user not found');
    }
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists && userExists.id !== user_id) {
      throw new AppError('email already in use');
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError(
        'you need to inform the old password to set new password'
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password
      );

      if (!checkOldPassword) {
        throw new AppError('old password does not match ');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.userRepository.save(user);
  }
}

export default UpdateProfileService;
