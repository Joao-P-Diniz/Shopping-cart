import React, { useContext } from 'react';

import './Cart.css';
import CartItem from '../CartItem/CartItem';
import AppContext from '../../context/AppContext';
import formatCurrency from '../../utils/formatCurrency';

function Cart() {
  const { cartItems, isCartVisible,setCartItems } = useContext(AppContext);

  const totalPrice = cartItems.reduce((acc, item) => item.price + acc, 0);

  const handleFinalizarCompra = () => {
    alert('Compra finalizada com sucesso!');
    setCartItems([]); 
  };

  return (
    <section className={`cart ${isCartVisible ? 'cart--active' : ''}`}>
      <div className="cart-items">
        { cartItems.map((cartItem) => <CartItem key={cartItem.id} data={cartItem} />) }
      </div>

      <div className="cart-resume">{formatCurrency(totalPrice, 'BRL')}
        <button className="cart-finalize-button" onClick={handleFinalizarCompra}>
          Finalizar Compra
        </button>
      </div>
    </section>
  );
}

export default Cart;
