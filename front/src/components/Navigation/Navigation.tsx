import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from 'react-bootstrap'

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container>
        <Nav className="me-auto">
          <Link className="nav-link" to="/">Inicio</Link>
          <Link className="nav-link" to="/add-product">Agregar Producto</Link>
          <Link className="nav-link ms-auto" to="/cart">Carrito</Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Navigation
