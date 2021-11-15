import deleteProduct from './deleteProduct';
import getProduct from './getProduct';
import getProducts from './getProducts';
import saveProduct from './saveProduct';
import updateProduct from './updateProduct';

export default {
  '/productos': {
    ...getProducts,
    ...saveProduct,
  },
  '/productos/{id}': {
    ...getProduct,
    ...updateProduct,
    ...deleteProduct,
  },
};
