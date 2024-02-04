import { createContext, FormEvent, ReactNode, useState } from 'react';
import { ILoginFormInputValues, ICreateAccountFormInputValues } from '../utils/types';

export const LoginContext = createContext<undefined | ILoginTypes>(undefined);

interface ILoginTypes {
  // states
  loginInputValues: ILoginFormInputValues;
  createAccountInputValues: ICreateAccountFormInputValues;
  loginErrorMessage: string;
  createAccountErrorMessage: string;
  // setters
  setLoginErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setCreateAccountErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  // functions
  handleLoginReset: () => void;
  handleCreateAccountReset: () => void;
  handleLoginInputOnChange: (inputKey: keyof ILoginFormInputValues, e: FormEvent<HTMLInputElement>) => void;
  handleCreateAccountInputOnChange: (
    inputKey: keyof ICreateAccountFormInputValues,
    e: FormEvent<HTMLInputElement>
  ) => void;
}

interface ILoginType {
  children: ReactNode;
}

export const LoginContextProvider: React.FC<ILoginType> = ({ children }) => {
  const [loginInputValues, setLoginInputValues] = useState({ email: '', password: '' });
  const [createAccountInputValues, setCreateAccountInputValues] = useState({ name: '', email: '', password: '' });
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [createAccountErrorMessage, setCreateAccountErrorMessage] = useState('');

  const handleLoginReset = () => {
    setLoginInputValues({ email: '', password: '' });
    setLoginErrorMessage('');
  };

  const handleCreateAccountReset = () => {
    setCreateAccountInputValues({ name: '', email: '', password: '' });
    setCreateAccountErrorMessage('');
  };

  const handleLoginInputOnChange = (inputKey: keyof ILoginFormInputValues, e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setLoginInputValues(prev => ({ ...prev, [inputKey]: target.value }));
    setLoginErrorMessage('');
  };

  const handleCreateAccountInputOnChange = (
    inputKey: keyof ICreateAccountFormInputValues,
    e: FormEvent<HTMLInputElement>
  ) => {
    const target = e.target as HTMLInputElement;
    setCreateAccountInputValues(prev => ({ ...prev, [inputKey]: target.value }));
    setCreateAccountErrorMessage('');
  };

  const contextValues = {
    // states
    loginInputValues: loginInputValues,
    createAccountInputValues: createAccountInputValues,
    loginErrorMessage: loginErrorMessage,
    createAccountErrorMessage: createAccountErrorMessage,
    // setters
    setLoginInputValues: setLoginInputValues,
    setLoginErrorMessage: setLoginErrorMessage,
    setCreateAccountErrorMessage: setCreateAccountErrorMessage,
    // functions
    handleLoginReset: handleLoginReset,
    handleCreateAccountReset: handleCreateAccountReset,
    handleLoginInputOnChange: handleLoginInputOnChange,
    handleCreateAccountInputOnChange: handleCreateAccountInputOnChange,
  };

  return <LoginContext.Provider value={contextValues}>{children}</LoginContext.Provider>;
};
