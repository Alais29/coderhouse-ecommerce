import { IItemAPI, IItemCarrito } from 'commons/interfaces';
import { isEmpty } from 'utilities/others';
import Product from 'components/Product/Product';
import ProductCarrito from 'components/ProductCarrito/ProductCarrito';
import cx from 'classnames/bind';
import styles from './styles.module.scss';

interface IProductList {
  productos: IItemAPI[] | IItemCarrito[] | [];
  handleToggleShowModal?: (
    producto?: IItemAPI,
    action?: 'edit' | 'delete',
  ) => void;
  handleAddToCart?: (producto: IItemAPI) => void;
  location: 'home' | 'cart';
  handleRemove?: (id: string) => void;
}

const ProductList = ({
  handleToggleShowModal,
  productos,
  location,
  handleRemove,
  handleAddToCart,
}: IProductList) => {
  return (
    <>
      <div
        className={cx(
          styles['product-list'],
          'my-4',
          'd-flex',
          'flex-wrap',
          'justify-content-center',
          { 'flex-column': location === 'cart' },
        )}
      >
        {!isEmpty(productos) &&
          location === 'home' &&
          handleToggleShowModal &&
          handleAddToCart &&
          (productos as IItemAPI[]).map((producto: IItemAPI) => (
            <Product
              key={producto.id}
              product={producto}
              handleToggleShowModal={handleToggleShowModal}
              handleAddToCart={handleAddToCart}
            />
          ))}
        {!isEmpty(productos) &&
          location === 'cart' &&
          handleRemove &&
          (productos as IItemCarrito[]).map((producto: IItemCarrito) => (
            <ProductCarrito
              key={producto.producto.id}
              product={producto}
              handleRemove={handleRemove}
            />
          ))}
      </div>
    </>
  );
};

export default ProductList;
