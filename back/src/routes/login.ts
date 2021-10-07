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
    successRedirect: 'http://localhost:8080',
    failureRedirect: 'http://localhost:8080',
  }),
);
loginRouter.get('/userdata', userData);
loginRouter.get('/logout', logoutUser);

export default loginRouter;
