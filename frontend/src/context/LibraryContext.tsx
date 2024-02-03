import { createContext, ReactNode } from 'react';

export const LibraryContext = createContext<undefined | ILibraryTypes>(undefined);

interface ILibraryTypes {}

interface ILibraryType {
  children: ReactNode;
}

export const LibraryContextProvider: React.FC<ILibraryType> = ({ children }) => {
  const contextValues = {};

  return <LibraryContext.Provider value={contextValues}>{children}</LibraryContext.Provider>;
};
