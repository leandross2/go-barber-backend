// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/fakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('CreateaUser', () => {
  it('should be able authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUserService.execute({
      name: 'manolo',
      email: 'ts@ts.com',
      password: '123123',
    });

    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const response = await authenticateUserService.execute({
      email: 'ts@ts.com',
      password: '123123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    expect(
      authenticateUserService.execute({
        email: 'ts@ts.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able authenticate with password invalid', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    await createUserService.execute({
      name: 'manolo',
      email: 'ts@ts.com',
      password: '123123',
    });

    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    expect(
      authenticateUserService.execute({
        email: 'ts@ts.com',
        password: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
