import React, { useState, useRef } from 'react';
import { IUserFormData } from 'commons/interfaces';
import { Button, Form } from 'react-bootstrap';
import PhoneInput from 'react-phone-number-input';
import cx from 'classnames/bind';
import styles from './styles.module.scss';

interface ISignupForm {
  onSubmit: (data: IUserFormData, callback: () => void) => void;
}

const SignupForm = ({ onSubmit }: ISignupForm) => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    nombre: '',
    direccion: '',
    edad: '',
  });
  const [telefono, setTelefono] = useState();
  const { email, password, nombre, direccion, edad } = formValues;

  const fotoRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let fotoToUpload = null;
    if (fotoRef.current) fotoToUpload = fotoRef.current.files;

    const formData = new FormData() as IUserFormData;
    Object.entries(formValues).forEach(formElement => {
      formData.append(formElement[0], formElement[1]);
    });
    formData.append('foto', fotoToUpload ? fotoToUpload[0] : '');
    formData.append('telefono', telefono || '');

    onSubmit(formData, () => {
      setFormValues({
        email: '',
        password: '',
        nombre: '',
        direccion: '',
        edad: '',
      });
      setTelefono(undefined);
      if (fotoRef.current) fotoRef.current.value = '';
    });
  };

  return (
    <div className={cx(styles['signup-form'])}>
      <Form onSubmit={e => handleSubmit(e)}>
        <Form.Group className="mb-3" controlId="nombre">
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
        <Form.Group className="mb-3" controlId="nombre">
          <Form.Label>Nombre Completo</Form.Label>
          <Form.Control
            type="nombre"
            value={nombre}
            name="nombre"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="direccion">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="direccion"
            value={direccion}
            name="direccion"
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
        <Form.Group className="mb-3" controlId="telefono">
          <Form.Label>Teléfono</Form.Label>
          <PhoneInput
            placeholder="Enter phone number"
            value={telefono}
            name="telefono"
            onChange={setTelefono as (value?: unknown) => void}
          />
        </Form.Group>
        <Form.Group controlId="foto" className="mb-3">
          <Form.Label>Foto</Form.Label>
          <Form.Control type="file" ref={fotoRef} name="foto" />
        </Form.Group>
        <Button className="mb-2" type="submit">
          Registrarse
        </Button>
      </Form>
    </div>
  );
};

export default SignupForm;
