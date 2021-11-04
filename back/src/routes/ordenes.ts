import express from 'express';
import { sendOrder } from 'controllers/ordenes';

const ordenesRouter = express.Router();

ordenesRouter.get('/', sendOrder);

export default ordenesRouter;
