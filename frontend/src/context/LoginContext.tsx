import { createContext, FormEvent, ReactNode, useState } from 'react';

export const LoginContext = createContext<undefined | ILoginTypes>(undefined);

interface ILoginTypes {
  // states
  loginInputValues: {
    email: string;
    password: string;
  };
  errorMessage: string;
  // setters
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  // functions
  handleLoginReset: () => void;
  handleEmailInput: (e: FormEvent<HTMLInputElement>) => void;
  handlePasswordInput: (e: FormEvent<HTMLInputElement>) => void;
}

interface ILoginType {
  children: ReactNode;
}

export const LoginContextProvider: React.FC<ILoginType> = ({ children }) => {
  const [loginInputValues, setloginInputValues] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoginReset = () => {
    setloginInputValues({ email: '', password: '' });
    setErrorMessage('');
  };

  const handleEmailInput = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setloginInputValues(prev => ({ ...prev, email: target.value }));
    setErrorMessage('');
  };

  const handlePasswordInput = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setloginInputValues(prev => ({ ...prev, password: target.value }));
    setErrorMessage('');
  };

  const contextValues = {
    // states
    loginInputValues: loginInputValues,
    errorMessage: errorMessage,
    // setters
    setErrorMessage: setErrorMessage,
    // functions
    handleLoginReset: handleLoginReset,
    handleEmailInput: handleEmailInput,
    handlePasswordInput: handlePasswordInput,
  };

  return <LoginContext.Provider value={contextValues}>{children}</LoginContext.Provider>;
};
