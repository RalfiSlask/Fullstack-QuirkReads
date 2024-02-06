import { useContext } from 'react';
import LogoutButton from './LogoutButton';
import UserComponent from './UserComponent';
import { LoginContext } from '../../../context/LoginContext';

const Sidebar = () => {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    return;
  }

  const { userName, changeStateOfModal } = loginContext;

  const openOrderModalOnClick = () => {
    changeStateOfModal('lightbox', true);
    changeStateOfModal('order', true);
  };

  return (
    <section className="fixed left-0 w-[350px] bg-secondary h-full pt-24 pb-20 pl-28 flex flex-col gap-20 border-r border-solid border-primaryBtn">
      <UserComponent />
      <div className="flex flex-col justify-between h-full w-full">
        <ul className="flex flex-col gap-2 text-xl ">
          <li className="hover:text-primaryBtn cursor-pointer">Home</li>
          <li className="hover:text-primaryBtn cursor-pointer">Search</li>
          <li onClick={openOrderModalOnClick} className="hover:text-primaryBtn cursor-pointer">
            My Orders
          </li>
        </ul>
        <div className="flex flex-col gap-8 items-start">
          <ul className="flex flex-col gap-2 text-lg">
            <li>About</li>
            <li>Support</li>
            <li>Terms & Condition</li>
          </ul>
          {userName.length > 0 && <LogoutButton />}
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
