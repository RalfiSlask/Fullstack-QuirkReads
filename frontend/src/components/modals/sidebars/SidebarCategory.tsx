import { useContext } from 'react';
import { LibraryContext } from '../../../context/LibraryContext';
import dotLogo from '../../../assets/icons/circle.svg';

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
    <div className="flex items-center gap-2">
      <img src={dotLogo} alt="dot logo" width="16" height="16" />
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
