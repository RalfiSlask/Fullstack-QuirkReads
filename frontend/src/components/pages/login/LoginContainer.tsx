import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import { useContext } from 'react';
import { LoginContext } from '../../../context/LoginContext';

const LoginContainer = () => {
  const loginContext = useContext(LoginContext);
  const navigate = useNavigate();

  if (!loginContext) {
    return;
  }

  const { handleLoginReset } = loginContext;

  const handleCreateAnAccountOnClick = () => {
    navigate('/create');
    handleLoginReset();
  };

  return (
    <section className="w-[700px] flex flex-col gap-10 items-center rounded-xl py-10 bg-secondary shadow-gray-800 mt-[200px]">
      <h1 className="text-3xl">Login</h1>
      <LoginForm />
      <div className="flex items-center gap-4">
        <p className="text-2xl text-grayText">Not Registered Yet?</p>
        <p onClick={handleCreateAnAccountOnClick} className="text-2xl cursor-pointer">
          Create an account
        </p>
      </div>
    </section>
  );
};

export default LoginContainer;
