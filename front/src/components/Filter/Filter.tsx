import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useAppDispatch } from 'hooks/redux';
import { fetchProducts } from 'features/products/productsSlice';
import { copyObj } from 'utilities/others';

const Filter = () => {
  const [formValues, setFormValues] = useState({
    nombre: '',
    codigo: '',
  });

  // const { data, status, error } = useAppSelector(state => state.products);
  const dispatch = useAppDispatch();

  const { nombre, codigo } = formValues;

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
    <>
      <h2 className="text-center mt-4">Filtra tu búsqueda</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
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
          <Col>
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
        <Button type="submit">Buscar</Button>
      </Form>
    </>
  );
};

export default Filter;
