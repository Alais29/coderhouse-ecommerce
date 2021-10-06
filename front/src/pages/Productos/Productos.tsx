import { useState, useEffect } from 'react'
import { Alert, Modal, Spinner } from 'react-bootstrap'
import { IItemAPI, IToastInfo } from 'commons/interfaces'
import { isEmpty } from 'utilities/others'
import ConfirmationModal from 'components/Modals/ConfirmationModal/ConfirmationModal'
import Notification from 'components/Notification/Notification'
import ProductList from 'components/ProductList/ProductList'
import EditModal from 'components/Modals/EditModal/EditModal'
import { fetchProducts, editProduct, removeProductApi, removeProduct } from 'features/products/productsSlice'
import { addProductToCart } from 'features/cart/cartSlice'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import cx from 'classnames/bind'
import styles from './styles.module.scss'

const Productos = () => {
  const [showModal, setShowModal] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastInfo, setToastInfo] = useState<IToastInfo>({ text: '', type: '' })
  const [productToDelete, setProductToDelete] = useState<IItemAPI | null>(null)
  const [productToEdit, setProductToEdit] = useState<IItemAPI | null>(null)
  
  const { data, status, error } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  const handleToggleShowToast = (info: IToastInfo = { text: '', type: '' }) => {
    if (!isEmpty(info.text)) {
      setToastInfo(info)
    }
    setShowToast((prevState) => !prevState);
  }
  
  const handleToggleShowModal = (producto?: IItemAPI, action?: 'edit' | 'delete') => {
    if (producto && action === 'delete') {
      setProductToDelete(producto)
      setProductToEdit(null)
    }
    if (producto && action === 'edit') {
      setProductToEdit(producto)
      setProductToDelete(null)
    }
    setShowModal((prevState) => !prevState)
  }

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      try {
        await dispatch(removeProductApi(productToDelete.id)).unwrap()
        dispatch(removeProduct(productToDelete.id))
        handleToggleShowModal()
        handleToggleShowToast({ text: 'Producto eliminado con éxito', type: 'success' })
        setTimeout(() => {
          setProductToDelete(null)
        }, 1000)
      } catch (e) {
        handleToggleShowToast({ type: 'warning', text: e.message })
      }
    }
  }

  const handleConfirmEdit = async (formValues: IItemAPI, callback: () => void) => {
    const { id } = formValues
    if (productToEdit) {
      try {
        await dispatch(editProduct({ id, product: formValues })).unwrap()
        callback()
        handleToggleShowModal()
        handleToggleShowToast({ text: 'Producto editado con éxito', type: 'success' })
        setTimeout(() => {
          setProductToEdit(null)
        }, 1000)
      } catch (e) {
        handleToggleShowToast({ type: 'warning', text: e.message })
      }
    }
  }

  const handleAddToCart = async (producto: IItemAPI) => {
    try {
      await dispatch(addProductToCart(producto.id)).unwrap()
      handleToggleShowToast({ text: `${producto.nombre} agregado al carrito`, type: 'success' })
    } catch (e) {
      handleToggleShowToast({ text: e.message, type: 'warning' })
    }
  }

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [status, dispatch])

  return (
    <>
      <h1 className="text-center mt-5 pt-4">Productos</h1>
      {status === "loading" &&
        <div className={cx(styles['spinner-container'])}>
          <Spinner animation="grow" variant="primary" />
        </div>
      }
      {status === "failed" &&
        <Alert variant="danger">
          {error}
        </Alert>
      }
      {status === "succeeded" &&
        <ProductList
          location="home"
          productos={data}
          handleToggleShowModal={handleToggleShowModal}
          handleAddToCart={handleAddToCart}
        />
      }
      <Notification
        show={showToast}
        handleToggleShowToast={handleToggleShowToast}
        toastInfo={toastInfo}
      />
      <Modal show={showModal} onHide={() => handleToggleShowModal()} >
        {productToDelete &&
          <ConfirmationModal
            productToDelete={productToDelete}
            handleConfirmDelete={handleConfirmDelete}
            handleToggleShowModal={handleToggleShowModal}
          />
        }
        {productToEdit &&
          <EditModal
            productToEdit={productToEdit}
            handleConfirmEdit={handleConfirmEdit}
            handleToggleShowModal={handleToggleShowModal}
          />
        }
      </Modal>
    </>
  )
}

export default Productos
