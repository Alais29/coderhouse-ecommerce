import { EErrorCodes } from 'common/enums';
import { NextFunction, Request, Response } from 'express';

export const validateLogIn = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (req.session.loggedIn) next();
  else
    res.status(401).json({
      error: `-${EErrorCodes.UnauthorizedRoute}`,
      message: 'No Autorizado',
    });
};
