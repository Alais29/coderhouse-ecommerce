import { useState } from 'react';
import { IItemAPI } from 'commons/interfaces';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';

interface IEditModal {
  handleConfirmEdit: (formValues: IItemAPI, callback: () => void) => void;
  productToEdit: IItemAPI;
  handleToggleShowModal: () => void;
  editRequestStatus: 'idle' | 'loading';
}

const EditModal = ({
  handleToggleShowModal,
  productToEdit,
  handleConfirmEdit,
  editRequestStatus,
}: IEditModal) => {
  const [formValues, setFormValues] = useState({
    codigo: productToEdit.codigo,
    nombre: productToEdit.nombre,
    descripcion: productToEdit.descripcion,
    precio: productToEdit.precio,
    stock: productToEdit.stock,
    foto: productToEdit.foto,
  });
  const { codigo, nombre, descripcion, precio, stock, foto } = formValues;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const editedProduct = {
      ...productToEdit,
      ...formValues,
    };
    handleConfirmEdit(editedProduct, () => {
      setFormValues({
        codigo: '',
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        foto: '',
      });
    });
  };

  return (
    <>
      <Modal.Header>
        <Modal.Title>Editar producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="codigo">
            <Form.Label>Código</Form.Label>
            <Form.Control
              type="text"
              value={codigo}
              name="codigo"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={nombre}
              name="nombre"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="descripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="textarea"
              value={descripcion}
              name="descripcion"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="precio">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="text"
              value={precio}
              name="precio"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="stock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="text"
              value={stock}
              name="stock"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="foto">
            <Form.Label>URL de imagen</Form.Label>
            <Form.Control
              type="url"
              value={foto}
              name="foto"
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => handleToggleShowModal()}
          disabled={editRequestStatus === 'loading'}
        >
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={editRequestStatus === 'loading'}
        >
          Editar{' '}
          {editRequestStatus === 'loading' && (
            <Spinner animation="border" size="sm" variant="light" />
          )}
        </Button>
      </Modal.Footer>
    </>
  );
};

export default EditModal;
