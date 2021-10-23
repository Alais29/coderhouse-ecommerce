import express from 'express';
import passport from 'middlewares/auth';
import { loginUser, logoutUser, signupUser, userData } from 'controllers/login';
import { fotoUpload } from 'utils/multer';

const loginRouter = express.Router();

loginRouter.post('/login', passport.authenticate('login'), loginUser);
loginRouter.post('/signup', fotoUpload.single('foto'), signupUser);
loginRouter.get('/logout', logoutUser);
loginRouter.get('/userdata', userData);

export default loginRouter;
