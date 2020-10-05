// import { create } from 'handlebars';

import ICreateNotifcationsDTO from '../dtos/ICreateNotificationsDTO';

import Notification from '../infra/typeorm/schemas/Notification';

export default interface INotificationsRepository {
  create(data: ICreateNotifcationsDTO): Promise<Notification>;
}
