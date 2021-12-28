import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { useAppSelector } from 'hooks/redux';
import { IItemAPI } from 'commons/interfaces';
import { cld } from 'services/Cloudinary';

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
  const { data } = useAppSelector(state => state.user);

  const productImg = cld.image(`${product.fotosId[0]}`);
  productImg.resize(thumbnail().width(300).height(300));

  return (
    <Card className={cx(styles['product-card'])}>
      <Link
        className={cx('text-decoration-none', styles['product-card__link'])}
        to={`/productos/${product.id}`}
      >
        <AdvancedImage
          cldImg={productImg}
          plugins={[lazyload(), placeholder('blur')]}
          style={{ height: '300px' }}
        />
      </Link>
      <Card.Body>
        <div>
          <Card.Title>{product.nombre}</Card.Title>
          <Card.Subtitle className="mb-2">${product.precio}</Card.Subtitle>
        </div>
        <div
          className={cx('d-flex', 'flex-column', styles['product-card__btns'])}
        >
          {data && data.admin && (
            <div
              className={cx('d-flex', 'mt-2', styles['product-card__add-edit'])}
            >
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
          )}
          <Button
            variant="primary"
            onClick={() => handleAddToCart(product)}
            className={cx({
              disabled: Number(product.stock) === 0,
            })}
            disabled={Number(product.stock) === 0}
          >
            {Number(product.stock) === 0
              ? 'Fuera de Stock'
              : 'Agregar al carrito'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;
