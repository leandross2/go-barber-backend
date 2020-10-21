import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate, isAfter } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
// import IFindAllInMonthProviderDTO from '@modules/appointments/dtos/IfindAllInMonthFromProviderDTO';

interface IRequestDTO {
  provider_id: string;
  month: number;
  year: number;
}

type iResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
export default class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private AppointmentsRepository: IAppointmentsRepository
  ) {}

  async execute({ provider_id, month, year }: IRequestDTO): Promise<iResponse> {
    const appointments = await this.AppointmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        month,
        year,
      }
    );

    const numberOfDaysInMouth = getDaysInMonth(new Date(year, month - 1));

    const eachDateArray = Array.from(
      { length: numberOfDaysInMouth },
      (_, index) => index + 1
    );

    const availability = eachDateArray.map(day => {
      const compareDate = new Date(year, month - 1, day, 23, 59, 59);

      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });

      return {
        day,
        available:
          isAfter(compareDate, new Date()) && appointmentsInDay.length < 10,
      };
    });

    return availability;
  }
}
