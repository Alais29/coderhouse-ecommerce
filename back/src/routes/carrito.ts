import express from 'express';
import {
  getCarrito,
  getCarritoProduct,
  saveCarritoProduct,
  editCarritoProduct,
  deleteCarritoProduct,
  deleteCarritoAllProducts,
} from 'controllers/carrito';
import asyncHandler from 'express-async-handler';

const carritoRouter = express.Router();

carritoRouter.get('/', asyncHandler(getCarrito));
carritoRouter.get('/:id', asyncHandler(getCarritoProduct));
carritoRouter.post('/:id', asyncHandler(saveCarritoProduct));
carritoRouter.put('/', asyncHandler(editCarritoProduct));
carritoRouter.delete('/', asyncHandler(deleteCarritoAllProducts));
carritoRouter.delete('/:id', asyncHandler(deleteCarritoProduct));

export default carritoRouter;
