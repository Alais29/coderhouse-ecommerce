import { Request, Response } from 'express';

interface User {
  email: string;
  nombre: string;
  direccion: string;
  edad: number;
  telefono: string;
  foto: string;
  fotoId: string;
  calle: string;
  altura: string;
  codigoPostal: string;
  piso: string;
  depto: string;
  admin: boolean;
}

export const loginUser = (req: Request, res: Response): void => {
  let userdata;
  if (req.user) {
    const {
      email,
      nombre,
      calle,
      altura,
      codigoPostal,
      piso,
      depto,
      edad,
      telefono,
      foto,
      fotoId,
      admin,
    } = req.user as User;
    userdata = {
      email,
      nombre,
      calle,
      altura,
      codigoPostal,
      piso,
      depto,
      edad,
      telefono,
      foto,
      fotoId,
      admin,
    };
  }
  res.json({ data: { message: 'Bienvenido!', user: userdata } });
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
