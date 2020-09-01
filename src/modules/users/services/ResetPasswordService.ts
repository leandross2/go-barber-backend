import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequestDTO {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository') private userRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private UserTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private HashProvider: IHashProvider
  ) {
    this.userRepository = userRepository;
  }

  public async execute({ token, password }: IRequestDTO): Promise<void> {
    const userToken = await this.UserTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('user token does not exists');
    }

    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token Expired');
    }

    user.password = await this.HashProvider.generateHash(password);

    await this.userRepository.save(user);
  }
}

export default ResetPasswordService;
