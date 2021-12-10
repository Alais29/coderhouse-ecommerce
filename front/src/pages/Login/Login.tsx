import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IUser } from 'commons/interfaces';
import LoginForm from 'components/LoginForm/LoginForm';
import { userLogin } from 'features/user/userSlice';
import { useAppDispatch } from 'hooks/redux';

const Login = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = async (data: IUser) => {
    try {
      await dispatch(userLogin(data)).unwrap();
    } catch (e) {
      toast.error(
        'Hubo un error, por favor verifique su usuario y/o contraseña',
      );
    }
  };

  return (
    <>
      <h1 className="text-center mt-5 pt-3">Login de Usuario</h1>
      <LoginForm onSubmit={handleSubmit} />
      <hr />
      <div>
        <span>¿No tienes cuenta?</span>
        <Link className="btn btn-primary ms-2" to="/signup">
          Regístrate
        </Link>
      </div>
    </>
  );
};

export default Login;
