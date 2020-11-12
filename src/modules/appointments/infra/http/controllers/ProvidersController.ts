import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListProviderService from '@modules/appointments/services/ListProviderService';

export default class AppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const ListProvider = container.resolve(ListProviderService);

    const providers = await ListProvider.execute({ user_id });

    return response.json(classToClass(providers));
  }
}
