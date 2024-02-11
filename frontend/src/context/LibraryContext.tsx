import { createContext, ReactNode, useState, useEffect } from 'react';
import { IBookType, ICategoryType } from '../utils/types';

export const LibraryContext = createContext<undefined | ILibraryTypes>(undefined);

interface ILibraryTypes {
  // states
  cartState: boolean;
  books: IBookType[] | undefined;
  categories: ICategoryType[] | undefined;
  //setters
  setCategoryClicked: React.Dispatch<React.SetStateAction<string>>;
  // functions
  handleCartStateOnClick: (state: boolean) => void;
  fetchBooks: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  handleClickOnCategory: (category: string) => void;
  handleClickOnAll: () => void;
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
  const [categoryClicked, setCategoryClicked] = useState('All');

  const handleClickOnCategory = async (category: string) => {
    setCategoryClicked(category);
  };

  const handleClickOnAll = () => {
    setCategoryClicked('All');
  };

  useEffect(() => {
    const fetchData = async () => {
      if (categoryClicked === 'All') {
        try {
          await fetchBooks();
        } catch (err) {
          console.log(err, 'error fetching data');
        }
      } else {
        try {
          await fetchProductsByCategory();
        } catch (err) {
          console.log(err, 'error fetching data');
        }
      }
    };

    fetchData();
  }, [categoryClicked]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/categories');
      if (!response.ok) {
        return;
      }

      const jsonData = await response.json();
      if (jsonData) {
        setCategories(jsonData);
      }
    } catch (err) {
      console.log('could not fetch categories');
    }
  };

  const fetchProductsByCategory = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/category/${categoryClicked}`);
      if (!response.ok) {
        return;
      }
      const jsonData = await response.json();
      if (jsonData) {
        setBooks(jsonData);
      }
    } catch (err) {
      console.log('could not fetch products');
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

    // setters
    setCategoryClicked: setCategoryClicked,
    // functions
    handleCartStateOnClick: handleCartStateOnClick,
    fetchBooks: fetchBooks,
    fetchCategories: fetchCategories,
    handleClickOnCategory: handleClickOnCategory,
    handleClickOnAll: handleClickOnAll,
  };

  return <LibraryContext.Provider value={contextValues}>{children}</LibraryContext.Provider>;
};
