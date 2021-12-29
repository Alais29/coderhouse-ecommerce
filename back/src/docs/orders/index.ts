import getOrders from './getOrders';
import getOrder from './getOrder';
import createOrder from './createOrder';
import completeOrder from './completeOrder';
import getAllOrders from './getAllOrders';

export default {
  '/ordenes': {
    ...getOrders,
    ...createOrder,
  },
  '/all-orders': {
    ...getAllOrders,
  },
  '/ordenes/{id}': {
    ...getOrder,
  },
  '/ordenes/complete': {
    ...completeOrder,
  },
};
