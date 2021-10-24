import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { IUser } from 'commons/interfaces';
import LoginForm from 'components/LoginForm/LoginForm'
import { userLogin } from 'features/user/userSlice'
import { useAppDispatch } from 'hooks/redux'

const Login = () => {
  const dispatch = useAppDispatch();

  const history = useHistory();

  const handleSubmit = async (data: IUser) => {
    try {
      await dispatch(userLogin(data)).unwrap()
      history.push("/dashboard");
    } catch (e) {
      toast.error('Hubo un error, por favor verifique su usuario y/o contraseña')
    }
  }

  return (
    <>
      <h1 className="text-center mt-5 pt-3">Login de Usuario</h1>
      <ToastContainer />
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