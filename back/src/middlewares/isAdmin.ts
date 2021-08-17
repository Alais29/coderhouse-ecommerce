import { Request, Response, NextFunction } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    admin: boolean
  }
}

const admin = false;

export const isAdmin = (req: Request, res: Response, next: NextFunction):void => {
  if (admin) {
    req.admin = admin;
  } 
  next();
};