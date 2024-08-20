import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import formatCurrency from '../../utils/formatCurrency';
import './CheckoutSummary.css';

function CheckoutSummary() {
  const { cartItems, setCartItems } = useContext(AppContext);

  const handleQuantityChange = (id, delta) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    const itemPrice = item.price || 0;
    const itemQuantity = item.quantity || 1;
    return acc + (itemPrice * itemQuantity);
  }, 0);

  return (
    <div className="checkout-summary-container">
      <div className="products-column">
      
        {cartItems.length > 0 ? (
          <ul className="product-list">
            <h2>Produtos no Carrinho</h2>
            {cartItems.map(item => (
              <li key={item.id} className="checkout-item">
                <img src={item.thumbnail} alt={item.title} />
                <div className="item-details">
                  <div>{item.title}</div>
                  <div>{formatCurrency(item.price, 'BRL')}</div>
                </div>
                <div className="quantity-controls">
                  <button
                    className="quantity-button"
                    onClick={() => handleQuantityChange(item.id, -1)}
                  >
                    -
                  </button>
                  <span>{item.quantity || 1}</span>
                  <button
                    className="quantity-button"
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="remove-button"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-items">
            <p>Seu carrinho está vazio</p>
          </div>
        )}
        <Link to="/" className="back-to-products">Voltar para Produtos</Link>
      </div>
      <div className="summary-column">
        
        {cartItems.length > 0 && (
          <div className="summary-details">
            <h2>Resumo da Compra</h2>
            <div className="summary-row">
              <div className="summary-label">Quantidade de Produtos:</div>
              <div className="summary-value">{cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)}</div>
            </div>
            <div className="summary-row">
              <div className="summary-label">Frete:</div>
              <div className="summary-value">Grátis</div>
            </div>
            <div className="summary-row total-row">
              <div className="summary-label">Total:</div>
              <div className="summary-value">{formatCurrency(totalPrice, 'BRL')}</div>
            </div>
            <Link to="/checkout" className="continue-button">Continuar a Compra</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckoutSummary;
