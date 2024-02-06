import { createContext, FormEvent, ReactNode, useState, useEffect, useCallback } from 'react';
import { ILoginFormInputValues, ICreateAccountFormInputValues, IModalType, IOrderType } from '../utils/types';

export const LoginContext = createContext<undefined | ILoginTypes>(undefined);

interface ILoginTypes {
  // states
  loginInputValues: ILoginFormInputValues;
  createAccountInputValues: ICreateAccountFormInputValues;
  loginErrorMessage: string;
  createAccountErrorMessage: string;
  loginModals: IModalType;
  userName: string;
  userId: string;
  userOrder: IOrderType;
  // setters
  setLoginErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setCreateAccountErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  // functions
  handleLoginReset: () => void;
  handleCreateAccountReset: () => void;
  handleLoginInputOnChange: (inputKey: keyof ILoginFormInputValues, e: FormEvent<HTMLInputElement>) => void;
  handleCreateAccountInputOnChange: (
    inputKey: keyof ICreateAccountFormInputValues,
    e: FormEvent<HTMLInputElement>
  ) => void;
  changeStateOfModal: (key: keyof IModalType, state: boolean) => void;
  handleCreateAnAccountOnClick: () => void;
  closeModalOnClick: () => void;
}

interface ILoginType {
  children: ReactNode;
}

export const LoginContextProvider: React.FC<ILoginType> = ({ children }) => {
  const [loginInputValues, setLoginInputValues] = useState({ email: '', password: '' });
  const [createAccountInputValues, setCreateAccountInputValues] = useState({ name: '', email: '', password: '' });
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [createAccountErrorMessage, setCreateAccountErrorMessage] = useState('');
  const [loginModals, setLoginModals] = useState<IModalType>({
    lightbox: false,
    login: false,
    create: false,
    order: false,
  });
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [userOrder, setUserOrder] = useState<IOrderType>({ user: '', products: [] });

  const token = import.meta.env.VITE_TOKEN;

  const addProductToOrder = () => {
    setUserOrder(prev => ({ ...prev, products: [...prev.products, { productId: '1', quantity: 2 }] }));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserName(JSON.parse(storedUser).name);
      setUserId(JSON.parse(storedUser).id);
    }
  }, [userName]);

  useEffect(() => {
    console.log('userId', userId);
    console.log('order:', userOrder);
  }, [userId, userOrder]);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3000/api/orders/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: userId,
          token: token,
        }),
      });
      if (response.ok) {
        const jsonData = await response.json();
        setUserOrder(jsonData);
      }
    } catch (err) {
      console.log(err, 'could not fetch orders');
    }
  }, [userId, token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId !== '') {
          await fetchOrders();
        }
      } catch (err) {
        console.log(err, 'error fetching data');
      }
    };
    fetchData();
  }, [userId, fetchOrders]);

  const handleLoginReset = () => {
    setLoginInputValues({ email: '', password: '' });
    setLoginErrorMessage('');
  };

  const changeStateOfModal = (key: keyof IModalType, state: boolean) => {
    setLoginModals(prev => ({ ...prev, [key]: state }));
  };

  const handleCreateAnAccountOnClick = () => {
    handleLoginReset();
    changeStateOfModal('create', true);
    changeStateOfModal('login', false);
  };

  const closeModalOnClick = () => {
    handleLoginReset();
    changeStateOfModal('login', false);
    changeStateOfModal('lightbox', false);
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
    loginModals: loginModals,
    userName: userName,
    userId: userId,
    userOrder: userOrder,
    // setters
    setUserName: setUserName,
    setLoginInputValues: setLoginInputValues,
    setLoginErrorMessage: setLoginErrorMessage,
    setCreateAccountErrorMessage: setCreateAccountErrorMessage,
    // functions
    handleLoginReset: handleLoginReset,
    handleCreateAccountReset: handleCreateAccountReset,
    handleLoginInputOnChange: handleLoginInputOnChange,
    handleCreateAccountInputOnChange: handleCreateAccountInputOnChange,
    changeStateOfModal: changeStateOfModal,
    handleCreateAnAccountOnClick: handleCreateAnAccountOnClick,
    closeModalOnClick: closeModalOnClick,
  };

  return <LoginContext.Provider value={contextValues}>{children}</LoginContext.Provider>;
};
