import express from 'express';
import productoRouter from './producto';
import carritoRouter from './carrito';
import loginRouter from './login';
import { isLoggedIn } from 'middlewares/auth';

const router = express.Router();

router.use('/', loginRouter);
router.use('/productos', isLoggedIn, productoRouter);
router.use('/carrito', isLoggedIn, carritoRouter);

export default router;
