import express, { Request, Response } from 'express';

const carritoRoutes = express.Router();

carritoRoutes.get('/', (req: Request, res: Response) => {
  res.json({
    msg: 'Desde carrito'
  });
});

export default carritoRoutes;