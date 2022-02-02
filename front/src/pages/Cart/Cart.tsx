import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
  fetchProductsCart,
  removeProductCartApi,
  emptyCart,
} from 'features/cart/cartSlice';
import { createOrder } from 'features/orders/ordersSlice';
import { isEmpty } from 'utilities/others';
import ProductList from 'components/ProductList/ProductList';
import LoadingData from 'components/LoadingData/LoadingData';

const Cart = () => {
  const [total, setTotal] = useState(0);
  const [deleteProductRequestStatus, setDeleteProductRequestStatus] = useState<
    'idle' | 'loading'
  >('idle');
  const [sendOrderRequestStatus, setSendOrderRequestStatus] = useState<
    'idle' | 'loading'
  >('idle');

  const { data, status, error } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleRemove = async (id: string) => {
    try {
      setDeleteProductRequestStatus('loading');
      disableBodyScroll(document.body);
      await dispatch(removeProductCartApi(id)).unwrap();
      toast.success('Producto eliminado del carrito');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setDeleteProductRequestStatus('idle');
      enableBodyScroll(document.body);
    }
  };

  const handleSendOrder = async () => {
    try {
      setSendOrderRequestStatus('loading');
      await dispatch(createOrder()).unwrap();
      dispatch(emptyCart());
      toast.success('Orden enviada con éxito!');
      history.push('/successful-order');
    } catch (e) {
      toast.error(
        'Hubo un error enviando la orden, por favor intente de nuevo.',
      );
    } finally {
      setSendOrderRequestStatus('idle');
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
    const totalCost = data.reduce((total, item) => {
      return (total += Number(item.producto.precio) * item.quantity);
    }, 0);
    setTotal(totalCost);
  }, [data]);

  return (
    <Container className="page-container">
      <h1 className="text-center mt-5 pt-3">Carrito</h1>
      {isEmpty(data) ? (
        status === 'loading' ? (
          <LoadingData mode={'partial'} />
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
        <>
          <ProductList
            productos={data}
            location="cart"
            handleRemove={handleRemove}
          />
          <div className="d-flex justify-content-end gap-3 align-items-center mb-3">
            <div className="border rounded p-3 bg-light">
              <span className="fw-bold">Total:</span> ${total.toFixed(2)}
            </div>
            <Button variant="primary" size="lg" onClick={handleSendOrder}>
              Enviar orden
            </Button>
          </div>
        </>
      )}
      {(deleteProductRequestStatus === 'loading' ||
        sendOrderRequestStatus === 'loading') && (
        <LoadingData
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', zIndex: 2000 }}
          mode="fullscreen"
        />
      )}
    </Container>
  );
};

export default Cart;
