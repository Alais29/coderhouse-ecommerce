import { Request, Response, NextFunction } from 'express';
import { userAPI } from 'api/user';
import { NotFound, UserExists, UserNotLoggedIn } from 'errors';
import { isEmpty } from 'utils/others';
import passport from 'middlewares/auth';
import { logger } from 'services/logger';

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

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const data = await userAPI.getUsers();
  if (!isEmpty(data)) res.json({ data });
  else throw new NotFound(404, 'No hay usuarios registrados.');
};

export const getLoggedinUserData = (req: Request, res: Response): void => {
  if (req.isAuthenticated()) {
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
    const userdata = {
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
    res.json({ data: userdata });
  } else {
    throw new UserNotLoggedIn(404, 'Usuario no logeado');
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const data = await userAPI.getUsers(req.params.id);

  res.json({ data });
};

export const addUser = (
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
    res
      .location(`/api/usuarios/${user.id}`)
      .status(201)
      .json({ message: 'Registro exitoso' });
  })(req, res, next);
};

export const updateUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  //TODO: implement update user method
  res.json({ msg: 'UPDATE USER' });
};

export const deleteUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  //TODO: implement delete user method
  res.json({ msg: 'DELETE USER' });
};
