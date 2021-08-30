import express from 'express';
import productoRouter from '/routes/producto';
import carritoRouter from '/routes/carrito';

const router = express.Router();

router.use('/productos', productoRouter);
router.use('/carrito', carritoRouter);

export default router;
