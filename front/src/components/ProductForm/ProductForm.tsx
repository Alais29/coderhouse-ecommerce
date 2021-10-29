import React, { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { IItem, IItemAPI } from 'commons/interfaces';

interface IProductForm {
  handleSaveProduct: (
    formValues: IItem | IItemAPI,
    callback: () => void,
  ) => void;
  addRequestStatus: 'idle' | 'loading';
}

const ProductForm = ({ handleSaveProduct, addRequestStatus }: IProductForm) => {
  const [formValues, setFormValues] = useState({
    codigo: '',
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    foto: '',
  });
  const { codigo, nombre, descripcion, precio, stock, foto } = formValues;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    handleSaveProduct(formValues, () => {
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
      <Form>
        <Form.Group className="mb-3" controlId="codigo">
          <Form.Label>Código</Form.Label>
          <Form.Control
            type="text"
            value={codigo}
            name="codigo"
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            Debe tener el siguiente formato: ECOM-xxxx-xxx, donde 'x'
            corresponde a números
          </Form.Text>
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
        <Button
          className="mb-2"
          onClick={handleSubmit}
          disabled={addRequestStatus === 'loading'}
        >
          Guardar{' '}
          {addRequestStatus === 'loading' && (
            <Spinner animation="border" size="sm" variant="light" />
          )}
        </Button>
      </Form>
    </>
  );
};

export default ProductForm;
