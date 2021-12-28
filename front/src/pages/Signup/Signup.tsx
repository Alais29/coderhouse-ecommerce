import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SignupForm from 'components/SignupForm/SignupForm';

const Signup = () => {
  return (
    <Container>
      <h1 className="text-center mt-3">Crea una cuenta</h1>
      <SignupForm location="signupPage" />
      <hr />
      <div className="mb-3">
        <span>¿Ya tienes cuenta?</span>
        <Link className="btn btn-primary ms-2" to="/login">
          Login
        </Link>
      </div>
    </Container>
  );
};

export default Signup;
