import React from 'react';

type CartProductTypes = {
  quantity: number;
  productId: string;
};

const CartProduct: React.FC<CartProductTypes> = ({ quantity }) => {
  return (
    <div className="flex items-center justify-between">
      <div>CartProduct</div>
      <p>quantity: {quantity}</p>
    </div>
  );
};

export default CartProduct;
