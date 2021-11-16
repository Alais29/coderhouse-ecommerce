import login from './login';
import logout from './logout';
import signup from './signup';
import userData from './userData';

export default {
  '/auth/login': {
    ...login,
  },
  '/auth/signup': {
    ...signup,
  },
  '/auth/logout': {
    ...logout,
  },
  '/auth/userdata': {
    ...userData,
  },
};
