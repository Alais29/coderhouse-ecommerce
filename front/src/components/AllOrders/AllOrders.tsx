import { useEffect, useMemo, useState } from 'react';
import { Cell } from 'react-table';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { IObject, IOrder } from 'commons/interfaces';
import { fetchAllOrders, finishOrder } from 'features/orders/ordersSlice';
import CustomTable from 'components/CustomTable/CustomTable';
import LoadingData from 'components/LoadingData/LoadingData';

interface IOrderData {
  id: string;
  email: string;
  timestamp: string;
  estado: string;
}

const AllOrders = () => {
  const [finishOrderStatus, setFinishOrderStatus] = useState<
    'idle' | 'loading'
  >('idle');
  const { allOrders, allOrdersStatus, allOrdersError } = useAppSelector(
    state => state.orders,
  );
  const dispatch = useAppDispatch();

  const data = useMemo(() => {
    const tableData: IOrderData[] = allOrders.reduce(
      (finalData: IOrderData[], order: IOrder) => {
        finalData.push({
          id: order.id,
          email: order.user.email,
          timestamp: order.timestamp,
          estado: order.estado,
        });
        return finalData;
      },
      [],
    );
    return tableData;
  }, [allOrders]);

  const columns = useMemo(() => {
    const handleComplete = async (orderId: string) => {
      try {
        setFinishOrderStatus('loading');
        await dispatch(finishOrder(orderId)).unwrap();
        toast.success(`Orden completada con éxito`);
      } catch (e) {
        toast.error(e.message);
      } finally {
        setFinishOrderStatus('idle');
      }
    };

    return [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Email Usuario',
        accessor: 'email',
      },
      {
        Header: 'Fecha de compra',
        accessor: 'timestamp',
        Cell: ({ value }: { value: string }) =>
          moment(value).format('DD-MM-YYYY hh:mm:ss'),
      },
      {
        Header: 'Estado',
        accessor: 'estado',
        Cell: ({ value }: { value: string }) =>
          value.charAt(0).toUpperCase() + value.slice(1),
      },
      {
        id: 'complete',
        accessor: 'complete',
        Cell: ({ cell }: { cell: Cell }) => {
          const orderId = cell.row.cells[0].value;
          const orderState = cell.row.cells[3].value;
          return (
            <Button
              disabled={orderState === 'completada'}
              onClick={() => handleComplete(orderId)}
            >
              {orderState === 'completada' ? 'Orden completada' : 'Completar'}
            </Button>
          );
        },
      },
    ];
  }, [dispatch]);

  useEffect(() => {
    if (allOrdersStatus === 'idle') {
      dispatch(fetchAllOrders()).unwrap();
    }
    if (allOrdersStatus === 'failed') {
      toast.error(allOrdersError || 'Ocurrió un error');
    }
  }, [dispatch, allOrdersStatus, allOrdersError]);

  return (
    <>
      {finishOrderStatus === 'loading' && (
        <LoadingData
          mode="fullscreen"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', zIndex: 2000 }}
        />
      )}
      <CustomTable
        data={data as unknown as IObject[]}
        columns={columns}
        searchPlaceholderItem="ordenes"
      />
    </>
  );
};

export default AllOrders;
