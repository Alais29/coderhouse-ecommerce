import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { fetchProductsCart, removeProductCart } from 'features/cart/cartSlice';
import { isEmpty } from 'utilities/others';
import ProductList from 'components/ProductList/ProductList';
import LoadingScreen from 'components/LoadingScreen/LoadingScreen';
import cx from 'classnames/bind';
import styles from './styles.module.scss';

const Cart = () => {
  const [total, setTotal] = useState(0);
  const [deleteProductRequestStatus, setDeleteProductRequestStatus] = useState<
    'idle' | 'loading'
  >('idle');

  const { data, status, error } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  const handleRemove = async (id: string) => {
    try {
      setDeleteProductRequestStatus('loading');
      disableBodyScroll(document.body);
      await dispatch(removeProductCart(id)).unwrap();
      toast.success('Producto eliminado del carrito');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setDeleteProductRequestStatus('idle');
      enableBodyScroll(document.body);
    }
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProductsCart());
    }
    if (status === 'failed') {
      toast.error(error || 'Ocurrió un error');
    }
  }, [dispatch, status, error]);

  useEffect(() => {
    const totalCost = data.reduce((total, product) => {
      return (total += Number(product.precio));
    }, 0);
    setTotal(totalCost);
  }, [data]);

  return (
    <>
      <h1 className="text-center mt-5 pt-3 mb-">Carrito</h1>
      <ProductList
        productos={data}
        location="cart"
        handleRemove={handleRemove}
      />
      {isEmpty(data) ? (
        status === 'loading' ? (
          <div className={cx(styles['spinner-container'])}>
            <Spinner animation="grow" variant="primary" />
          </div>
        ) : (
          <div className="text-center">
            <h2>El carrito está vacío</h2>
            <p className="display-6">Agrega algunos productos</p>
            <Link to="/productos" className="btn btn-primary">
              Ir a Productos
            </Link>
          </div>
        )
      ) : (
        <div className="d-flex justify-content-end">
          <p className="border rounded p-4">
            <span className="fw-bold">Total:</span> ${total.toFixed(2)}
          </p>
        </div>
      )}
      {deleteProductRequestStatus === 'loading' && (
        <LoadingScreen
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', zIndex: 2000 }}
        />
      )}
    </>
  );
};

export default Cart;
