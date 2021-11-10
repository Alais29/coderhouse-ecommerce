import { IItemCarrito } from 'commons/interfaces';
import cx from 'classnames/bind';
import styles from './styles.module.scss';
import { Button, Form } from 'react-bootstrap';

interface IProductCarrito {
  product: IItemCarrito;
  handleRemove: (id: string) => void;
}

const ProductCarrito = ({ product, handleRemove }: IProductCarrito) => {
  const { producto } = product;

  return (
    <div
      className={cx('border', 'rounded', 'd-flex', styles['product-carrito'])}
    >
      <img
        src={producto.foto}
        alt={producto.nombre}
        className={cx(styles['product-carrito__img'])}
      />
      <div className={cx(styles['product-carrito__info-container'])}>
        <div className={cx(styles['product-carrito__info'])}>
          <h3>{producto.nombre}</h3>
          <p>{producto.descripcion}</p>
          <div className={cx('d-flex', 'gap-2', 'align-items-center')}>
            <div className={cx(styles['product-carrito__qty'])}>
              <Form>
                <Form.Group
                  className={cx(
                    'mb-3',
                    'd-flex',
                    'align-items-center',
                    'gap-2',
                  )}
                  controlId="nombre"
                >
                  <Form.Label>Cantidad</Form.Label>
                  <Form.Control
                    type="text"
                    value={product.quantity}
                    name="email"
                    // onChange={handleChange}
                    disabled={true}
                  />
                </Form.Group>
              </Form>
            </div>
            <p className={styles['product-carrito__price']}>
              ${Number(producto.precio) * product.quantity}
            </p>
          </div>
        </div>
        <Button variant="danger" onClick={() => handleRemove(producto.id)}>
          Eliminar
        </Button>
      </div>
    </div>
  );
};

export default ProductCarrito;
