import { Request, Response, NextFunction } from 'express';
import { userAPI } from 'api/user';
import { userJoiSchema } from 'common/interfaces/users';
import { NotFound, UserExists, UserValidation } from 'errors';
import { ValidationError } from 'joi';
import { isEmpty } from 'utils/others';

export const validateUserInput = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await userJoiSchema.validateAsync(req.body);

    const { email } = req.body;

    const user = await userAPI.query(email);
    if (!user) next();
    else
      throw new UserExists(
        400,
        'Ya existe un usuario registrado con ese email',
      );
  } catch (e) {
    if (e instanceof ValidationError) {
      throw new UserValidation(400, e.message);
    } else {
      throw e;
    }
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const data = await userAPI.getUsers();
  if (!isEmpty(data)) res.json({ data });
  else throw new NotFound(404, 'No hay usuarios registrados.');
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const data = await userAPI.getUsers(req.params.id);

  res.json({ data });
};

export const addUser = async (req: Request, res: Response): Promise<void> => {
  const newItem = await userAPI.addUser(req.body);
  res.json({ data: newItem });
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
