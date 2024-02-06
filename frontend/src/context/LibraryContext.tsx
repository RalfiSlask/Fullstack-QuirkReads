import { createContext, ReactNode, useState, useEffect } from 'react';
import { IBookType, ICategoryType } from '../utils/types';

export const LibraryContext = createContext<undefined | ILibraryTypes>(undefined);

interface ILibraryTypes {
  // states
  cartState: boolean;
  books: IBookType[] | undefined;
  categories: ICategoryType[] | undefined;
  // functions
  handleCartStateOnClick: (state: boolean) => void;
  fetchBooks: () => Promise<void>;
  fetchCategories: () => Promise<void>;
}

interface ILibraryType {
  children: ReactNode;
}

export const LibraryContextProvider: React.FC<ILibraryType> = ({ children }) => {
  const [cartState, setCartState] = useState<boolean>(false);

  const handleCartStateOnClick = (state: boolean) => {
    setCartState(state);
  };

  const [books, setBooks] = useState<IBookType[]>();
  const [categories, setCategories] = useState<ICategoryType[]>();

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/categories');
      if (!response.ok) {
        return;
      }
      const jsonData = await response.json();
      setCategories(jsonData);
    } catch (err) {
      console.log('could not fetch categories');
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products');
      if (!response.ok) {
        return;
      }
      const jsonData = await response.json();
      if (jsonData) {
        setBooks(jsonData);
      }
    } catch (err) {
      console.log(err, 'could not fetch products');
      throw new Error('error fetching books');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCategories();
        await fetchBooks();
      } catch (err) {
        console.log(err, 'error fetching data');
      }
    };

    fetchData();
  }, []);

  const contextValues = {
    // states
    cartState: cartState,
    books: books,
    categories: categories,
    // functions
    handleCartStateOnClick: handleCartStateOnClick,
    fetchBooks: fetchBooks,
    fetchCategories: fetchCategories,
  };

  return <LibraryContext.Provider value={contextValues}>{children}</LibraryContext.Provider>;
};
