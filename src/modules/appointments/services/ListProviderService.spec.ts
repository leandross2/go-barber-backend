// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import ListProviderService from './ListProviderService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviders: ListProviderService;

describe('UpdateProfileAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProviderService(
      fakeUsersRepository,
      fakeCacheProvider
    );
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@asd.com',
      password: '123123',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'john tre',
      email: 'johntre@asd.com',
      password: '123123',
    });

    const loggedUsers = await fakeUsersRepository.create({
      name: 'john qua',
      email: 'johnqua@asd.com',
      password: '123123',
    });

    const providers = await listProviders.execute({ user_id: loggedUsers.id });

    expect(providers).toEqual([user1, user2]);
  });
});
