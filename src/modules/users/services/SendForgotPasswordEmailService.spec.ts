import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgorPasswordEmail', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository
    );

    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'ts@ts.com',
      password: '123123',
    });

    await sendForgotPasswordEmail.execute({
      email: 'ts@ts.com',
    });

    expect(user).toHaveProperty('id');
  });
});
