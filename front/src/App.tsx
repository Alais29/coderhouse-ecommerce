import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from 'components/Navigation/Navigation';
import AddProduct from 'pages/AddProduct/AddProduct';
import Cart from 'pages/Cart/Cart';
import Productos from 'pages/Productos/Productos';
import Login from 'pages/Login/Login';
import Signup from 'pages/Signup/Signup';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');
  return (
    <Router>
      <Navigation loggedIn={loggedIn} />
      <Container>
        <Switch>
          <Route path="/add-product">
            <AddProduct />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/login">
            <Login
              setLoggedIn={setLoggedIn}
              loggedIn={loggedIn}
              loggedInUser={loggedInUser}
              setLoggedInUser={setLoggedInUser}
            />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/">
            <Productos />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;