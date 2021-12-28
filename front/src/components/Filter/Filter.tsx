import { useState } from 'react';
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

  // const { data, status, error } = useAppSelector(state => state.products);
  const dispatch = useAppDispatch();

  const { nombre, codigo, minPrice, maxPrice, minStock, maxStock } = formValues;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValuesCopy = copyObj(formValues);
    const notEmptyFields = Object.entries(formValuesCopy).filter(
      item => item[1] !== '',
    );

    dispatch(fetchProducts(Object.fromEntries(notEmptyFields)));
  };

  return (
    <div className={cx(styles['filter-container'])}>
      <h2 className="text-center pt-4">Filtra tu búsqueda</h2>
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
                placeholder="Código"
              />
              <label htmlFor="codigo">Código</label>
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
                placeholder="Precio Mínimo"
              />
              <label htmlFor="minPrice">Precio Mínimo</label>
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
                placeholder="Precio Máximo"
              />
              <label htmlFor="maxPrice">Precio Máximo</label>
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
                placeholder="Stock Mínimo"
              />
              <label htmlFor="minStock">Stock Mínimo</label>
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
                placeholder="Stock Máximo"
              />
              <label htmlFor="maxStock">Stock Máximo</label>
            </Form.Floating>
          </Col>
        </Row>
        <Button type="submit">Buscar</Button>
      </Form>
    </div>
  );
};

export default Filter;
