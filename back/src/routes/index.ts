import express from 'express';
import productoRouter from './producto';
import carritoRouter from './carrito';
import loginRouter from './login';
import usersRouter from './user';
import ordenesRouter from './ordenes';
import chatRouter from './messages';
import infoRouter from './info';
import { isLoggedIn } from 'middlewares/auth';

const router = express.Router();

router.use('/auth', loginRouter);
router.use('/usuarios', usersRouter);
router.use('/productos', isLoggedIn, productoRouter);
router.use('/carrito', isLoggedIn, carritoRouter);
router.use('/ordenes', isLoggedIn, ordenesRouter);
router.use('/chat', isLoggedIn, chatRouter);
router.use('/info', infoRouter);

export default router;
