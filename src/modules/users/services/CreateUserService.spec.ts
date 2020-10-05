import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeHashProvider from '../providers/HashProvider/fakes/fakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakecacheProvider: FakeCacheProvider;
let createUserService: CreateUserService;

describe('CreateaUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakecacheProvider
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'manolo',
      email: 'ts@ts.com',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email frmo another', async () => {
    await createUserService.execute({
      name: 'manolo',
      email: 'ts@ts.com',
      password: '123123',
    });

    await expect(
      createUserService.execute({
        name: 'manolo',
        email: 'ts@ts.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
