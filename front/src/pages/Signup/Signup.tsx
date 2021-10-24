import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { IUserFormData, IObject } from 'commons/interfaces';
import SignupForm from 'components/SignupForm/SignupForm';
import { userLogin, userSignUp } from 'features/user/userSlice'
import { useAppDispatch } from 'hooks/redux'

const Signup = () => {
  const dispatch = useAppDispatch();

  const history = useHistory();

  const handleSubmit = async (data: IUserFormData, callback: () => void) => {
    try {
      await dispatch(userSignUp(data)).unwrap()
      callback()
      toast.success('¡Registro Exitoso!')

      const dataObj: IObject = {};
      data.forEach((value, key) => dataObj[key] = value);

      const loginData = {
        email: dataObj.email as string,
        password: dataObj.password as string,
      }

      await dispatch(userLogin(loginData)).unwrap()
      history.push("/dashboard");      
    } catch (e) {
      const message = e.message === 'Missing credentials' ? 'Todos los campos son obligatorios' : e.message
      toast.error(message);
    }
  }

  return (
    <div>
      <h1 className="text-center mt-5 pt-3">Registro de Usuario</h1>
      <ToastContainer />
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
