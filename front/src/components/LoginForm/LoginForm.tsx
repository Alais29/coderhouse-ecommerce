import React, { useState } from 'react';
import { IUser } from 'commons/interfaces';
import { Button, Form } from 'react-bootstrap';
import { useAppSelector } from 'hooks/redux';

interface ILoginForm {
  onSubmit: (data: IUser) => void;
}

const LoginForm = ({ onSubmit }: ILoginForm) => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const { status } = useAppSelector(state => state.user);

  const { email, password } = formValues;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <div>
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
        <Button className="mb-2" type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Procesando...' : 'Login'}
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
