import { Dispatch, SetStateAction } from 'react';
import { IItemAPI } from '../../commons/interfaces';
import cx from 'classnames/bind'
import styles from './styles.module.scss'
import Product from '../Product/Product';

interface IProductList {
  setProductos: Dispatch<SetStateAction<IItemAPI[]>>
  productos: IItemAPI[]
}

const ProductList = ({ productos, setProductos }: IProductList) => {
  return (
    <div className={cx(styles['product-list'], 'my-4', 'd-flex', 'flex-wrap', 'justify-content-center')}>
      {productos.map((producto: IItemAPI) => (
        <Product key={producto.id} product={producto} setProductos={setProductos}/>
      ))}
    </div>
  )
}

export default ProductList