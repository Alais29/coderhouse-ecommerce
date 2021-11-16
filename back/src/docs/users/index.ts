import getUser from './getUser';
import getUsers from './getUsers';

export default {
  '/usuarios': {
    ...getUsers,
    //...addUser
  },
  '/usuarios/{id}': {
    ...getUser,
  },
};
