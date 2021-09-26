import { EErrorCodes } from 'common/enums';
import { Request, Response } from 'express';

declare module 'express-session' {
  interface SessionData {
    loggedIn: boolean;
  }
}

export const loginUser = (req: Request, res: Response): void => {
  const { name } = req.body;

  if (name) {
    req.session.loggedIn = true;
    res.json({
      data: {
        name,
      },
    });
  } else {
    res.status(401).json({
      error: `-${EErrorCodes.UnauthorizedRoute}`,
      message: 'No Autorizado',
    });
  }
};

export const logoutUser = (req: Request, res: Response): void => {
  req.session.destroy(err => {
    if (err) res.status(500).json({ msg: 'Ocurrió un error' });
    else {
      res.json({ msg: 'Sesion destruida' });
    }
  });
};
