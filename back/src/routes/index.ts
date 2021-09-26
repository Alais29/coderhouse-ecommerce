import express from 'express';
import productoRouter from './producto';
import carritoRouter from './carrito';
import loginRouter from './login';
import { validateLogIn } from 'middlewares/validateLogin';

const router = express.Router();

router.use('/', loginRouter);
router.use('/productos', validateLogIn, productoRouter);
router.use('/carrito', validateLogIn, carritoRouter);

export default router;
