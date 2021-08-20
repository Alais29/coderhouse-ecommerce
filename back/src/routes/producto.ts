import express from 'express';
import { isAdmin } from '../middlewares/isAdmin';
import { deleteProducto, getProducto, getProductos, saveProducto, updateProducto } from '../persistencia/producto';

const productoRoutes = express.Router();

productoRoutes.get('/listar', getProductos);
productoRoutes.get('/listar/:id', getProducto);
productoRoutes.post('/guardar', isAdmin, saveProducto);
productoRoutes.put('/actualizar/:id', isAdmin, updateProducto);
productoRoutes.delete('/borrar/:id', isAdmin, deleteProducto);

export default productoRoutes;
