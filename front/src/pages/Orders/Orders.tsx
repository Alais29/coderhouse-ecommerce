import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { fetchOrders } from 'features/orders/ordersSlice';
import { isEmpty } from 'utilities/others';
import OrderInfo from 'components/OrderInfo/OrderInfo';
import LoadingData from 'components/LoadingData/LoadingData';

const Orders = () => {
  const { data, status, error } = useAppSelector(state => state.orders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchOrders());
    }
    if (status === 'failed') {
      toast.error(error || 'Ocurrió un error');
    }
  }, [dispatch, error, status]);

  return (
    <div>
      <h1 className="text-center mt-5 pt-3">Ordenes</h1>
      {isEmpty(data) ? (
        status === 'loading' ? (
          <LoadingData />
        ) : (
          <h1 className="mt-5 pt-3 mb-3">No haz realizado ninguna orden</h1>
        )
      ) : (
        <>
          <h3>En curso</h3>
          {data.map(item => {
            if (item.estado === 'generada') return <OrderInfo order={item} />;
            return null;
          })}
          <h3 className="mt-3">Completadas</h3>
          {data.map(item => {
            if (item.estado === 'completada') return <OrderInfo order={item} />;
            return null;
          })}
        </>
      )}
    </div>
  );
};

export default Orders;
