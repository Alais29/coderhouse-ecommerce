import asyncHandler from 'express-async-handler';
import { Router } from 'express';
import { isAdmin } from 'middlewares/isAdmin';
import {
  // validateUserInput,
  getUser,
  getUsers,
  // addUser,
  updateUser,
  deleteUser,
} from 'controllers/users';

const usersRouter = Router();

usersRouter.get('/', isAdmin, asyncHandler(getUsers));
usersRouter.get('/:id', asyncHandler(getUser));
// usersRouter.post('/', validateUserInput, asyncHandler(addUser));
usersRouter.put('/:id', asyncHandler(updateUser));
usersRouter.delete('/:id', asyncHandler(deleteUser));

export default usersRouter;
