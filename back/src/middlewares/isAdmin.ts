import { Request, Response, NextFunction } from 'express';

const admin = true;

export const isAdmin = (req: Request, res: Response, next: NextFunction):void => {
  if (admin) {
    next();
  } else {
    res.status(401).send({
      error: '-1',
      descripcion: `Ruta ${req.originalUrl} método ${req.method} no autorizada`,
      message: 'No tienes permisos para realizar esa acción'
    });
  }
};