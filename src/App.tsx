import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import './Global.css';
import { Header } from './components/header';
import { Product } from './pages/product';
import { Cart } from './pages/cart';
import { AppContextProvider } from './context/appContext';

function App(props: any) {
  return (
    <div className="wrapper">
      <AppContextProvider>
        <BrowserRouter>
          <Header history={props.history}></Header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product {...props} />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </div>
  );
}

export default App;
