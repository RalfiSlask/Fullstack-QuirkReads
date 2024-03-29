import { FormEvent, useContext } from 'react';
import ResetButton from './ResetButton';
import SubmitButton from '../../shared/SubmitButton';
import { LoginContext } from '../../../context/LoginContext';
import LoginInput from './LoginInput';

const LoginForm = () => {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    return;
  }

  const {
    loginInputValues,
    loginErrorMessage,
    setLoginErrorMessage,
    closeModalOnClick,
    setUserName,
    setCartOrders,
    setIsOrderPlaced,
  } = loginContext;

  const postLoginUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInputValues),
      });
      if (!response.ok) {
        setLoginErrorMessage('user does not exist');
        return;
      }
      const jsonData = await response.json();
      if (jsonData.id) {
        localStorage.setItem('user', JSON.stringify({ id: jsonData.id, name: jsonData.name }));
        closeModalOnClick();
        setLoginErrorMessage('');
        setUserName(jsonData.name);
        setCartOrders(prev => ({ ...prev, user: jsonData.id }));
        setIsOrderPlaced(false);
      }
    } catch (err) {
      console.log(err, 'could not post user');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = loginInputValues;
    if (email.trim().length <= 0 || password.trim().length <= 0) {
      setLoginErrorMessage('you have to fill in inputs');
    } else {
      await postLoginUser();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[300px] items-center">
        <p className="text-red-500 text-lg h-[30px]">{loginErrorMessage}</p>
        <LoginInput type="text" text="email" inputKey="email" />
        <LoginInput type="password" text="password" inputKey="password" />
        <div className="flex justify-center gap-4">
          <SubmitButton title={'Submit'} />
          <ResetButton />
        </div>
      </form>
    </>
  );
};

export default LoginForm;
