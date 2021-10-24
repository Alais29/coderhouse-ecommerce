import passport from 'passport';
import passportLocal, { IStrategyOptionsWithRequest } from 'passport-local';
import { UserModel } from 'models/mongoDb/user';
import { NextFunction, Request, Response } from 'express';
import { IUser } from 'common/interfaces';
import { UnauthorizedRoute } from 'errors';
import { isValidUser } from 'utils/validations';

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
    return done(null, false);
  }

  if (!(await user.isValidPassword(password))) {
    return done(null, false);
  }

  console.log('Login exitoso');
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
    const { email, password, nombre, direccion, edad, telefono } = req.body;
    const userData = {
      email,
      password,
      nombre,
      direccion,
      edad: Number(edad),
      telefono,
      foto: req.file?.path || '',
    };

    isValidUser(userData);

    const user = await UserModel.findOne({ email });

    if (user) {
      console.log('El usuario ya existe');
      console.log(user);
      return done(null, false, {
        message:
          'Ya existe un usuario registrado con ese email, por favor intenta con otro',
      });
    } else {
      const newUser = new UserModel(userData);

      await newUser.save();
      console.log('Registro exitoso');

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
