import React, { useState } from 'react';
import {
  Button,
  Col,
  Form,
  OverlayTrigger,
  Row,
  Spinner,
  Tooltip,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch } from 'hooks/redux';
import { addNewProduct } from 'features/products/productsSlice';
import { IItemFormData } from 'commons/interfaces';
import FileUpload from 'components/FileUpload/FileUpload';

const ProductForm = () => {
  const [addRequestStatus, setAddRequestStatus] = useState<'idle' | 'loading'>(
    'idle',
  );

  const dispatch = useAppDispatch();

  const [formValues, setFormValues] = useState({
    codigo: '',
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    stock: '',
    fotos: [] as File[],
  });
  const { codigo, nombre, descripcion, precio, categoria, stock, fotos } =
    formValues;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleDrop = (acceptedFiles: File[]) => {
    setFormValues(prevFormValues => ({
      ...prevFormValues,
      fotos: [...prevFormValues.fotos].concat(acceptedFiles),
    }));
  };

  const handleRemove = (fileToRemove: number) => {
    const newFotos = [...fotos];
    newFotos.splice(fileToRemove, 1);
    setFormValues(prevFormValues => ({
      ...prevFormValues,
      fotos: newFotos,
    }));
  };

  const handleSaveProduct = async () => {
    const formData = new FormData() as IItemFormData;
    Object.entries(formValues).forEach(formElement => {
      if (typeof formElement[1] === 'string') {
        formData.append(formElement[0], formElement[1]);
      } else {
        formElement[1].forEach(element => {
          formData.append(formElement[0], element);
        });
      }
    });

    try {
      setAddRequestStatus('loading');

      await dispatch(addNewProduct(formData)).unwrap();
      setFormValues({
        codigo: '',
        nombre: '',
        descripcion: '',
        precio: '',
        categoria: '',
        stock: '',
        fotos: [],
      });

      toast.success('El producto fue agregado con éxito');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setAddRequestStatus('idle');
    }
  };

  return (
    <>
      <Form>
        <Row>
          <Col sm="12" md="6">
            <Form.Group className="mb-3" controlId="codigo">
              <Form.Label>
                Código
                <OverlayTrigger
                  key="right"
                  placement="right"
                  overlay={
                    <Tooltip id="tooltip-right">
                      Formato: 'ECOMM-xxxx-xxxx' donde cada 'x' representa un
                      número
                    </Tooltip>
                  }
                >
                  <span className="ms-2">
                    <FontAwesomeIcon
                      icon="info-circle"
                      size="xs"
                      color="gray"
                    />
                  </span>
                </OverlayTrigger>
              </Form.Label>
              <Form.Control
                type="text"
                value={codigo}
                name="codigo"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="nombreProducto">
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
          </Col>
          <Col sm="12" md="6">
            <Form.Group className="mb-3" controlId="precio">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="text"
                value={precio}
                name="precio"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3 mt-3" controlId="categoria">
              <Form.Label>Categoria</Form.Label>
              <Form.Control
                type="text"
                value={categoria}
                name="categoria"
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
          </Col>
        </Row>
        <Form.Label>Imagen(es)</Form.Label>
        <FileUpload
          files={fotos}
          handleRemove={handleRemove}
          handleDrop={handleDrop}
        />
        <Button
          className="mb-2"
          onClick={handleSaveProduct}
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
