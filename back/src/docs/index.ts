import basicInfo from './basicInfo';
import cart from './cart';
import chat from './chat';
import components from './components';
import login from './login';
import orders from './orders';
import products from './products';
import servers from './servers';
import tags from './tags';
import users from './users';
import info from './info';

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
    ...orders,
    ...chat,
    ...info,
  },
};
