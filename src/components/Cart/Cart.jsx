import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';
import CartItem from '../CartItem/CartItem';
import AppContext from '../../context/AppContext';
import formatCurrency from '../../utils/formatCurrency';

function Cart() {
  const { cartItems, isCartVisible } = useContext(AppContext);

  const totalPrice = cartItems.reduce((acc, item) => item.price + acc, 0);

  return (
    <section className={`cart ${isCartVisible ? 'cart--active' : ''}`}>
      <div className="cart-items">
        {cartItems.map(cartItem => (
          <CartItem key={cartItem.id} data={cartItem} />
        ))}
      </div>

      <div className="cart-resume">
        <h2>Total: {formatCurrency(totalPrice, 'BRL')}</h2>
        <Link to="/checkout-summary">
          <button type="button">Resumo da Compra</button>
        </Link>
      </div>
    </section>
  );
}

export default Cart;
