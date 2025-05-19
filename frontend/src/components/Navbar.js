import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartCount }) => (
  <nav className="navbar">
    <h1>🛒 E-Commerce</h1>
    <div className="nav-links">
      <Link to="/">Shop</Link>
      <Link to="/cart">Cart ({cartCount})</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  </nav>
);

export default Navbar;