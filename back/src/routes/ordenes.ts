import express from 'express';
import { createOrder } from 'controllers/ordenes';
import asyncHandler from 'express-async-handler';

const ordenesRouter = express.Router();

ordenesRouter.post('/', asyncHandler(createOrder));

export default ordenesRouter;
