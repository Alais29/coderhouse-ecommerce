import { IItemAPI, IToastInfo } from '../../commons/interfaces';
import { isEmpty } from '../../utilities/others';
import Product from '../Product/Product';
import cx from 'classnames/bind'
import styles from './styles.module.scss'

interface IProductList {
  productos: IItemAPI[] | []
  setProductos: React.Dispatch<React.SetStateAction<[] | IItemAPI[]>>
  setToastInfo: React.Dispatch<React.SetStateAction<IToastInfo>>
  handleToggleShowModal: (producto: IItemAPI | null) => void
}

const ProductList = ({ setToastInfo, handleToggleShowModal, productos, setProductos }: IProductList) => {
  return (
    <>
      <div className={cx(styles['product-list'], 'my-4', 'd-flex', 'flex-wrap', 'justify-content-center')}>
        {!isEmpty(productos) && productos.map((producto: IItemAPI) => (
          <Product
            key={producto.id}
            product={producto}
            setProductos={setProductos}
            setToastInfo={setToastInfo}
            handleToggleShowModal={handleToggleShowModal}
          />
        ))}
      </div>
    </>
  )
}

export default ProductList