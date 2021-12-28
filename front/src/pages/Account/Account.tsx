import { Button, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { userLogout } from 'features/user/userSlice';
import { emptyCart } from 'features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setMessages } from 'features/messages/messagesSlice';
import { emptyOrders } from 'features/orders/ordersSlice';
import UserData from 'components/UserData/UserData';
import LoadingData from 'components/LoadingData/LoadingData';
import Dashboard from 'components/Dashboard/Dashboard';

const Account = () => {
  const { data, status } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(userLogout()).unwrap();
      dispatch(emptyCart());
      dispatch(setMessages({ data: [], status: 'idle' }));
      dispatch(emptyOrders());
      localStorage.removeItem('cartQty');
    } catch (e) {
      toast.error('Hubo un error, por favor intente de nuevo.');
    }
  };

  return (
    <Container className="pb-3 page-container">
      <h1 className="text-center mt-5 pt-4">Mi cuenta</h1>
      {data === null ? (
        status === 'loading' ? (
          <LoadingData mode={'partial'} />
        ) : (
          <>
            <h1 className="mt-5 pt-3 mb-3">
              Ha ocurrido un error, intenta loggearte nuevamente
            </h1>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        )
      ) : (
        <UserData
          dashboard
          data={data}
          status={status}
          handleLogout={handleLogout}
        />
      )}
      {data !== null && data.admin && <Dashboard />}
    </Container>
  );
};

export default Account;
