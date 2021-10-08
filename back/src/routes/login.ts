import express from 'express';
import passport from 'middlewares/auth';
import { logoutUser, userData } from 'controllers/login';

const loginRouter = express.Router();

loginRouter.get(
  '/login',
  passport.authenticate('facebook', { scope: ['email'] }),
);
loginRouter.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/#/login',
    failureRedirect: '/#/login',
  }),
);
loginRouter.get('/userdata', userData);
loginRouter.get('/logout', logoutUser);

export default loginRouter;
