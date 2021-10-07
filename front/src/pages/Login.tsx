import React, { useEffect, useState } from 'react'
import { Alert, Button } from 'react-bootstrap'
import { getUserData, logoutUser } from 'services/Login';
import { IUserInfo } from 'commons/interfaces';

interface ILogin {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  loggedIn: boolean
  setLoggedInUser: React.Dispatch<React.SetStateAction<IUserInfo | null>>
  loggedInUser: IUserInfo | null
}

const Login = ({ setLoggedIn, loggedIn, loggedInUser, setLoggedInUser }: ILogin) => {
  const [logoutMessage, setLogoutMessage] = useState('');

  useEffect(() => {
    getUserData()
      .then((res) => {
        if (!res.error) {
          setLoggedIn(true);
          setLoggedInUser(res);
        }
    })
  }, [setLoggedIn, setLoggedInUser])

  const handleLogout = () => {
    logoutUser().then(() => {
      setLoggedIn(false)
      setLogoutMessage(`Hasta luego ${loggedInUser?.name}`)
      setTimeout(() => {
        setLogoutMessage('')
        setLoggedInUser(null)
      }, 2000)
    })
  }

  return (
    <>
      <h1 className="text-center mt-5 pt-3">Login de Usuario</h1>
      {logoutMessage &&
        <Alert variant='primary'>
          <span className="me-3">{logoutMessage}</span>
        </Alert>
      }
      {loggedIn
        ? <Alert variant='success'>
          <div className="text-center">
            <p>Bienvenido/a</p>
            <img src={loggedInUser?.photo} alt="Profile" />
            <p className="mb-0">{loggedInUser?.name}</p>
            <p>{loggedInUser?.email}</p>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </Alert>
        : <Button className="mb-2" type="submit" as="a" href="http://localhost:8080/api/auth/login">
          Login con Facebook
        </Button>
      }
    </>
  )
}

export default Login
