import { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useAppDispatch } from 'hooks/redux';
import { fetchProducts } from 'features/products/productsSlice';
import { copyObj } from 'utilities/others';

import cx from 'classnames/bind';
import styles from './styles.module.scss';

const Filter = () => {
  const [formValues, setFormValues] = useState({
    nombre: '',
    codigo: '',
    minPrice: '',
    maxPrice: '',
    minStock: '',
    maxStock: '',
  });

  const dispatch = useAppDispatch();

  const { nombre, codigo, minPrice, maxPrice, minStock, maxStock } = formValues;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValuesCopy = copyObj(formValues);
    const notEmptyFields = Object.entries(formValuesCopy).filter(
      item => item[1] !== '',
    );
    try {
      await dispatch(
        fetchProducts(Object.fromEntries(notEmptyFields)),
      ).unwrap();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleShowAll = async () => {
    try {
      setFormValues({
        nombre: '',
        codigo: '',
        minPrice: '',
        maxPrice: '',
        minStock: '',
        maxStock: '',
      });
      await dispatch(fetchProducts()).unwrap();
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className={cx(styles['filter-container'])}>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs="12" sm="6">
            <Form.Floating>
              <Form.Control
                id="nombre"
                type="text"
                value={nombre}
                onChange={handleChange}
                name="nombre"
                placeholder="Nombre"
              />
              <label htmlFor="nombre">Nombre</label>
            </Form.Floating>
          </Col>
          <Col xs="12" sm="6">
            <Form.Floating>
              <Form.Control
                id="codigo"
                type="text"
                value={codigo}
                onChange={handleChange}
                name="codigo"
                placeholder="C??digo"
              />
              <label htmlFor="codigo">C??digo</label>
            </Form.Floating>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="6" md="3">
            <Form.Floating>
              <Form.Control
                id="minPrice"
                type="text"
                value={minPrice}
                onChange={handleChange}
                name="minPrice"
                placeholder="Precio M??nimo"
              />
              <label htmlFor="minPrice">Precio M??nimo</label>
            </Form.Floating>
          </Col>
          <Col xs="12" sm="6" md="3">
            <Form.Floating>
              <Form.Control
                id="maxPrice"
                type="text"
                value={maxPrice}
                onChange={handleChange}
                name="maxPrice"
                placeholder="Precio M??ximo"
              />
              <label htmlFor="maxPrice">Precio M??ximo</label>
            </Form.Floating>
          </Col>
          <Col xs="12" sm="6" md="3">
            <Form.Floating>
              <Form.Control
                id="minStock"
                type="text"
                value={minStock}
                onChange={handleChange}
                name="minStock"
                placeholder="Stock M??nimo"
              />
              <label htmlFor="minStock">Stock M??nimo</label>
            </Form.Floating>
          </Col>
          <Col xs="12" sm="6" md="3">
            <Form.Floating>
              <Form.Control
                id="maxStock"
                type="text"
                value={maxStock}
                onChange={handleChange}
                name="maxStock"
                placeholder="Stock M??ximo"
              />
              <label htmlFor="maxStock">Stock M??ximo</label>
            </Form.Floating>
          </Col>
        </Row>
        <div className="d-flex gap-2">
          <Button type="submit">Buscar</Button>
          <Button variant="secondary" onClick={handleShowAll}>
            Mostrar todo
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Filter;
