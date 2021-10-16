import { IUser } from 'commons/interfaces';
import LoginForm from 'components/LoginForm/LoginForm';
import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { signupUser } from 'services/Login';

const Signup = () => {
  const [signedUp, setSignedUp] = useState(false);
  const [signInError, setSignInError] = useState(false);

  const handleSubmit = (data: IUser) => {
    signupUser(data).then((res) => {
      setSignedUp(true);
      setTimeout(() => {
        setSignedUp(false);
      }, 2000)
    }).catch((e) => {
      setSignInError(true);
      setTimeout(() => {
        setSignInError(false);
      }, 2000)
    })
  }

  return (
    <div>
      <h1 className="text-center mt-5 pt-3">Registro de Usuario</h1>
      {signedUp &&
        <Alert variant='success'>
          <span className="me-3">¡Registro exitoso!</span>
        </Alert>
      }
      {signInError &&
        <Alert variant='danger'>
          <span className="me-3">Hubo un error, por favor intente con otro nombre de usuario</span>
        </Alert>
      }
      <LoginForm onSubmit={handleSubmit} btnText='Registrar' />
      <hr />
      <div>
        <span>¿Ya tienes cuenta?</span>
        <Link className="btn btn-primary ms-2" to="/login">Login</Link>
      </div>
    </div>
  )
}

export default Signup
