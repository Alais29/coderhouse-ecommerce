import { useState, useEffect } from 'react';
import { IItem, IAlert } from './commons/interfaces';
import { getProducts } from './services/Productos';
import { Alert, Container } from 'react-bootstrap';
import ProductForm from './components/ProductForm/ProductForm';
import ProductList from './components/ProductList/ProductList';

const App = () => {
  const [productos, setProductos] = useState<IItem[] | []>([])
  const [alert, setAlert] = useState<IAlert>({ show: false, text: '' })
  
  useEffect(() => {
    getProducts()
      .then(products => {
        setProductos(products)
        setAlert({ show: false, text: '' })
      })
      .catch((e) => {
        setAlert({show: true, text: e.message})
      })
  }, [])

  return (
    <Container>
      <ProductForm productos={productos} setProductos={setProductos} />
      {productos.length !== 0
        ? <ProductList productos={productos} />
        : alert.show && <Alert variant='danger'>{alert.text}</Alert>
      }
    </Container>
  );
}

export default App;