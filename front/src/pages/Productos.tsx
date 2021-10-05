import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { IItemAPI, IToastInfo } from 'commons/interfaces'
import { getProducts, deleteProduct, updateProduct } from 'services/Productos'
import { saveCarritoProduct } from 'services/Carrito'
import { isEmpty } from 'utilities/others'
import ConfirmationModal from 'components/Modals/ConfirmationModal/ConfirmationModal'
import Notification from 'components/Notification/Notification'
import ProductList from 'components/ProductList/ProductList'
import EditModal from 'components/Modals/EditModal/EditModal'

import { fetchProducts } from 'features/products/productsSlice'
import { RootState } from 'store'

const Productos = () => {
  const [showModal, setShowModal] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastInfo, setToastInfo] = useState<IToastInfo>({ text: '', type: '' })
  const [productToDelete, setProductToDelete] = useState<IItemAPI | null>(null)
  const [productToEdit, setProductToEdit] = useState<IItemAPI | null>(null)
  const [productos, setProductos] = useState<IItemAPI[] | []>([])
  
  const { data, status, error } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [status, dispatch])

  const handleToggleShowToast = (info: IToastInfo = { text: '', type: '' }) => {
    if (!isEmpty(info.text)) {
      setToastInfo(info)
    }
    setShowToast(!showToast)
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
    setShowModal(!showModal)
  }

  const handleConfirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id)
        .then(() => {
          handleToggleShowModal()
          handleToggleShowToast({ text: 'Producto eliminado con éxito', type: 'success' })
          const newProducts = productos.filter(item => item.id !== productToDelete.id)
          setProductos(newProducts)
          setTimeout(() => {
            setProductToDelete(null)
          }, 1000)
        })
        .catch((e) => {
          handleToggleShowToast({ type: 'warning', text: e.message })
          handleToggleShowModal()
          setTimeout(() => {
            setProductToDelete(null)
          }, 1000)
        })
    }
  }

  const handleConfirmEdit = (formValues: IItemAPI, callback: () => void) => {
    const { id, timestamp, ...dataToUpdate } = formValues
    if (productToEdit) {
      updateProduct(id, dataToUpdate)
        .then((res) => {
          callback()
          const productToUpdateIndex = productos.map(
            (item: IItemAPI) => item.id
          ).indexOf(res.id);
          const newProductList = JSON.parse(JSON.stringify(productos))
          newProductList.splice(productToUpdateIndex, 1, res);
          setProductos(newProductList)
          handleToggleShowModal()
          handleToggleShowToast({ text: 'Producto editado con éxito', type: 'success' })
          setTimeout(() => {
            setProductToEdit(null)
          }, 1000)
        })
        .catch((e) => {
          handleToggleShowToast({ type: 'warning', text: e.message })
          handleToggleShowModal()
          setTimeout(() => {
            setProductToEdit(null)
          }, 1000)
        })
    }
  }

  const handleAddToCart = (producto: IItemAPI) => {
    saveCarritoProduct(producto.id)
      .then(() => {
        handleToggleShowToast({ text: `${producto.nombre} agregado al carrito`, type: 'success' })
      })
      .catch((e) => {
        handleToggleShowToast({ text: e.message, type: 'warning' })
      })
  }

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
      <h1 className="text-center mt-5 pt-4">Productos</h1>
      <ProductList
        location="home"
        productos={data as IItemAPI[]}
        handleToggleShowModal={handleToggleShowModal}
        handleAddToCart={handleAddToCart}
      />
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
