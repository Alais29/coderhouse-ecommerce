import express from 'express';
import asyncHandler from 'express-async-handler';
import {
  createOrder,
  getOrder,
  getOrders,
  completeOrder,
} from 'controllers/ordenes';
import { isAdmin } from 'middlewares/isAdmin';

const ordenesRouter = express.Router();

ordenesRouter.get('/', asyncHandler(getOrders));
ordenesRouter.get('/:id', asyncHandler(getOrder));
ordenesRouter.post('/', asyncHandler(createOrder));
ordenesRouter.put('/complete', isAdmin, asyncHandler(completeOrder));

export default ordenesRouter;
