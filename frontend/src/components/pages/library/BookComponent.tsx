import bookCover from '../../../assets/images/book-cover.png';

import { LoginContext } from '../../../context/LoginContext';
import { IBookType } from '../../../utils/types';
import { useContext } from 'react';

type BookProps = {
  bookInfo: IBookType;
};

const BookComponent: React.FC<BookProps> = ({ bookInfo }) => {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    return;
  }

  const { addProductToCart } = loginContext;

  const { name, description, price, id, lager } = bookInfo;

  return (
    <div className="bg-secondary py-4 px-3 w-[200px] h-[320px] flex flex-col justify-between  items-center rounded-md">
      <div className="flex flex-col gap-2 items-center">
        <img src={bookCover} alt="book cover" width="80px" height="100px" />
        <h2 className="text-center font-bold">{description}</h2>
        <p className="italic text-center">{name}</p>
      </div>

      <div className="w-full flex-col flex gap-2 justify-between">
        <div className="flex justify-between items-center">
          <p>${price}</p>
          <p>
            {lager > 0 ? 'stock:' : ''}{' '}
            <span className={`${lager <= 0 ? 'text-red-500' : 'text-green-600'}`}>
              {lager <= 0 ? 'out of stock' : lager}
            </span>
          </p>
        </div>

        <button
          onClick={() => {
            addProductToCart(id, lager);
          }}
          className="bg-primaryBtn px-4 rounded-md py-2 hover:bg-primaryBtn-hover w-full h-[34px]"
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default BookComponent;
