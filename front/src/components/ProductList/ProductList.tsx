import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap'
import { IItemAPI, IToastInfo } from '../../commons/interfaces';
import { getProducts } from '../../services/Productos';
import { isEmpty } from '../../utilities/others';
import Product from '../Product/Product';
import Notification from '../Notification/Notification';
import cx from 'classnames/bind'
import styles from './styles.module.scss'
// import ModalBase from '../Modals/ModalBase';
import ConfirmationModal from '../Modals/ConfirmationModal/ConfirmationModal';

const ProductList = () => {
  const [showModal, setShowModal] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastInfo, setToastInfo] = useState<IToastInfo>({ text: '', type: '' })
  const [productos, setProductos] = useState<IItemAPI[] | []>([])

  const handleToggleShowToast = () => setShowToast(!showToast)
  const handleToggleShowModal = () => setShowModal(!showModal)

  useEffect(() => {
    getProducts()
      .then(products => {
        setProductos(products)
      })
      .catch((e) => {
        setToastInfo({ type: 'warning', text: e.message })
      })
  }, [])

  return (
    <>
      <Notification show={showToast} toggleShow={handleToggleShowToast} toastInfo={toastInfo} />
      <h1 className="text-center mt-5 pt-4">Productos</h1>
      <div className={cx(styles['product-list'], 'my-4', 'd-flex', 'flex-wrap', 'justify-content-center')}>
        {!isEmpty(productos) && productos.map((producto: IItemAPI) => (
          <Product
            key={producto.id}
            product={producto}
            setProductos={setProductos}
            handleToggleShowToast={handleToggleShowToast}
            setToastInfo={setToastInfo}
            handleToggleShowModal={handleToggleShowModal}
          />
        ))}
      </div>
      <Modal show={showModal} handleClose={handleToggleShowModal} >
        <ConfirmationModal handleClose={handleToggleShowModal} />
      </Modal>
    </>
  )
}

export default ProductList