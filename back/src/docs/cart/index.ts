import deleteProductCart from './deleteProductCart';
import deleteProductsCart from './deleteProductsCart';
import getProductCart from './getProductCart';
import getProductsCart from './getProductsCart';
import saveProductCart from './saveProductCart';
import updateProductCart from './updateProductCart';

export default {
  '/carrito': {
    ...getProductsCart,
    ...updateProductCart,
    ...deleteProductsCart,
  },
  '/carrito/{id}': {
    ...getProductCart,
    ...saveProductCart,
    ...deleteProductCart,
  },
};
