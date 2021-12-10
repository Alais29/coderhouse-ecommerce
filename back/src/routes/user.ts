import asyncHandler from 'express-async-handler';
import { Router } from 'express';
import { isAdmin } from 'middlewares/isAdmin';
import { imageUpload } from 'middlewares/imageUpload';
import { isLoggedIn } from 'middlewares/auth';
import {
  getUser,
  getUsers,
  addUser,
  // updateUser,
  // deleteUser,
  getLoggedinUserData,
} from 'controllers/users';

const usersRouter = Router();

usersRouter.get('/', isLoggedIn, isAdmin, asyncHandler(getUsers));
usersRouter.get('/:id', isLoggedIn, isAdmin, asyncHandler(getUser));
usersRouter.get('/loggedInUser/data', asyncHandler(getLoggedinUserData));
usersRouter.post('/signup', imageUpload, addUser);
// usersRouter.put('/:id', isLoggedIn, asyncHandler(updateUser));
// usersRouter.delete('/:id', isLoggedIn, asyncHandler(deleteUser));

export default usersRouter;
