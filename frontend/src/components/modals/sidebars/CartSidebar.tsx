import { useContext } from 'react';
import { LibraryContext } from '../../../context/LibraryContext';
import closeLogo from '../../../assets/icons/delete.svg';
import { LoginContext } from '../../../context/LoginContext';
import CartProduct from './CartProduct';

const CartSidebar = () => {
  const libraryContext = useContext(LibraryContext);
  const loginContext = useContext(LoginContext);

  if (!libraryContext || !loginContext) {
    return;
  }

  const { cartState, handleCartStateOnClick, fetchBooks, fetchCategories } = libraryContext;
  const { cartOrders, setCartOrders, isOrderPlaced, setIsOrderPlaced, userName, fetchOrders } = loginContext;

  const postOrder = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/orders/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartOrders),
      });

      if (!response.ok) {
        return;
      }
      const jsonData = await response.json();
      console.log(jsonData);
      await fetchCategories();
      await fetchBooks();
      await fetchOrders();
    } catch (err) {
      console.log(err, 'could not post');
    }
  };

  const handleClickOnPostOrder = async () => {
    if (cartOrders.products.length <= 0 || userName === '') {
      console.log('cant post order');
      return;
    }
    await postOrder();
    setCartOrders(prev => ({ ...prev, products: [] }));
    setIsOrderPlaced(true);
  };

  return (
    <section
      className={`${
        cartState ? 'openCart' : 'cart'
      } fixed right-0 border-2 border-solid w-[400px] flex flex-col justify-between border-primaryBtn bg-secondary pt-36 pb-12 px-6 h-full`}
    >
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Cart</h2>
          <img
            onClick={() => {
              handleCartStateOnClick(false);
            }}
            className="cursor-pointer"
            src={closeLogo}
            alt="close cart"
            width="40"
            height="40"
          />
        </div>
        <div className="flex flex-col gap-4">
          {!isOrderPlaced && (
            <div className="flex items-center justify-between mt-[60px]">
              <h2 className="text-lg font-bold">Products</h2>
              <h2 className="text-lg font-bold">Quantity</h2>
            </div>
          )}
          <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto">
            {cartOrders.products.map(product => {
              return <CartProduct key={product.productId} quantity={product.quantity} productId={product.productId} />;
            })}
          </div>
        </div>

        {isOrderPlaced && cartOrders.user !== '' && (
          <div className="flex flex-col items-center gap-2 mt-[100px]">
            <h2 className="text-4xl text-center">Order is placed</h2>
            <p className="text-lg">It is on its way!</p>
          </div>
        )}
        {cartOrders.user === '' && (
          <h2 className="text-red-500 text-xl text-center mt-[100px]">You have to login before placing order</h2>
        )}
      </div>

      <button onClick={handleClickOnPostOrder} className="button-primary">
        Place Order
      </button>
    </section>
  );
};

export default CartSidebar;
