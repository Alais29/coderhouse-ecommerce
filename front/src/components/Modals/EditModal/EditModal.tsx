import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IItemAPI, IItemAPIFormData } from 'commons/interfaces';
import { useAppDispatch } from 'hooks/redux';
import { editProduct } from 'features/products/productsSlice';
import {
  Button,
  Form,
  Modal,
  OverlayTrigger,
  Spinner,
  Tooltip,
} from 'react-bootstrap';

import cx from 'classnames/bind';
import styles from './styles.module.scss';

interface IEditModal {
  productToEdit: IItemAPI;
  handleToggleShowModal: () => void;
  setProductToEdit: React.Dispatch<React.SetStateAction<IItemAPI | null>>;
}

const EditModal = ({
  handleToggleShowModal,
  productToEdit,
  setProductToEdit,
}: IEditModal) => {
  const [editRequestStatus, setEditRequestStatus] = useState<
    'idle' | 'loading'
  >('idle');
  const [formValues, setFormValues] = useState({
    codigo: productToEdit.codigo,
    nombre: productToEdit.nombre,
    categoria: productToEdit.categoria,
    descripcion: productToEdit.descripcion,
    precio: productToEdit.precio,
    stock: productToEdit.stock,
    foto: productToEdit.foto,
  });

  const { codigo, nombre, descripcion, precio, categoria, stock, foto } =
    formValues;
  const fotoRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'foto' && fotoRef.current && fotoRef.current.files) {
      setFormValues({
        ...formValues,
        foto: URL.createObjectURL(fotoRef.current.files[0]),
      });
    } else {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleChangeImage = () => {
    if (fotoRef.current) fotoRef.current.click();
  };

  const handleSubmit = async () => {
    const editedProduct = {
      ...productToEdit,
      ...formValues,
    };
    let fotoToUpload = null;

    if (fotoRef.current) fotoToUpload = fotoRef.current.files;

    const formData = new FormData() as IItemAPIFormData;
    Object.entries(editedProduct).forEach(formElement => {
      formData.append(formElement[0], formElement[1]);
    });
    formData.set(
      'foto',
      fotoToUpload && fotoToUpload[0] ? fotoToUpload[0] : productToEdit.foto,
    );

    const formDataValues = [];
    for (let pair of formData.values()) {
      console.log(pair);
      formDataValues.push(pair);
    }

    const productDataUnchanged = formDataValues.every(
      value =>
        Object.values(productToEdit)
          .map(value => String(value))
          .indexOf(value as string) !== -1,
    );

    if (productDataUnchanged) {
      toast.info('No se realizó ningún cambio');
      handleToggleShowModal();
    } else {
      try {
        setEditRequestStatus('loading');
        await dispatch(
          editProduct({ id: productToEdit.id, product: formData }),
        ).unwrap();
        setFormValues({
          codigo: '',
          nombre: '',
          categoria: '',
          descripcion: '',
          precio: '',
          stock: '',
          foto: '',
        });
        handleToggleShowModal();
        toast.success(`${productToEdit.nombre} editado con éxito`);
        setTimeout(() => {
          // since the modal only shows if there's a product to edit in productToEdit state, this setTimeout is to wait for the modal to do the closing animation before setting the productToEdit state to null, otherwise the modal will dissappear abruptly
          setProductToEdit(null);
        }, 1000);
      } catch (e) {
        toast.error(e.message);
      } finally {
        setEditRequestStatus('idle');
      }
    }
  };

  return (
    <>
      <Modal.Header>
        <Modal.Title>Editar producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="codigo">
            <Form.Label>
              Código
              <OverlayTrigger
                key="right"
                placement="right"
                overlay={
                  <Tooltip id="tooltip-right-codigo">
                    Formato: 'ECOMM-xxxx-xxxx' donde cada 'x' representa un
                    número
                  </Tooltip>
                }
              >
                <span className="ms-2">
                  <FontAwesomeIcon icon="info-circle" size="xs" color="gray" />
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
          <Form.Group
            className="mb-3 d-flex gap-2 align-items-center justify-content-center flex-column"
            controlId="foto"
          >
            <img
              src={foto}
              alt={`foto-${nombre}`}
              className={cx(styles['product-image'])}
            />
            <Form.Control
              type="file"
              ref={fotoRef}
              name="foto"
              onChange={handleChange}
              className="d-none"
            />
            <Button variant="primary" onClick={handleChangeImage}>
              Cambiar Imagen
            </Button>
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
