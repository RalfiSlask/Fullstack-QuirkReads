import { FormEvent, useContext } from 'react';
import ResetButton from './ResetButton';
import SubmitButton from './SubmitButton';
import { LoginContext } from '../../../context/LoginContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const loginContext = useContext(LoginContext);
  const navigate = useNavigate();

  if (!loginContext) {
    return;
  }

  const { loginInputValues, errorMessage, setErrorMessage, handleLoginReset, handleEmailInput, handlePasswordInput } =
    loginContext;

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
        setErrorMessage('user does not exist');
        return;
      }
      const jsonData = await response.json();
      if (jsonData.id) {
        localStorage.setItem('userId', jsonData.id);
        handleLoginReset();
        setErrorMessage('');
        navigate('/library');
      }
      console.log(jsonData);
    } catch (err) {
      console.log(err, 'could not post user');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = loginInputValues;
    if (email.trim().length <= 0 || password.trim().length <= 0) {
      alert('You have to fill in inputs');
    } else {
      await postLoginUser();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[300px]">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label htmlFor="email">Email</label>
            <p className="text-red-500">{errorMessage}</p>
          </div>

          <input
            onInput={handleEmailInput}
            type="text"
            spellCheck="false"
            id="email"
            placeholder="Email"
            className=" input"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            onInput={handlePasswordInput}
            type="password"
            spellCheck="false"
            id="password"
            placeholder="Password"
            className="input"
          />
        </div>
        <div className="flex justify-center gap-4">
          <SubmitButton />
          <ResetButton />
        </div>
      </form>
    </>
  );
};

export default LoginForm;
