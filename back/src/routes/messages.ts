import asyncHandler from 'express-async-handler';
import { Router } from 'express';

import { getMessages } from 'controllers/messages';

const chatRouter = Router();

chatRouter.get('/:userEmail', asyncHandler(getMessages));

export default chatRouter;
