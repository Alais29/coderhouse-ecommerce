import getUser from './getUser';
import getUsers from './getUsers';
import signup from './signup';
import userData from './userData';

export default {
  '/usuarios': {
    ...getUsers,
  },
  '/usuarios/loggedInUser/data': {
    ...userData,
  },
  '/usuarios/signup': {
    ...signup,
  },
  '/usuarios/{id}': {
    ...getUser,
  },
};
