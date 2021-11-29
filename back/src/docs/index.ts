import basicInfo from './basicInfo';
import cart from './cart';
import chat from './chat';
import components from './components';
import login from './login';
import products from './products';
import servers from './servers';
import tags from './tags';
import users from './users';

export default {
  ...basicInfo,
  ...servers,
  ...tags,
  ...components,
  paths: {
    ...products,
    ...cart,
    ...login,
    ...users,
    ...chat,
  },
};
