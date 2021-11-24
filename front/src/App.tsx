import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoadingScreen from 'components/LoadingScreen/LoadingScreen';
import Navigation from 'components/Navigation/Navigation';
import Login from 'pages/Login/Login';
import Signup from 'pages/Signup/Signup';
import AddProduct from 'pages/AddProduct/AddProduct';
import Cart from 'pages/Cart/Cart';
import Productos from 'pages/Productos/Productos';
import Dashboard from 'pages/Dashboard/Dashboard';
import Chat from 'pages/Chat/Chat';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { getUserData } from 'features/user/userSlice';
import { getCookie } from 'utilities/others';
import { socket } from 'services/Socket';
import { IMessage } from 'commons/interfaces';

const App = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const { status, isLoggedIn } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const isLoggedInCookie = getCookie('connect.sid');

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

  useEffect(() => {
    socket.on('messages', data => {
      setMessages(data);
    });
  }, []);

  return (
    <Router>
      {isLoggedInCookie && (status === 'idle' || status === 'loading') ? (
        <LoadingScreen />
      ) : (
        <>
          {isLoggedIn && <Navigation />}
          <Container>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/chat">
                <Chat messages={messages} setMessages={setMessages} />
              </Route>
              <Route path="/add-product">
                {isLoggedIn ? <AddProduct /> : <Redirect to="/login" />}
              </Route>
              <Route path="/cart">
                {isLoggedIn ? <Cart /> : <Redirect to="/login" />}
              </Route>
              <Route path="/productos">
                {isLoggedIn ? <Productos /> : <Redirect to="/login" />}
              </Route>
              <Route path="/">
                {isLoggedIn ? <Dashboard /> : <Redirect to="/login" />}
              </Route>
            </Switch>
          </Container>
        </>
      )}
      <ToastContainer />
    </Router>
  );
};

export default App;
