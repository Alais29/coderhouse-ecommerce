import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { IUser } from 'commons/interfaces';
import LoginForm from 'components/LoginForm/LoginForm';
import { userLogin } from 'features/user/userSlice';
import { useAppDispatch } from 'hooks/redux';

import cx from 'classnames/bind';
import styles from './styles.module.scss';

const Login = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = async (data: IUser) => {
    try {
      await dispatch(userLogin(data)).unwrap();
    } catch (e) {
      toast.error(
        'Hubo un error, por favor verifique su usuario y/o contraseña',
      );
    }
  };

  return (
    <Container fluid className="page-container-login">
      <Row>
        <Col
          className={cx(
            'd-flex',
            'align-items-center',
            'justify-content-center',
            styles['left-login'],
          )}
        >
          <div>
            <h1 className="text-center">Bienvenido</h1>
            <p className="text-center">
              Por favor ingresa tus datos para acceder a tu cuenta.
            </p>
            <LoginForm onSubmit={handleSubmit} />
            <hr />
            <div>
              <span>¿No tienes cuenta?</span>
              <Link className="btn btn-primary ms-2" to="/signup">
                Regístrate
              </Link>
            </div>
          </div>
        </Col>
        <Col className="pe-0 d-none d-lg-block">
          <div className={cx(styles['right-image'])}></div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
