import express from 'express';
import {
  getCarrito,
  getCarritoProduct,
  saveCarritoProduct,
  deleteCarritoProduct,
} from 'controllers/carrito';
import asyncHandler from 'express-async-handler';

const carritoRouter = express.Router();

carritoRouter.get('/listar', asyncHandler(getCarrito));
carritoRouter.get('/listar/:id', asyncHandler(getCarritoProduct));
carritoRouter.post('/agregar/:id', asyncHandler(saveCarritoProduct));
carritoRouter.delete('/borrar/:id', asyncHandler(deleteCarritoProduct));

export default carritoRouter;
