import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import './App.css';
import { Loading } from './components/loading';
import { Header } from './components/header';
import { Product } from './pages/product';
import { Cart } from './pages/cart';

function App() {
  const [showLoading, setLoading] = useState(false);

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Loading showLoading={showLoading}></Loading>
        <Header setLoading={(value: boolean) => setLoading(value)}></Header>
        <Routes>
          <Route path="/" element={<Home setLoading={(value: boolean) => setLoading(value)} />} />
          <Route path="/produto/:id" element={<Product setLoading={(value: boolean) => setLoading(value)} />} />
          <Route path="/carrinho" element={<Cart setLoading={(value: boolean) => setLoading(value)} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
