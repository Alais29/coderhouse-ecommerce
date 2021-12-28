import express from 'express';
import asyncHandler from 'express-async-handler';
import {
  createOrder,
  getOrder,
  getOrders,
  completeOrder,
  getAllOrders,
} from 'controllers/ordenes';
import { isAdmin } from 'middlewares/isAdmin';

const ordenesRouter = express.Router();

ordenesRouter.get('/', asyncHandler(getOrders));
ordenesRouter.get('/all-orders', isAdmin, asyncHandler(getAllOrders));
ordenesRouter.get('/:id', asyncHandler(getOrder));
ordenesRouter.post('/', asyncHandler(createOrder));
ordenesRouter.put('/complete', isAdmin, asyncHandler(completeOrder));

export default ordenesRouter;
