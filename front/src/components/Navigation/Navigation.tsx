import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import CartIcon from './CartIcon';
import cx from 'classnames/bind';
import styles from './styles.module.scss';

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" fixed="top" expand="sm">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Container>
          <Nav className="me-auto">
            <Link className="nav-link" to="/">
              Cuenta
            </Link>
            <Link className="nav-link" to="/productos">
              Productos
            </Link>
            <Link className="nav-link" to="/ordenes">
              Ordenes
            </Link>
            <Link className="nav-link" to="/chat">
              Chat
            </Link>
            <Link className="nav-link" to="/add-product">
              Agregar Producto
            </Link>
            <Link
              className={cx('nav-link', 'ms-sm-auto', styles['cart-icon'])}
              to="/cart"
            >
              <CartIcon />
            </Link>
          </Nav>
        </Container>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
