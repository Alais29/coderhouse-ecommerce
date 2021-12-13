import { UserValidation } from 'errors';
import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import { fotoUpload } from 'utils/multerImgUpload';

/**
 * Middleware for image upload using multer (now replaced for express-fileupload)
 * @param req express request
 * @param res express response
 * @param next express next function
 */
export const imageUpload = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  fotoUpload(req, res, err => {
    if (err instanceof multer.MulterError) {
      next(
        new UserValidation(
          400,
          'La imagen supera el tamaño permitido, debe ser menor de 1mb',
        ),
      );
    } else if (err instanceof UserValidation) {
      next(err);
    } else if (err) {
      next(
        new UserValidation(
          500,
          'Ocurrió un error guardando la imagen, por favor intente de nuevo',
        ),
      );
    } else {
      next();
    }
  });
};
