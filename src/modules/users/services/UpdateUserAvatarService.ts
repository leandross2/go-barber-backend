import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequestDTO {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository') private userRepository: IUsersRepository,
    @inject('StorageProvider') private storageProvider: IStorageProvider
  ) {
    this.userRepository = userRepository;
  }

  async execute({ user_id, avatarFilename }: IRequestDTO): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authentcated user can change avatar.', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = fileName;

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
