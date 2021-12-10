import express from 'express';
import passport from 'middlewares/auth';
import { loginUser, logoutUser } from 'controllers/login';

const loginRouter = express.Router();

loginRouter.post('/login', passport.authenticate('login'), loginUser);
loginRouter.get('/logout', logoutUser);

export default loginRouter;
