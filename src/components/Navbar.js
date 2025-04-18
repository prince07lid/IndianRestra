import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cart from './Cart';

export default function Navbar() {
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div className={showCart ? "overlay-active" : ""}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success h-40">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">IndianRestra</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5 mx-2" to="/">Home</Link>
              </li>
              {localStorage.getItem("authToken") && (
                <li className="nav-item">
                  <Link className="nav-link active fs-5 mx-1" to="/placeorder">My Orders</Link>
                </li>
              )}
            </ul>
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="btn bg-white text-success mx-2" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-2" to="/createuser">Signup</Link>
              </div>
            ) : (
              <div>
                <button className="btn bg-white text-success mx-2" onClick={toggleCart}>Cart</button>
                <button className="btn bg-white text-success mx-2" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </nav>
      {showCart && <Cart toggleCart={toggleCart} />}
    </div>
  );
}

