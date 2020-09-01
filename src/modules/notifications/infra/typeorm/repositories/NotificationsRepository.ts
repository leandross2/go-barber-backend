import { getRepository, Repository, Raw } from 'typeorm';
// import { getMonth, getYear } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmetntDTO from '@modules/appointments/dtos/ICreateAppointmentDto';
import IfindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IfindAllInMonthFromProviderDTO';
import IfindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class ApointmentsRepositories implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async create({
    date,
    provider_id,
    user_id,
  }: ICreateAppointmetntDTO): Promise<Appointment> {}
}

export default ApointmentsRepositories;
