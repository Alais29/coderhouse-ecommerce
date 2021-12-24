import { IOrder } from 'commons/interfaces';
import OrderInfo from 'components/OrderInfo/OrderInfo';
import { isEmpty } from 'utilities/others';

interface IOrdersList {
  orders: IOrder[];
  ordersType: 'generada' | 'completada';
  emptyMessage: string;
}

const OrdersList = ({ orders, ordersType, emptyMessage }: IOrdersList) => {
  const ordersToShow = orders.filter(order => order.estado === ordersType);
  return (
    <>
      {isEmpty(ordersToShow) ? (
        <h3 className="h4">{emptyMessage}</h3>
      ) : (
        ordersToShow.map(order => <OrderInfo order={order} key={order.id} />)
      )}
    </>
  );
};

export default OrdersList;
