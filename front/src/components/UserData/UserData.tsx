import { IUser } from 'commons/interfaces';
import { Alert, Button } from 'react-bootstrap';
import cx from 'classnames/bind';
import styles from './styles.module.scss';

interface IUserData {
  data: IUser;
  dashboard?: boolean;
  handleLogout?: () => Promise<void>;
  status?: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const UserData = ({ data, dashboard, handleLogout, status }: IUserData) => {
  return (
    <div>
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
          {dashboard && (
            <Button
              onClick={status === 'loading' ? undefined : handleLogout}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Procesando...' : 'Logout'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserData;
