import { useNavigate } from 'react-router-dom';

const GoBackButton = () => {
  const navigate = useNavigate();

  const handleClickOnGoBack = (path: string) => {
    navigate(path);
  };

  return (
    <button onClick={() => handleClickOnGoBack('/')} className="button-primary">
      Go Back
    </button>
  );
};

export default GoBackButton;
