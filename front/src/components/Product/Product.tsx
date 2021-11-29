import { Button, Card } from 'react-bootstrap';
import { IItemAPI } from 'commons/interfaces';
import cx from 'classnames/bind';
import styles from './styles.module.scss';

interface IProps {
  product: IItemAPI;
  handleToggleShowModal: (
    producto?: IItemAPI,
    action?: 'edit' | 'delete',
  ) => void;
  handleAddToCart: (producto: IItemAPI) => void;
}

const Product = ({
  product,
  handleToggleShowModal,
  handleAddToCart,
}: IProps) => {
  return (
    <Card>
      <Card.Img variant="top" src={`${product.foto}`} />
      <Card.Body>
        <div>
          <Card.Title>{product.nombre}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            ${product.precio}
          </Card.Subtitle>
          <Card.Text>{product.descripcion}</Card.Text>
        </div>
        <div className="text-end mt-2">
          <Card.Text>
            <small>{product.categoria}</small>
          </Card.Text>
        </div>
        <div className={cx('d-flex', 'flex-column', styles['product-btns'])}>
          <div className={cx('d-flex', 'mt-2', styles['product-add-edit'])}>
            <Button
              variant="danger"
              onClick={() => handleToggleShowModal(product, 'delete')}
            >
              Eliminar
            </Button>
            <Button
              variant="info"
              onClick={() => handleToggleShowModal(product, 'edit')}
            >
              Editar
            </Button>
          </div>
          <Button variant="primary" onClick={() => handleAddToCart(product)}>
            Agregar al carrito
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;
