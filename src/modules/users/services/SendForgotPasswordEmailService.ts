import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
// import User from '@modules/users/infra/typeorm/entities/User';

interface IRequestDTO {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository') private userRepository: IUsersRepository
  ) {
    this.userRepository = userRepository;
  }

  public async execute(data: IRequestDTO): Promise<Void> {}
}

export default SendForgotPasswordEmailService;
