import { useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { cld } from 'services/Cloudinary';
import { IItemCarrito } from 'commons/interfaces';
import { useAppDispatch } from 'hooks/redux';
import { editProductInCart } from 'features/cart/cartSlice';
import LoadingData from 'components/LoadingData/LoadingData';

import cx from 'classnames/bind';
import styles from './styles.module.scss';

interface IProductCarrito {
  product: IItemCarrito;
  handleRemove: (id: string) => void;
}

const ProductCarrito = ({ product, handleRemove }: IProductCarrito) => {
  const [qtyDisabled, setQtyDisabled] = useState(true);
  const [quantity, setQuantity] = useState<number | string>(product.quantity);
  const [editProductRequestStatus, setEditProductRequestStatus] = useState<
    'idle' | 'loading'
  >('idle');

  const { producto } = product;

  const dispatch = useAppDispatch();

  const productImg = cld.image(`${producto.fotosId[0]}`);
  productImg.resize(thumbnail().width(150).height(150));

  const editBtnRef = useRef<HTMLButtonElement>(null);

  const handleEdit = () => {
    setQtyDisabled(false);
  };

  const handleCancelEdit = () => {
    setQtyDisabled(true);
    setQuantity(product.quantity);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editBtnRef.current) editBtnRef.current.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };

  const handleSaveChanges = async () => {
    try {
      setEditProductRequestStatus('loading');
      disableBodyScroll(document.body);
      await dispatch(
        editProductInCart({ productId: producto.id, amount: quantity }),
      ).unwrap();
      setQtyDisabled(true);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setEditProductRequestStatus('idle');
      enableBodyScroll(document.body);
    }
  };

  return (
    <>
      {editProductRequestStatus === 'loading' && (
        <LoadingData
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', zIndex: 2000 }}
          mode="fullscreen"
        />
      )}
      <div className={cx('border', 'd-flex', styles['product-carrito'])}>
        <AdvancedImage
          cldImg={productImg}
          plugins={[lazyload(), placeholder('blur')]}
          style={{ width: '150px' }}
        />
        <div className={cx(styles['product-carrito__info-container'])}>
          <div className={cx(styles['product-carrito__info'])}>
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <div className={cx(styles['product-carrito__qty-price'])}>
              <div className={cx(styles['product-carrito__qty-form'])}>
                <Form onSubmit={handleSubmit}>
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
                      value={quantity}
                      name="email"
                      onChange={handleChange}
                      disabled={qtyDisabled}
                    />
                  </Form.Group>
                </Form>
              </div>
              <p className={cx(styles['product-carrito__price'])}>
                ${Number(producto.precio) * product.quantity}
              </p>
            </div>
          </div>
          <div className={cx(styles['product-carrito__btns'])}>
            <Button
              variant="danger"
              onClick={
                qtyDisabled
                  ? () => handleRemove(producto.id)
                  : () => handleCancelEdit()
              }
            >
              {qtyDisabled ? 'Eliminar' : 'Cancelar'}
            </Button>
            <Button
              variant={qtyDisabled ? 'primary' : 'success'}
              onClick={
                qtyDisabled ? () => handleEdit() : () => handleSaveChanges()
              }
              ref={editBtnRef}
            >
              {qtyDisabled ? 'Editar' : 'Guardar'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCarrito;
