import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import CheckoutSummary from './components/CheckoutSummary/CheckoutSummary';
import Provider from './context/Provider';
import Cart from './components/Cart/Cart';

function App() {
  return (
    <Router>
      <Provider>
        <Header />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/checkout-summary" element={<CheckoutSummary />} />
        </Routes>
        <Cart />
      </Provider>
    </Router>
  );
}

export default App;
