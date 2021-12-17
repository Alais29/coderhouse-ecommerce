import { Link } from 'react-router-dom';
import SignupForm from 'components/SignupForm/SignupForm';

const Signup = () => {
  return (
    <div>
      <h1 className="text-center mt-3">Registro de Usuario</h1>
      <SignupForm location="signupPage" />
      <hr />
      <div className="mb-3">
        <span>¿Ya tienes cuenta?</span>
        <Link className="btn btn-primary ms-2" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
