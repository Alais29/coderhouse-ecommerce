import express from 'express';
import passport from 'middlewares/auth';
import { loginUser, logoutUser, signupUser } from 'controllers/login';

const loginRouter = express.Router();

loginRouter.post('/login', passport.authenticate('login'), loginUser);
loginRouter.post('/signup', signupUser);
loginRouter.get('/logout', logoutUser);

export default loginRouter;
