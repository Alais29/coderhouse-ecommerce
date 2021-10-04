import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from 'components/Navigation/Navigation';
// import AddProduct from 'pages/AddProduct';
import Cart from 'pages/Cart';
import Productos from 'pages/Productos';
import Login from 'pages/Login';
import Signup from 'pages/Signup';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');
  return (
    <Router>
      <Navigation loggedIn={loggedIn} />
      <Container>
        <Switch>
          {/* <Route path="/add-product">
            <AddProduct />
          </Route> */}
          <Route path="/cart">
            <Cart setLoggedIn={setLoggedIn} />
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
            <Productos setLoggedIn={setLoggedIn} />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;