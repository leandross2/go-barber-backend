// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import FakeHashProvider from '../providers/HashProvider/fakes/fakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let authenticateUserService: AuthenticateUserService;
let createUserService: CreateUserService;
describe('CreateaUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider
    );
  });

  it('should be able authenticate', async () => {
    const user = await createUserService.execute({
      name: 'manolo',
      email: 'ts@ts.com',
      password: '123123',
    });

    const response = await authenticateUserService.execute({
      email: 'ts@ts.com',
      password: '123123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able authenticate with non existing user', async () => {
    expect(
      authenticateUserService.execute({
        email: 'ts@ts.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able authenticate with password invalid', async () => {
    await createUserService.execute({
      name: 'manolo',
      email: 'ts@ts.com',
      password: '123123',
    });

    expect(
      authenticateUserService.execute({
        email: 'ts@ts.com',
        password: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
