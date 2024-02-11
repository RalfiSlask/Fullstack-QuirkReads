import { useContext } from 'react';
import LogoutButton from '../../pages/library/LogoutButton';
import UserComponent from '../../pages/library/UserComponent';
import { LoginContext } from '../../../context/LoginContext';
import { LibraryContext } from '../../../context/LibraryContext';
import SidebarCategory from './SidebarCategory';
import uuid from 'react-uuid';
import searchLogo from '../../../assets/icons/search.svg';
import ordersLogo from '../../../assets/icons/orders.svg';
import homeLogo from '../../../assets/icons/home.svg';
import categoriesLogo from '../../../assets/icons/categories.svg';
import dotLogo from '../../../assets/icons/circle.svg';

const Sidebar = () => {
  const loginContext = useContext(LoginContext);
  const libraryContext = useContext(LibraryContext);

  if (!loginContext || !libraryContext) {
    return;
  }

  const { userName, changeStateOfModal } = loginContext;
  const { categories, handleClickOnAll } = libraryContext;

  const openOrderModalOnClick = () => {
    changeStateOfModal('lightbox', true);
    changeStateOfModal('order', true);
  };

  return (
    <section className="fixed left-0 w-[350px] bg-secondary h-full pt-36 pb-20 pl-28 flex flex-col gap-20 border-r  border-solid border-primaryBtn">
      <UserComponent />
      <div className="flex flex-col justify-between h-full w-full">
        <ul className="flex flex-col gap-4 text-xl ">
          <div className="flex items-center gap-4">
            <img src={homeLogo} alt="home icon" width="30" height="30" />
            <li className="hover:text-primaryBtn cursor-pointer">Home</li>
          </div>
          <div className="flex items-center gap-4">
            <img src={searchLogo} alt="search icon" width="30" height="30" />
            <li className="hover:text-primaryBtn cursor-pointer">Search</li>
          </div>
          {userName.length > 0 && (
            <div className="flex items-center gap-4">
              <img src={ordersLogo} alt="orders icon" width="30" height="30" />
              <li onClick={openOrderModalOnClick} className="hover:text-primaryBtn cursor-pointer">
                My Orders
              </li>
            </div>
          )}
        </ul>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <img src={categoriesLogo} alt="search icon" width="30" height="30" />
            <li className=" text-xl list-none">Categories</li>
          </div>
          <ul>
            <div className="flex items-center gap-2">
              <img src={dotLogo} alt="dot logo" width="16" height="16" />
              <li onClick={handleClickOnAll} className="text-lg cursor-pointer hover:text-primaryBtn">
                All
              </li>
            </div>

            {categories?.map(category => {
              return <SidebarCategory key={uuid()} category={category.name} categoryId={category.id} />;
            })}
          </ul>
        </div>

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
