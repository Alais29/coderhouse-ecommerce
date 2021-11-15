import express from 'express';
import { isAdmin } from 'middlewares/isAdmin';
import {
  deleteProducto,
  getProducto,
  getProductos,
  saveProducto,
  updateProducto,
} from '../controllers/producto';
import asyncHandler from 'express-async-handler';

const productoRouter = express.Router();

productoRouter.get('/', asyncHandler(getProductos));
productoRouter.get('/:id', asyncHandler(getProducto));
productoRouter.post('/', isAdmin, asyncHandler(saveProducto));
productoRouter.put('/:id', isAdmin, asyncHandler(updateProducto));
productoRouter.delete('/:id', isAdmin, asyncHandler(deleteProducto));

export default productoRouter;
