import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button,
  Carousel,
  Col,
  Container,
  Row,
  Spinner,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch } from 'hooks/redux';
import { addProductToCart } from 'features/cart/cartSlice';
import { getProduct } from 'services/Productos';
import { cld } from 'services/Cloudinary';
import { IItemAPI } from 'commons/interfaces';
import { isEmpty } from 'utilities/others';
import LoadingData from 'components/LoadingData/LoadingData';

import cx from 'classnames/bind';
import styles from './styles.module.scss';

const Producto = () => {
  let { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IItemAPI>({} as IItemAPI);
  const [productImg, setProductImg] = useState<CloudinaryImage[]>([]);
  const [addToCartRequestStatus, setAddToCartRequestStatus] = useState<
    'idle' | 'loading'
  >('idle');

  const dispatch = useAppDispatch();

  useEffect(() => {
    getProduct(id).then(data => setProduct(data));
  }, [id]);

  useEffect(() => {
    if (!isEmpty(product)) {
      const productFotos: CloudinaryImage[] = [];
      product.fotosId.forEach(item => {
        const productImgCld = cld.image(`${item}`);
        productImgCld.resize(thumbnail().width(600).height(400));
        productFotos.push(productImgCld);
      });
      // const productImgCld = cld.image(`${product.fotosId[0]}`);
      // productImgCld.resize(thumbnail().width(600).height(400));
      setProductImg(productFotos);
    }
  }, [product]);

  const handleAddToCart = async () => {
    try {
      setAddToCartRequestStatus('loading');
      await dispatch(addProductToCart(product.id)).unwrap();
      toast.success(`${product.nombre} agregado al carrito`);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setAddToCartRequestStatus('idle');
    }
  };

  return (
    <Container className="page-container d-flex justify-content-center">
      <div className={cx(styles['product-details'])}>
        {isEmpty(product) || isEmpty(productImg) ? (
          <LoadingData mode="partial" />
        ) : (
          <Row className={cx('align-items-center', 'w-100')}>
            <Col md="12" lg="6">
              {productImg.length === 1 ? (
                <AdvancedImage
                  cldImg={productImg[0]}
                  plugins={[lazyload(), placeholder('blur')]}
                  className={cx(styles['product-details__image'])}
                />
              ) : (
                <Carousel
                  fade
                  nextIcon={
                    <FontAwesomeIcon
                      icon="chevron-right"
                      size="lg"
                      color="#13ad9b"
                    />
                  }
                  prevIcon={
                    <FontAwesomeIcon
                      icon="chevron-left"
                      size="lg"
                      color="#13ad9b"
                    />
                  }
                  className={cx(styles['product-details__carousel'])}
                >
                  {productImg.map(item => (
                    <Carousel.Item>
                      <div>
                        <AdvancedImage
                          cldImg={item}
                          plugins={[lazyload(), placeholder('blur')]}
                          className={cx(styles['product-details__image'])}
                        />
                      </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              )}
            </Col>
            <Col md="12" lg="6">
              <div className={cx(styles['product-details__info'])}>
                <h1 className={cx('h2', 'mb-0')}>{product.nombre}</h1>
                <p className={cx('small')}>{product.codigo}</p>
                <p>{product.descripcion}</p>
                <p
                  className={cx(styles['product-details__stock'], {
                    [styles['product-details__stock--out-stock']]:
                      Number(product.stock) === 0,
                    [styles['product-details__stock--last-units']]:
                      Number(product.stock) !== 0 && Number(product.stock) <= 5,
                  })}
                >
                  {Number(product.stock) > 0
                    ? Number(product.stock) <= 5
                      ? 'Últimas unidades!'
                      : 'En stock'
                    : 'Fuera de stock'}
                </p>
                <p>
                  <span className={cx('fw-bold')}>Categoría: </span>
                  {product.categoria}
                </p>
                <p className={cx(styles['product-details__price'])}>
                  ${product.precio}
                </p>
                <Button
                  variant="primary"
                  className={cx('w-100', {
                    disabled: Number(product.stock) === 0,
                  })}
                  onClick={
                    Number(product.stock) === 0 ? undefined : handleAddToCart
                  }
                  disabled={
                    Number(product.stock) === 0 ||
                    addToCartRequestStatus === 'loading'
                  }
                >
                  {Number(product.stock) === 0
                    ? 'Fuera de Stock'
                    : 'Agregar al carrito'}
                  {addToCartRequestStatus === 'loading' && (
                    <Spinner
                      animation="border"
                      size="sm"
                      variant="light"
                      className={cx('ms-3')}
                    />
                  )}
                </Button>
              </div>
            </Col>
          </Row>
        )}
      </div>
    </Container>
  );
};

export default Producto;
