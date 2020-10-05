import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlwares/ensureAuthenticated';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import ProviderMonthAvailabilitycontroller from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilitycontroller from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController';
import { celebrate, Segments, Joi } from 'celebrate';

const appointmentsRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilitycontroller = new ProviderMonthAvailabilitycontroller();
const providerDayAvailabilitycontroller = new ProviderDayAvailabilitycontroller();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', providersController.index);

appointmentsRouter.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerMonthAvailabilitycontroller.index
);

appointmentsRouter.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerDayAvailabilitycontroller.index
);

export default appointmentsRouter;
