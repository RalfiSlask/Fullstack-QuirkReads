import { useContext } from 'react';
import { LoginContext } from '../../../context/LoginContext';

const ResetButton = () => {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    return;
  }

  const { handleLoginReset } = loginContext;

  return (
    <button onClick={handleLoginReset} type="reset" className="button-primary">
      Reset
    </button>
  );
};

export default ResetButton;
