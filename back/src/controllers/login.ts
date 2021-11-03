import { Request, Response } from 'express';
import Config from 'config';
import { Email } from 'services/email';

type Photos = {
  value: string;
};

type Emails = {
  value: string;
};
interface User extends Express.User {
  displayName?: string;
  photos?: Photos[];
  emails?: Emails[];
}

export const loginUser = (req: Request, res: Response): void => {
  res.json({ data: { message: 'Bienvenido!', user: req.user } });
};

export const signupUser = (req: Request, res: Response): void => {
  res.json({ data: { message: 'Registro exitoso' } });
};

export const userData = (req: Request, res: Response): void => {
  const userInfo = {
    name: '',
    photo: 'noPhoto',
    email: 'noEmail',
  };

  if (req.isAuthenticated()) {
    const userData: User = req.user;

    if (userData.photos) userInfo.photo = userData.photos[0].value;

    if (userData.emails) userInfo.email = userData.emails[0].value;

    if (userData.displayName) userInfo.name = userData.displayName;

    res.json({ data: userInfo });
  } else {
    res.json({ data: { message: 'No user', error: true } });
  }
};

export const logoutUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  if (req.isAuthenticated()) {
    const etherealService = new Email('ethereal');
    const userData: User = req.user;

    const content = `<p> ${userData.displayName}, ${new Date()}</p>`;
    await etherealService.sendEmail(Config.ETHEREAL_EMAIL, 'Log out', content);
  }
  req.session.destroy(err => {
    if (err) res.status(500).json({ message: 'Ocurrió un error' });
    else {
      res.json({ message: 'Logout exitoso' });
    }
  });
};
