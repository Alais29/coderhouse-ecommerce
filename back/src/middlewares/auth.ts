import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import passportLocal, { IStrategyOptionsWithRequest } from 'passport-local';
import Config from 'config';
import { UserModel } from 'models/mongoDb/user';
import { IUser } from 'common/interfaces';
import { UnauthorizedRoute } from 'errors';
import { isValidUser } from 'utils/validations';
import { logger } from 'utils/logger';
import { CarritoModel } from 'models/mongoDb/carrito';
import { EmailService } from 'services/email';

interface User {
  _id?: string;
}

const LocalStrategy = passportLocal.Strategy;

const strategyOptions: IStrategyOptionsWithRequest = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
};

const loginFunc = async (
  req: Request,
  email: string,
  password: string,
  done: (
    err: unknown,
    user?: Express.User | false | null,
    msg?: { message: string },
  ) => void,
) => {
  const user = (await UserModel.findOne({ email })) as IUser;

  if (!user) {
    logger.warn('Usuario incorrecto');
    return done(null, false);
  }

  if (!(await user.isValidPassword(password))) {
    logger.warn('Contraseña incorrecta');
    return done(null, false);
  }

  logger.info('Login exitoso');
  return done(null, user);
};

const signUpFunc = async (
  req: Request,
  email: string,
  password: string,
  done: (
    err: unknown,
    user?: Express.User | false | null,
    msg?: { message: string },
  ) => void,
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

    isValidUser(userData);

    const user = await UserModel.findOne({ email });

    if (user) {
      logger.warn('Error, El usuario ya existe');
      logger.info(user);
      return done(null, false, {
        message:
          'Ya existe un usuario registrado con ese email, por favor intenta con otro',
      });
    } else {
      const newUser = new UserModel(userData);
      const userCart = new CarritoModel({
        user: newUser._id,
        productos: [],
      });

      newUser.cart = userCart._id;

      await newUser.save();
      await userCart.save();
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
  } catch (error) {
    done(error);
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
  if (!req.isAuthenticated()) throw new UnauthorizedRoute(401, 'No Autorizado');

  next();
};

export default passport;
