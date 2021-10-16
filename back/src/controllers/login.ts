import { UserExists } from 'errors';
import { NextFunction, Request, Response } from 'express';
import passport from 'middlewares/auth';

export const loginUser = (req: Request, res: Response): void => {
  res.json({ data: { message: 'Bienvenido!', user: req.user } });
};

export const signupUser = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  passport.authenticate('signup', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      throw new UserExists(400, info.message);
    }
    res.json({ msg: 'signup ok' });
  })(req, res, next);
};

export const logoutUser = (req: Request, res: Response): void => {
  req.session.destroy(err => {
    if (err) res.status(500).json({ message: 'Ocurrió un error' });
    else {
      res.json({ message: 'Logout exitoso' });
    }
  });
};
