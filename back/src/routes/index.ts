import express from 'express';
import productoRouter from './producto';
import carritoRouter from './carrito';

const router = express.Router();

router.use('/productos', productoRouter);
router.use('/carrito', carritoRouter);

export default router;
