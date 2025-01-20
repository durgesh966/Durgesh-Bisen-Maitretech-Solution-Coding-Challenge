import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

const Navbar = () => {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const navigate = useNavigate();

  const calculateCartItemsCount = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      return storedCart.reduce((total, item) => total + item.quantity, 0);
    }
    return 0;
  };

  useEffect(() => {
    setCartItemsCount(calculateCartItemsCount());

    const intervalId = setInterval(() => {
      setCartItemsCount(calculateCartItemsCount());
    });
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    navigate('/login');
  };

  const isAuthenticated = localStorage.getItem('isAuthenticated');

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Welcome to Maitretech Solution Coding Challenge
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/fooditems">
                Food Items
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/checkout">
                    <i className="fas fa-shopping-cart"></i>
                    {cartItemsCount > 0 && (
                      <span className="badge bg-danger ms-1">
                        {cartItemsCount}
                      </span>
                    )}
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login Here
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
