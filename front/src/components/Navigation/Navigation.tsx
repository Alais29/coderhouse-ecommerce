import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from 'react-bootstrap'
import CartIcon from "./CartIcon";
import cx from 'classnames/bind'
import styles from './styles.module.scss'

interface INavigation {
  loggedIn: boolean
}

const Navigation = ({loggedIn}: INavigation) => {
  return (
    <Navbar bg="dark" variant="dark" fixed="top" expand="sm">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Container>
          <Nav className="me-auto">
            <Link className="nav-link" to="/">Inicio</Link>
            <Link className="nav-link" to="/add-product">Agregar Producto</Link>
            <Link className="nav-link" to="/login">Login</Link>
            <Link className={cx('nav-link', 'ms-sm-auto', styles['cart-icon'])} to="/cart">
              <CartIcon />
            </Link>
          </Nav>
        </Container>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
