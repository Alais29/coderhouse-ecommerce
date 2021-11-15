import getProduct from './getProduct';
import getProducts from './getProducts';

export default {
  paths: {
    '/productos/listar': {
      ...getProducts,
    },
    '/productos/listar/{id}': {
      ...getProduct,
      // ...updateTodo,
      // ...deleteTodo,
    },
  },
};
