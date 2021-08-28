import { Request, Response } from 'express';
import { EErrorCodes } from 'common/enums';

export const unknownEndpoint = (req: Request, res: Response): void => {
  res.status(404).send({
    error: `-${EErrorCodes.UnknownEndpoint}`,
    descripcion: `Ruta ${req.originalUrl} método ${req.method} no implementada`,
  });
};
