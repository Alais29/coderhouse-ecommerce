import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { IUserFormData } from 'commons/interfaces';
import SignupForm from 'components/SignupForm/SignupForm';
import { userSignUp } from 'features/user/userSlice'
import { useAppDispatch } from 'hooks/redux'

const Signup = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = async (data: IUserFormData, callback: () => void) => {
    try {
      await dispatch(userSignUp(data)).unwrap()
      callback()
      toast.success('¡Registro Exitoso!')
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
