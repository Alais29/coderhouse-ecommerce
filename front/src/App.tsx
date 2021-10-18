import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Navigation from 'components/Navigation/Navigation';
import AddProduct from 'pages/AddProduct/AddProduct';
import Cart from 'pages/Cart/Cart';
import Productos from 'pages/Productos/Productos';
import Login from 'pages/Login/Login';
import Signup from 'pages/Signup/Signup';
import { useAppSelector, useAppDispatch } from 'hooks/redux'
import { getUserData } from 'features/user/userSlice'
import { getCookie } from 'utilities/others';

const App = () => {
  const { status, isLoggedIn } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "idle") {
      const isUserLoggedIn = async () => {
        try { await dispatch(getUserData()).unwrap() }
        catch (e) { console.log(e) }
      }
      const isLoggedInCookie = getCookie('connect.sid')
      if (isLoggedInCookie) {
        isUserLoggedIn();
      }  
    }
  }, [status, dispatch])

  return (
    <Router>
      <Navigation />
      <Container>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/add-product">
            {isLoggedIn ? <AddProduct /> : <Redirect to="/login"/>}
          </Route>
          <Route path="/cart">
            {isLoggedIn ? <Cart /> : <Redirect to="/login" />}
          </Route>
          <Route path="/">
            {isLoggedIn ? <Productos /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;