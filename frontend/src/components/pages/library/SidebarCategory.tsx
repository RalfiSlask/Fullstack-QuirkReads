import { useContext } from 'react';
import { LibraryContext } from '../../../context/LibraryContext';

useContext;

type CategoryPropsType = {
  category: string;
  categoryId: string;
};

const SidebarCategory: React.FC<CategoryPropsType> = ({ category, categoryId }) => {
  const libraryContext = useContext(LibraryContext);

  if (!libraryContext) {
    return;
  }

  const { handleClickOnCategory } = libraryContext;

  return (
    <div>
      <p
        onClick={() => {
          handleClickOnCategory(categoryId);
        }}
        className="text-lg cursor-pointer hover:text-primaryBtn"
      >
        {category}
      </p>
    </div>
  );
};

export default SidebarCategory;
