import { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { IItemAPI, IToastInfo } from 'commons/interfaces'
import ConfirmationModal from 'components/Modals/ConfirmationModal/ConfirmationModal'
import Notification from 'components/Notification/Notification'
import ProductList from 'components/ProductList/ProductList'
import { getProducts, deleteProduct } from 'services/Productos'
import { isEmpty } from 'utilities/others'

const Productos = () => {
  const [showModal, setShowModal] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastInfo, setToastInfo] = useState<IToastInfo>({ text: '', type: '' })
  const [productToDelete, setProductToDelete] = useState<IItemAPI | null>(null)
  const [productos, setProductos] = useState<IItemAPI[] | []>([])

  const handleToggleShowToast = (info: IToastInfo = { text: '', type: '' }) => {
    if (!isEmpty(info.text)) {
      setToastInfo(info)
    }
    setShowToast(!showToast)
  }
  
  const handleToggleShowModal = (producto: IItemAPI | null = null) => {
    if (producto) {
      setProductToDelete(producto)
    }
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
        <ConfirmationModal
          productToDelete={productToDelete}
          handleConfirmDelete={handleConfirmDelete}
          handleToggleShowModal={handleToggleShowModal}
        />
      </Modal>
    </>
  )
}

export default Productos
