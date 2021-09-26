import { loginUser, logoutUser } from 'controllers/login';
import express from 'express';

const loginRouter = express.Router();

loginRouter.post('/login', loginUser);
loginRouter.get('/logout', logoutUser);

export default loginRouter;
