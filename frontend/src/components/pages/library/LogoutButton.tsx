import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleClickOnLogout = () => {
    navigate('/');
  };

  return (
    <button onClick={handleClickOnLogout} className="text-lg hover:text-gray-400">
      Logout
    </button>
  );
};

export default LogoutButton;
