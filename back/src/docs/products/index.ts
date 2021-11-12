import getProducts from './getProducts';

export default {
  paths: {
    '/productos': {
      ...getProducts,
    },
    '/productos/{id}': {
      // ...getTodo,
      // ...updateTodo,
      // ...deleteTodo,
    },
  },
};
