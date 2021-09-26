import { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { loginUser, logoutUser } from 'services/Login'

interface ILoginForm {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  loggedIn: boolean
  setLoggedInUser: React.Dispatch<React.SetStateAction<string>>
  loggedInUser: string
}

const LoginForm = ({setLoggedIn, loggedIn, loggedInUser, setLoggedInUser}: ILoginForm) => {
  const [name, setName] = useState('')
  const [logoutMessage, setLogoutMessage] = useState('');

  const handleSubmit = () => {
    loginUser(name).then((res) => {
      setLoggedIn(true);
      setLoggedInUser(res.name)
    })
  }

  const handleLogout = () => {
    logoutUser().then(() => {
      console.log('desloggeado')
      setLoggedIn(false)
      setLogoutMessage(`Hasta luego ${loggedInUser}`)
      setTimeout(() => {
        setLogoutMessage('')
        setLoggedInUser('')
      }, 2000)
    })
  }

  return (
    <div>
      {loggedIn &&
        <Alert variant='success'>
          <span className="me-3">Bienvenido/a {loggedInUser}</span>
          <Button onClick={handleLogout}>Logout</Button>
        </Alert>
      }
      {logoutMessage &&
        <Alert variant='primary'>
          <span className="me-3">{logoutMessage}</span>
        </Alert>
      }
      <Form>
        <Form.Group className="mb-3" controlId="nombre">
          <Form.Label>Ingrese su nombre</Form.Label>
          <Form.Control type="text" value={name} name="nombre" onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Button className="mb-2" onClick={handleSubmit}>
          Guardar
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
