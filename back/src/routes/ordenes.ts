import express from 'express';
import {
  createOrder,
  getOrder,
  getOrders,
  completeOrder,
} from 'controllers/ordenes';
import asyncHandler from 'express-async-handler';

const ordenesRouter = express.Router();

ordenesRouter.get('/', asyncHandler(getOrders));
ordenesRouter.get('/:id', asyncHandler(getOrder));
ordenesRouter.post('/', asyncHandler(createOrder));
ordenesRouter.put('/complete', asyncHandler(completeOrder));

export default ordenesRouter;
