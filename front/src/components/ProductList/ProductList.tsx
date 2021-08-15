import { Card } from 'react-bootstrap';
import { IItem } from '../../commons/interfaces';
import cx from 'classnames/bind'
import styles from './styles.module.scss'

interface IProductList {
  productos: IItem[]
}

const ProductList = ({ productos }: IProductList) => {
  return (
    <div className={cx(styles['product-list'], 'my-4', 'd-flex', 'flex-wrap', 'justify-content-center')}>
      {productos.map((producto: IItem) => (
        <Card>
          <Card.Img variant="top" src={`${producto.foto}`} />
          <Card.Body>
            <div>
              <Card.Title>{producto.nombre}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">${producto.precio}</Card.Subtitle>
              <Card.Text>{producto.descripcion}</Card.Text>
            </div>
            <div className="text-end mt-2">
              <Card.Text><small>{producto.codigo}</small></Card.Text>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}

export default ProductList