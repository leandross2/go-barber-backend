import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
// import IFindAllInMonthProviderDTO from '@modules/appointments/dtos/IfindAllInMonthFromProviderDTO';

interface IRequestDTO {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

type iResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
export default class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private AppointmentsRepository: IAppointmentsRepository
  ) {}

  async execute({
    provider_id,
    month,
    year,
    day,
  }: IRequestDTO): Promise<iResponse> {
    const appointments = await this.AppointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        month,
        year,
        day,
      }
    );

    const hourStart = 8;

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart
    );

    const currentDate = new Date(Date.now());

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour
      );

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      };
    });
    return availability;
  }
}
