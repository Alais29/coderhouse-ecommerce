import express from 'express';
import productoRouter from './producto';
import carritoRouter from './carrito';
import loginRouter from './login';
import usersRouter from './user';
import ordenesRouter from './ordenes';
import { isLoggedIn } from 'middlewares/auth';
import { productoRouterGraphQL } from './productoGraphql';

const router = express.Router();

router.use('/auth', loginRouter);
router.use('/usuarios', isLoggedIn, usersRouter);
router.use('/productos', isLoggedIn, productoRouter);
router.use('/productos-graphql', productoRouterGraphQL);
router.use('/carrito', isLoggedIn, carritoRouter);
router.use('/ordenes', isLoggedIn, ordenesRouter);

export default router;
