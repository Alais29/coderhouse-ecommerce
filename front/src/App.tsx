import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from './components/Navigation/Navigation';
import AddProduct from 'pages/AddProduct';
import Productos from './pages/Productos';

const App = () => {
  return (
    <Router>
      <Navigation />
      <Container>
        <Switch>
          <Route path="/add-product">
            <AddProduct />
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