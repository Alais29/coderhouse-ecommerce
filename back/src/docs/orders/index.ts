import getOrders from './getOrders';
import getOrder from './getOrder';
import createOrder from './createOrder';
import completeOrder from './completeOrder';

export default {
  '/ordenes': {
    ...getOrders,
    ...createOrder,
  },
  '/ordenes/{id}': {
    ...getOrder,
  },
  '/ordenes/complete': {
    ...completeOrder,
  },
};
