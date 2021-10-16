import { Request, Response, NextFunction } from 'express';
import { UnauthorizedRoute } from 'errors';

const admin = true;

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (admin) {
    next();
  } else {
    throw new UnauthorizedRoute(
      401,
      'No tienes permisos para realizar esa acción',
      `Ruta ${req.originalUrl} método ${req.method} no autorizada`,
    );
  }
};
