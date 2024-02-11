import LoginForm from './LoginForm';
import { useContext } from 'react';
import { LoginContext } from '../../../context/LoginContext';
import closeLogo from '../../../assets/icons/delete.svg';

const LoginModal = () => {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    return;
  }

  const { handleCreateAnAccountOnClick, closeModalOnClick } = loginContext;

  return (
    <section className="z-50 fixed left-[50%] -translate-x-1/2 w-[700px] flex flex-col gap-10 items-center rounded-xl py-10 bg-secondary shadow-soft1 mt-[200px]">
      <img
        onClick={closeModalOnClick}
        src={closeLogo}
        alt="close modal"
        className="absolute top-4 right-4 cursor-pointer"
        width="40"
        height="40"
      />
      <h1 className="text-[#525252] text-4xl font-bold">Login</h1>
      <LoginForm />
      <div className="flex items-center gap-4">
        <p className="text-2xl text-grayText">Not Registered Yet?</p>
        <p onClick={handleCreateAnAccountOnClick} className="text-2xl cursor-pointer">
          Create an account
        </p>
      </div>
    </section>
  );
};

export default LoginModal;
