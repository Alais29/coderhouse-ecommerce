import { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { IItemAPI, IToastInfo } from 'commons/interfaces'
import ConfirmationModal from 'components/Modals/ConfirmationModal/ConfirmationModal'
import Notification from 'components/Notification/Notification'
import ProductList from 'components/ProductList/ProductList'
import { getProducts, deleteProduct, updateProduct } from 'services/Productos'
import { isEmpty } from 'utilities/others'
import EditModal from 'components/Modals/EditModal/EditModal'

const Productos = () => {
  const [showModal, setShowModal] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastInfo, setToastInfo] = useState<IToastInfo>({ text: '', type: '' })
  const [productToDelete, setProductToDelete] = useState<IItemAPI | null>(null)
  const [productToEdit, setProductToEdit] = useState<IItemAPI | null>(null)
  const [productos, setProductos] = useState<IItemAPI[] | []>([])

  const handleToggleShowToast = (info: IToastInfo = { text: '', type: '' }) => {
    if (!isEmpty(info.text)) {
      setToastInfo(info)
    }
    setShowToast(!showToast)
  }
  
  const handleToggleShowModal = (producto?: IItemAPI, action?: 'edit' | 'delete') => {
    if (producto && action === 'delete') setProductToDelete(producto)
    if (producto && action === 'edit') setProductToEdit(producto)
    setShowModal(!showModal)
  }

  const handleConfirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id)
        .then((res) => {
          handleToggleShowModal()
          handleToggleShowToast({ text: 'Producto eliminado con éxito', type: 'success' })
          setProductos(res)
          setProductToDelete(null)
        })
        .catch((e) => {
          handleToggleShowToast({ type: 'warning', text: e.message })
          handleToggleShowModal()
          setProductToDelete(null)
        })
    }
  }

  const handleConfirmEdit = (formValues: IItemAPI, callback: () => void) => {
    if (productToEdit) {
      updateProduct(formValues.id, formValues)
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
          setProductToEdit(null)
        })
        .catch((e) => {
          handleToggleShowToast({ type: 'warning', text: e.message })
          handleToggleShowModal()
          setProductToEdit(null)
        })
    }
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
        productos={productos}
        handleToggleShowModal={handleToggleShowModal}
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
