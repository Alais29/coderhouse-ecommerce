import { Modal, Button, Spinner } from 'react-bootstrap';
import { IItemAPI } from 'commons/interfaces';

interface IConfirmationModal {
  productToDelete: IItemAPI | null;
  handleToggleShowModal: () => void;
  handleConfirmDelete: () => void;
  deleteRequestStatus: 'idle' | 'loading';
}

const ConfirmationModal = ({
  handleToggleShowModal,
  productToDelete,
  handleConfirmDelete,
  deleteRequestStatus,
}: IConfirmationModal) => {
  return (
    <>
      <Modal.Header>
        <Modal.Title>¿Estas seguro?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Seguro que quieres eliminar {productToDelete?.nombre}?
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => handleToggleShowModal()}
          disabled={deleteRequestStatus === 'loading'}
        >
          Cancelar
        </Button>
        <Button
          variant="danger"
          onClick={handleConfirmDelete}
          disabled={deleteRequestStatus === 'loading'}
        >
          Eliminar{' '}
          {deleteRequestStatus === 'loading' && (
            <Spinner animation="border" size="sm" variant="light" />
          )}
        </Button>
      </Modal.Footer>
    </>
  );
};

export default ConfirmationModal;
