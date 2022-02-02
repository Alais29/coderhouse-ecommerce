import { useEffect } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useIdleTimer } from 'react-idle-timer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import LoadingData from 'components/LoadingData/LoadingData';
import Navigation from 'components/Navigation/Navigation';
import Helmet from 'components/Helmet/Helmet';
import Footer from 'components/Footer/Footer';
import Login from 'pages/Login/Login';
import Signup from 'pages/Signup/Signup';
import Cart from 'pages/Cart/Cart';
import Productos from 'pages/Productos/Productos';
import Producto from 'pages/Producto/Producto';
import Account from 'pages/Account/Account';
import Chat from 'pages/Chat/Chat';
import Orders from 'pages/Orders/Orders';
import SuccesfulOrder from 'pages/SuccessfulOrder/SuccesfulOrder';
import { getCookie } from 'utilities/others';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import useHasMounted from 'hooks/useHasMounted';
import { getUserData, userLogout } from 'features/user/userSlice';
import { emptyCart } from 'features/cart/cartSlice';
import { setMessages } from 'features/messages/messagesSlice';
import { emptyOrders } from 'features/orders/ordersSlice';

library.add(fas);

const App = () => {
  const { status, isLoggedIn } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const isLoggedInCookie = getCookie('connect.sid');

  const hasMounted = useHasMounted();

  useIdleTimer({
    timeout: 1000 * 60 * 5,
    onIdle: async () => {
      await dispatch(userLogout());
      dispatch(emptyCart());
      dispatch(setMessages({ data: [], status: 'idle' }));
      dispatch(emptyOrders());
      localStorage.removeItem('cartQty');
    },
    debounce: 500,
    crossTab: {
      emitOnAllTabs: true,
    },
  });

  useEffect(() => {
    if (isLoggedInCookie && status === 'idle') {
      const getUserInfo = async () => {
        try {
          await dispatch(getUserData()).unwrap();
        } catch (e) {
          console.log(e);
        }
      };
      getUserInfo();
    }
  }, [status, dispatch, isLoggedInCookie]);

  return (
    <Router>
      <Helmet />
      {isLoggedInCookie &&
      (status === 'idle' || status === 'loading') &&
      hasMounted ? (
        <LoadingData mode={'fullscreen'} />
      ) : (
        <>
          {isLoggedIn && <Navigation />}
          <Switch>
            <Route path="/login">
              {isLoggedIn ? <Redirect to="/" /> : <Login />}
            </Route>
            <Route path="/signup">
              {isLoggedIn ? <Redirect to="/" /> : <Signup />}
            </Route>
            <Route path="/chat">
              {isLoggedIn ? <Chat /> : <Redirect to="/login" />}
            </Route>
            <Route path="/cart">
              {isLoggedIn ? <Cart /> : <Redirect to="/login" />}
            </Route>
            <Route path="/successful-order">
              {isLoggedIn ? <SuccesfulOrder /> : <Redirect to="/login" />}
            </Route>
            <Route path="/ordenes">
              {isLoggedIn ? <Orders /> : <Redirect to="/login" />}
            </Route>
            <Route path="/account">
              {isLoggedIn ? <Account /> : <Redirect to="/login" />}
            </Route>
            <Route path="/productos/:id">
              {isLoggedIn ? <Producto /> : <Redirect to="/login" />}
            </Route>
            <Route path="/">
              {isLoggedIn ? <Productos /> : <Redirect to="/login" />}
            </Route>
          </Switch>
          <Footer />
        </>
      )}
      <ToastContainer />
    </Router>
  );
};

export default App;
