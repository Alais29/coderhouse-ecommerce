import { Modal, Button } from 'react-bootstrap'

interface IModal {
  handleClose: () => void,
}

const ConfirmationModal = ({ handleClose }: IModal) => {
  return (
    <>
      <Modal.Header>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </>
  )
}

export default ConfirmationModal
