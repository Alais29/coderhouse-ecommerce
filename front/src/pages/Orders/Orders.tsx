import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { fetchOrders } from 'features/orders/ordersSlice';
import { isEmpty } from 'utilities/others';
import LoadingData from 'components/LoadingData/LoadingData';
import OrdersList from '../../components/OrdersList/OrdersList';

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
        status === 'succeeded' ? (
          <LoadingData />
        ) : (
          <p className="mt-5 pt-3 mb-3 text-center display-6">
            No haz realizado ninguna orden
          </p>
        )
      ) : (
        <>
          <h2>En curso</h2>
          <OrdersList
            orders={data}
            ordersType="generada"
            emptyMessage="No tienes ninguna orden en curso"
          />
          <h2 className="mt-3">Completadas</h2>
          <OrdersList
            orders={data}
            ordersType="completada"
            emptyMessage="No tienes ordenes completadas"
          />
        </>
      )}
    </div>
  );
};

export default Orders;
