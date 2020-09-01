import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';
// import IFindAllInMonthProviderDTO from '@modules/appointments/dtos/IfindAllInMonthFromProviderDTO';

interface IRequestDTO {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

@injectable()
export default class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private AppointmentsRepository: IAppointmentsRepository
  ) {}

  async execute({
    provider_id,
    month,
    year,
    day,
  }: IRequestDTO): Promise<Appointment[]> {
    const appointments = await this.AppointmentsRepository.findAllInDayFromProvider(
      { provider_id, month, year, day }
    );

    return appointments;
  }
}
