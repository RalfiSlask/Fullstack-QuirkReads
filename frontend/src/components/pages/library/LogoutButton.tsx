import { useContext } from 'react';
import { LoginContext } from '../../../context/LoginContext';

const LogoutButton = () => {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    return;
  }

  const { setUserName, setCartOrders } = loginContext;

  const handleClickOnLogout = () => {
    setUserName('');
    localStorage.removeItem('user');
    setCartOrders({ user: '', products: [] });
  };

  return (
    <button onClick={handleClickOnLogout} className="text-lg hover:text-gray-400">
      Logout
    </button>
  );
};

export default LogoutButton;
