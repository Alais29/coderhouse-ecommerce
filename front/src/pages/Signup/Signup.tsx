import { IUser } from 'commons/interfaces';
import SignupForm from 'components/SignupForm/SignupForm';
import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { signupUser } from 'services/Login';
import { userSignUp } from 'features/user/userSlice'
import { useAppDispatch, useAppSelector } from 'hooks/redux'

const Signup = () => {
  const [signedUp, setSignedUp] = useState(false);
  const [signInError, setSignInError] = useState({
    error: false,
    message: ''
  });

  const dispatch = useAppDispatch();

  const handleSubmit = async (data: IUser, callback: () => void) => {
    try {
      await dispatch(userSignUp(data)).unwrap()
      callback()
      setSignedUp(true);
      setTimeout(() => {
        setSignedUp(false);
      }, 2000)
    } catch (e) {
      const message = e.message === 'Missing credentials' ? 'Todos los campos son obligatorios' : e.message
      setSignInError({
        error: true,
        message
      });
      setTimeout(() => {
        setSignInError({
        error: false,
        message: ''
      });
      }, 3000)
    }
  }

  return (
    <div>
      <h1 className="text-center mt-5 pt-3">Registro de Usuario</h1>
      {signedUp &&
        <Alert variant='success'>
          <span className="me-3">¡Registro exitoso!</span>
        </Alert>
      }
      {signInError.error &&
        <Alert variant='danger'>
          <span className="me-3">{signInError.message}</span>
        </Alert>
      }
      <SignupForm onSubmit={handleSubmit} />
      <hr />
      <div>
        <span>¿Ya tienes cuenta?</span>
        <Link className="btn btn-primary ms-2" to="/login">Login</Link>
      </div>
    </div>
  )
}

export default Signup
