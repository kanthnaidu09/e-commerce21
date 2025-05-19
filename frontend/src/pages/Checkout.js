import React from 'react';
import API from '../api';

const Checkout = ({ cartItems, clearCart }) => {
  const handleCheckout = async () => {
    const order = {
      items: cartItems.map(i => ({ id: i.id, qty: i.qty })),
      total: cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    };
    await API.post('/orders', order);
    clearCart();
    alert('Order placed!');
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <button onClick={handleCheckout}>Place Order</button>
    </div>
  );
};

export default Checkout;