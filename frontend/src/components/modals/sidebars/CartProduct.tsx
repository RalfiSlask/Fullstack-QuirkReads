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
  const [bookQuantity, setBookQuantity] = useState(1);

  const loginContext = useContext(LoginContext);
  if (!loginContext) {
    return;
  }

  const { deleteProductFromCart, setCartOrders } = loginContext;

  const updateCartOrders = (bookQuantity: number) => {
    setCartOrders(prev => {
      const updatedProducts = prev.products.map(product => {
        if (product.productId === productId) {
          return {
            ...product,
            quantity: bookQuantity,
          };
        }
        return product;
      });
      return { ...prev, products: updatedProducts };
    });
  };

  const decrementBooksOnClick = () => {
    setBookQuantity((prev: number) => (prev > 0 ? prev - 1 : prev));
  };

  const incrementBooksOnClick = () => {
    setBookQuantity(prev => (book !== undefined && prev < book.lager ? prev + 1 : prev));
  };

  const fetchProduct = async (productId: string) => {
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
    updateCartOrders(bookQuantity);
  }, [setCartOrders, bookQuantity, productId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchProduct(productId);
      } catch (err) {
        console.log(err, 'error fetching data');
      }
    };
    fetchData();
  }, [productId]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        <img src={bookCover} alt="book cover" height="30" width="30" />
        <div className="flex flex-col max-w-[150px]">
          <p className="font-bold">{book?.description}</p>
          <p>{book?.name}</p>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <button onClick={decrementBooksOnClick}>-</button>
          <div className="px-6 border border-solid border-black py-2 h-[34px] rounded-md">{quantity}</div>
          <button onClick={incrementBooksOnClick}>+</button>
        </div>
      </div>
      <div className="flex items-center gap-[12px]">
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
