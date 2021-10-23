import { useState } from "react";
import { Alert, Button } from "react-bootstrap"
import { userLogout } from 'features/user/userSlice'
import { useAppDispatch, useAppSelector } from 'hooks/redux'

const Dashboard = () => {
  const [logoutError, setLogoutError] = useState('');

  const { data, status, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(userLogout()).unwrap()
    } catch (e) {
      setLogoutError('Hubo un error, por favor intente de nuevo.')
      setTimeout(() => {
        setLogoutError('')
      }, 3000)
    }
  }

  return (
    <div>
      <h1 className="text-center mt-5 pt-4">Dashboard</h1>
      {error && 
        <Alert variant='danger'>
          <span className="me-3">{logoutError}</span>
        </Alert>
      }
      <Alert variant='success'>
        <span className="me-3">Bienvenido/a {data?.nombre}</span>
        <Button
          onClick={status === "loading" ? undefined : handleLogout}
          disabled={status === "loading"}
        >
          {status === "loading" ? 'Procesando...' : 'Logout'}
        </Button>
      </Alert>
      <p>Email: {data?.email}</p>
      <p>Direccion: {data?.direccion}</p>
      <p>Edad: {data?.edad}</p>
      <p>Teléfono: {data?.telefono}</p>
      <img src={data?.foto} alt="" />
    </div>
  )
}

export default Dashboard
