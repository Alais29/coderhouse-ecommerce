import express from 'express';
import {
  getCarrito,
  getCarritoProduct,
  saveCarritoProduct,
  deleteCarritoProduct,
} from '../persistencia/carrito';

const carritoRoutes = express.Router();

carritoRoutes.get('/listar', getCarrito);
carritoRoutes.get('/listar/:id', getCarritoProduct);
carritoRoutes.post('/agregar/:id', saveCarritoProduct);
carritoRoutes.delete('/borrar/:id', deleteCarritoProduct);

export default carritoRoutes;
