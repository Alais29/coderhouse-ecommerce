import express from 'express';
import passport from 'middlewares/auth';
import { loginUser, logoutUser, signupUser, userData } from 'controllers/login';

const loginRouter = express.Router();

loginRouter.post('/login', passport.authenticate('login'), loginUser);
loginRouter.post('/signup', signupUser);
loginRouter.get('/logout', logoutUser);
loginRouter.get('/userdata', userData);

export default loginRouter;
