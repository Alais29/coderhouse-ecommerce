import passport from 'passport';
import passportLocal, { IStrategyOptionsWithRequest } from 'passport-local';
import { UserModel } from 'models/mongoDb/user';
import { NextFunction, Request, Response } from 'express';
import { IUser } from 'common/interfaces';
import { UnauthorizedRoute } from 'errors';

interface User {
  _id?: string;
}

const LocalStrategy = passportLocal.Strategy;

const strategyOptions: IStrategyOptionsWithRequest = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
};

const loginFunc = async (
  req: Request,
  username: string,
  password: string,
  done: (
    err: unknown,
    user?: Express.User | false | null,
    msg?: { message: string },
  ) => void,
) => {
  const user = (await UserModel.findOne({ username })) as IUser;

  if (!user) {
    return done(null, false, { message: 'User does not exist' });
  }
  if (!user.isValidPassword(password)) {
    return done(null, false, { message: 'Password is not valid.' });
  }
  console.log('Login exitoso');
  return done(null, user);
};

const signUpFunc = async (
  req: Request,
  username: string,
  password: string,
  done: (
    err: unknown,
    user?: Express.User | false | null,
    msg?: { message: string },
  ) => void,
) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      console.log('Invalid body fields');
      return done(null, false);
    }

    const user = await UserModel.findOne({ username });

    if (user) {
      console.log('User already exists');
      console.log(user);
      return done(null, false, { message: 'User already exists' });
    } else {
      const userData = {
        username,
        password,
      };

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
  console.log(user);
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
