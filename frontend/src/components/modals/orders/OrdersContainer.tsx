import { IOrderType } from '../../../utils/types';
import ProductComponent from './ProductComponent';
import uuid from 'react-uuid';

type OrderPropsType = {
  order: IOrderType;
  orderNumber: number;
};

const OrdersContainer: React.FC<OrderPropsType> = ({ order, orderNumber }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2>Order {orderNumber}</h2>
      <div className="flex flex-col gap-4 w-[300px]">
        {order.products.map(product => {
          return <ProductComponent key={uuid()} product={product} />;
        })}
      </div>
    </div>
  );
};

export default OrdersContainer;
