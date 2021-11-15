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
usersRouter.put('/:id', asyncHandler(updateUser));
usersRouter.delete('/:id', asyncHandler(deleteUser));

export default usersRouter;
