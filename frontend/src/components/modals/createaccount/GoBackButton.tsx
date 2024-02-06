import { useContext } from 'react';
import { LoginContext } from '../../../context/LoginContext';

const GoBackButton = () => {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    return;
  }

  const { changeStateOfModal } = loginContext;

  const handleClickOnGoBack = () => {
    changeStateOfModal('create', false);
    changeStateOfModal('login', true);
  };

  return (
    <button onClick={handleClickOnGoBack} className="button-primary">
      Go Back
    </button>
  );
};

export default GoBackButton;
