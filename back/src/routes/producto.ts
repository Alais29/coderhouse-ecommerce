import express from 'express';
import { isAdmin } from '/middlewares/isAdmin';
import {
  deleteProducto,
  getProducto,
  getProductos,
  saveProducto,
  updateProducto,
} from '/controllers/producto';

const productoRouter = express.Router();

productoRouter.get('/listar', getProductos);
productoRouter.get('/listar/:id', getProducto);
productoRouter.post('/guardar', isAdmin, saveProducto);
productoRouter.put('/actualizar/:id', isAdmin, updateProducto);
productoRouter.delete('/borrar/:id', isAdmin, deleteProducto);

export default productoRouter;
