import { Request, Response } from 'express';

export const loginUser = (req: Request, res: Response): void => {
  res.json({ data: { message: 'Bienvenido!', user: req.user } });
};

export const signupUser = (req: Request, res: Response): void => {
  res.json({ data: { message: 'Registro exitoso' } });
};

export const logoutUser = (req: Request, res: Response): void => {
  req.session.destroy(err => {
    if (err) res.status(500).json({ message: 'Ocurrió un error' });
    else {
      res.json({ message: 'Logout exitoso' });
    }
  });
};
