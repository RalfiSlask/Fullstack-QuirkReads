import bookCover from '../../../assets/images/book-cover.png';

import { LoginContext } from '../../../context/LoginContext';
import { IBookType } from '../../../utils/types';
import { useContext, useState } from 'react';

type BookProps = {
  bookInfo: IBookType;
};

const BookComponent: React.FC<BookProps> = ({ bookInfo }) => {
  const [bookQuantity, setbookQuantity] = useState(0);
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    return;
  }

  const { addProductToCart } = loginContext;

  const { name, description, price, id, lager } = bookInfo;

  const decrementBooksOnClick = () => {
    setbookQuantity((prev: number) => (prev > 0 ? prev - 1 : prev));
  };

  const incrementBooksOnClick = () => {
    setbookQuantity(prev => (prev < lager ? prev + 1 : prev));
  };

  return (
    <div className="bg-secondary py-4 px-3 w-[200px] h-[320px] flex flex-col justify-between  items-center rounded-md">
      <div className="flex flex-col gap-2 items-center">
        <img src={bookCover} alt="book cover" width="80px" height="100px" />
        <h2 className="text-center font-bold">{description}</h2>
        <p className="italic text-center">{name}</p>
      </div>

      <div className="w-full flex gap-2 justify-between">
        <div className="flex flex-col items-center gap-2">
          <p>${price}</p>
          <div className="flex items-center gap-2">
            <button onClick={decrementBooksOnClick}>-</button>
            <div className="px-6 border border-solid border-black py-2 h-[34px] rounded-md">{bookQuantity}</div>
            <button onClick={incrementBooksOnClick}>+</button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between">
          <p>
            {lager > 0 ? 'stock:' : ''}{' '}
            <span className={`${lager <= 0 ? 'text-red-500' : 'text-green-600'}`}>
              {lager <= 0 ? 'out of stock' : lager}
            </span>
          </p>
          <button
            onClick={() => {
              addProductToCart(bookQuantity, id);
            }}
            className="bg-primaryBtn px-4 rounded-md py-2 hover:bg-primaryBtn-hover h-[34px]"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookComponent;
