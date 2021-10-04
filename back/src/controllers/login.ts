import { Request, Response } from 'express';

export const loginUser = (req: Request, res: Response): void => {
  res.json({ msg: 'Bienvenido!', user: req.user });
};

export const signupUser = (req: Request, res: Response): void => {
  res.json({ msg: 'Registro exitoso' });
};

export const logoutUser = (req: Request, res: Response): void => {
  req.session.destroy(err => {
    if (err) res.status(500).json({ msg: 'Ocurrió un error' });
    else {
      res.json({ msg: 'Logout exitoso' });
    }
  });
};
