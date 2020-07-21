import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmetntDTO from '@modules/appointments/dtos/ICreateAppointmentDto';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class ApointmentsRepositories implements IAppointmentsRepository {
  private appointment: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointment.find(appointment =>
      isEqual(appointment.date, date)
    );

    return findAppointment;
  }

  public async create({
    date,
    provider_id,
  }: ICreateAppointmetntDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });

    this.appointment.push(appointment);

    return appointment;
  }
}

export default ApointmentsRepositories;
