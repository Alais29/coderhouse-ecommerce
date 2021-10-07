import passport from 'passport';
import {
  Strategy as FaceBookStrategy,
  VerifyFunction,
  StrategyOption,
} from 'passport-facebook';
import Config from 'config';
import { UserModel } from 'models/mongoDb/user';
import { NextFunction, Request, Response } from 'express';
import { IUser } from 'common/interfaces';
import { UnauthorizedRoute } from 'errors';

interface User {
  _id?: string;
}

const strategyOptions: StrategyOption = {
  clientID: Config.FACEBOOK_APP_ID,
  clientSecret: Config.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:8080/api/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'emails'],
};

const loginFunc: VerifyFunction = async (
  accessToken,
  refreshToken,
  profile,
  done,
) => {
  return done(null, profile);
};

passport.use(new FaceBookStrategy(strategyOptions, loginFunc));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj: string, cb) {
  cb(null, obj);
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
