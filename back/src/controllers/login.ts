import { UserExists, UserNotLoggedIn } from 'errors';
import { NextFunction, Request, Response } from 'express';
import passport from 'middlewares/auth';
import { logger } from 'services/logger';

interface User {
  email: string;
  nombre: string;
  direccion: string;
  edad: number;
  telefono: string;
  foto: string;
}

export const loginUser = (req: Request, res: Response): void => {
  let userdata;
  if (req.user) {
    const { email, nombre, direccion, edad, telefono, foto } = req.user as User;
    userdata = { email, nombre, direccion, edad, telefono, foto };
  }
  res.json({ data: { message: 'Bienvenido!', user: userdata } });
};

export const signupUser = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  passport.authenticate('signup', function (err, user, info) {
    if (err) {
      logger.warn('Error al registrar usuario');
      return next(err);
    }
    if (!user) {
      throw new UserExists(400, info.message);
    }
    res.json({ message: 'Registro exitoso' });
  })(req, res, next);
};

export const logoutUser = (req: Request, res: Response): void => {
  req.session.destroy(err => {
    if (err) res.status(500).json({ message: 'Ocurrió un error' });
    else {
      res.clearCookie('connect.sid');
      res.json({ message: 'Logout exitoso' });
    }
  });
};

export const userData = (req: Request, res: Response): void => {
  if (req.isAuthenticated()) {
    const { email, nombre, direccion, edad, telefono, foto } = req.user as User;
    const userdata = { email, nombre, direccion, edad, telefono, foto };
    res.json({ data: userdata });
  } else {
    throw new UserNotLoggedIn(404, 'Usuario no logeado');
  }
};
