import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import passportLocal, {
  IStrategyOptionsWithRequest,
  VerifyFunctionWithRequest,
} from 'passport-local';
import Config from 'config';
import { UserModel } from 'models/mongoDb/user';
import { IUser, userJoiSchema } from 'common/interfaces/users';
import { UnauthorizedRoute, UserValidation } from 'errors';
import { logger } from 'services/logger';
import { EmailService } from 'services/email';
import { ValidationError } from 'joi';
import { userAPI } from 'api/user';

interface User {
  _id?: string;
}

const LocalStrategy = passportLocal.Strategy;

const strategyOptions: IStrategyOptionsWithRequest = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
};

const loginFunc: VerifyFunctionWithRequest = async (
  req: Request,
  email: string,
  password: string,
  done,
) => {
  const user = (await UserModel.findOne({ email })) as IUser;

  if (!user) {
    logger.warn(`Login fallido para usuario ${email}: El usuario no existe`);
    return done(null, false);
  }

  if (!(await user.isValidPassword(password))) {
    logger.warn(
      `Login fallido para usuario ${email}: La contraseña es incorrecta`,
    );
    return done(null, false);
  }

  logger.warn(`Login exitoso de usuario ${email}, ${new Date()}`);
  return done(null, user);
};

const signUpFunc: VerifyFunctionWithRequest = async (
  req: Request,
  email: string,
  password: string,
  done,
) => {
  try {
    const {
      email,
      password,
      repeatPassword,
      nombre,
      direccion,
      edad,
      telefono,
    } = req.body;
    const userData = {
      email,
      password,
      repeatPassword,
      nombre,
      direccion,
      edad: Number(edad),
      telefono,
      foto: req.file?.path || '',
    };

    await userJoiSchema.validateAsync(userData);

    const user = await userAPI.query(email);

    if (user) {
      logger.warn('Error, El usuario ya existe');
      logger.info(user);
      return done(null, false, {
        message:
          'Ya existe un usuario registrado con ese email, por favor intenta con otro',
      });
    } else {
      const newUser = await userAPI.addUser(userData);

      logger.info('Registro exitoso');

      const emailContent = `
        <h1>Nuevo Registro</h1>
        <span style="display: block"><span style="font-weight: bold">Email:</span> ${userData.email}</span>
        <span style="display: block"><span style="font-weight: bold">Nombre:</span> ${userData.nombre}</span>
        <span style="display: block"><span style="font-weight: bold">Direccion:</span> ${userData.direccion}</span>
        <span style="display: block"><span style="font-weight: bold">Edad:</span> ${userData.edad}</span>
        <span style="display: block"><span style="font-weight: bold">Teléfono:</span> ${userData.telefono}</span>
      `;

      EmailService.sendEmail(
        Config.GMAIL_EMAIL,
        'Nuevo registro',
        emailContent,
        userData.foto,
      );

      logger.info('Email enviado al administrador');

      return done(null, newUser);
    }
  } catch (e) {
    if (e instanceof ValidationError) {
      done(new UserValidation(400, e.message));
    } else {
      done(e);
    }
  }
};

passport.use('login', new LocalStrategy(strategyOptions, loginFunc));
passport.use('signup', new LocalStrategy(strategyOptions, signUpFunc));

passport.serializeUser((user: User, done) => {
  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  UserModel.findById(userId, function (err: unknown, user: IUser) {
    done(err, user);
  });
});

export const isLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (!req.isAuthenticated())
    throw new UnauthorizedRoute(
      401,
      'Debes estar loggeado para realizar esta acción',
    );

  next();
};

export default passport;
