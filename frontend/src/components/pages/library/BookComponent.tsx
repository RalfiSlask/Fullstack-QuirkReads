import bookCover from '../../../assets/images/book-cover.png';
import { IBookType } from '../../../utils/types';

type BookProps = {
  bookInfo: IBookType;
};

const BookComponent: React.FC<BookProps> = ({ bookInfo }) => {
  const { name, description, price, lager } = bookInfo;

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
            <button>-</button>
            <div className="px-6 border border-solid border-black py-2 h-[34px] rounded-md">0</div>
            <button>+</button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between">
          <p>
            stock: <span className="text-green-600">{lager}</span>
          </p>
          <button className="bg-primaryBtn px-4 rounded-md py-2 hover:bg-primaryBtn-hover h-[34px]">Add</button>
        </div>
      </div>
    </div>
  );
};

export default BookComponent;
