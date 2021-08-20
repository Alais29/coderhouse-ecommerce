import express from 'express';
import productoRoutes from './producto';
import carritoRoutes from './carrito';

const routes = express.Router();

routes.use('/productos', productoRoutes);
routes.use('/carrito', carritoRoutes);

export default routes;