import { useState, useEffect } from 'react'
import { Alert, Modal, Spinner } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import { IItemAPI } from 'commons/interfaces'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { fetchProducts, editProduct, removeProductApi, removeProduct } from 'features/products/productsSlice'
import { addProductToCart } from 'features/cart/cartSlice'
import ConfirmationModal from 'components/Modals/ConfirmationModal/ConfirmationModal'
import ProductList from 'components/ProductList/ProductList'
import EditModal from 'components/Modals/EditModal/EditModal'
import cx from 'classnames/bind'
import styles from './styles.module.scss'

const Productos = () => {
  const [showModal, setShowModal] = useState(false)
  const [productToDelete, setProductToDelete] = useState<IItemAPI | null>(null)
  const [productToEdit, setProductToEdit] = useState<IItemAPI | null>(null)
  
  const { data, status, error } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  
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
        toast.success(`${productToDelete.nombre} eliminado con éxito`)
        setTimeout(() => {
          // since the modal only shows if there's a product to edit in productToDelete state, 
          // this setTimeout is to wait for the modal to do the closing animation before setting
          // the productToDelete state to null, otherwise the modal will dissappear abruptly
          setProductToDelete(null)
        }, 1000)
      } catch (e) {
        toast.error(e.message)
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
        toast.success('Producto editado con éxito')
        setTimeout(() => {
          // same case than for productToDelete
          setProductToEdit(null)
        }, 1000)
      } catch (e) {
        toast.error(e.message)
      }
    }
  }

  const handleAddToCart = async (producto: IItemAPI) => {
    try {
      await dispatch(addProductToCart(producto.id)).unwrap()
      toast.success(`${producto.nombre} agregado al carrito`)
    } catch (e) {
      toast.error(e.message)
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
      <ToastContainer />
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
