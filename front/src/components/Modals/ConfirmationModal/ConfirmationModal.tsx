import { Modal, Button } from 'react-bootstrap'
import { IItemAPI, IToastInfo } from '../../../commons/interfaces'
import { deleteProduct } from '../../../services/Productos'

interface IModal {
  productToDelete: IItemAPI | null
  setProductos: React.Dispatch<React.SetStateAction<[] | IItemAPI[]>>
  handleClose: () => void
  handleToggleShowToast: (info?: IToastInfo) => void
}

const ConfirmationModal = ({ handleClose, productToDelete, setProductos, handleToggleShowToast }: IModal) => {

  const handleConfirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id)
      .then((res) => {
          handleClose()
          handleToggleShowToast({ text: 'Producto eliminado con éxito', type: 'success' })
          setProductos(res)
        })
    }
  }
  return (
    <>
      <Modal.Header>
        <Modal.Title>¿Estas seguro?</Modal.Title>
      </Modal.Header>
      <Modal.Body>¿Seguro que quieres eliminar {productToDelete?.nombre}?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose()}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleConfirmDelete}>
          Eliminar
        </Button>
      </Modal.Footer>
    </>
  )
}

export default ConfirmationModal
