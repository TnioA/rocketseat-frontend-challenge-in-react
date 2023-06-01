import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import './Global.css';
import { Loading } from './components/loading';
import { Header } from './components/header';
import { Product } from './pages/product';
import { Cart } from './pages/cart';

function App(props: any) {
  const [showLoading, setLoading] = useState(false);

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Loading showLoading={showLoading}></Loading>
        <Header setLoading={(value: boolean) => setLoading(value)} history={props.history}></Header>
        <Routes>
          <Route path="/" element={<Home setLoading={(value: boolean) => setLoading(value)} />} />
          <Route path="/product/:id" element={<Product {...props} setLoading={(value: boolean) => setLoading(value)} />} />
          <Route path="/cart" element={<Cart setLoading={(value: boolean) => setLoading(value)} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
