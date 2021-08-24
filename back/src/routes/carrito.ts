import express from 'express';
import {
  getCarrito,
  getCarritoProduct,
  saveCarritoProduct,
  deleteCarritoProduct,
} from '../controllers/carrito';

const carritoRouter = express.Router();

carritoRouter.get('/listar', getCarrito);
carritoRouter.get('/listar/:id', getCarritoProduct);
carritoRouter.post('/agregar/:id', saveCarritoProduct);
carritoRouter.delete('/borrar/:id', deleteCarritoProduct);

export default carritoRouter;
