import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { IObject, IUserFormData } from 'commons/interfaces';
import PhoneInput from 'react-phone-number-input';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { userLogin, userSignUp } from 'features/user/userSlice';

import cx from 'classnames/bind';
import styles from './styles.module.scss';

interface ISignupForm {
  location: 'dashboard' | 'signupPage';
}

const SignupForm = ({ location }: ISignupForm) => {
  const { data: dataUser } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const history = useHistory();

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    repeatPassword: '',
    nombre: '',
    calle: '',
    altura: '',
    codigoPostal: '',
    piso: '',
    depto: '',
    edad: '',
    admin: 'false',
  });
  const [telefono, setTelefono] = useState();
  const {
    email,
    password,
    repeatPassword,
    nombre,
    calle,
    altura,
    codigoPostal,
    piso,
    depto,
    edad,
    admin,
  } = formValues;

  const fotoRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let fotoToUpload = null;
    if (fotoRef.current) fotoToUpload = fotoRef.current.files;

    const formData = new FormData() as IUserFormData;
    Object.entries(formValues).forEach(formElement => {
      formData.append(formElement[0], formElement[1]);
    });
    formData.append('foto', fotoToUpload ? fotoToUpload[0] : '');
    formData.append('telefono', telefono || '');

    try {
      await dispatch(userSignUp(formData)).unwrap();
      setFormValues({
        email: '',
        password: '',
        repeatPassword: '',
        nombre: '',
        calle: '',
        altura: '',
        codigoPostal: '',
        piso: '',
        depto: '',
        edad: '',
        admin: 'false',
      });
      setTelefono(undefined);
      if (fotoRef.current) fotoRef.current.value = '';

      toast.success('¡Registro Exitoso!');

      if (location === 'signupPage') {
        const dataObj: IObject = {};
        formData.forEach((value, key) => (dataObj[key] = value));

        const loginData = {
          email: dataObj.email as string,
          password: dataObj.password as string,
        };

        await dispatch(userLogin(loginData)).unwrap();
        history.push('/account');
      }
    } catch (e) {
      const message =
        e.message === 'Missing credentials'
          ? 'Todos los campos son obligatorios'
          : e.message;
      toast.error(message);
    }
  };

  return (
    <div className={cx(styles['signup-form'])}>
      <Form onSubmit={e => handleSubmit(e)}>
        <Row>
          <Col sm="12" md="6">
            <Form.Group className="mb-3" controlId="nombreSignup">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control
                type="nombre"
                value={nombre}
                name="nombre"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="edad">
              <Form.Label>Edad</Form.Label>
              <Form.Control
                type="edad"
                value={edad}
                name="edad"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                value={email}
                name="email"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={password}
                name="password"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="repeatPassword">
              <Form.Label>Repite tu contraseña</Form.Label>
              <Form.Control
                type="password"
                value={repeatPassword}
                name="repeatPassword"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="telefono">
              <Form.Label>Teléfono</Form.Label>
              <PhoneInput
                placeholder="Enter phone number"
                value={telefono}
                name="telefono"
                onChange={setTelefono as (value?: unknown) => void}
              />
            </Form.Group>
          </Col>
          <Col sm="12" md="6">
            <Form.Group className="mb-3" controlId="calle">
              <Form.Label>Calle</Form.Label>
              <Form.Control
                type="calle"
                value={calle}
                name="calle"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="altura">
              <Form.Label>Altura</Form.Label>
              <Form.Control
                type="altura"
                value={altura}
                name="altura"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="codigoPostal">
              <Form.Label>Código Postal</Form.Label>
              <Form.Control
                type="codigoPostal"
                value={codigoPostal}
                name="codigoPostal"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="piso">
              <Form.Label>Piso (opcional)</Form.Label>
              <Form.Control
                type="piso"
                value={piso}
                name="piso"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="depto">
              <Form.Label>Departamento (opcional)</Form.Label>
              <Form.Control
                type="depto"
                value={depto}
                name="depto"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="fotoSignup" className="mb-3">
              <Form.Label>Foto</Form.Label>
              <Form.Control type="file" ref={fotoRef} name="foto" />
            </Form.Group>
          </Col>
        </Row>
        {dataUser && dataUser.admin && (
          <Form.Group controlId="foto" className="mb-3">
            <p>¿Administrador?</p>
            <div key={`inline-radio`} className="mb-3">
              <Form.Check
                inline
                label="Si"
                name="admin"
                type="radio"
                id={`inline-radio-1`}
                value="true"
                onChange={handleChange}
                checked={admin === 'true'}
              />
              <Form.Check
                inline
                label="No"
                name="admin"
                type="radio"
                id={`inline-radio-2`}
                value="false"
                onChange={handleChange}
                checked={admin === 'false'}
              />
            </div>
          </Form.Group>
        )}
        <Button className="mb-2" type="submit">
          Registro
        </Button>
      </Form>
    </div>
  );
};

export default SignupForm;
