import { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { IItemAPI, IToastInfo } from '../commons/interfaces'
import ConfirmationModal from '../components/Modals/ConfirmationModal/ConfirmationModal'
import Notification from '../components/Notification/Notification'
import ProductList from '../components/ProductList/ProductList'
import { getProducts } from '../services/Productos'
import { isEmpty } from '../utilities/others'

const Productos = () => {
  const [showModal, setShowModal] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastInfo, setToastInfo] = useState<IToastInfo>({ text: '', type: '' })
  const [productToDelete, setProductToDelete] = useState<IItemAPI | null>(null)
  const [productos, setProductos] = useState<IItemAPI[] | []>([])

  const handleToggleShowToast = (info: IToastInfo = { text: '', type: '' }) => {
    setShowToast(!showToast)
    if (!isEmpty(info.text)) {
      setToastInfo(info)
    }
  }
  const handleToggleShowModal = (producto: IItemAPI | null = null) => {
    setShowModal(!showModal)
    if (producto) {
      setProductToDelete(producto)
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
  }, [setToastInfo])

  return (
    <>
      <h1 className="text-center mt-5 pt-4">Productos</h1>
      <ProductList
        productos={productos}
        setProductos={setProductos}
        setToastInfo={setToastInfo}
        handleToggleShowModal={handleToggleShowModal}
      />
      <Notification show={showToast} toggleShow={handleToggleShowToast} toastInfo={toastInfo} />
      <Modal show={showModal} onHide={() => handleToggleShowModal()} >
        <ConfirmationModal
          handleClose={handleToggleShowModal}
          productToDelete={productToDelete}
          setProductos={setProductos}
          handleToggleShowToast={handleToggleShowToast}
        />
      </Modal>
    </>
  )
}

export default Productos
