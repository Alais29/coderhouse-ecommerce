import asyncHandler from 'express-async-handler';
import { Router } from 'express';
import {
  validateUserInput,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} from 'controllers/users';

const usersRouter = Router();

usersRouter.get('/:id', asyncHandler(getUser));
usersRouter.post('/', validateUserInput, asyncHandler(addUser));
usersRouter.put('/', asyncHandler(updateUser));
usersRouter.delete('/', asyncHandler(deleteUser));

export default usersRouter;
