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

productoRouter.get('/listar', asyncHandler(getProductos));
productoRouter.get('/listar/:id', asyncHandler(getProducto));
productoRouter.post('/guardar', isAdmin, asyncHandler(saveProducto));
productoRouter.put('/actualizar/:id', isAdmin, asyncHandler(updateProducto));
productoRouter.delete('/borrar/:id', isAdmin, asyncHandler(deleteProducto));

export default productoRouter;
