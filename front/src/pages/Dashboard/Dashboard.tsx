import { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { userLogout } from 'features/user/userSlice';
import { emptyCart } from 'features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

import cx from 'classnames/bind';
import styles from './styles.module.scss';
import { setMessages } from 'features/messages/messagesSlice';

const Dashboard = () => {
  const [logoutError, setLogoutError] = useState('');

  const { data, status, error } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(userLogout()).unwrap();
      dispatch(emptyCart());
      dispatch(setMessages([]));
    } catch (e) {
      setLogoutError('Hubo un error, por favor intente de nuevo.');
      setTimeout(() => {
        setLogoutError('');
      }, 3000);
    }
  };

  return (
    <div>
      <h1 className="text-center mt-5 pt-4">Dashboard</h1>
      {error && (
        <Alert variant="danger">
          <span className="me-3">{logoutError}</span>
        </Alert>
      )}
      <Alert variant="success">
        <div className="text-center">
          <span className="me-3 fw-bold">Bienvenido/a {data?.nombre}</span>
        </div>
      </Alert>
      <div className={cx(styles['user-data'])}>
        <img
          src={data?.foto}
          alt={`foto ${data?.nombre}`}
          className={cx(styles['user-data__img'])}
        />
        <div className={cx(styles['user-data__info'])}>
          <span>
            <span className="fw-bold">Email:</span> {data?.email}
          </span>
          <span>
            <span className="fw-bold">Direccion:</span> {data?.calle}{' '}
            {data?.altura}
            {data?.piso ? `, Piso ${data?.piso}` : ''}
            {data?.depto ? `, Depto ${data?.depto}` : ''}
          </span>
          <span>
            <span className="fw-bold">Código Postal:</span> {data?.codigoPostal}
          </span>
          <span>
            <span className="fw-bold">Edad:</span> {data?.edad}
          </span>
          <span>
            <span className="fw-bold">Teléfono:</span> {data?.telefono}
          </span>
          <Button
            onClick={status === 'loading' ? undefined : handleLogout}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Procesando...' : 'Logout'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
