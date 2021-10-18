import React, { useState } from 'react'
import { Alert, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { IUser } from 'commons/interfaces';
import LoginForm from 'components/LoginForm/LoginForm'
import { userLogin, setStatus, userLogout, setData } from 'features/user/userSlice'
import { useAppDispatch, useAppSelector } from 'hooks/redux'

const Login = () => {
  const [logoutMessage, setLogoutMessage] = useState('');
  const [loginError, setLoginError] = useState('');

  const { data, status, error, isLoggedIn } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleSubmit = async (data: IUser) => {
    try {
      await dispatch(userLogin(data)).unwrap()
    } catch (e) {
      setLoginError('Hubo un error, por favor verifique su usuario y/o contraseña')
      setTimeout(() => {
        dispatch(setStatus("iddle"));
        setLoginError('')
      }, 3000)
    }
  }

  const handleLogout = async () => {
    try {
      await dispatch(userLogout()).unwrap()
      setLogoutMessage(`Hasta luego ${data?.nombre}`)
      setTimeout(() => {
        setLogoutMessage('')
        dispatch(setData(null))
      }, 2000)
    } catch (e) {
      setLoginError('Hubo un error, por favor intente de nuevo.')
      setTimeout(() => {
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
      {logoutMessage &&
        <Alert variant='primary'>
          <span className="me-3">{logoutMessage}</span>
        </Alert>
      }
      {isLoggedIn
        ? <Alert variant='success'>
          <span className="me-3">Bienvenido/a {data?.nombre}</span>
          <Button
            onClick={status === "loading" ? undefined : handleLogout}
            disabled={status === "loading"}
          >
            {status === "loading" ? 'Procesando...' : 'Logout'}
          </Button>
        </Alert>
        : <>
          <LoginForm onSubmit={handleSubmit} />
          <hr />
          <div>
            <span>¿No tienes cuenta?</span>
            <Link className="btn btn-primary ms-2" to="/signup">Regístrate</Link>
          </div>
        </>
      }
    </>
  )
}

export default Login
