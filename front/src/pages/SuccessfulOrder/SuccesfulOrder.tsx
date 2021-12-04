import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { fetchOrders } from 'features/orders/ordersSlice';
import LoadingData from 'components/LoadingData/LoadingData';
import OrderInfo from 'components/OrderInfo/OrderInfo';

const SuccesfulOrder = () => {
  const { lastOrder, status, error } = useAppSelector(state => state.orders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchOrders());
    }
    if (status === 'failed') {
      toast.error(error || 'Ocurrió un error obteniendo la última orden');
    }
  }, [dispatch, error, status]);

  return (
    <div>
      {!lastOrder ? (
        status === 'loading' ? (
          <LoadingData style={{ height: '100vh' }} />
        ) : (
          <h1 className="text-center mt-5 pt-3 mb-3">
            No tienes ordenes en curso
          </h1>
        )
      ) : (
        <>
          <h1 className="text-center mt-5 pt-3 mb-3">
            ¡Tu orden está siendo procesada!
          </h1>
          <OrderInfo order={lastOrder} />
        </>
      )}
    </div>
  );
};

export default SuccesfulOrder;
