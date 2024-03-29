import { useContext } from 'react';
import cartLogo from '../../../assets/icons/cart.svg';
import { LibraryContext } from '../../../context/LibraryContext';
import { LoginContext } from '../../../context/LoginContext';
import childLogo from '../../../assets/images/reading.png';

const Header = () => {
  const libraryContext = useContext(LibraryContext);
  const loginContext = useContext(LoginContext);

  if (!libraryContext || !loginContext) {
    return;
  }

  const { handleCartStateOnClick } = libraryContext;
  const { cartOrders } = loginContext;

  return (
    <header className="bg-primaryBtn-hover h-28 w-full flex items-center justify-between fixed top-0 z-20 pr-10 pl-10">
      <div className="flex gap-4 items-center">
        <img src={childLogo} alt="child on ladder with books" width="100" height="100" />
        <h1 className="font-bold text-2xl">QuirkReads</h1>
      </div>
      <div className="flex gap-4">
        <div className="relative cursor-pointer">
          {cartOrders.products.length > 0 && (
            <div className="rounded-full bg-slate-500 text-white absolute w-5 h-5 flex justify-center items-center">
              <p>{cartOrders.products.length}</p>
            </div>
          )}
          <img
            onClick={() => {
              handleCartStateOnClick(true);
            }}
            src={cartLogo}
            alt="cart"
            width="40"
            height="40"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
