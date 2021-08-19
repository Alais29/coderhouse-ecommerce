import { IItemAPI } from 'commons/interfaces';
import { isEmpty } from 'utilities/others';
import Product from 'components/Product/Product';
import cx from 'classnames/bind'
import styles from './styles.module.scss'

interface IProductList {
  productos: IItemAPI[] | []
  handleToggleShowModal: (producto: IItemAPI | null) => void
}

const ProductList = ({ handleToggleShowModal, productos }: IProductList) => {
  return (
    <>
      <div className={cx(styles['product-list'], 'my-4', 'd-flex', 'flex-wrap', 'justify-content-center')}>
        {!isEmpty(productos) && productos.map((producto: IItemAPI) => (
          <Product
            key={producto.id}
            product={producto}
            handleToggleShowModal={handleToggleShowModal}
          />
        ))}
      </div>
    </>
  )
}

export default ProductList