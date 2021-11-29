import { messagesAPI } from 'api/mensajes';
import { NotFound, UnauthorizedRoute } from 'errors';
import { Request, Response } from 'express';
import { isEmpty } from 'utils/others';

interface User {
  _id: string;
  email: string;
}

export const getMessages = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const loggedInUser = req.user as User;
  const { userEmail } = req.params;
  if (loggedInUser && loggedInUser.email === userEmail) {
    const messages = await messagesAPI.get(loggedInUser._id);
    if (!isEmpty(messages)) res.json({ data: messages });
    else throw new NotFound(404, 'No hay mensajes');
  } else {
    throw new UnauthorizedRoute(
      401,
      'No tienes permisos para realizar esta acción.',
      'Sólo puedes ver tus propios mensajes',
    );
  }
};
