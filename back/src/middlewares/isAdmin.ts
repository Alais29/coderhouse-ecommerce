import { Request, Response, NextFunction } from 'express';
import { EErrorCodes } from '../common/enums';

const admin = false;

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (admin) {
    next();
  } else {
    res.status(401).send({
      error: `-${EErrorCodes.UnauthorizedRoute}`,
      descripcion: `Ruta ${req.originalUrl} método ${req.method} no autorizada`,
      message: 'No tienes permisos para realizar esa acción',
    });
  }
};
