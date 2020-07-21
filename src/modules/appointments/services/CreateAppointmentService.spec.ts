import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateaAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();

    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository
    );

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '123123132',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123132');
  });
  it('should not be ançe to craete two appointments on the same time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();

    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository
    );

    const apppointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmentService.execute({
      date: apppointmentDate,
      provider_id: '123123132',
    });

    expect(
      createAppointmentService.execute({
        date: apppointmentDate,
        provider_id: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
