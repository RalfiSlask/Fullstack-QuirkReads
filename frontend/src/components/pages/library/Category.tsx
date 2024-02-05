import { useEffect, useState } from 'react';
import { IBookType } from '../../../utils/types';
import BookComponent from './BookComponent';

type CategoryProps = {
  name: string;
  id: string;
  books: IBookType[] | undefined;
};

const Category: React.FC<CategoryProps> = ({ name, id, books }) => {
  const [booksByCategory, setBooksByCategory] = useState<IBookType[] | undefined>();

  useEffect(() => {
    const filterByCategory = books?.filter(book => book.category === id);
    setBooksByCategory(filterByCategory);
    console.log(filterByCategory);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-xl">{name}</h2>
      <div className="flex flex-col gap-4">
        {booksByCategory?.map(book => {
          return <BookComponent key={book.id} bookInfo={book} />;
        })}
      </div>
    </div>
  );
};

export default Category;
