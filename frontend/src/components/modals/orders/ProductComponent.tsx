import { useContext, useEffect, useState } from 'react';
import { IBookType, IProductType } from '../../../utils/types';
import { LibraryContext } from '../../../context/LibraryContext';

type ProductProps = {
  product: IProductType;
};

const ProductComponent: React.FC<ProductProps> = ({ product }) => {
  const libraryContext = useContext(LibraryContext);
  const [orderProduct, setOrderProduct] = useState<IBookType | undefined>(undefined);

  useEffect(() => {
    if (libraryContext) {
      const { books } = libraryContext;
      const foundProduct: IBookType | undefined = books?.find(book => book.id === product.productId);
      if (foundProduct) {
        setOrderProduct(foundProduct);
      }
    }
  }, [libraryContext, product]);

  return (
    <div className="w-full flex items-baseline justify-between">
      <div>
        <p className="text-lg font-bold">{orderProduct?.description}</p>
        <p>{orderProduct?.name}</p>
      </div>
      <p className="font-bold">{product.quantity}</p>
    </div>
  );
};

export default ProductComponent;
