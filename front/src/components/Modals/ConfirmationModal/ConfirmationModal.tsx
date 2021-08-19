import { Modal, Button } from 'react-bootstrap'
import { IItemAPI } from 'commons/interfaces'

interface IConfirmationModal {
  productToDelete: IItemAPI | null
  handleToggleShowModal: () => void
  handleConfirmDelete: () => void
}

const ConfirmationModal = ({ handleToggleShowModal, productToDelete, handleConfirmDelete }: IConfirmationModal) => {
  return (
    <>
      <Modal.Header>
        <Modal.Title>¿Estas seguro?</Modal.Title>
      </Modal.Header>
      <Modal.Body>¿Seguro que quieres eliminar {productToDelete?.nombre}?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleToggleShowModal()}>
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
