import { IItemAPI } from 'commons/interfaces'
import cx from 'classnames/bind'
import styles from './styles.module.scss'
import { Button } from 'react-bootstrap'

interface IProductCarrito {
  product: IItemAPI
  handleRemove: (id: string) => void
}

const ProductCarrito = ({ product, handleRemove }: IProductCarrito) => {
  return (
    <div className={cx('border', 'rounded', 'd-flex', 'align-items-center', 'justify-content-between', styles['product-carrito'])}>
      <img src={product.foto} alt={product.nombre} className={styles['product-carrito__img']} />
      <div>
        <h3>{product.nombre}</h3>
        <p>{product.descripcion}</p>
        <p className={styles['product-carrito__price']}>${product.precio}</p>
      </div>
      <Button variant="danger" onClick={() => handleRemove(product.id)}>Eliminar</Button>
    </div>
  )
}

export default ProductCarrito
