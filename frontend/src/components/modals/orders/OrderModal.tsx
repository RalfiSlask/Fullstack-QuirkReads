import { useContext } from 'react';
import closeLogo from '../../../assets/icons/delete.svg';
import { LoginContext } from '../../../context/LoginContext';
import OrdersContainer from './OrdersContainer';
import uuid from 'react-uuid';

const OrderModal = () => {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    return;
  }

  const { changeStateOfModal, userOrder } = loginContext;

  const closeModalOnClick = () => {
    changeStateOfModal('lightbox', false);
    changeStateOfModal('order', false);
  };

  return (
    <section className="z-50 fixed left-[50%] overflow-y-auto max-h-[800px] -translate-x-1/2 w-[600px] flex flex-col pl-20 gap-10 items-start rounded-xl py-10 bg-secondary shadow-gray-800 mt-[200px]">
      <img
        onClick={closeModalOnClick}
        src={closeLogo}
        alt="close modal"
        className="absolute top-4 right-4 cursor-pointer"
        width="40"
        height="40"
      />
      <div className="flex items-center justify-between w-[350px]">
        <h2 className="text-2xl font-bold">Products</h2>
        <h2 className="text-2xl font-bold">Quantity</h2>
      </div>

      {userOrder.map((order, index) => {
        return <OrdersContainer key={uuid()} order={order} orderNumber={index + 1} />;
      })}
    </section>
  );
};

export default OrderModal;
