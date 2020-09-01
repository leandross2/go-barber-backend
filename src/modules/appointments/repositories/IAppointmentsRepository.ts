import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import ICreateAppointmetntDTO from '@modules/appointments/dtos/ICreateAppointmentDto';
import IFindAllInMonthProviderDTO from '../dtos/IfindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '../dtos/IFindAllInDayFromProviderDTO';

export default interface IAppointmentRepository {
  create(data: ICreateAppointmetntDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
    data: IFindAllInMonthProviderDTO
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    data: IFindAllInDayFromProviderDTO
  ): Promise<Appointment[]>;
}
