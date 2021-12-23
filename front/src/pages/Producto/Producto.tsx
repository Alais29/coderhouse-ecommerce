import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
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
  const [productImg, setProductImg] = useState<CloudinaryImage>();

  useEffect(() => {
    getProduct(id).then(data => setProduct(data));
  }, [id]);

  useEffect(() => {
    if (!isEmpty(product)) {
      const productImgCld = cld.image(`${product.fotosId[0]}`);
      productImgCld.resize(thumbnail().width(600).height(400));
      setProductImg(productImgCld);
    }
  }, [product]);

  return (
    <div>
      {isEmpty(product) ? (
        <LoadingData />
      ) : (
        <>
          <h1 className="text-center mt-5 pt-4">{product.nombre}</h1>
          <Row>
            <Col sm="12" md="6">
              <div className={cx(styles['product-image'])}>
                <AdvancedImage
                  cldImg={productImg as CloudinaryImage}
                  plugins={[lazyload(), placeholder('blur')]}
                />
              </div>
            </Col>
            <Col sm="12" md="6">
              <p>{product.codigo}</p>
              <p>{product.descripcion}</p>
              <p>{product.categoria}</p>
              <p>${product.precio}</p>
              <p>{Number(product.stock) > 0 ? 'En stock' : 'Fuera de stock'}</p>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default Producto;
