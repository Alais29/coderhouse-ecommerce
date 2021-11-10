import { Request, Response, NextFunction } from 'express';
import { userAPI } from 'api/user';
import { userJoiSchema } from 'common/interfaces/users';
import { UserExists, UserValidation } from 'errors';
import { ValidationError } from 'joi';

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
