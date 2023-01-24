import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from 'hooks/redux';

import cx from 'classnames/bind';
import styles from './styles.module.scss';

const Navigation = () => {
  const { cartItemsQty } = useAppSelector(state => state.cart);

  return (
    <Navbar
      bg="dark"
      variant="dark"
      fixed="top"
      expand="sm"
      collapseOnSelect={true}
    >
      <Navbar.Toggle aria-controls="responsive-navbar-nav" className="ms-2" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Container>
          <Nav className="me-auto">
            <Navbar.Brand
              as={Link}
              to="/"
              href="/"
              className="d-none d-sm-block"
            >
              <FontAwesomeIcon icon="store" />
            </Navbar.Brand>
            <Nav.Link as={Link} to="/" href="/">
              Productos
            </Nav.Link>
            <Nav.Link as={Link} href="/ordenes" to="/ordenes">
              Ordenes
            </Nav.Link>
            <Nav.Link as={Link} href="/chat" to="/chat">
              Soporte
            </Nav.Link>
            <Link
              className={cx(
                'nav-link',
                'ms-sm-auto',
                'd-none',
                'd-sm-block',
                styles['cart-icon'],
              )}
              to="/cart"
            >
              <FontAwesomeIcon icon="shopping-cart" />
              {cartItemsQty !== 0 && (
                <span className={cx(styles['cart-badge'])}>{cartItemsQty}</span>
              )}
            </Link>
            <Link className="nav-link d-none d-sm-block" to="/account">
              <FontAwesomeIcon icon="user" />
            </Link>
          </Nav>
        </Container>
      </Navbar.Collapse>
      <Navbar.Brand
        as={Link}
        to="/"
        href="/"
        className={cx('d-sm-none', styles['brand-icon'])}
      >
        <FontAwesomeIcon icon="store" />
      </Navbar.Brand>
      <div className={cx(styles['icons-container'])}>
        <Nav className={cx('d-sm-none')}>
          <Link
            className={cx('nav-link', 'ms-sm-auto', styles['cart-icon'])}
            to="/cart"
          >
            <FontAwesomeIcon icon="shopping-cart" />
            {cartItemsQty !== 0 && (
              <span
                className={cx(
                  styles['cart-badge'],
                  styles['cart-badge--mobile'],
                )}
              >
                {cartItemsQty}
              </span>
            )}
          </Link>
          <Link className="nav-link" to="/account">
            <FontAwesomeIcon icon="user" />
          </Link>
        </Nav>
      </div>
    </Navbar>
  );
};

export default Navigation;
