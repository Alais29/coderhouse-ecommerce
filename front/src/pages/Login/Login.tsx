import { useState } from 'react'
import { Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';
import { IUser } from 'commons/interfaces';
import LoginForm from 'components/LoginForm/LoginForm'
import { userLogin, setStatus } from 'features/user/userSlice'
import { useAppDispatch, useAppSelector } from 'hooks/redux'

const Login = () => {
  const [loginError, setLoginError] = useState('');

  const { error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const history = useHistory();

  const handleSubmit = async (data: IUser) => {
    try {
      await dispatch(userLogin(data)).unwrap()
      history.push("/dashboard");
    } catch (e) {
      setLoginError('Hubo un error, por favor verifique su usuario y/o contraseña')
      setTimeout(() => {
        dispatch(setStatus("iddle"));
        setLoginError('')
      }, 3000)
    }
  }

  return (
    <>
      <h1 className="text-center mt-5 pt-3">Login de Usuario</h1>
      {error && 
        <Alert variant='danger'>
          <span className="me-3">{loginError}</span>
        </Alert>
      }
      <LoginForm onSubmit={handleSubmit} />
      <hr />
      <div>
        <span>¿No tienes cuenta?</span>
        <Link className="btn btn-primary ms-2" to="/signup">Regístrate</Link>
      </div>
    </>
  )
}

export default Login
