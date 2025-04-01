import React from "react";
import "./App.css";
import Home from "./Screens/Home.js";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./Screens/Login.js";
import Signup from "./Screens/Signup.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { CartProvider } from "./components/Cartreducer.js";
import Cart from "./components/Cart.js";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createuser" element={<Signup />} />
          <Route path="/placeorder" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

// export default App;
