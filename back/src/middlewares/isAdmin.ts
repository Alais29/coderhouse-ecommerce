import { NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  admin: boolean;
}

const admin = true;

export const isAdmin = (): ((req: AuthenticatedRequest, res: Response, next: NextFunction) => void) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (admin) {
      req.admin = admin;
      next();
    } else {
      next();
    }
  };
};