import { useContext } from 'react';
import cartLogo from '../../../assets/icons/cart.svg';
import { LibraryContext } from '../../../context/LibraryContext';

const Header = () => {
  const libraryContext = useContext(LibraryContext);

  if (!libraryContext) {
    return;
  }

  const { handleCartStateOnClick } = libraryContext;

  return (
    <header className="bg-primaryBtn h-14 w-full flex items-center justify-between fixed top-0 z-20 pr-10 pl-10">
      <h1 className="font-bold text-2xl">QuirkReads</h1>
      <div className="flex gap-4">
        <div className="relative cursor-pointer">
          <div className="rounded-full bg-slate-500 text-white absolute w-5 h-5 flex justify-center items-center">
            <p>0</p>
          </div>
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
