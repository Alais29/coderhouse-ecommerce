import { Request, Response } from 'express';

export const unknownEndpoint = (req: Request, res: Response): void => {
  res.status(404).send({
    error: '-2',
    descripcion: `Ruta ${req.originalUrl} método ${req.method} no implementada`
  });
};