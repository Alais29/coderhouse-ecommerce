import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from './components/Navigation/Navigation';
import ProductForm from './components/ProductForm/ProductForm';
import ProductList from './components/ProductList/ProductList';

const App = () => {
  return (
    <Router>
      <Navigation />
      <Container>
        <Switch>
          <Route path="/add-product">
            <ProductForm />
          </Route>
          <Route path="/">
            <ProductList />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;