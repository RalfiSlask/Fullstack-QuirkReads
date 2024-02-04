import { useContext } from 'react';
import { LoginContext } from '../../../context/LoginContext';

const CreateResetButton = () => {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    return;
  }

  const { handleCreateAccountReset } = loginContext;

  return (
    <button onClick={handleCreateAccountReset} type="reset" className="button-primary">
      Reset
    </button>
  );
};

export default CreateResetButton;
