import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/fakeHashProvider';
import FakeUsersRepository from '../repositories/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateaUser', () => {
  it('should be able to create a new user', async () => {
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

    expect(user).toHaveProperty('id');
  });
  it('should not be able to create a new user with same email frmo another', async () => {
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

    expect(
      createUserService.execute({
        name: 'manolo',
        email: 'ts@ts.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
