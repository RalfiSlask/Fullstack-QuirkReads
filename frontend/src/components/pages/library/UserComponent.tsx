import userLogo from '../../../assets/icons/user.svg';
import { useContext } from 'react';
import { LoginContext } from '../../../context/LoginContext';

const UserComponent = () => {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    return null;
  }

  const { changeStateOfModal, userName } = loginContext;

  const handleClickOnLogin = () => {
    changeStateOfModal('lightbox', true);
    changeStateOfModal('login', true);
  };

  return (
    <div className="flex items-center gap-4">
      <img src={userLogo} width="40" height="40" alt="user logo" className="rounded-full" />
      {userName.length > 0 ? (
        <p className="text-2xl">{userName}</p>
      ) : (
        <button onClick={handleClickOnLogin} className="text-2xl">
          Login
        </button>
      )}
    </div>
  );
};

export default UserComponent;
