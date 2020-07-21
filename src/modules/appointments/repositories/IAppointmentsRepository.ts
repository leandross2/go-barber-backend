import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import ICreateAppointmetntDTO from '@modules/appointments/dtos/ICreateAppointmentDto';

export default interface IAppointmentRepository {
  create(data: ICreateAppointmetntDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
