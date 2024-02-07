import React, { useEffect, useState, useContext } from 'react';
import { IBookType } from '../../../utils/types';
import bookCover from '../../../assets/images/book-cover.png';
import trashLogo from '../../../assets/icons/trashbin.svg';
import { LoginContext } from '../../../context/LoginContext';

type CartProductTypes = {
  quantity: number;
  productId: string;
};

const CartProduct: React.FC<CartProductTypes> = ({ quantity, productId }) => {
  const [book, setBook] = useState<IBookType>();

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${productId}`);
      if (!response.ok) {
        return;
      }
      const jsonData = await response.json();
      if (jsonData) {
        setBook(jsonData);
      }
    } catch (err) {
      console.log(err, 'error fetching product');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchProduct();
      } catch (err) {
        console.log(err, 'error fetching data');
      }
    };
    fetchData();
  }, [productId]);

  const loginContext = useContext(LoginContext);
  if (!loginContext) {
    return;
  }

  const { deleteProductFromCart } = loginContext;

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        <img src={bookCover} alt="book cover" height="30" width="30" />
        <div className="flex flex-col max-w-[150px]">
          <p className="font-bold">{book?.description}</p>
          <p>{book?.name}</p>
        </div>
      </div>
      <div className="flex items-center gap-[12px]">
        <p className="font-bold">{quantity}</p>
        <img
          onClick={() => {
            deleteProductFromCart(productId);
          }}
          className="cursor-pointer"
          src={trashLogo}
          alt="delete product"
          width="20"
          height="20"
        />
      </div>
    </div>
  );
};

export default CartProduct;
