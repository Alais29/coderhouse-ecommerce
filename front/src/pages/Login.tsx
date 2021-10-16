import React, { useState } from 'react'
import { Alert, Button } from 'react-bootstrap'
import { loginUser, logoutUser } from 'services/Login';
import { Link } from 'react-router-dom';
import { IUser } from 'commons/interfaces';
import LoginForm from 'components/LoginForm/LoginForm'

interface ILogin {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  loggedIn: boolean
  setLoggedInUser: React.Dispatch<React.SetStateAction<string>>
  loggedInUser: string
}

const Login = ({ setLoggedIn, loggedIn, loggedInUser, setLoggedInUser }: ILogin) => {
  const [logoutMessage, setLogoutMessage] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = (data: IUser) => {
    loginUser(data).then((res) => {
      setLoggedIn(true);
      setLoggedInUser(res.user.username)
    }).catch((e) => {
      setLoginError(true)
      setTimeout(() => {
        setLoginError(false)
      }, 3000)
    })
  }

  const handleLogout = () => {
    logoutUser().then(() => {
      setLoggedIn(false)
      setLogoutMessage(`Hasta luego ${loggedInUser}`)
      setTimeout(() => {
        setLogoutMessage('')
        setLoggedInUser('')
      }, 2000)
    })
  }

  return (
    <>
      <h1 className="text-center mt-5 pt-3">Login de Usuario</h1>
      {loginError && 
        <Alert variant='danger'>
          <span className="me-3">Hubo un error, por favor verifique su usuario y contraseña</span>
        </Alert>
      }
      {logoutMessage &&
        <Alert variant='primary'>
          <span className="me-3">{logoutMessage}</span>
        </Alert>
      }
      {loggedIn
        ? <Alert variant='success'>
          <span className="me-3">Bienvenido/a {loggedInUser}</span>
          <Button onClick={handleLogout}>Logout</Button>
        </Alert>
        : <>
          <LoginForm onSubmit={handleSubmit} btnText='Login' />
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
