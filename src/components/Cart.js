import React from "react";
import { useStateCart, useDispatchCart } from "./Cartreducer";
import {Link} from 'react-router-dom';
export default function Cart({ toggleCart }) {
  const items = useStateCart();
  const dispatch = useDispatchCart();

  const handleRemove = (index) => {
    dispatch({ type: "Remove", index });
  };

  const handleOrder = async () => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      alert("Please log in to place an order");
      return;
    }

    const response = await fetch("http://localhost:5000/api/placeorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userEmail, cartItems: items }),
    });

    const result = await response.json();
    if (result.success) {
      alert("Order placed successfully!");
      dispatch({ type: "ClearCart" }); // Clears the cart after placing the order
    } else {
      alert("Failed to place order.");
    }
  };

  return (
    <div className="cart-overlay" style={{ opacity: 0.7 }}>
      <div className="cart-content">
        <button className="close-btn" onClick={toggleCart}>×</button>
        <h3 className="text-center">Your Cart</h3>
        
        {items.length === 0 ? (
          <p className="text-center">Cart is empty</p>
        ) : (
          <ul className="list-group">
            {items.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {item.name} - {item.quantity} x ₹{item.price}
                <button className="btn btn-danger btn-sm" onClick={() => handleRemove(index)}>Remove</button>
              </li>
            ))}
          </ul>
        )}

        {items.length > 0 && (
          <Link className="btn btn-success mt-2 w-100" onClick={handleOrder}>Order Now</Link>
        )}
      </div>
    </div>
  );
}
