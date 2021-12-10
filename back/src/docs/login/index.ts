import login from './login';
import logout from './logout';

export default {
  '/auth/login': {
    ...login,
  },
  // '/auth/signup': {
  //   ...signup,
  // },
  '/auth/logout': {
    ...logout,
  },
  // '/auth/userdata': {
  //   ...userData,
  // },
};
