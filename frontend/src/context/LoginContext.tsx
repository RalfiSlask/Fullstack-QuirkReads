import { createContext, ReactNode } from 'react';

export const LoginContext = createContext<undefined | ILoginTypes>(undefined);

interface ILoginTypes {}

interface ILoginType {
  children: ReactNode;
}

export const LoginContextProvider: React.FC<ILoginType> = ({ children }) => {
  const contextValues = {};

  return <LoginContext.Provider value={contextValues}>{children}</LoginContext.Provider>;
};
