import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlwares/ensureAuthenticated';

import ProfileControler from '@modules/users/infra/http/controllers/ProfileControler';

const profileRouter = Router();

profileRouter.use(ensureAuthenticated);

const profileControler = new ProfileControler();

profileRouter.get('/', profileControler.show);
profileRouter.put('/', profileControler.update);

export default profileRouter;
